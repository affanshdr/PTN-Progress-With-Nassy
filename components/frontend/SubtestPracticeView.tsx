"use client";

import { useEffect, useMemo, useState } from "react";
import { SNBT_SUBTEST_MAP, SNBT_SUBTESTS } from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type {
  OptionLetter,
  PracticeQuestion,
  PracticeSubmission,
  SnbtSubtestCode,
} from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

const OPTION_KEYS: readonly OptionLetter[] = ["A", "B", "C", "D", "E"];

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

export function SubtestPracticeView() {
  const { currentUser, markSchemaNeedsMigration, showToast } = useNassy();

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [submissions, setSubmissions] = useState<
    Record<string, PracticeSubmission>
  >({});
  const [selectedSubtest, setSelectedSubtest] = useState<
    SnbtSubtestCode | "ALL"
  >("PK");
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

  const subtestStats = useMemo(() => {
    const map: Record<
      SnbtSubtestCode,
      { total: number; answered: number; correct: number }
    > = {
      PK: { total: 0, answered: 0, correct: 0 },
      PM: { total: 0, answered: 0, correct: 0 },
      PU: { total: 0, answered: 0, correct: 0 },
      PPU: { total: 0, answered: 0, correct: 0 },
      LBI: { total: 0, answered: 0, correct: 0 },
      LBE: { total: 0, answered: 0, correct: 0 },
      PBM: { total: 0, answered: 0, correct: 0 },
    };

    for (const q of questions) {
      const bucket = map[q.subtest];
      if (!bucket) continue;
      bucket.total += 1;
      const sub = submissions[q.id];
      if (sub) {
        bucket.answered += 1;
        if (sub.is_correct) bucket.correct += 1;
      }
    }
    return map;
  }, [questions, submissions]);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedSubtest !== "ALL" && q.subtest !== selectedSubtest) {
        return false;
      }
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
    questions,
    submissions,
    selectedSubtest,
    difficultyFilter,
    statusFilter,
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

  function selectSubtest(code: SnbtSubtestCode | "ALL") {
    setSelectedSubtest(code);
    setActiveIndex(0);
    setDraftChoice(null);
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

  return (
    <div className="space-y-5">
      {/* 7 Subtes Selector */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => selectSubtest("ALL")}
          className={`cursor-pointer rounded-2xl border p-3.5 text-left transition ${
            selectedSubtest === "ALL"
              ? "border-[var(--blue)] bg-[var(--blue-soft)]/70"
              : "border-[var(--border)] bg-white hover:border-[#ccd7e6]"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-md bg-[var(--navy)] px-2 py-0.5 text-[11px] font-extrabold text-white">
              SEMUA
            </span>
            <span className="text-xs font-bold text-[#147a4b]">GRATIS</span>
          </div>
          <div className="mt-2 text-sm font-bold text-[var(--ink)]">
            Semua 7 Subtes
          </div>
          <div className="mt-0.5 text-xs text-[var(--muted)]">
            {questions.length} soal tersedia
          </div>
        </button>

        {SNBT_SUBTESTS.map((sub) => {
          const stats = subtestStats[sub.code];
          const isSelected = selectedSubtest === sub.code;
          return (
            <button
              key={sub.code}
              type="button"
              onClick={() => selectSubtest(sub.code)}
              className={`cursor-pointer rounded-2xl border p-3.5 text-left transition ${
                isSelected
                  ? "border-[var(--blue)] bg-[var(--blue-soft)]/70"
                  : "border-[var(--border)] bg-white hover:border-[#ccd7e6]"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[var(--blue-soft)] px-2 py-0.5 text-[11px] font-extrabold text-[var(--blue)]">
                  {sub.code}
                </span>
                <span className="text-[11px] font-semibold text-[var(--muted)]">
                  {stats.answered}/{stats.total}
                </span>
              </div>
              <div className="mt-2 line-clamp-1 text-sm font-bold text-[var(--ink)]">
                {sub.name}
              </div>
              <div className="mt-0.5 text-xs text-[var(--muted)]">
                {stats.answered > 0
                  ? `Benar ${stats.correct}/${stats.answered}`
                  : sub.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
        <div>
          <div className="text-sm font-bold text-[var(--ink)]">
            {selectedSubtest === "ALL"
              ? "Semua Subtes SNBT (PK, PM, PU, PPU, LBI, LBE, PBM)"
              : `${selectedSubtest} — ${SNBT_SUBTEST_MAP[selectedSubtest].name}`}
          </div>
          <div className="text-xs text-[var(--muted)]">
            {selectedSubtest === "ALL"
              ? "Pilih soal di bawah untuk berlatih dan melihat pembahasan lengkap."
              : SNBT_SUBTEST_MAP[selectedSubtest].description}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Filter kesulitan"
            value={difficultyFilter}
            onChange={(event) => {
              setDifficultyFilter(event.target.value);
              setActiveIndex(0);
              setDraftChoice(null);
            }}
            className="rounded-[10px] border border-[var(--border)] bg-white px-3 py-2 text-xs font-bold text-[var(--ink)] outline-none"
          >
            <option value="ALL">Semua Level</option>
            <option value="Mudah">Mudah</option>
            <option value="Sedang">Sedang</option>
            <option value="Sulit">Sulit</option>
          </select>

          <select
            aria-label="Filter status"
            value={statusFilter}
            onChange={(event) => {
              setStatusFilter(
                event.target.value as "ALL" | "UNANSWERED" | "CORRECT" | "WRONG",
              );
              setActiveIndex(0);
              setDraftChoice(null);
            }}
            className="rounded-[10px] border border-[var(--border)] bg-white px-3 py-2 text-xs font-bold text-[var(--ink)] outline-none"
          >
            <option value="ALL">Semua Status</option>
            <option value="UNANSWERED">Belum Dikerjakan</option>
            <option value="CORRECT">Sudah Benar</option>
            <option value="WRONG">Perlu Review</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat bank soal 7 subtes...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
      ) : filteredQuestions.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Tidak ada soal yang cocok dengan filter saat ini.
        </div>
      ) : activeQuestion ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_250px]">
          {/* Active Question Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-[var(--blue-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--blue)]">
                  {activeQuestion.subtest}
                </span>
                <span className="rounded-md bg-[#f1f5f9] px-2.5 py-1 text-xs font-bold text-[var(--navy)]">
                  {activeQuestion.topic}
                </span>
                <span className="rounded-md border border-[var(--border)] px-2.5 py-1 text-xs font-semibold text-[var(--muted)]">
                  {activeQuestion.difficulty}
                </span>
              </div>
              <span className="text-xs font-bold text-[var(--muted)]">
                Soal {safeIndex + 1} dari {filteredQuestions.length}
              </span>
            </div>

            <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed font-medium text-[var(--ink)]">
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
                  "border-[var(--border)] bg-white hover:border-[#c3d2e8]";
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
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition ${optionClasses}`}
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-xs font-extrabold">
                      {letter}
                    </span>
                    <span className="leading-relaxed">
                      {getOptionText(activeQuestion, letter)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={safeIndex === 0}
                  onClick={() => {
                    setActiveIndex((prev) => Math.max(0, prev - 1));
                    setDraftChoice(null);
                  }}
                  className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-bold text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  ← Sebelumnya
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
                  className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-bold text-[var(--navy)] disabled:cursor-not-allowed disabled:opacity-45"
                >
                  Berikutnya →
                </button>
              </div>

              <button
                type="button"
                disabled={isSubmitting || !shownChoice}
                onClick={() => void handleCheckAnswer()}
                className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4.5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-55"
              >
                {isSubmitting
                  ? "Memeriksa..."
                  : activeSubmission
                    ? "Cek Ulang Jawaban"
                    : "Periksa Jawaban & Buka Pembahasan"}
              </button>
            </div>

            {activeSubmission ? (
              <div
                className={`mt-5 rounded-2xl border p-4.5 ${
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
                  <span className="text-xs font-bold text-[var(--muted)]">
                    Pembahasan
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-[var(--ink)]">
                  {activeQuestion.explanation}
                </p>
              </div>
            ) : null}
          </div>

          {/* Question Navigator */}
          <aside className="rounded-2xl border border-[var(--border)] bg-white p-4 self-start">
            <div className="text-sm font-bold text-[var(--ink)]">
              Navigasi Soal
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
                      isCurrent ? "ring-2 ring-[var(--blue)]" : ""
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
