"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { formatSecondsAsClock, getLeaderboard } from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type {
  TryoutCatalogItem,
  TryoutLeaderboardEntry,
} from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

function PeringkatContent() {
  const searchParams = useSearchParams();
  const initialTryoutId = searchParams.get("tryout") ?? "ALL";

  const {
    currentUser,
    allUsers,
    allProgress,
    markSchemaNeedsMigration,
  } = useNassy();

  const [activeTab, setActiveTab] = useState<"tryout" | "study">("tryout");
  const [tryouts, setTryouts] = useState<TryoutCatalogItem[]>([]);
  const [selectedTryoutId, setSelectedTryoutId] =
    useState<string>(initialTryoutId);
  const [tryoutBoard, setTryoutBoard] = useState<TryoutLeaderboardEntry[]>([]);
  const [isLoadingBoard, setIsLoadingBoard] = useState(true);
  const [boardError, setBoardError] = useState<string | null>(null);

  const studyLeaderboard = useMemo(
    () => getLeaderboard(allUsers, allProgress),
    [allUsers, allProgress],
  );

  useEffect(() => {
    let active = true;

    async function fetchTryoutOptions() {
      if (!currentUser || !isSupabaseBrowserConfigured()) return;
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_tryout_catalog");
        if (!active) return;
        if (error) throw error;
        setTryouts((data as TryoutCatalogItem[]) ?? []);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
        }
      }
    }

    void fetchTryoutOptions();

    return () => {
      active = false;
    };
  }, [currentUser, markSchemaNeedsMigration]);

  useEffect(() => {
    if (activeTab !== "tryout") return;
    let active = true;

    async function fetchTryoutLeaderboard() {
      if (!currentUser || !isSupabaseBrowserConfigured()) {
        if (active) setIsLoadingBoard(false);
        return;
      }
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_tryout_leaderboard", {
          p_tryout_id: selectedTryoutId === "ALL" ? null : selectedTryoutId,
        });
        if (!active) return;
        if (error) throw error;
        setTryoutBoard((data as TryoutLeaderboardEntry[]) ?? []);
        setBoardError(null);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
          setBoardError(
            "Leaderboard Tryout belum aktif karena tabel Tryout di Supabase belum dimigrasi.",
          );
        } else {
          setBoardError(
            getErrorMessage(error, "Gagal memuat Leaderboard Tryout."),
          );
        }
      } finally {
        if (active) setIsLoadingBoard(false);
      }
    }

    void fetchTryoutLeaderboard();

    return () => {
      active = false;
    };
  }, [activeTab, currentUser, markSchemaNeedsMigration, selectedTryoutId]);

  const myTryoutRankIndex = useMemo(
    () =>
      currentUser
        ? tryoutBoard.findIndex((row) => row.user_id === currentUser.id)
        : -1,
    [currentUser, tryoutBoard],
  );
  const myTryoutEntry =
    myTryoutRankIndex !== -1 ? tryoutBoard[myTryoutRankIndex] : null;

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            🏆 Leaderboard
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Peringkat Skor Tryout SNBT dan Poin Konsistensi Belajar komunitas.
          </div>
        </div>

        <div className="inline-flex rounded-xl border border-[var(--border)] bg-white p-1">
          <button
            type="button"
            onClick={() => setActiveTab("tryout")}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "tryout"
                ? "bg-[var(--navy)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Skor Tryout
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("study")}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "study"
                ? "bg-[var(--navy)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Poin Belajar
          </button>
        </div>
      </div>

      {activeTab === "tryout" ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
            <div className="text-sm font-bold text-[var(--ink)]">
              Filter Paket Tryout
            </div>
            <select
              aria-label="Pilih paket tryout untuk leaderboard"
              value={selectedTryoutId}
              onChange={(event) => {
                setIsLoadingBoard(true);
                setSelectedTryoutId(event.target.value);
              }}
              className="w-full rounded-[10px] border border-[var(--border)] bg-white px-3 py-2 text-sm font-bold text-[var(--ink)] outline-none sm:w-auto sm:min-w-[280px]"
            >
              <option value="ALL">Rata-rata Semua Tryout Mingguan</option>
              {tryouts.map((t) => (
                <option key={t.id} value={t.id}>
                  Minggu #{t.week_number} — {t.title}
                </option>
              ))}
            </select>
          </div>

          {myTryoutEntry ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#cde1ff] bg-[var(--blue-soft)]/70 p-4">
              <div>
                <div className="text-xs font-bold text-[var(--blue)]">
                  Posisi Kamu Saat Ini
                </div>
                <div className="mt-0.5 text-base font-extrabold text-[var(--navy)]">
                  Peringkat #{myTryoutRankIndex + 1} · {myTryoutEntry.name}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-extrabold text-[var(--blue)]">
                  {myTryoutEntry.score}
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Benar {myTryoutEntry.correct_count}/
                  {myTryoutEntry.total_questions}
                </div>
              </div>
            </div>
          ) : null}

          <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
            {isLoadingBoard ? (
              <div className="py-9 text-center text-sm text-[var(--muted)]">
                Memuat papan peringkat Tryout...
              </div>
            ) : boardError ? (
              <div className="rounded-xl border border-[#ffd4d4] bg-[#fff1f1] p-4 text-sm text-[#a52b36]">
                {boardError}
              </div>
            ) : tryoutBoard.length === 0 ? (
              <div className="py-9 text-center text-sm text-[var(--muted)]">
                Belum ada peserta yang mengumpulkan Tryout ini.
                <div className="mt-3">
                  <Link
                    href="/tryout"
                    className="inline-block rounded-[10px] bg-[var(--navy)] px-4 py-2 text-xs font-bold text-white"
                  >
                    Ikuti Tryout Sekarang →
                  </Link>
                </div>
              </div>
            ) : (
              tryoutBoard.map((item, idx) => {
                const isMe = currentUser?.id === item.user_id;
                const medal =
                  idx === 0
                    ? "🥇"
                    : idx === 1
                      ? "🥈"
                      : idx === 2
                        ? "🥉"
                        : `#${idx + 1}`;
                const accuracy =
                  item.total_questions > 0
                    ? Math.round(
                        (item.correct_count / item.total_questions) * 100,
                      )
                    : 0;

                return (
                  <div
                    key={item.user_id}
                    className={`grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b border-[var(--border)] px-2 py-3.5 last:border-b-0 ${
                      isMe ? "rounded-xl bg-[var(--blue-soft)]/45" : ""
                    }`}
                  >
                    <div className="text-center text-base font-black text-[var(--navy)]">
                      {medal}
                    </div>
                    <div>
                      <b className="text-sm font-bold text-[var(--ink)]">
                        {item.name} {isMe ? "(Kamu)" : ""}
                      </b>
                      <div className="text-xs text-[var(--muted)]">
                        {item.ptn} · {item.class_name} · Akurasi {accuracy}% ·{" "}
                        {formatSecondsAsClock(item.duration_seconds)}
                      </div>
                    </div>
                    <div className="text-right">
                      <b className="block text-base font-extrabold text-[var(--blue)]">
                        {item.score}
                      </b>
                      <span className="text-[11px] text-[var(--muted)]">
                        {selectedTryoutId === "ALL"
                          ? `${item.attempts_count} TO`
                          : `${item.correct_count}/${item.total_questions} benar`}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          {studyLeaderboard.length === 0 ? (
            <div className="py-9 text-center text-sm text-[var(--muted)]">
              Belum ada anggota.
            </div>
          ) : (
            studyLeaderboard.map((item, idx) => (
              <div
                key={item.user.id}
                className="grid grid-cols-[34px_1fr_auto] items-center gap-2.5 border-b border-[var(--border)] py-3.5 last:border-b-0"
              >
                <div className="font-black text-[var(--navy)]">#{idx + 1}</div>
                <div>
                  <b className="text-sm font-bold text-[var(--ink)]">
                    {item.user.name}
                  </b>
                  <div className="text-xs text-[var(--muted)]">
                    {item.user.ptn}
                  </div>
                </div>
                <b className="text-sm font-bold text-[var(--ink)]">
                  {item.points} pts
                </b>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function PeringkatPage() {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat Leaderboard...
        </div>
      }
    >
      <PeringkatContent />
    </Suspense>
  );
}
