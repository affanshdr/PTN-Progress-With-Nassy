"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  formatSecondsAsClock,
  SNBT_SUBTEST_MAP,
  SNBT_SUBTESTS,
} from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type {
  OptionLetter,
  TryoutAttempt,
  TryoutCatalogItem,
  TryoutQuestionClient,
  TryoutReviewItem,
} from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

const OPTION_KEYS: readonly OptionLetter[] = ["A", "B", "C", "D", "E"];

function getOptionText(
  q: TryoutQuestionClient | TryoutReviewItem,
  letter: OptionLetter,
): string {
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

interface DraftPayload {
  answers: Record<string, OptionLetter>;
  flaggedIds: string[];
  startedAtMs: number;
}

export function TryoutRoomView({ tryoutId }: { tryoutId: string }) {
  const { currentUser, markSchemaNeedsMigration, showToast } = useNassy();

  const [tryout, setTryout] = useState<TryoutCatalogItem | null>(null);
  const [questions, setQuestions] = useState<TryoutQuestionClient[]>([]);
  const [attempt, setAttempt] = useState<TryoutAttempt | null>(null);
  const [reviewItems, setReviewItems] = useState<TryoutReviewItem[]>([]);

  const [answers, setAnswers] = useState<Record<string, OptionLetter>>({});
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"ALL" | "WRONG">("ALL");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const startedAtMsRef = useRef<number>(0);
  const autoSubmitFiredRef = useRef(false);

  const draftKey = currentUser
    ? `nassy_tryout_draft_${currentUser.id}_${tryoutId}`
    : null;

  useEffect(() => {
    let active = true;

    async function fetchRoom() {
      if (!currentUser || !isSupabaseBrowserConfigured()) {
        if (active) setIsLoading(false);
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const { data: catalogData, error: catalogError } = await supabase.rpc(
          "get_tryout_catalog",
        );
        if (!active) return;
        if (catalogError) throw catalogError;

        const foundTryout =
          ((catalogData as TryoutCatalogItem[]) ?? []).find(
            (item) => item.id === tryoutId,
          ) ?? null;

        if (!foundTryout) {
          setErrorMessage("Paket tryout tidak ditemukan.");
          return;
        }
        setTryout(foundTryout);

        const { data: attemptData, error: attemptError } = await supabase
          .from("tryout_attempts")
          .select("*")
          .eq("tryout_id", tryoutId)
          .eq("user_id", currentUser.id)
          .maybeSingle();

        if (!active) return;
        if (attemptError) throw attemptError;

        if (attemptData) {
          const existingAttempt = attemptData as TryoutAttempt;
          setAttempt(existingAttempt);

          const { data: reviewData, error: reviewError } = await supabase.rpc(
            "get_tryout_review",
            { p_tryout_id: tryoutId },
          );
          if (!active) return;
          if (reviewError) throw reviewError;
          setReviewItems((reviewData as TryoutReviewItem[]) ?? []);
          return;
        }

        if (!foundTryout.is_registered) {
          setErrorMessage(
            "Kamu belum terdaftar pada Tryout ini. Buka tryout terlebih dahulu dari katalog.",
          );
          return;
        }

        const { data: qData, error: qError } = await supabase.rpc(
          "get_tryout_questions",
          { p_tryout_id: tryoutId },
        );
        if (!active) return;
        if (qError) throw qError;

        const loadedQuestions = (qData as TryoutQuestionClient[]) ?? [];
        setQuestions(loadedQuestions);

        const totalSeconds = foundTryout.duration_minutes * 60;
        let initialStartedMs = Date.now();
        let initialAnswers: Record<string, OptionLetter> = {};
        let initialFlags: string[] = [];

        if (typeof window !== "undefined" && draftKey) {
          try {
            const rawDraft = window.localStorage.getItem(draftKey);
            if (rawDraft) {
              const parsed = JSON.parse(rawDraft) as Partial<DraftPayload>;
              if (parsed.answers) initialAnswers = parsed.answers;
              if (Array.isArray(parsed.flaggedIds)) {
                initialFlags = parsed.flaggedIds;
              }
              if (typeof parsed.startedAtMs === "number") {
                initialStartedMs = parsed.startedAtMs;
              }
            }
          } catch {
            // Ignore malformed draft in localStorage.
          }
        }

        startedAtMsRef.current = initialStartedMs;
        const elapsedSeconds = Math.floor(
          (Date.now() - initialStartedMs) / 1000,
        );
        const remaining = Math.max(0, totalSeconds - elapsedSeconds);
        setAnswers(initialAnswers);
        setFlaggedIds(initialFlags);
        setSecondsLeft(remaining);
        setErrorMessage(null);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
          setErrorMessage(
            "Skema Tryout belum dijalankan di Supabase. Jalankan migrasi SQL terlebih dahulu.",
          );
        } else {
          setErrorMessage(
            getErrorMessage(error, "Gagal memuat ruang Tryout."),
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchRoom();

    return () => {
      active = false;
    };
  }, [currentUser, draftKey, markSchemaNeedsMigration, tryoutId]);

  const persistDraft = useCallback(
    (nextAnswers: Record<string, OptionLetter>, nextFlags: string[]) => {
      if (typeof window === "undefined" || !draftKey) return;
      try {
        const payload: DraftPayload = {
          answers: nextAnswers,
          flaggedIds: nextFlags,
          startedAtMs: startedAtMsRef.current,
        };
        window.localStorage.setItem(draftKey, JSON.stringify(payload));
      } catch {
        // Ignore storage quota issues.
      }
    },
    [draftKey],
  );

  const handleSubmitAttempt = useCallback(async () => {
    if (!tryout || isSubmitting) return;
    setIsSubmitting(true);
    setShowSubmitConfirm(false);

    try {
      const supabase = getSupabaseClient();
      const elapsedSeconds = Math.min(
        tryout.duration_minutes * 60,
        Math.max(1, Math.floor((Date.now() - startedAtMsRef.current) / 1000)),
      );

      const { data: submitted, error: submitError } = await supabase.rpc(
        "submit_tryout_attempt",
        {
          p_tryout_id: tryoutId,
          p_answers: answers,
          p_duration_seconds: elapsedSeconds,
        },
      );
      if (submitError) throw submitError;

      if (typeof window !== "undefined" && draftKey) {
        window.localStorage.removeItem(draftKey);
      }

      const finalAttempt = submitted as TryoutAttempt;
      setAttempt(finalAttempt);

      const { data: reviewData, error: reviewError } = await supabase.rpc(
        "get_tryout_review",
        { p_tryout_id: tryoutId },
      );
      if (reviewError) throw reviewError;
      setReviewItems((reviewData as TryoutReviewItem[]) ?? []);
      showToast(`Tryout selesai! Skor SNBT kamu: ${finalAttempt.score}`);
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal mengumpulkan jawaban Tryout."));
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, draftKey, isSubmitting, showToast, tryout, tryoutId]);

  // Countdown timer while exam is active
  useEffect(() => {
    if (attempt || questions.length === 0 || secondsLeft === null) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null) return null;
        if (prev <= 1) {
          clearInterval(timer);
          if (!autoSubmitFiredRef.current) {
            autoSubmitFiredRef.current = true;
            void handleSubmitAttempt();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt, handleSubmitAttempt, questions.length, secondsLeft]);

  const answeredCount = useMemo(
    () => questions.filter((q) => Boolean(answers[q.id])).length,
    [answers, questions],
  );

  const filteredReview = useMemo(() => {
    if (reviewFilter === "WRONG") {
      return reviewItems.filter(
        (item) => item.selected_option !== item.correct_option,
      );
    }
    return reviewItems;
  }, [reviewFilter, reviewItems]);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
        Menyiapkan ruang Tryout...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
        <div className="rounded-xl border border-[#ffd4d4] bg-[#fff1f1] p-4 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
        <Link
          href="/tryout"
          className="mt-4 inline-block rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white"
        >
          ← Kembali ke Daftar Tryout
        </Link>
      </div>
    );
  }

  // Review & Score Screen after Submit
  if (attempt && tryout) {
    const accuracy =
      attempt.total_questions > 0
        ? Math.round((attempt.correct_count / attempt.total_questions) * 100)
        : 0;

    return (
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Link
              href="/tryout"
              className="text-xs font-bold text-[var(--blue)]"
            >
              ← Kembali ke Daftar Tryout
            </Link>
            <h1 className="mt-1 text-2xl font-bold text-[var(--ink)] sm:text-[28px]">
              Hasil & Pembahasan: {tryout.title}
            </h1>
          </div>
          <Link
            href={`/peringkat?tryout=${tryout.id}`}
            className="rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            🏆 Lihat Leaderboard Tryout →
          </Link>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
            <div className="text-xs text-[var(--muted)]">Skor SNBT</div>
            <div className="mt-1 text-3xl font-extrabold text-[var(--blue)]">
              {attempt.score}
            </div>
            <div className="text-[11px] text-[var(--muted)]">Skala 200–1000</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
            <div className="text-xs text-[var(--muted)]">Jawaban Benar</div>
            <div className="mt-1 text-3xl font-extrabold text-[#147a4b]">
              {attempt.correct_count}/{attempt.total_questions}
            </div>
            <div className="text-[11px] text-[var(--muted)]">Soal terjawab</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
            <div className="text-xs text-[var(--muted)]">Akurasi</div>
            <div className="mt-1 text-3xl font-extrabold text-[var(--ink)]">
              {accuracy}%
            </div>
            <div className="text-[11px] text-[var(--muted)]">Ketepatan</div>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
            <div className="text-xs text-[var(--muted)]">Waktu Pakai</div>
            <div className="mt-1 text-3xl font-extrabold text-[var(--ink)]">
              {formatSecondsAsClock(attempt.duration_seconds)}
            </div>
            <div className="text-[11px] text-[var(--muted)]">Durasi selesai</div>
          </div>
        </div>

        {/* Subtest Breakdown */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="text-base font-bold text-[var(--ink)]">
            Analisis Per Subtes
          </h2>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SNBT_SUBTESTS.map((sub) => {
              const stat = attempt.subtest_breakdown?.[sub.code];
              if (!stat) return null;
              const pct =
                stat.total > 0
                  ? Math.round((stat.correct / stat.total) * 100)
                  : 0;
              return (
                <div
                  key={sub.code}
                  className="rounded-xl border border-[var(--border)] p-3.5"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[var(--blue)]">{sub.code}</span>
                    <span>
                      {stat.correct}/{stat.total} ({pct}%)
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-[var(--muted)]">
                    {sub.name}
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#eef2f6]">
                    <div
                      className="h-full rounded-full bg-[var(--blue)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Explanation List */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-[var(--ink)]">
              Pembahasan Soal ({filteredReview.length})
            </h2>
            <div className="inline-flex rounded-xl border border-[var(--border)] p-1">
              <button
                type="button"
                onClick={() => setReviewFilter("ALL")}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold ${
                  reviewFilter === "ALL"
                    ? "bg-[var(--navy)] text-white"
                    : "text-[var(--muted)]"
                }`}
              >
                Semua ({reviewItems.length})
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter("WRONG")}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold ${
                  reviewFilter === "WRONG"
                    ? "bg-[var(--navy)] text-white"
                    : "text-[var(--muted)]"
                }`}
              >
                Salah / Kosong (
                {
                  reviewItems.filter(
                    (i) => i.selected_option !== i.correct_option,
                  ).length
                }
                )
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReview.map((item) => {
              const isCorrect = item.selected_option === item.correct_option;
              return (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[var(--border)] p-4.5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[var(--blue-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--blue)]">
                        No. {item.question_order} · {item.subtest}
                      </span>
                      <span className="text-xs text-[var(--muted)]">
                        {SNBT_SUBTEST_MAP[item.subtest]?.name}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        isCorrect
                          ? "bg-[#ecfdf3] text-[#147a4b]"
                          : "bg-[#fef3f2] text-[#b42318]"
                      }`}
                    >
                      {isCorrect
                        ? "✓ Benar"
                        : item.selected_option
                          ? `✕ Jawabanmu: ${item.selected_option} (Kunci: ${item.correct_option})`
                          : `Kosong (Kunci: ${item.correct_option})`}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed font-medium text-[var(--ink)]">
                    {item.question_text}
                  </p>

                  <div className="mt-3 grid gap-1.5 text-xs">
                    {OPTION_KEYS.map((letter) => {
                      const isKey = letter === item.correct_option;
                      const isPicked = letter === item.selected_option;
                      return (
                        <div
                          key={letter}
                          className={`rounded-lg border px-3 py-2 ${
                            isKey
                              ? "border-[#147a4b] bg-[#ecfdf3] font-bold text-[#115e3b]"
                              : isPicked
                                ? "border-[#d92d20] bg-[#fef3f2] text-[#912018]"
                                : "border-[var(--border)] bg-[#fafbfd] text-[var(--ink)]"
                          }`}
                        >
                          <b>{letter}.</b> {getOptionText(item, letter)}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-3 rounded-xl bg-[#f8fafc] p-3.5 text-xs leading-relaxed text-[var(--ink)]">
                    <b className="text-[var(--navy)]">Pembahasan:</b>{" "}
                    {item.explanation}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active Exam Runner
  const currentQuestion = questions[activeIndex] ?? null;

  if (!tryout || !currentQuestion) {
    return (
      <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
        Belum ada soal pada paket Tryout ini.
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id];
  const isFlagged = flaggedIds.includes(currentQuestion.id);

  function handleSelectOption(letter: OptionLetter) {
    const nextAnswers = { ...answers, [currentQuestion.id]: letter };
    setAnswers(nextAnswers);
    persistDraft(nextAnswers, flaggedIds);
  }

  function handleToggleFlag() {
    const nextFlags = isFlagged
      ? flaggedIds.filter((id) => id !== currentQuestion.id)
      : [...flaggedIds, currentQuestion.id];
    setFlaggedIds(nextFlags);
    persistDraft(answers, nextFlags);
  }

  return (
    <div className="space-y-4">
      {/* Top Exam Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
        <div>
          <div className="text-xs font-bold text-[var(--blue)]">
            Tryout Aktif · Minggu #{tryout.week_number}
          </div>
          <h1 className="m-0 text-lg font-bold text-[var(--ink)]">
            {tryout.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`rounded-xl px-3.5 py-2 font-mono text-sm font-extrabold ${
              (secondsLeft ?? 999) <= 180
                ? "bg-[#fef3f2] text-[#b42318]"
                : "bg-[var(--blue-soft)] text-[var(--navy)]"
            }`}
          >
            ⏱ {formatSecondsAsClock(secondsLeft ?? 0)}
          </div>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => setShowSubmitConfirm(true)}
            className="cursor-pointer rounded-[10px] bg-[#147a4b] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            Selesai & Kumpulkan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        {/* Question Card */}
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[var(--blue-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--blue)]">
                {currentQuestion.subtest}
              </span>
              <span className="text-xs font-semibold text-[var(--muted)]">
                {SNBT_SUBTEST_MAP[currentQuestion.subtest]?.name}
              </span>
            </div>

            <button
              type="button"
              onClick={handleToggleFlag}
              className={`cursor-pointer rounded-lg border px-2.5 py-1 text-xs font-bold ${
                isFlagged
                  ? "border-[#f59e0b] bg-[#fffbeb] text-[#b45309]"
                  : "border-[var(--border)] bg-white text-[var(--muted)]"
              }`}
            >
              {isFlagged ? "⚑ Ditandai Ragu-ragu" : "⚐ Tandai Ragu-ragu"}
            </button>
          </div>

          <div className="mt-3 text-xs font-bold text-[var(--muted)]">
            Soal Nomor {activeIndex + 1} dari {questions.length}
          </div>

          <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed font-medium text-[var(--ink)]">
            {currentQuestion.question_text}
          </p>

          <div className="mt-5 grid gap-2.5">
            {OPTION_KEYS.map((letter) => {
              const selected = currentAnswer === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => handleSelectOption(letter)}
                  className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition ${
                    selected
                      ? "border-[var(--blue)] bg-[var(--blue-soft)]/70 font-semibold text-[var(--navy)]"
                      : "border-[var(--border)] bg-white hover:border-[#c3d2e8]"
                  }`}
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-current text-xs font-extrabold">
                    {letter}
                  </span>
                  <span className="leading-relaxed">
                    {getOptionText(currentQuestion, letter)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2 text-xs font-bold text-[var(--navy)] disabled:opacity-45"
            >
              ← Sebelumnya
            </button>
            <button
              type="button"
              disabled={activeIndex >= questions.length - 1}
              onClick={() =>
                setActiveIndex((prev) =>
                  Math.min(questions.length - 1, prev + 1),
                )
              }
              className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2 text-xs font-bold text-white disabled:opacity-45"
            >
              Berikutnya →
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <aside className="self-start rounded-2xl border border-[var(--border)] bg-white p-4">
          <div className="flex items-center justify-between">
            <b className="text-sm font-bold text-[var(--ink)]">Nomor Soal</b>
            <span className="text-xs text-[var(--muted)]">
              {answeredCount}/{questions.length} terisi
            </span>
          </div>

          <div className="mt-3 grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = Boolean(answers[q.id]);
              const flagged = flaggedIds.includes(q.id);
              const isCurrent = idx === activeIndex;

              let style = "border-[var(--border)] bg-white text-[var(--ink)]";
              if (flagged) {
                style = "border-[#f59e0b] bg-[#fffbeb] text-[#b45309]";
              } else if (isAnswered) {
                style = "border-[var(--navy)] bg-[var(--navy)] text-white";
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`h-9 cursor-pointer rounded-lg border text-xs font-extrabold ${style} ${
                    isCurrent ? "ring-2 ring-[var(--blue)] ring-offset-1" : ""
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1 text-[11px] text-[var(--muted)]">
            <div>■ Biru tua: Sudah dijawab</div>
            <div>■ Kuning: Ragu-ragu</div>
            <div>□ Putih: Belum dijawab</div>
          </div>
        </aside>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.5)] p-4"
        >
          <div className="w-full max-w-[420px] rounded-[20px] bg-white p-6 shadow-xl">
            <h2 className="m-0 text-xl font-bold text-[var(--ink)]">
              Kumpulkan Jawaban Tryout?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Kamu telah menjawab <b>{answeredCount}</b> dari{" "}
              <b>{questions.length}</b> soal. Setelah dikumpulkan, skor langsung
              dihitung dan masuk Leaderboard.
            </p>
            <div className="mt-5 flex justify-end gap-2.5">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowSubmitConfirm(false)}
                className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
              >
                Lanjut Mengerjakan
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => void handleSubmitAttempt()}
                className="cursor-pointer rounded-[10px] bg-[#147a4b] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
              >
                {isSubmitting ? "Menilai..." : "Ya, Kumpulkan Sekarang"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
