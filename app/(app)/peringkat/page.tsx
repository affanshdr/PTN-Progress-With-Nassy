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
import {
  AvatarBadge,
  VerifiedBadgeIcon,
  WorkspaceHeroBanner,
} from "@/components/frontend/SkilvulUi";

interface LeaderboardDisplayRow {
  id: string;
  name: string;
  subtitle: string;
  primaryScore: string;
  secondaryStat: string;
  isMe: boolean;
}

/**
 * Shared Skilvul-style podium (Top 3) + horizontal ranking table (Ranks 4+)
 * used uniformly by both Tryout Score and Study Points leaderboards.
 */
function PodiumAndRankList({ rows }: { rows: LeaderboardDisplayRow[] }) {
  const topThree = rows.slice(0, 3);
  const restRows = rows.slice(3);

  // Skilvul podium order on desktop: #2 (left), #1 (center elevated), #3 (right)
  const podiumSlots: Array<{ row: LeaderboardDisplayRow; rank: 1 | 2 | 3 }> =
    topThree.length >= 3
      ? [
          { row: topThree[1], rank: 2 },
          { row: topThree[0], rank: 1 },
          { row: topThree[2], rank: 3 },
        ]
      : topThree.map((row, idx) => ({
          row,
          rank: (idx + 1) as 1 | 2 | 3,
        }));

  const rankTheme: Record<
    1 | 2 | 3,
    { ring: string; badge: string; label: string; heightCls: string }
  > = {
    1: {
      ring: "border-[#9fc0f7] bg-gradient-to-b from-[#f0f6ff] to-white shadow-[0_14px_30px_rgba(45,108,223,0.14)]",
      badge: "bg-[var(--blue)] text-white",
      label: "Juara #1",
      heightCls: "md:-mt-4 md:pb-7",
    },
    2: {
      ring: "border-[#dce4ef] bg-white",
      badge: "bg-[var(--navy)] text-white",
      label: "Peringkat #2",
      heightCls: "md:mt-3",
    },
    3: {
      ring: "border-[#dce4ef] bg-white",
      badge: "bg-[#64748b] text-white",
      label: "Peringkat #3",
      heightCls: "md:mt-5",
    },
  };

  return (
    <div className="space-y-5">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 items-end gap-4 pt-2 md:grid-cols-3">
        {podiumSlots.map(({ row, rank }) => {
          const theme = rankTheme[rank];
          return (
            <div
              key={row.id}
              className={`flex flex-col items-center rounded-2xl border p-5 text-center transition ${theme.ring} ${theme.heightCls} ${
                row.isMe ? "ring-2 ring-[var(--blue)]/35" : ""
              }`}
            >
              <span
                className={`mb-3 rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wide ${theme.badge}`}
              >
                {theme.label}
              </span>

              <AvatarBadge
                name={row.name}
                size={rank === 1 ? "lg" : "md"}
                highlight={rank === 1 || row.isMe}
              />

              <div className="mt-3 flex items-center justify-center gap-1 font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--ink)]">
                <span className="line-clamp-1">{row.name}</span>
                {rank === 1 ? <VerifiedBadgeIcon /> : null}
              </div>

              {row.isMe ? (
                <span className="mt-0.5 rounded-full bg-[var(--blue-soft)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--blue)]">
                  Kamu
                </span>
              ) : null}

              <div className="mt-1 line-clamp-1 text-xs text-[var(--muted)]">
                {row.subtitle}
              </div>

              <div className="mt-4 w-full rounded-xl bg-[#f5f8fc] px-3 py-2.5">
                <div className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--navy)]">
                  {row.primaryScore}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                  {row.secondaryStat}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranks 4+ */}
      {restRows.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-[#e5eaf1] bg-white">
          {restRows.map((row, index) => {
            const rankNum = index + 4;
            return (
              <div
                key={row.id}
                className={`flex items-center justify-between gap-3 border-b border-[#eef2f7] px-4 py-3.5 last:border-b-0 sm:px-5 ${
                  row.isMe ? "bg-[#eef5ff]" : "hover:bg-[#fafcff]"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-8 shrink-0 text-center font-[family-name:var(--font-jakarta)] text-sm font-extrabold text-[var(--muted)]">
                    #{rankNum}
                  </span>
                  <AvatarBadge name={row.name} size="sm" highlight={row.isMe} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 truncate text-sm font-bold text-[var(--ink)]">
                      <span className="truncate">{row.name}</span>
                      {row.isMe ? (
                        <span className="rounded-full bg-[var(--blue-soft)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--blue)]">
                          Kamu
                        </span>
                      ) : null}
                    </div>
                    <div className="truncate text-xs text-[var(--muted)]">
                      {row.subtitle}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="font-[family-name:var(--font-jakarta)] text-sm font-extrabold text-[var(--navy)] sm:text-base">
                    {row.primaryScore}
                  </div>
                  <div className="text-[11px] text-[var(--muted)]">
                    {row.secondaryStat}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

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

  const tryoutDisplayRows: LeaderboardDisplayRow[] = useMemo(
    () =>
      tryoutBoard.map((item) => {
        const accuracy =
          item.total_questions > 0
            ? Math.round((item.correct_count / item.total_questions) * 100)
            : 0;
        return {
          id: item.user_id,
          name: item.name,
          subtitle: `${item.ptn} · ${item.class_name}`,
          primaryScore: `${item.score}`,
          secondaryStat:
            selectedTryoutId === "ALL"
              ? `${item.attempts_count} TO · Akurasi ${accuracy}%`
              : `${item.correct_count}/${item.total_questions} benar · ${formatSecondsAsClock(item.duration_seconds)}`,
          isMe: currentUser?.id === item.user_id,
        };
      }),
    [currentUser?.id, selectedTryoutId, tryoutBoard],
  );

  const studyDisplayRows: LeaderboardDisplayRow[] = useMemo(
    () =>
      studyLeaderboard.map((item) => ({
        id: item.user.id,
        name: item.user.name,
        subtitle: `${item.user.ptn} · ${item.user.major}`,
        primaryScore: `${item.points} pts`,
        secondaryStat: `${item.user.class_name}`,
        isMe: currentUser?.id === item.user.id,
      })),
    [currentUser?.id, studyLeaderboard],
  );

  const myStudyRankIndex = useMemo(
    () =>
      currentUser
        ? studyLeaderboard.findIndex((row) => row.user.id === currentUser.id)
        : -1,
    [currentUser, studyLeaderboard],
  );

  return (
    <div className="space-y-6">
      <WorkspaceHeroBanner
        badge="PERINGKAT KOMUNITAS"
        title="Leaderboard SNBT & Konsistensi"
        description="Peringkat skor Tryout SNBT nasional komunitas dan poin konsistensi belajar harian seluruh pejuang PTN."
      />

      {/* Skilvul Underlined Tabs */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e5eaf1] bg-white px-5 pt-3 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("tryout")}
            className={`cursor-pointer border-b-2 pb-2.5 text-sm font-bold transition ${
              activeTab === "tryout"
                ? "border-[var(--blue)] text-[var(--blue)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--navy)]"
            }`}
          >
            Skor Tryout SNBT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("study")}
            className={`cursor-pointer border-b-2 pb-2.5 text-sm font-bold transition ${
              activeTab === "study"
                ? "border-[var(--blue)] text-[var(--blue)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--navy)]"
            }`}
          >
            Poin Konsistensi Belajar
          </button>
        </div>

        {activeTab === "tryout" ? (
          <select
            aria-label="Pilih paket tryout untuk leaderboard"
            value={selectedTryoutId}
            onChange={(event) => {
              setIsLoadingBoard(true);
              setSelectedTryoutId(event.target.value);
            }}
            className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2 text-xs font-bold text-[var(--ink)] outline-none focus:border-[var(--blue)] sm:w-auto sm:min-w-[260px]"
          >
            <option value="ALL">Rata-rata Semua Tryout Mingguan</option>
            {tryouts.map((t) => (
              <option key={t.id} value={t.id}>
                Minggu #{t.week_number} — {t.title}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      {activeTab === "tryout" ? (
        <div className="space-y-5">
          {myTryoutEntry ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c7daf8] bg-gradient-to-r from-[#f0f6ff] to-white p-4 sm:px-5">
              <div>
                <div className="text-[11px] font-extrabold tracking-wide text-[var(--blue)] uppercase">
                  Posisi Tryout Kamu
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--navy)]">
                  Peringkat #{myTryoutRankIndex + 1} · {myTryoutEntry.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--blue)]">
                  {myTryoutEntry.score}
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Benar {myTryoutEntry.correct_count}/
                  {myTryoutEntry.total_questions}
                </div>
              </div>
            </div>
          ) : null}

          {isLoadingBoard ? (
            <div className="rounded-2xl border border-[#e5eaf1] bg-white p-9 text-center text-sm text-[var(--muted)]">
              Memuat papan peringkat Tryout...
            </div>
          ) : boardError ? (
            <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-4 text-sm text-[#a52b36]">
              {boardError}
            </div>
          ) : tryoutDisplayRows.length === 0 ? (
            <div className="rounded-2xl border border-[#e5eaf1] bg-white p-9 text-center text-sm text-[var(--muted)]">
              Belum ada peserta yang mengumpulkan Tryout ini.
              <div className="mt-3">
                <Link
                  href="/tryout"
                  className="inline-block rounded-lg bg-[var(--navy)] px-4 py-2 text-xs font-bold text-white transition hover:bg-[var(--navy-deep)]"
                >
                  Ikuti Tryout Sekarang →
                </Link>
              </div>
            </div>
          ) : (
            <PodiumAndRankList rows={tryoutDisplayRows} />
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {myStudyRankIndex !== -1 && studyLeaderboard[myStudyRankIndex] ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c7daf8] bg-gradient-to-r from-[#f0f6ff] to-white p-4 sm:px-5">
              <div>
                <div className="text-[11px] font-extrabold tracking-wide text-[var(--blue)] uppercase">
                  Peringkat Belajar Kamu
                </div>
                <div className="mt-0.5 font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--navy)]">
                  Peringkat #{myStudyRankIndex + 1} ·{" "}
                  {studyLeaderboard[myStudyRankIndex].user.name}
                </div>
              </div>
              <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--blue)]">
                {studyLeaderboard[myStudyRankIndex].points} pts
              </div>
            </div>
          ) : null}

          {studyDisplayRows.length === 0 ? (
            <div className="rounded-2xl border border-[#e5eaf1] bg-white p-9 text-center text-sm text-[var(--muted)]">
              Belum ada anggota.
            </div>
          ) : (
            <PodiumAndRankList rows={studyDisplayRows} />
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
