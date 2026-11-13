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
    <div className="space-y-6">
      {/* Skilvul-style Greeting Row */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:p-6">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--blue-soft)] px-3 py-1 text-[11px] font-extrabold text-[var(--blue)]">
            Workspace Belajar · {currentUser.class_name}
          </span>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[28px]">
            Halo, {currentUser.name}!
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Mulai latihan 7 subtes lagi, kumpulkan skor Tryout, dan jaga streak
            belajarmu menuju {currentUser.ptn}.
          </p>
        </div>

        <button
          type="button"
          onClick={openProgressModal}
          className="w-full shrink-0 cursor-pointer rounded-lg bg-[var(--navy)] px-5 py-3 text-center text-sm font-extrabold text-white transition hover:bg-[var(--blue)] sm:w-auto"
        >
          + Catat Progres
        </button>
      </div>

      {/* Skilvul-style Top Highlight Metric Cards (SkilPoin & SkilBadge equivalent) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          href="/coin"
          className="flex items-center justify-between gap-4 rounded-2xl border border-[#cde1ff] bg-gradient-to-r from-[var(--navy)] to-[var(--blue)] p-5 text-white shadow-sm transition hover:-translate-y-0.5"
        >
          <div>
            <div className="text-xs font-bold tracking-wide text-[#dbeafe] uppercase">
              Total Saldo Coin
            </div>
            <div className="mt-1 text-3xl font-extrabold text-white">
              🪙 {coinBalance} Coin
            </div>
            <div className="mt-1 text-xs text-[#dbeafe]">
              {hasPass
                ? `Live Class Pass aktif ${daysLeft} hari lagi`
                : "Pakai untuk Tryout (25 Coin) atau Live Class (100 Coin) →"}
            </div>
          </div>
          <span className="rounded-xl bg-white/15 px-3 py-2 text-xs font-extrabold text-white">
            Dompet ›
          </span>
        </Link>

        <Link
          href="/peringkat"
          className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs transition hover:-translate-y-0.5 hover:border-[var(--blue)]"
        >
          <div>
            <div className="text-xs font-bold tracking-wide text-[var(--muted)] uppercase">
              Poin &amp; Peringkat Belajar
            </div>
            <div className="mt-1 flex items-baseline gap-2.5">
              <span className="text-3xl font-extrabold text-[var(--navy)]">
                {studyPoints} Poin
              </span>
              <span className="rounded-full bg-[var(--blue-soft)] px-2.5 py-0.5 text-xs font-extrabold text-[var(--blue)]">
                {rank === null ? "Belum Ada Rank" : `Rank #${rank}`}
              </span>
            </div>
            <div className="mt-1 text-xs text-[var(--muted)]">
              {userEntries.length} catatan progres · Streak {currentStreak} hari
              beruntun
            </div>
          </div>
          <span className="rounded-xl bg-[#f8fafc] px-3 py-2 text-xs font-extrabold text-[var(--navy)]">
            Leaderboard ›
          </span>
        </Link>
      </div>

      {/* Skilvul "Lanjutkan Progress Terakhir" Resume Card */}
      <section className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
        <div className="mb-3.5 flex items-center justify-between gap-2">
          <h2 className="text-base font-extrabold text-[var(--navy)] sm:text-lg">
            Lanjutkan Progress Terakhir
          </h2>
          <Link
            href="/bank-soal"
            className="text-xs font-extrabold text-[var(--blue)] hover:underline"
          >
            Semua 7 Subtes →
          </Link>
        </div>

        <div className="grid grid-cols-1 items-center gap-4 rounded-xl border border-[var(--border)] bg-[#f8fafc] p-4 md:grid-cols-[200px_1fr_auto]">
          <div className="overflow-hidden rounded-xl border border-[var(--border)]">
            <SubtestThumbnail
              code={resumeSubtestCode}
              bottomLeftLabel={resumeSubtestInfo.category}
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--blue-soft)] px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--blue)]">
                {resumeSubtestInfo.code}
              </span>
              <span className="text-xs font-semibold text-[var(--muted)]">
                {latestEntry
                  ? `Aktivitas terakhir: ${latestEntry.date}`
                  : "Rekomendasi mulai belajar"}
              </span>
            </div>
            <h3 className="mt-1.5 text-base font-extrabold text-[var(--ink)] sm:text-lg">
              {resumeSubtestInfo.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
              {latestEntry
                ? latestEntry.progress
                : resumeSubtestInfo.description}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                <div
                  className="h-full rounded-full bg-[var(--blue)] transition-all"
                  style={{
                    width: `${Math.min(100, Math.max(12, userEntries.length * 10))}%`,
                  }}
                />
              </div>
              <span className="text-xs font-extrabold text-[var(--navy)]">
                {userEntries.length} sesi tercatat
              </span>
            </div>
          </div>

          <Link
            href="/bank-soal"
            className="w-full rounded-lg bg-[var(--navy)] px-4 py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--blue)] md:w-auto sm:text-sm"
          >
            Lanjutkan Latihan →
          </Link>
        </div>
      </section>

      {/* Study KPI Row & Quick Access Pillars */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs">
          <div className="text-xs font-semibold text-[var(--muted)]">
            🔥 Streak Harian
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {currentStreak} hari
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs">
          <div className="text-xs font-semibold text-[var(--muted)]">
            ⏱ Total Durasi
          </div>
          <div className="mt-1.5 text-2xl font-extrabold text-[var(--navy)]">
            {formatDuration(totalMinutes)}
          </div>
        </div>
        <Link
          href="/tryout"
          className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs transition hover:border-[var(--blue)]"
        >
          <div className="text-xs font-bold text-[var(--blue)]">
            📝 Tryout Mingguan
          </div>
          <div className="mt-1.5 text-lg font-extrabold text-[var(--ink)]">
            {COIN_PRICING.TRYOUT_WEEKLY_COST} Coin
          </div>
          <div className="mt-0.5 text-xs text-[var(--muted)]">
            Simulasi SNBT + Ranking →
          </div>
        </Link>
        <Link
          href="/live-class"
          className="rounded-2xl border border-[var(--border)] bg-white p-4 shadow-2xs transition hover:border-[var(--blue)]"
        >
          <div className="text-xs font-bold text-[var(--blue)]">
            🎥 Live Class Pass
          </div>
          <div className="mt-1.5 text-lg font-extrabold text-[var(--ink)]">
            {hasPass
              ? `Aktif (${daysLeft}h)`
              : `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin`}
          </div>
          <div className="mt-0.5 text-xs text-[var(--muted)]">
            {hasPass ? "Buka jadwal & VOD →" : "Akses 30 hari penuh →"}
          </div>
        </Link>
      </div>

      {/* Bottom 2-Column Activity & Target PTN */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="min-w-0 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg font-extrabold text-[var(--navy)]">
              Progres Belajar Terbaru
            </h2>
            <Link
              href="/progres"
              className="text-xs font-extrabold text-[var(--blue)] hover:underline"
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
            <h2 className="mb-3 text-base font-extrabold text-[var(--navy)]">
              Target PTN Impian
            </h2>
            <div className="rounded-xl border border-[#cde1ff] bg-[var(--blue-soft)]/70 p-4">
              <div className="text-xs font-semibold text-[var(--blue)]">
                Kampus Tujuan
              </div>
              <b className="mt-1 block break-words text-lg font-extrabold text-[var(--navy)]">
                {currentUser.ptn}
              </b>
              <div className="mt-0.5 break-words text-sm font-medium text-[#475467]">
                {currentUser.major}
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-[var(--muted)]">
              Setiap sesi latihan dan tryout membawamu selangkah lebih dekat ke
              kursi PTN tujuanmu.
            </p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-2xs">
            <h2 className="text-base font-extrabold text-[var(--navy)]">
              Jelajahi Komunitas
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              Lihat perjalanan belajar {allUsers.length} pejuang PTN lainnya dan
              pantau posisi leaderboard.
            </p>
            <div className="mt-3 flex gap-2">
              <Link
                href="/komunitas"
                className="flex-1 rounded-lg border border-[var(--border)] bg-white py-2 text-center text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)]"
              >
                Komunitas
              </Link>
              <Link
                href="/peringkat"
                className="flex-1 rounded-lg bg-[var(--navy)] py-2 text-center text-xs font-bold text-white transition hover:bg-[var(--blue)]"
              >
                Peringkat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
