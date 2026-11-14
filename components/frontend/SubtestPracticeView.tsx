"use client";

import { useEffect, useMemo, useState } from "react";
import { SNBT_SUBTEST_MAP, SNBT_SUBTESTS } from "@/lib/progress-utils";
import { SNBT_SUBTEST_MATERIALS } from "@/lib/subtest-materials";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
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
  { key: "ALL", label: "Semua Soal" },
  { key: "UNANSWERED", label: "Belum Dikerjakan" },
  { key: "CORRECT", label: "Sudah Benar" },
  { key: "WRONG", label: "Perlu Review" },
] as const;

type CategoryFilter = "ALL" | "TPS" | "Literasi";
type ProgressFilter = "ALL" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

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

export function SubtestPracticeView() {
  const { currentUser, markSchemaNeedsMigration, showToast } = useNassy();

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
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

  // View 2 (Material + Question classroom) state
  const [showMaterialGuide, setShowMaterialGuide] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "UNANSWERED" | "CORRECT" | "WRONG"
  >("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [draftChoice, setDraftChoice] = useState<OptionLetter | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchPracticeData() {
      if (!currentUser || !isSupabaseBrowserConfigured()) {
        if (active) setIsLoading(false);
        return;
      }

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

        if (!active) return;
        if (qRes.error) throw qRes.error;
        if (sRes.error) throw sRes.error;

        setQuestions((qRes.data as PracticeQuestion[]) ?? []);

        const subMap: Record<string, PracticeSubmission> = {};
        for (const item of (sRes.data as PracticeSubmission[]) ?? []) {
          subMap[item.question_id] = item;
        }
        setSubmissions(subMap);
        setErrorMessage(null);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
          setErrorMessage(
            "Tabel soal latihan 7 subtes belum tersedia di Supabase. Jalankan file migrasi SQL terlebih dahulu.",
          );
        } else {
          setErrorMessage(getErrorMessage(error, "Gagal memuat bank soal."));
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchPracticeData();

    return () => {
      active = false;
    };
  }, [currentUser, markSchemaNeedsMigration]);

  const subtestMeta = useMemo(() => {
    const map: Record<
      SnbtSubtestCode,
      {
        total: number;
        answered: number;
        correct: number;
        topics: string[];
      }
    > = {
      PK: { total: 0, answered: 0, correct: 0, topics: [] },
      PM: { total: 0, answered: 0, correct: 0, topics: [] },
      PU: { total: 0, answered: 0, correct: 0, topics: [] },
      PPU: { total: 0, answered: 0, correct: 0, topics: [] },
      LBI: { total: 0, answered: 0, correct: 0, topics: [] },
      LBE: { total: 0, answered: 0, correct: 0, topics: [] },
      PBM: { total: 0, answered: 0, correct: 0, topics: [] },
    };

    const topicSets: Record<SnbtSubtestCode, Set<string>> = {
      PK: new Set(),
      PM: new Set(),
      PU: new Set(),
      PPU: new Set(),
      LBI: new Set(),
      LBE: new Set(),
      PBM: new Set(),
    };

    for (const q of questions) {
      const bucket = map[q.subtest];
      if (!bucket) continue;
      bucket.total += 1;
      if (q.topic) topicSets[q.subtest].add(q.topic);
      const sub = submissions[q.id];
      if (sub) {
        bucket.answered += 1;
        if (sub.is_correct) bucket.correct += 1;
      }
    }

    for (const code of Object.keys(map) as SnbtSubtestCode[]) {
      map[code].topics = Array.from(topicSets[code]);
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
      const pct =
        stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;

      if (progressFilter === "NOT_STARTED" && stats.answered > 0) return false;
      if (
        progressFilter === "IN_PROGRESS" &&
        (stats.answered === 0 || pct >= 100)
      ) {
        return false;
      }
      if (progressFilter === "COMPLETED" && (stats.total === 0 || pct < 100)) {
        return false;
      }

      if (!query) return true;
      const guide = SNBT_SUBTEST_MATERIALS[sub.code];
      const searchable = [
        sub.code,
        sub.name,
        sub.category,
        sub.description,
        ...stats.topics,
        ...guide.keyPoints.map((kp) => `${kp.title} ${kp.detail}`),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(query);
    });
  }, [categoryFilter, progressFilter, searchQuery, subtestMeta]);

  const activeTopics = useMemo(
    () => (activeSubtest ? subtestMeta[activeSubtest].topics : []),
    [activeSubtest, subtestMeta],
  );

  const filteredQuestions = useMemo(() => {
    if (!activeSubtest) return [];
    return questions.filter((q) => {
      if (q.subtest !== activeSubtest) return false;
      if (selectedTopic !== "ALL" && q.topic !== selectedTopic) return false;
      if (difficultyFilter !== "ALL" && q.difficulty !== difficultyFilter) {
        return false;
      }
      const sub = submissions[q.id];
      if (statusFilter === "UNANSWERED" && sub) return false;
      if (statusFilter === "CORRECT" && (!sub || !sub.is_correct)) return false;
      if (statusFilter === "WRONG" && (!sub || sub.is_correct)) return false;
      return true;
    });
  }, [
    activeSubtest,
    difficultyFilter,
    questions,
    selectedTopic,
    statusFilter,
    submissions,
  ]);

  const safeIndex =
    filteredQuestions.length === 0
      ? 0
      : Math.min(activeIndex, filteredQuestions.length - 1);
  const activeQuestion = filteredQuestions[safeIndex] ?? null;
  const activeSubmission = activeQuestion
    ? submissions[activeQuestion.id]
    : undefined;
  const shownChoice =
    draftChoice ?? activeSubmission?.selected_option ?? null;

  function openSubtestClassroom(code: SnbtSubtestCode) {
    setActiveSubtest(code);
    setSelectedTopic("ALL");
    setDifficultyFilter("ALL");
    setStatusFilter("ALL");
    setActiveIndex(0);
    setDraftChoice(null);
    setShowMaterialGuide(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToCatalog() {
    setActiveSubtest(null);
    setDraftChoice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCheckAnswer() {
    if (!currentUser || !activeQuestion || !shownChoice) {
      showToast("Pilih salah satu jawaban (A–E) terlebih dahulu.");
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = getSupabaseClient();
      const isCorrect = shownChoice === activeQuestion.correct_option;
      const { data, error } = await supabase
        .from("practice_submissions")
        .upsert(
          {
            user_id: currentUser.id,
            question_id: activeQuestion.id,
            selected_option: shownChoice,
            is_correct: isCorrect,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,question_id" },
        )
        .select("*")
        .single();

      if (error) throw error;

      const saved = data as PracticeSubmission;
      setSubmissions((prev) => ({
        ...prev,
        [activeQuestion.id]: saved,
      }));
      setDraftChoice(null);
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
  // VIEW 1: SKILVUL-STYLE CATALOG CARDS BEFORE ENTERING MATERIAL + QUESTIONS
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
              Katalog Materi
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold tracking-tight text-white sm:text-[34px]">
              Materi &amp; Bank Soal UTBK-SNBT
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#dbeafe]/90 sm:text-base">
              Pilih kartu subtes di bawah untuk mempelajari ringkasan materi,
              topik penting, lalu berlatih soal beserta pembahasannya.
            </p>

            {/* Centered Search Bar */}
            <div className="relative mx-auto mt-6 max-w-xl">
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Cari materi atau subtes (mis. Kuantitatif, Silogisme, LBI)..."
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
                Materi 7 Subtes ({filteredCatalogSubtests.length})
              </h2>
              <span className="text-xs font-semibold text-[var(--muted)]">
                Total terjawab: {totalAnsweredAll} / {questions.length} soal
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
                  const pct =
                    stats.total > 0
                      ? Math.round((stats.answered / stats.total) * 100)
                      : 0;
                  const isDone = stats.total > 0 && pct === 100;

                  return (
                    <article
                      key={sub.code}
                      className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e5eaf1] bg-white shadow-2xs transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-[0_12px_26px_rgba(23,50,77,0.08)]"
                    >
                      <div>
                        <SubtestThumbnail
                          code={sub.code}
                          topRightLabel={isDone ? "Selesai" : sub.category}
                        />

                        <div className="p-4 pb-3">
                          <h3 className="line-clamp-2 font-[family-name:var(--font-jakarta)] text-[15px] leading-snug font-extrabold text-[var(--ink)]">
                            {sub.name}
                          </h3>

                          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[var(--muted)]">
                            <VerifiedBadgeIcon />
                            <span>
                              {sub.code} ·{" "}
                              {isLoading
                                ? "Memuat soal..."
                                : `${stats.total} Soal`}
                            </span>
                          </div>

                          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                            {sub.description}
                          </p>
                        </div>
                      </div>

                      <div className="px-4 pt-1 pb-4">
                        <div className="mb-3">
                          {stats.answered === 0 ? (
                            <div className="text-xs font-medium text-[#b4690e]">
                              Kamu belum mulai materi ini
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

                        <button
                          type="button"
                          onClick={() => openSubtestClassroom(sub.code)}
                          className="w-full cursor-pointer rounded-lg bg-[var(--blue)] py-2.5 text-center text-xs font-bold text-white transition hover:bg-[var(--blue-hover)]"
                        >
                          {stats.answered > 0
                            ? "Lanjut Materi & Soal"
                            : "Masuk Materi & Soal"}
                        </button>
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
  // VIEW 2: CLASSROOM MODE (MATERI + SOAL INTERAKTIF)
  // =========================================================================
  const subtestInfo = SNBT_SUBTEST_MAP[activeSubtest];
  const materialGuide = SNBT_SUBTEST_MATERIALS[activeSubtest];
  const stats = subtestMeta[activeSubtest];
  const progressPct =
    stats.total > 0 ? Math.round((stats.answered / stats.total) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb & Subtest Progress Bar */}
      <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs sm:p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="min-w-0">
            <button
              type="button"
              onClick={backToCatalog}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-1.5 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
            >
              ‹ Kembali ke Katalog Materi
            </button>

            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-[var(--blue-soft)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--blue)]">
                {subtestInfo.code}
              </span>
              <h1 className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--navy)] sm:text-2xl">
                {subtestInfo.name}
              </h1>
            </div>
            <p className="mt-1 text-xs text-[var(--muted)] sm:text-sm">
              {subtestInfo.description}
            </p>
          </div>

          <div className="w-full shrink-0 md:w-64">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--navy)]">
              <span>Progres Latihan</span>
              <span>
                {stats.answered}/{stats.total} Soal ({progressPct}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#eef2f6]">
              <div
                className="h-full rounded-full bg-[var(--blue)] transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Material & Concepts Summary Card */}
      <section className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold tracking-wide text-[var(--blue)] uppercase">
              Materi &amp; Konsep Inti
            </div>
            <h2 className="mt-0.5 font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--navy)] sm:text-lg">
              Ringkasan Materi {subtestInfo.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowMaterialGuide((prev) => !prev)}
            className="cursor-pointer rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-1.5 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)]"
          >
            {showMaterialGuide ? "Tutup Ringkasan" : "Buka Ringkasan"}
          </button>
        </div>

        {showMaterialGuide ? (
          <div className="mt-4 space-y-4 border-t border-[#eef2f7] pt-4">
            <p className="text-sm leading-relaxed text-[#475467]">
              {materialGuide.overview}
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {materialGuide.keyPoints.map((point, idx) => (
                <div
                  key={point.title}
                  className="rounded-xl border border-[#e5eaf1] bg-[#f8fafd] p-4"
                >
                  <div className="text-xs font-extrabold text-[var(--blue)]">
                    0{idx + 1}. {point.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#475467] sm:text-sm">
                    {point.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[#cde1ff] bg-[#f0f6ff] px-4 py-3 text-xs leading-relaxed text-[var(--navy)] sm:text-sm">
              <b>Tips Ujian:</b> {materialGuide.quickTip}
            </div>
          </div>
        ) : null}

        {/* Topic Filter Pills */}
        {activeTopics.length > 0 ? (
          <div className="mt-4 border-t border-[#eef2f7] pt-4">
            <div className="mb-2 text-xs font-bold text-[var(--muted)]">
              Filter berdasarkan topik soal:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setSelectedTopic("ALL");
                  setActiveIndex(0);
                  setDraftChoice(null);
                }}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  selectedTopic === "ALL"
                    ? "bg-[var(--navy)] text-white"
                    : "bg-[#f4f7fb] text-[var(--muted)] hover:text-[var(--navy)]"
                }`}
              >
                Semua Topik ({stats.total})
              </button>
              {activeTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(topic);
                    setActiveIndex(0);
                    setDraftChoice(null);
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    selectedTopic === topic
                      ? "bg-[var(--blue)] text-white"
                      : "bg-[#f4f7fb] text-[var(--muted)] hover:text-[var(--navy)]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Practice Filters Bar */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setStatusFilter(tab.key);
                  setActiveIndex(0);
                  setDraftChoice(null);
                }}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  active
                    ? "bg-[var(--navy)] text-white"
                    : "bg-[#f4f7fb] text-[var(--muted)] hover:text-[var(--navy)]"
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
            setActiveIndex(0);
            setDraftChoice(null);
          }}
          className="w-full rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--ink)] outline-none sm:w-auto"
        >
          <option value="ALL">Semua Level</option>
          <option value="Mudah">Mudah</option>
          <option value="Sedang">Sedang</option>
          <option value="Sulit">Sulit</option>
        </select>
      </div>

      {/* Questions + Navigator Classroom Grid */}
      {isLoading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted)]">
          Memuat latihan soal...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-10 text-center text-sm text-[var(--muted)]">
          Tidak ada soal yang cocok dengan filter saat ini.
        </div>
      ) : activeQuestion ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_256px]">
          {/* Active Question Classroom Container */}
          <div className="min-w-0 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-2xs">
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--blue-soft)] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                    {activeQuestion.subtest}
                  </span>
                  <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-bold text-[var(--navy)]">
                    {activeQuestion.topic}
                  </span>
                  <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                    {activeQuestion.difficulty}
                  </span>
                </div>
                <span className="text-xs font-extrabold text-[var(--muted)]">
                  Soal {safeIndex + 1} dari {filteredQuestions.length}
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

              {activeSubmission ? (
                <div
                  className={`mt-5 rounded-xl border p-4.5 ${
                    activeSubmission.is_correct
                      ? "border-[#b7e4c7] bg-[#f2fbf6]"
                      : "border-[#fed7aa] bg-[#fffaf0]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
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
                    <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--navy)]">
                      Pembahasan Lengkap
                    </span>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--ink)]">
                    {activeQuestion.explanation}
                  </p>
                </div>
              ) : null}
            </div>

            {/* Classroom Bottom Control Bar */}
            <div className="flex flex-col items-stretch justify-between gap-2.5 bg-[var(--navy)] px-4 py-3 text-white sm:flex-row sm:items-center sm:px-6">
              <button
                type="button"
                disabled={safeIndex === 0}
                onClick={() => {
                  setActiveIndex((prev) => Math.max(0, prev - 1));
                  setDraftChoice(null);
                }}
                className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹ Sebelumnya
              </button>

              <button
                type="button"
                disabled={isSubmitting || !shownChoice}
                onClick={() => void handleCheckAnswer()}
                className="cursor-pointer rounded-full bg-white px-5 py-2.5 text-center text-xs font-extrabold text-[var(--navy)] shadow-sm transition hover:bg-[var(--blue-soft)] disabled:cursor-not-allowed disabled:opacity-55 sm:text-sm"
              >
                {isSubmitting
                  ? "Memeriksa..."
                  : activeSubmission
                    ? "Cek Ulang Jawaban"
                    : "Periksa Jawaban & Buka Pembahasan"}
              </button>

              <button
                type="button"
                disabled={safeIndex >= filteredQuestions.length - 1}
                onClick={() => {
                  setActiveIndex((prev) =>
                    Math.min(filteredQuestions.length - 1, prev + 1),
                  );
                  setDraftChoice(null);
                }}
                className="cursor-pointer rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya ›
              </button>
            </div>
          </div>

          {/* Question Navigator Card */}
          <aside className="self-start rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs">
            <div className="text-sm font-extrabold text-[var(--navy)]">
              Navigasi Nomor Soal
            </div>
            <div className="mt-1 text-xs text-[var(--muted)]">
              Hijau: Benar · Merah: Salah
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2">
              {filteredQuestions.map((item, idx) => {
                const sub = submissions[item.id];
                const isCurrent = idx === safeIndex;
                let pillStyle =
                  "border-[var(--border)] bg-white text-[var(--ink)]";
                if (sub?.is_correct) {
                  pillStyle = "border-[#147a4b] bg-[#ecfdf3] text-[#147a4b]";
                } else if (sub && !sub.is_correct) {
                  pillStyle = "border-[#d92d20] bg-[#fef3f2] text-[#d92d20]";
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveIndex(idx);
                      setDraftChoice(null);
                    }}
                    className={`h-9 cursor-pointer rounded-lg border text-xs font-extrabold transition ${pillStyle} ${
                      isCurrent ? "ring-2 ring-[var(--blue)] ring-offset-1" : ""
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
  );
}
