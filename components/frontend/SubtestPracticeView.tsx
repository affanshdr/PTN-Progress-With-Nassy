"use client";

import { useEffect, useMemo, useState } from "react";
import { SNBT_SUBTEST_MAP, SNBT_SUBTESTS } from "@/lib/progress-utils";
import {
  SNBT_CURRICULUM,
  SNBT_SUBTEST_MATERIALS,
  getChaptersForSubtest,
  type SubMaterialLesson,
} from "@/lib/subtest-materials";
import {
  getSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";
import { getErrorMessage } from "@/lib/supabase/errors";
import type {
  OptionLetter,
  PracticeQuestion,
  PracticeSubmission,
  SnbtSubtestCode,
} from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";
import {
  SubtestThumbnail,
  VerifiedBadgeIcon,
} from "@/components/frontend/SkilvulUi";

const OPTION_KEYS: readonly OptionLetter[] = ["A", "B", "C", "D", "E"];

const STATUS_TABS = [
  { key: "ALL", label: "Semua" },
  { key: "UNANSWERED", label: "Belum" },
  { key: "CORRECT", label: "Benar" },
  { key: "WRONG", label: "Salah" },
] as const;

type CategoryFilter = "ALL" | "TPS" | "Literasi";
type ProgressFilter = "ALL" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
type ClassroomMode = "MATERI" | "LATIHAN";

function getOptionText(q: PracticeQuestion, letter: OptionLetter): string {
  switch (letter) {
    case "A":
      return q.option_a;
    case "B":
      return q.option_b;
    case "C":
      return q.option_c;
    case "D":
      return q.option_d;
    case "E":
      return q.option_e;
  }
}

function getLocalSubmissionsKey(userId: string | undefined): string {
  return `nassy_practice_submissions_v2_${userId ?? "guest"}`;
}

function loadLocalSubmissions(
  userId: string | undefined,
): Record<string, PracticeSubmission> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(getLocalSubmissionsKey(userId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, PracticeSubmission>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLocalSubmissions(
  userId: string | undefined,
  map: Record<string, PracticeSubmission>,
): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      getLocalSubmissionsKey(userId),
      JSON.stringify(map),
    );
  } catch {
    // Ignore storage quota errors
  }
}

function FilterCheckRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-left text-sm transition hover:bg-[#f8fafc]"
    >
      <span
        className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded-[5px] border transition ${
          checked
            ? "border-[var(--blue)] bg-[var(--blue)] text-white"
            : "border-[#cbd5e1] bg-white text-transparent"
        }`}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 6.2L5 8.7L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={
          checked
            ? "font-bold text-[var(--navy)]"
            : "font-medium text-[#475467]"
        }
      >
        {label}
      </span>
    </button>
  );
}

/**
 * Green circle checkmark icon matching Skilvul's "Daftar Isi" completed indicator.
 */
function CompletedCheckCircle({ partial = false }: { partial?: boolean }) {
  if (partial) {
    return (
      <span
        title="Sedang dipelajari"
        className="inline-grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-[#f59e0b] bg-[#fffbeb] text-[10px] font-extrabold text-[#b45309]"
      >
        •
      </span>
    );
  }
  return (
    <span
      title="Latihan sub-materi selesai"
      className="inline-grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#22c55e] text-white shadow-2xs"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6.2L5 8.6L9.5 3.6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function SubtestPracticeView() {
  const { currentUser, showToast } = useNassy();

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [remoteQuestionIds, setRemoteQuestionIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [submissions, setSubmissions] = useState<
    Record<string, PracticeSubmission>
  >({});

  // View 1 (Catalog) state
  const [activeSubtest, setActiveSubtest] = useState<SnbtSubtestCode | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("ALL");
  const [progressFilter, setProgressFilter] = useState<ProgressFilter>("ALL");

  // View 2 (Skilvul Classroom: Sub-Materi Article + Question Drilling + Daftar Isi Modal)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [classroomMode, setClassroomMode] = useState<ClassroomMode>("MATERI");
  const [isTocModalOpen, setIsTocModalOpen] = useState(false);
  const [readLessonIds, setReadLessonIds] = useState<Record<string, boolean>>(
    {},
  );

  // Question Drilling state inside active Sub-Materi
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "UNANSWERED" | "CORRECT" | "WRONG"
  >("ALL");
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [draftChoice, setDraftChoice] = useState<OptionLetter | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchPracticeData() {
      setIsLoading(true);
      try {
        // 1. Load ready Google Drive curriculum questions from static JSON
        const localRes = await fetch("/data/bank-soal-gdrive.json");
        const rawQuestions: PracticeQuestion[] = localRes.ok
          ? ((await localRes.json()) as PracticeQuestion[])
          : [];
        const gdriveQuestions = rawQuestions.filter(
          (q) => (SNBT_CURRICULUM[q.subtest]?.length ?? 0) > 0,
        );

        // 2. Load locally persisted submissions
        const mergedSubmissions: Record<string, PracticeSubmission> =
          loadLocalSubmissions(currentUser?.id);

        const remoteIds = new Set<string>();

        // 3. Also fetch from Supabase if configured & logged in
        if (currentUser && isSupabaseBrowserConfigured()) {
          try {
            const supabase = getSupabaseClient();
            const [qRes, sRes] = await Promise.all([
              supabase
                .from("practice_questions")
                .select("*")
                .eq("is_published", true)
                .order("subtest", { ascending: true })
                .order("sort_order", { ascending: true }),
              supabase
                .from("practice_submissions")
                .select("*")
                .eq("user_id", currentUser.id),
            ]);

            if (!qRes.error && Array.isArray(qRes.data)) {
              for (const rq of qRes.data as PracticeQuestion[]) {
                remoteIds.add(rq.id);
              }
            }

            if (!sRes.error && Array.isArray(sRes.data)) {
              for (const item of sRes.data as PracticeSubmission[]) {
                mergedSubmissions[item.question_id] = item;
              }
              saveLocalSubmissions(currentUser.id, mergedSubmissions);
            }
          } catch {
            // Keep working seamlessly with local GDrive dataset
          }
        }

        if (!active) return;

        setRemoteQuestionIds(remoteIds);
        setQuestions(gdriveQuestions);
        setSubmissions(mergedSubmissions);
        setErrorMessage(null);
      } catch (error) {
        if (!active) return;
        setErrorMessage(getErrorMessage(error, "Gagal memuat bank soal."));
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchPracticeData();

    return () => {
      active = false;
    };
  }, [currentUser]);

  useEffect(() => {
    if (!isTocModalOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsTocModalOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTocModalOpen]);

  // Statistics per Subtest and per Sub-Materi topic
  const subtestMeta = useMemo(() => {
    const map: Record<
      SnbtSubtestCode,
      {
        totalQuestions: number;
        answeredQuestions: number;
        correctQuestions: number;
        totalLessons: number;
        completedLessons: number;
        byTopic: Record<
          string,
          { total: number; answered: number; correct: number }
        >;
      }
    > = {
      PK: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.PK.length,
        completedLessons: 0,
        byTopic: {},
      },
      PM: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.PM.length,
        completedLessons: 0,
        byTopic: {},
      },
      PU: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.PU.length,
        completedLessons: 0,
        byTopic: {},
      },
      PPU: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.PPU.length,
        completedLessons: 0,
        byTopic: {},
      },
      LBI: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.LBI.length,
        completedLessons: 0,
        byTopic: {},
      },
      LBE: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.LBE.length,
        completedLessons: 0,
        byTopic: {},
      },
      PBM: {
        totalQuestions: 0,
        answeredQuestions: 0,
        correctQuestions: 0,
        totalLessons: SNBT_CURRICULUM.PBM.length,
        completedLessons: 0,
        byTopic: {},
      },
    };

    for (const q of questions) {
      const bucket = map[q.subtest];
      if (!bucket) continue;
      bucket.totalQuestions += 1;
      if (!bucket.byTopic[q.topic]) {
        bucket.byTopic[q.topic] = { total: 0, answered: 0, correct: 0 };
      }
      bucket.byTopic[q.topic].total += 1;

      const sub = submissions[q.id];
      if (sub) {
        bucket.answeredQuestions += 1;
        bucket.byTopic[q.topic].answered += 1;
        if (sub.is_correct) {
          bucket.correctQuestions += 1;
          bucket.byTopic[q.topic].correct += 1;
        }
      }
    }

    for (const code of Object.keys(map) as SnbtSubtestCode[]) {
      const lessons = SNBT_CURRICULUM[code];
      let doneCount = 0;
      for (const lesson of lessons) {
        const tStat = map[code].byTopic[lesson.topicKey];
        if (tStat && tStat.total > 0 && tStat.answered >= tStat.total) {
          doneCount += 1;
        }
      }
      map[code].completedLessons = doneCount;
    }

    return map;
  }, [questions, submissions]);

  const totalAnsweredAll = useMemo(
    () => questions.filter((q) => Boolean(submissions[q.id])).length,
    [questions, submissions],
  );

  const filteredCatalogSubtests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return SNBT_SUBTESTS.filter((sub) => {
      if (categoryFilter !== "ALL" && sub.category !== categoryFilter) {
        return false;
      }

      const stats = subtestMeta[sub.code];
      const hasContent = stats.totalLessons > 0 && stats.totalQuestions > 0;
      const pct =
        stats.totalQuestions > 0
          ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100)
          : 0;

      if (
        progressFilter === "NOT_STARTED" &&
        (!hasContent || stats.answeredQuestions > 0)
      ) {
        return false;
      }
      if (
        progressFilter === "IN_PROGRESS" &&
        (stats.answeredQuestions === 0 || pct >= 100)
      ) {
        return false;
      }
      if (
        progressFilter === "COMPLETED" &&
        (stats.totalQuestions === 0 || pct < 100)
      ) {
        return false;
      }

      if (!query) return true;
      const guide = SNBT_SUBTEST_MATERIALS[sub.code];
      const lessons = SNBT_CURRICULUM[sub.code];
      const searchable = [
        sub.code,
        sub.name,
        sub.category,
        sub.description,
        ...lessons.map((l) => `${l.title} ${l.chapterTitle} ${l.summary}`),
        ...guide.keyPoints.map((kp) => `${kp.title} ${kp.detail}`),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    }).sort((a, b) => {
      const aReady = subtestMeta[a.code].totalLessons > 0 ? 1 : 0;
      const bReady = subtestMeta[b.code].totalLessons > 0 ? 1 : 0;
      return bReady - aReady;
    });
  }, [categoryFilter, progressFilter, searchQuery, subtestMeta]);

  const availableSubtestCount = useMemo(
    () =>
      SNBT_SUBTESTS.filter((sub) => subtestMeta[sub.code].totalLessons > 0)
        .length,
    [subtestMeta],
  );

  // Active Subtest & Active Sub-Materi Lesson
  const activeLessons: ReadonlyArray<SubMaterialLesson> = useMemo(
    () => (activeSubtest ? SNBT_CURRICULUM[activeSubtest] : []),
    [activeSubtest],
  );

  const activeChapters = useMemo(
    () => (activeSubtest ? getChaptersForSubtest(activeSubtest) : []),
    [activeSubtest],
  );

  const safeLessonIndex =
    activeLessons.length === 0
      ? 0
      : Math.min(activeLessonIndex, activeLessons.length - 1);
  const activeLesson = activeLessons[safeLessonIndex] ?? null;
  const prevLesson =
    safeLessonIndex > 0 ? activeLessons[safeLessonIndex - 1] : null;
  const nextLesson =
    safeLessonIndex < activeLessons.length - 1
      ? activeLessons[safeLessonIndex + 1]
      : null;

  // Questions belonging to the active Sub-Materi Lesson
  const lessonQuestions = useMemo(() => {
    if (!activeSubtest || !activeLesson) return [];
    return questions.filter(
      (q) =>
        q.subtest === activeSubtest && q.topic === activeLesson.topicKey,
    );
  }, [activeLesson, activeSubtest, questions]);

  const filteredQuestions = useMemo(() => {
    return lessonQuestions.filter((q) => {
      if (difficultyFilter !== "ALL" && q.difficulty !== difficultyFilter) {
        return false;
      }
      const sub = submissions[q.id];
      if (statusFilter === "UNANSWERED" && sub) return false;
      if (statusFilter === "CORRECT" && (!sub || !sub.is_correct)) return false;
      if (statusFilter === "WRONG" && (!sub || sub.is_correct)) return false;
      return true;
    });
  }, [difficultyFilter, lessonQuestions, statusFilter, submissions]);

  const safeQuestionIndex =
    filteredQuestions.length === 0
      ? 0
      : Math.min(activeQuestionIndex, filteredQuestions.length - 1);
  const activeQuestion = filteredQuestions[safeQuestionIndex] ?? null;
  const activeSubmission = activeQuestion
    ? submissions[activeQuestion.id]
    : undefined;
  const shownChoice =
    draftChoice ?? activeSubmission?.selected_option ?? null;

  function openSubtestClassroom(code: SnbtSubtestCode) {
    setActiveSubtest(code);
    setActiveLessonIndex(0);
    setClassroomMode("MATERI");
    setDifficultyFilter("ALL");
    setStatusFilter("ALL");
    setActiveQuestionIndex(0);
    setDraftChoice(null);
    setIsTocModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectLesson(index: number, mode: ClassroomMode = "MATERI") {
    const targetLesson = activeLessons[index];
    if (targetLesson) {
      setReadLessonIds((prev) => ({ ...prev, [targetLesson.id]: true }));
    }
    setActiveLessonIndex(index);
    setClassroomMode(mode);
    setDifficultyFilter("ALL");
    setStatusFilter("ALL");
    setActiveQuestionIndex(0);
    setDraftChoice(null);
    setIsTocModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchMode(mode: ClassroomMode, scrollToTop = false) {
    if (mode === "LATIHAN" && activeLesson) {
      setReadLessonIds((prev) => ({ ...prev, [activeLesson.id]: true }));
    }
    setClassroomMode(mode);
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function backToCatalog() {
    setActiveSubtest(null);
    setDraftChoice(null);
    setIsTocModalOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCheckAnswer() {
    if (!activeQuestion || !shownChoice) {
      showToast("Pilih salah satu jawaban (A–E) terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const isCorrect = shownChoice === activeQuestion.correct_option;
      const newSub: PracticeSubmission = {
        id: `${currentUser?.id ?? "guest"}-${activeQuestion.id}`,
        user_id: currentUser?.id ?? "guest",
        question_id: activeQuestion.id,
        selected_option: shownChoice,
        is_correct: isCorrect,
        updated_at: new Date().toISOString(),
      };

      // Save immediately to state & localStorage
      setSubmissions((prev) => {
        const updated = { ...prev, [activeQuestion.id]: newSub };
        saveLocalSubmissions(currentUser?.id, updated);
        return updated;
      });
      setDraftChoice(null);

      // Also sync to Supabase if this question ID exists in remote table
      if (
        currentUser &&
        isSupabaseBrowserConfigured() &&
        remoteQuestionIds.has(activeQuestion.id)
      ) {
        const supabase = getSupabaseClient();
        await supabase.from("practice_submissions").upsert(
          {
            user_id: currentUser.id,
            question_id: activeQuestion.id,
            selected_option: shownChoice,
            is_correct: isCorrect,
            updated_at: newSub.updated_at,
          },
          { onConflict: "user_id,question_id" },
        );
      }

      showToast(
        isCorrect
          ? "Jawaban benar! Pembahasan terbuka."
          : "Masih keliru — cek pembahasan di bawah ya.",
      );
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal menyimpan jawaban."));
    } finally {
      setIsSubmitting(false);
    }
  }

  // =========================================================================
  // VIEW 1: SKILVUL-STYLE CATALOG CARDS BEFORE ENTERING CLASSROOM
  // =========================================================================
  if (!activeSubtest) {
    const hasActiveFilter =
      searchQuery.trim() !== "" ||
      categoryFilter !== "ALL" ||
      progressFilter !== "ALL";

    return (
      <div>
        {/* Full-bleed Navy-Blue Catalog Hero Banner */}
        <section className="relative left-1/2 -mt-6 w-screen -translate-x-1/2 bg-gradient-to-br from-[#17324d] via-[#1c3f63] to-[#2459bd] px-4 py-10 text-white sm:-mt-8 sm:py-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-bold tracking-wide text-[#bfdbfe]">
              Katalog Kelas &amp; Bank Soal Terstruktur
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight text-white sm:text-[34px]">
              Materi &amp; Bank Soal UTBK-SNBT
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#dbeafe]/90 sm:text-base">
              Pilih kelas subtes di bawah untuk mempelajari sub-materi bertahap
              lengkap dengan Daftar Isi dan latihan soal drilling per topik.
            </p>

            {/* Centered Search Bar */}
            <div className="relative mx-auto mt-6 max-w-xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari sub-materi atau subtes (mis. Tanda Baca, Konjungsi, Gagasan Pokok, Main Idea, Inference)..."
                aria-label="Cari materi subtes"
                className="w-full rounded-xl bg-white py-3.5 pr-11 pl-4 text-sm font-medium text-[var(--ink)] shadow-lg outline-none placeholder:text-[#98a2b3] focus:ring-4 focus:ring-white/25"
              />
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[var(--blue)]"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Main 2-Column Catalog Area: Left Filter Sidebar + Right Card Grid */}
        <div className="mt-7 grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_1fr]">
          {/* Left Sidebar Filter */}
          <aside className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs lg:sticky lg:top-[88px]">
            <div>
              <h2 className="text-sm font-extrabold text-[var(--navy)]">
                Kategori
              </h2>
              <div className="mt-2.5 space-y-1">
                {(
                  [
                    { key: "ALL", label: "Semua" },
                    { key: "TPS", label: "TPS (Skolastik)" },
                    { key: "Literasi", label: "Literasi & Penalaran" },
                  ] as const
                ).map((item) => (
                  <FilterCheckRow
                    key={item.key}
                    label={item.label}
                    checked={categoryFilter === item.key}
                    onClick={() => setCategoryFilter(item.key)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-[#eef2f7] pt-4">
              <h2 className="text-sm font-extrabold text-[var(--navy)]">
                Status Belajar
              </h2>
              <div className="mt-2.5 space-y-1">
                {(
                  [
                    { key: "ALL", label: "Semua Status" },
                    { key: "NOT_STARTED", label: "Belum Dimulai" },
                    { key: "IN_PROGRESS", label: "Sedang Dipelajari" },
                    { key: "COMPLETED", label: "Sudah Selesai" },
                  ] as const
                ).map((item) => (
                  <FilterCheckRow
                    key={item.key}
                    label={item.label}
                    checked={progressFilter === item.key}
                    onClick={() => setProgressFilter(item.key)}
                  />
                ))}
              </div>
            </div>

            {hasActiveFilter ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("ALL");
                  setProgressFilter("ALL");
                }}
                className="mt-5 w-full cursor-pointer rounded-lg border border-[var(--border)] bg-[#f8fafc] py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
              >
                Reset Filter
              </button>
            ) : null}
          </aside>

          {/* Right Catalog Grid */}
          <section className="min-w-0">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--navy)] sm:text-xl">
                Kelas Subtes ({availableSubtestCount} Aktif ·{" "}
                {filteredCatalogSubtests.length} Ditampilkan)
              </h2>
              <span className="text-xs font-semibold text-[var(--muted)]">
                Progres: {totalAnsweredAll} / {questions.length} soal
              </span>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
                {errorMessage}
              </div>
            ) : filteredCatalogSubtests.length === 0 ? (
              <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
                Tidak ada materi yang cocok dengan filter pencarianmu.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCatalogSubtests.map((sub) => {
                  const stats = subtestMeta[sub.code];
                  const hasContent =
                    stats.totalLessons > 0 && stats.totalQuestions > 0;
                  const pct =
                    stats.totalQuestions > 0
                      ? Math.round(
                          (stats.answeredQuestions / stats.totalQuestions) *
                            100,
                        )
                      : 0;
                  const isDone = stats.totalQuestions > 0 && pct === 100;

                  return (
                    <article
                      key={sub.code}
                      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e5eaf1] bg-white shadow-2xs transition ${
                        hasContent
                          ? "hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-[0_12px_26px_rgba(23,50,77,0.08)]"
                          : "opacity-80"
                      }`}
                    >
                      <div>
                        <SubtestThumbnail
                          code={sub.code}
                          topRightLabel={
                            !hasContent
                              ? "Segera Hadir"
                              : isDone
                                ? "Selesai"
                                : sub.category
                          }
                        />

                        <div className="p-4 pb-3">
                          <h3 className="line-clamp-2 font-[family-name:var(--font-jakarta)] text-[15px] leading-snug font-extrabold text-[var(--ink)]">
                            {sub.name}
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
                            <VerifiedBadgeIcon />
                            <span>
                              {isLoading
                                ? "Memuat..."
                                : hasContent
                                  ? `${stats.totalLessons} Sub-Materi · ${stats.totalQuestions} Soal`
                                  : "Dalam tahap penyusunan"}
                            </span>
                          </div>

                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                            {sub.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pt-1 pb-4">
                        {hasContent ? (
                          <div className="mb-3">
                            {stats.answeredQuestions === 0 ? (
                              <div className="text-xs font-medium text-[#b4690e]">
                                Belum dimulai
                              </div>
                            ) : (
                              <div className="flex items-center gap-2.5">
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#eef2f6]">
                                  <div
                                    className={`h-full rounded-full transition-all ${
                                      isDone ? "bg-[#147a4b]" : "bg-[#f59e0b]"
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="shrink-0 text-xs font-bold text-[var(--ink)]">
                                  {pct}%
                                </span>
                              </div>
                            )}
                          </div>
                        ) : null}

                        {hasContent ? (
                          <button
                            type="button"
                            onClick={() => openSubtestClassroom(sub.code)}
                            className="w-full cursor-pointer rounded-lg bg-[var(--blue)] py-2.5 text-center text-xs font-bold text-white transition hover:bg-[var(--blue-hover)]"
                          >
                            {stats.answeredQuestions > 0
                              ? "Lanjut Belajar"
                              : "Mulai Kelas"}
                          </button>
                        ) : (
                          <button
                            type="button"
                            disabled
                            className="w-full cursor-not-allowed rounded-lg bg-[#e2e8f0] py-2.5 text-center text-xs font-bold text-[#64748b]"
                          >
                            Segera Hadir
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: SKILVUL-STYLE CLASSROOM (TOP BREADCRUMB BAR + DAFTAR ISI MODAL
  //         + ARTIKEL MATERI SUB-TOPIK + LATIHAN DRILLING + STICKY BOTTOM BAR)
  // =========================================================================
  const subtestInfo = SNBT_SUBTEST_MAP[activeSubtest];
  const stats = subtestMeta[activeSubtest];
  const activeTopicStats = activeLesson
    ? (stats.byTopic[activeLesson.topicKey] ?? {
        total: lessonQuestions.length,
        answered: 0,
        correct: 0,
      })
    : { total: 0, answered: 0, correct: 0 };

  const overallPct =
    stats.totalQuestions > 0
      ? Math.round((stats.answeredQuestions / stats.totalQuestions) * 100)
      : 0;

  return (
    <div className="pb-24">
      {/* =====================================================================
          1. SKILVUL TOP CLASSROOM BAR (SINGLE-ROW BREADCRUMB + PROGRESS + MODE)
         ===================================================================== */}
      <div className="sticky top-[78px] z-20 rounded-xl border border-[#e2e8f0] bg-white/95 px-3.5 py-2 shadow-[0_4px_16px_rgba(23,50,77,0.05)] backdrop-blur-md sm:px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap md:gap-3">
          {/* Left: Back button + Clickable Breadcrumb (Daftar Isi) + Inline Progress */}
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <button
              type="button"
              onClick={backToCatalog}
              title="Kembali ke Katalog Kelas"
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-1.5 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
            >
              <span>‹</span>
              <span className="hidden sm:inline">Katalog</span>
            </button>

            {activeLesson ? (
              <button
                type="button"
                onClick={() => setIsTocModalOpen(true)}
                title="Klik untuk membuka Daftar Isi Sub-Materi"
                aria-label="Buka Daftar Isi Sub-Materi"
                className="group flex min-w-0 cursor-pointer items-center gap-1.5 rounded-lg border border-[#c7daf7] bg-[#eef5ff] px-2.5 py-1.5 text-left text-xs transition hover:border-[var(--blue)] hover:bg-[#e0edff]"
              >
                <span className="shrink-0 font-extrabold text-[var(--blue)]">
                  {subtestInfo.code}
                </span>
                <span className="hidden shrink-0 text-[#94a3b8] xl:inline">
                  ›
                </span>
                <span className="hidden max-w-[160px] shrink truncate font-semibold text-[#475467] xl:inline">
                  {activeLesson.chapterTitle}
                </span>
                <span className="shrink-0 text-[#94a3b8]">›</span>
                <span className="min-w-0 truncate font-extrabold text-[var(--navy)]">
                  {activeLesson.orderNumber}. {activeLesson.title}
                </span>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="ml-0.5 shrink-0 text-[var(--blue)] transition-transform group-hover:translate-y-0.5"
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}

            {activeLesson ? (
              <div
                title={`${stats.answeredQuestions} dari ${stats.totalQuestions} soal selesai`}
                className="hidden shrink-0 items-center gap-2 pl-1 lg:flex"
              >
                <div className="h-2 w-20 overflow-hidden rounded-full bg-[#e2e8f0]">
                  <div
                    className="h-full rounded-full bg-[var(--blue)] transition-all"
                    style={{ width: `${Math.max(overallPct, 4)}%` }}
                  />
                </div>
                <span className="whitespace-nowrap text-xs font-semibold text-[#64748b] tabular-nums">
                  <b className="font-extrabold text-[var(--blue)]">
                    {stats.answeredQuestions}/{stats.totalQuestions}
                  </b>{" "}
                  soal
                </span>
              </div>
            ) : null}
          </div>

          {/* Right: Clean Materi / Latihan Mode Toggle */}
          {activeLesson ? (
            <div className="inline-flex shrink-0 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-0.5">
              <button
                type="button"
                onClick={() => switchMode("MATERI")}
                className={`cursor-pointer rounded-md px-3 py-1 text-xs font-extrabold transition ${
                  classroomMode === "MATERI"
                    ? "bg-[var(--navy)] text-white shadow-2xs"
                    : "text-[#475467] hover:text-[var(--navy)]"
                }`}
              >
                Materi
              </button>
              <button
                type="button"
                onClick={() => switchMode("LATIHAN")}
                className={`cursor-pointer rounded-md px-3 py-1 text-xs font-extrabold tabular-nums transition ${
                  classroomMode === "LATIHAN"
                    ? "bg-[var(--blue)] text-white shadow-2xs"
                    : "text-[#475467] hover:text-[var(--navy)]"
                }`}
              >
                Latihan ({activeTopicStats.answered}/{activeTopicStats.total})
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* =====================================================================
          2. MODAL "DAFTAR ISI | NAMA SUBTES" ALA SKILVUL
         ===================================================================== */}
      {isTocModalOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Daftar Isi ${subtestInfo.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/50 p-4 backdrop-blur-[2px]"
          onClick={() => setIsTocModalOpen(false)}
        >
          <div
            className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#dce4ef] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#eef2f7] px-6 py-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--ink)]">
                  Daftar Isi
                </span>
                <span className="text-[#cbd5e1]">|</span>
                <span className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--blue)]">
                  {subtestInfo.name} ({subtestInfo.code})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsTocModalOpen(false)}
                aria-label="Tutup Daftar Isi"
                className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-[#e2e8f0] bg-white text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[var(--navy)]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Scrollable Chapter & Lesson List */}
            <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
              {activeChapters.map((group) => (
                <div key={group.chapterTitle}>
                  <div className="rounded-lg bg-[#f8fafc] px-3.5 py-2 text-sm font-extrabold text-[var(--blue)]">
                    {group.chapterTitle}
                  </div>

                  <div className="mt-1.5 space-y-1">
                    {group.lessons.map((lesson) => {
                      const idx = activeLessons.findIndex(
                        (item) => item.id === lesson.id,
                      );
                      const isCurrent = idx === safeLessonIndex;
                      const tStat = stats.byTopic[lesson.topicKey] ?? {
                        total: 0,
                        answered: 0,
                        correct: 0,
                      };
                      const isCompleted =
                        tStat.total > 0 && tStat.answered >= tStat.total;
                      const isPartial =
                        !isCompleted &&
                        (tStat.answered > 0 || Boolean(readLessonIds[lesson.id]));

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => selectLesson(idx, "MATERI")}
                          className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left transition ${
                            isCurrent
                              ? "bg-[#eef5ff] font-extrabold text-[var(--navy)]"
                              : "font-medium text-[#334155] hover:bg-[#f8fafc]"
                          }`}
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="w-6 shrink-0 text-sm font-bold text-[#64748b] tabular-nums">
                              {lesson.orderNumber}.
                            </span>
                            <span className="truncate text-sm">
                              {lesson.title}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2.5">
                            <span className="text-xs font-semibold text-[#64748b] tabular-nums">
                              {tStat.answered}/{tStat.total}
                            </span>
                            {isCompleted ? (
                              <CompletedCheckCircle />
                            ) : isPartial ? (
                              <CompletedCheckCircle partial />
                            ) : null}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#eef2f7] bg-[#f8fafc] px-6 py-3 text-xs font-semibold text-[#475467]">
              <span>
                Progres Kelas: <b>{stats.completedLessons}</b> dari{" "}
                <b>{stats.totalLessons}</b> Sub-Materi tuntas
              </span>
              <span>
                Total Latihan: <b>{stats.answeredQuestions}</b> /{" "}
                <b>{stats.totalQuestions}</b> Soal
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* =====================================================================
          3. MAIN CLASSROOM BODY: EMPTY FALLBACK / MODE "MATERI"
         ===================================================================== */}
      {!activeLesson ? (
        <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-2xs">
          <h2 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--navy)]">
            Materi {subtestInfo.name} Belum Tersedia
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Konten sub-materi dan latihan soal untuk subtes ini sedang
            disiapkan dan akan segera ditambahkan.
          </p>
          <button
            type="button"
            onClick={backToCatalog}
            className="mt-5 cursor-pointer rounded-xl bg-[var(--blue)] px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-[var(--blue-hover)]"
          >
            ‹ Kembali ke Katalog Subtes
          </button>
        </div>
      ) : null}

      {classroomMode === "MATERI" && activeLesson ? (
        <article className="mx-auto mt-5 max-w-3xl rounded-2xl border border-[#e5eaf1] bg-white px-5 py-7 shadow-2xs sm:px-10 sm:py-9">
          <div className="text-xs font-semibold text-[#64748b]">
            {activeLesson.chapterTitle} · {activeTopicStats.total} soal latihan
          </div>

          <h1 className="mt-2 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-3xl">
            {activeLesson.orderNumber}. {activeLesson.title}
          </h1>

          {/* Introductory Paragraphs */}
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#334155]">
            {activeLesson.introParagraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Clean Visual Concept Box (distraction-free, no duplicate CTAs) */}
          <div className="my-7 rounded-xl border border-[#dbeafe] bg-[#f8fbff] p-5 text-center sm:p-6">
            <div className="text-[11px] font-extrabold tracking-wider text-[var(--blue)] uppercase">
              {activeLesson.heroConceptTitle}
            </div>
            <div className="mx-auto mt-2.5 max-w-2xl rounded-lg border border-[#bfdbfe] bg-white px-4 py-3 font-mono text-sm font-extrabold text-[var(--navy)] sm:text-base">
              {activeLesson.heroConceptFormula}
            </div>
            <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#475467] sm:text-sm">
              {activeLesson.heroConceptSubtitle}
            </p>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-7 border-t border-[#eef2f7] pt-7">
            {activeLesson.sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--navy)] sm:text-xl">
                  {sec.heading}
                </h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#334155]">
                  {sec.body}
                </p>

                {sec.bullets && sec.bullets.length > 0 ? (
                  <ol className="mt-3.5 list-decimal space-y-2 pl-5 text-[14.5px] leading-relaxed text-[#334155] marker:font-extrabold marker:text-[var(--blue)]">
                    {sec.bullets.map((bullet, idx) => (
                      <li key={idx} className="pl-1">
                        {bullet}
                      </li>
                    ))}
                  </ol>
                ) : null}

                {sec.exampleBox ? (
                  <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-4 sm:grid-cols-2">
                    {sec.exampleBox.wrong ? (
                      <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] p-3">
                        <div className="text-[11px] font-extrabold text-[#b91c1c] uppercase">
                          ✕ Kurang Tepat
                        </div>
                        <p className="mt-1 text-xs leading-relaxed font-medium text-[#7f1d1d] sm:text-sm">
                          {sec.exampleBox.wrong}
                        </p>
                      </div>
                    ) : null}
                    <div className="rounded-lg border border-[#bbf7d0] bg-[#f0fdf4] p-3">
                      <div className="text-[11px] font-extrabold text-[#15803d] uppercase">
                        ✓ Sesuai Kaidah
                      </div>
                      <p className="mt-1 text-xs leading-relaxed font-medium text-[#14532d] sm:text-sm">
                        {sec.exampleBox.right}
                      </p>
                    </div>
                    <div className="text-xs leading-relaxed text-[#475467] sm:col-span-2">
                      <b>Catatan:</b> {sec.exampleBox.note}
                    </div>
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          {/* Exam Tip Callout */}
          <div className="mt-8 rounded-xl border border-[#dbeafe] bg-[#eff6ff] p-4.5 text-sm leading-relaxed text-[var(--navy)]">
            <div className="font-extrabold text-[var(--blue)]">
              Tips Cepat UTBK-SNBT
            </div>
            <p className="mt-1">{activeLesson.examTip}</p>
          </div>
        </article>
      ) : null}

      {/* =====================================================================
          4. MAIN CLASSROOM BODY: MODE "LATIHAN" (FOCUSED DRILLING)
         ===================================================================== */}
      {classroomMode === "LATIHAN" && activeLesson ? (
        <div className="mx-auto mt-5 max-w-5xl space-y-4">
          {/* Lightweight Filter Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-1.5">
              {STATUS_TABS.map((tab) => {
                const active = statusFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setStatusFilter(tab.key);
                      setActiveQuestionIndex(0);
                      setDraftChoice(null);
                    }}
                    className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      active
                        ? "bg-[var(--navy)] text-white"
                        : "border border-[#e2e8f0] bg-white text-[#475467] hover:text-[var(--navy)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <select
              aria-label="Filter kesulitan"
              value={difficultyFilter}
              onChange={(event) => {
                setDifficultyFilter(event.target.value);
                setActiveQuestionIndex(0);
                setDraftChoice(null);
              }}
              className="rounded-lg border border-[#e2e8f0] bg-white px-3 py-1.5 text-xs font-bold text-[var(--ink)] outline-none"
            >
              <option value="ALL">Semua Level</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </select>
          </div>

          {/* Question + Navigator Grid */}
          {isLoading ? (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted)]">
              Memuat latihan soal sub-materi...
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted)]">
              Tidak ada soal pada sub-materi ini yang cocok dengan filter saat
              ini.
            </div>
          ) : activeQuestion ? (
            <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_256px]">
              {/* Active Question Card */}
              <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xs">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3">
                    <span className="text-xs font-extrabold text-[var(--navy)]">
                      Soal {safeQuestionIndex + 1} dari{" "}
                      {filteredQuestions.length}
                    </span>
                    <span className="rounded-full border border-[var(--border)] bg-[#f8fafc] px-2.5 py-0.5 text-[11px] font-bold text-[#475467]">
                      {activeQuestion.difficulty}
                    </span>
                  </div>

                  <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed font-medium text-[var(--ink)]">
                    {activeQuestion.question_text}
                  </p>

                  <div className="mt-5 grid gap-2.5">
                    {OPTION_KEYS.map((letter) => {
                      const isSelected = shownChoice === letter;
                      const isSubmitted = Boolean(activeSubmission);
                      const isCorrectKey =
                        isSubmitted && letter === activeQuestion.correct_option;
                      const isWrongUserPick =
                        isSubmitted &&
                        activeSubmission?.selected_option === letter &&
                        !activeSubmission.is_correct;

                      let optionClasses =
                        "border-[var(--border)] bg-white hover:border-[#b7cce6] hover:bg-[#fafcff]";
                      if (isCorrectKey) {
                        optionClasses =
                          "border-[#147a4b] bg-[#ecfdf3] text-[#115e3b]";
                      } else if (isWrongUserPick) {
                        optionClasses =
                          "border-[#d92d20] bg-[#fef3f2] text-[#912018]";
                      } else if (isSelected) {
                        optionClasses =
                          "border-[var(--blue)] bg-[var(--blue-soft)]/70 text-[var(--navy)]";
                      }

                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => setDraftChoice(letter)}
                          className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition ${optionClasses}`}
                        >
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-xs font-extrabold">
                            {letter}
                          </span>
                          <span className="min-w-0 break-words leading-relaxed">
                            {getOptionText(activeQuestion, letter)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Check Answer & Question Prev/Next Controls */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-2.5 border-t border-[#eef2f7] pt-4">
                    <button
                      type="button"
                      disabled={safeQuestionIndex === 0}
                      onClick={() => {
                        setActiveQuestionIndex((prev) => Math.max(0, prev - 1));
                        setDraftChoice(null);
                      }}
                      className="cursor-pointer rounded-xl border border-[#dce4ef] bg-[#f8fafc] px-4 py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ‹ Sebelumnya
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting || !shownChoice}
                      onClick={() => void handleCheckAnswer()}
                      className="cursor-pointer rounded-xl bg-[var(--blue)] px-5 py-2 text-center text-xs font-extrabold text-white shadow-2xs transition hover:bg-[var(--blue-hover)] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    >
                      {isSubmitting
                        ? "Memeriksa..."
                        : activeSubmission
                          ? "Periksa Ulang"
                          : "Periksa Jawaban"}
                    </button>

                    <button
                      type="button"
                      disabled={
                        safeQuestionIndex >= filteredQuestions.length - 1
                      }
                      onClick={() => {
                        setActiveQuestionIndex((prev) =>
                          Math.min(filteredQuestions.length - 1, prev + 1),
                        );
                        setDraftChoice(null);
                      }}
                      className="cursor-pointer rounded-xl border border-[#dce4ef] bg-[#f8fafc] px-4 py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Berikutnya ›
                    </button>
                  </div>

                  {/* Explanation Box */}
                  {activeSubmission ? (
                    <div
                      className={`mt-5 rounded-xl border p-4.5 ${
                        activeSubmission.is_correct
                          ? "border-[#b7e4c7] bg-[#f2fbf6]"
                          : "border-[#fed7aa] bg-[#fffaf0]"
                      }`}
                    >
                      <b
                        className={`text-sm font-extrabold ${
                          activeSubmission.is_correct
                            ? "text-[#147a4b]"
                            : "text-[#b45309]"
                        }`}
                      >
                        {activeSubmission.is_correct
                          ? "✓ Jawaban Kamu Benar!"
                          : `✕ Jawaban Kamu (${activeSubmission.selected_option}) Belum Tepat · Kunci: ${activeQuestion.correct_option}`}
                      </b>
                      <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--ink)]">
                        {activeQuestion.explanation}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Right Sidebar: Sticky Question Number Navigator */}
              <aside className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs lg:sticky lg:top-[136px]">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-extrabold text-[var(--navy)]">
                    Navigasi Soal
                  </div>
                  <span className="text-xs font-extrabold text-[var(--blue)] tabular-nums">
                    {activeTopicStats.answered}/{activeTopicStats.total}
                  </span>
                </div>
                <div className="mt-1 text-xs text-[var(--muted)]">
                  Hijau: Benar · Merah: Salah
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {filteredQuestions.map((item, idx) => {
                    const sub = submissions[item.id];
                    const isCurrent = idx === safeQuestionIndex;
                    let pillStyle =
                      "border-[var(--border)] bg-white text-[var(--ink)]";
                    if (sub?.is_correct) {
                      pillStyle =
                        "border-[#147a4b] bg-[#ecfdf3] text-[#147a4b]";
                    } else if (sub && !sub.is_correct) {
                      pillStyle =
                        "border-[#d92d20] bg-[#fef3f2] text-[#d92d20]";
                    }

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveQuestionIndex(idx);
                          setDraftChoice(null);
                        }}
                        className={`h-9 cursor-pointer rounded-lg border text-xs font-extrabold transition ${pillStyle} ${
                          isCurrent
                            ? "ring-2 ring-[var(--blue)] ring-offset-1"
                            : ""
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </aside>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* =====================================================================
          5. SKILVUL STICKY BOTTOM CLASSROOM BAR (PREV | CTA | NEXT)
         ===================================================================== */}
      {activeLesson ? (
        <div className="fixed right-0 bottom-0 left-0 z-30 border-t border-white/15 bg-gradient-to-r from-[#17324d] via-[#1d3f63] to-[#2459bd] px-4 py-2.5 text-white shadow-[0_-8px_24px_rgba(15,23,42,0.18)] sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
            {/* Left: Previous Sub-Materi */}
            <div className="min-w-0 flex-1">
              {prevLesson ? (
                <button
                  type="button"
                  onClick={() => selectLesson(safeLessonIndex - 1, "MATERI")}
                  className="inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-left text-xs font-extrabold text-white transition hover:bg-white/10 sm:text-sm"
                >
                  <span className="shrink-0">‹</span>
                  <span className="truncate">{prevLesson.title}</span>
                </button>
              ) : null}
            </div>

            {/* Center: Prominent Mode Switch CTA */}
            <div className="shrink-0">
              {classroomMode === "MATERI" ? (
                <button
                  type="button"
                  onClick={() => switchMode("LATIHAN", true)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-extrabold text-[var(--navy)] shadow-md transition hover:bg-[#eff6ff] sm:px-6 sm:text-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[var(--blue)]"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  <span>Mulai Latihan ({activeTopicStats.total} Soal)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => switchMode("MATERI", true)}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-extrabold text-[var(--navy)] shadow-md transition hover:bg-[#eff6ff] sm:px-6 sm:text-sm"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="text-[var(--blue)]"
                  >
                    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Zm0 0V19a2 2 0 0 1 2-2h14" />
                  </svg>
                  <span>Baca Materi</span>
                </button>
              )}
            </div>

            {/* Right: Next Sub-Materi or Finish */}
            <div className="flex min-w-0 flex-1 justify-end">
              {nextLesson ? (
                <button
                  type="button"
                  onClick={() => selectLesson(safeLessonIndex + 1, "MATERI")}
                  className="inline-flex max-w-full cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-right text-xs font-extrabold text-white transition hover:bg-white/10 sm:text-sm"
                >
                  <span className="truncate">{nextLesson.title}</span>
                  <span className="shrink-0">›</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={backToCatalog}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-extrabold text-white/90 transition hover:bg-white/10 sm:text-sm"
                >
                  <span>Selesai · Katalog</span>
                  <span>›</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
