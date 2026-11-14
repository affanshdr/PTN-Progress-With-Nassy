"use client";

import Link from "next/link";
import {
  calculateStreak,
  calculateTotalMinutes,
  COIN_PRICING,
  formatDuration,
  getDaysRemaining,
  getUserProgress,
  getUserRank,
  isLiveClassPassActive,
  pointsForUser,
  SNBT_SUBTEST_MAP,
} from "@/lib/progress-utils";
import type { SnbtSubtestCode } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";
import { ProgressFeedList } from "@/components/frontend/ProgressFeedList";
import { SubtestThumbnail } from "@/components/frontend/SkilvulUi";

export default function DashboardPage() {
  const {
    currentUser,
    coinBalance,
    allUsers,
    allProgress,
    openProgressModal,
  } = useNassy();

  if (!currentUser) return null;

  const userEntries = getUserProgress(allProgress, currentUser.id);
  const currentStreak = calculateStreak(userEntries);
  const totalMinutes = calculateTotalMinutes(userEntries);
  const rank = getUserRank(currentUser.id, allUsers, allProgress);
  const studyPoints = pointsForUser(currentUser.id, allProgress);
  const hasPass = isLiveClassPassActive(currentUser.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser.liveclass_pass_until);

  const latestEntry = userEntries[0] ?? null;
  const resumeSubtestCode: SnbtSubtestCode =
    latestEntry && latestEntry.subtest in SNBT_SUBTEST_MAP
      ? (latestEntry.subtest as SnbtSubtestCode)
      : "PK";
  const resumeSubtestInfo = SNBT_SUBTEST_MAP[resumeSubtestCode];

  return (
    <div className="space-y-5">
      {/* Greeting Header */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[var(--blue)]">
            <span>{currentUser.class_name}</span>
            <span>·</span>
            <span>
              Target: {currentUser.ptn} ({currentUser.major})
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[26px]">
            Halo, {currentUser.name}
          </h1>
          <p className="mt-0.5 text-sm text-[var(--muted)]">
            Lanjutkan latihan subtes dan catat progres belajarmu hari ini.
          </p>
        </div>

        <button
          type="button"
          onClick={openProgressModal}
          className="w-full shrink-0 cursor-pointer rounded-lg bg-[var(--navy)] px-4.5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[var(--blue)] sm:w-auto"
        >
          + Catat Progres
        </button>
      </div>

      {/* Single Clean 4-Card KPI Row */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <Link
          href="/coin"
          className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs transition hover:border-[var(--blue)]"
        >
          <div className="text-xs font-semibold text-[var(--muted)]">
            Saldo Coin
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {coinBalance} Coin
          </div>
          <div className="mt-1 text-xs font-semibold text-[var(--blue)]">
            Kelola dompet →
          </div>
        </Link>

        <Link
          href="/peringkat"
          className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs transition hover:border-[var(--blue)]"
        >
          <div className="text-xs font-semibold text-[var(--muted)]">
            Peringkat &amp; Poin
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {rank === null ? "—" : `#${rank}`}{" "}
            <span className="text-sm font-bold text-[var(--muted)]">
              ({studyPoints} pts)
            </span>
          </div>
          <div className="mt-1 text-xs font-semibold text-[var(--blue)]">
            Lihat leaderboard →
          </div>
        </Link>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs">
          <div className="text-xs font-semibold text-[var(--muted)]">
            Streak Belajar
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {currentStreak} hari
          </div>
          <div className="mt-1 text-xs text-[var(--muted)]">
            {userEntries.length} sesi tercatat
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs">
          <div className="text-xs font-semibold text-[var(--muted)]">
            Total Waktu Fokus
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {formatDuration(totalMinutes)}
          </div>
          <div className="mt-1 text-xs text-[var(--muted)]">
            Akumulasi durasi
          </div>
        </div>
      </div>

      {/* Resume Card */}
      <section className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="text-base font-extrabold text-[var(--navy)]">
            Lanjutkan Latihan Subtes
          </h2>
          <Link
            href="/bank-soal"
            className="text-xs font-bold text-[var(--blue)] hover:underline"
          >
            Semua Subtes →
          </Link>
        </div>

        <div className="grid grid-cols-1 items-center gap-4 rounded-xl border border-[var(--border)] bg-[#f8fafc] p-4 md:grid-cols-[180px_1fr_auto]">
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <SubtestThumbnail
              code={resumeSubtestCode}
              topRightLabel={resumeSubtestInfo.category}
            />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-[var(--muted)]">
              {latestEntry
                ? `Terakhir dipelajari · ${latestEntry.date}`
                : "Rekomendasi subtes pertama"}
            </div>
            <h3 className="mt-1 text-base font-extrabold text-[var(--ink)]">
              {resumeSubtestInfo.code} — {resumeSubtestInfo.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
              {latestEntry
                ? latestEntry.progress
                : resumeSubtestInfo.description}
            </p>
          </div>

          <Link
            href="/bank-soal"
            className="w-full rounded-lg bg-[var(--navy)] px-4 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[var(--blue)] md:w-auto sm:text-sm"
          >
            Buka Bank Soal →
          </Link>
        </div>
      </section>

      {/* Bottom 2-Column: Recent Progress & Quick Programs */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-base font-extrabold text-[var(--navy)]">
              Progres Belajar Terbaru
            </h2>
            <Link
              href="/progres"
              className="text-xs font-bold text-[var(--blue)] hover:underline"
            >
              Lihat Semua →
            </Link>
          </div>
          <ProgressFeedList
            entries={userEntries.slice(0, 4)}
            emptyMessage="Belum ada progres. Yuk mulai catat latihanmu hari ini."
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
            <h2 className="text-base font-extrabold text-[var(--navy)]">
              Tryout &amp; Live Class
            </h2>
            <div className="mt-3 space-y-2.5">
              <Link
                href="/tryout"
                className="flex items-center justify-between rounded-xl border border-[#e5eaf1] bg-[#f8fafd] p-3.5 transition hover:border-[var(--blue)]"
              >
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">
                    Tryout Mingguan
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    Simulasi berwaktu ({COIN_PRICING.TRYOUT_WEEKLY_COST} Coin)
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--blue)]">
                  Buka →
                </span>
              </Link>

              <Link
                href="/live-class"
                className="flex items-center justify-between rounded-xl border border-[#e5eaf1] bg-[#f8fafd] p-3.5 transition hover:border-[var(--blue)]"
              >
                <div>
                  <div className="text-sm font-bold text-[var(--ink)]">
                    Live Class Bulanan
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {hasPass
                      ? `Pass aktif (${daysLeft} hari tersisa)`
                      : `Akses 30 hari (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`}
                  </div>
                </div>
                <span className="text-xs font-bold text-[var(--blue)]">
                  Buka →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
