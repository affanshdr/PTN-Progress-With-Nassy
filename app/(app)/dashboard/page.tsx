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
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import { ProgressFeedList } from "@/components/frontend/ProgressFeedList";

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
  const hasPass = isLiveClassPassActive(currentUser.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser.liveclass_pass_until);

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            Selamat datang, {currentUser.name} 👋
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Latihan 7 subtes, Tryout mingguan, Live Class, dan catat progres
            belajarmu.
          </div>
        </div>

        <button
          type="button"
          onClick={openProgressModal}
          className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4.5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          + Tambah Progres
        </button>
      </div>

      {/* Wallet & Learning Pillars Quick Access */}
      <div className="grid grid-cols-1 gap-3.5 md:grid-cols-4">
        <Link
          href="/coin"
          className="rounded-2xl border border-[#f2d07b] bg-[#fffcf0] p-4.5 transition hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[#8a5300]">🪙 Saldo Coin</div>
          <div className="mt-1 text-2xl font-extrabold text-[var(--navy)]">
            {coinBalance} Coin
          </div>
          <div className="mt-1 text-xs text-[#925c09]">
            {hasPass
              ? `Live Class aktif ${daysLeft} hari lagi`
              : "Isi ulang / lihat riwayat →"}
          </div>
        </Link>

        <Link
          href="/bank-soal"
          className="rounded-2xl border border-[var(--border)] bg-white p-4.5 transition hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[var(--blue)]">
            📚 7 Subtes SNBT
          </div>
          <div className="mt-1 text-base font-extrabold text-[var(--ink)]">
            Soal + Pembahasan
          </div>
          <div className="mt-1 text-xs text-[var(--muted)]">
            PK, PM, PU, PPU, LBI, LBE, PBM · Gratis →
          </div>
        </Link>

        <Link
          href="/tryout"
          className="rounded-2xl border border-[var(--border)] bg-white p-4.5 transition hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[var(--blue)]">
            📝 Tryout Mingguan
          </div>
          <div className="mt-1 text-base font-extrabold text-[var(--ink)]">
            {COIN_PRICING.TRYOUT_WEEKLY_COST} Coin / Tryout
          </div>
          <div className="mt-1 text-xs text-[var(--muted)]">
            Simulasi berwaktu + Leaderboard →
          </div>
        </Link>

        <Link
          href="/live-class"
          className="rounded-2xl border border-[var(--border)] bg-white p-4.5 transition hover:-translate-y-0.5"
        >
          <div className="text-xs font-bold text-[var(--blue)]">
            🎥 Live Class Pass
          </div>
          <div className="mt-1 text-base font-extrabold text-[var(--ink)]">
            {hasPass ? `Aktif (${daysLeft}h)` : `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / Bln`}
          </div>
          <div className="mt-1 text-xs text-[var(--muted)]">
            {hasPass ? "Buka jadwal & rekaman →" : "Akses 30 hari kelas & VOD →"}
          </div>
        </Link>
      </div>

      {/* Existing Study Metrics */}
      <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
          <div className="text-[13px] text-[var(--muted)]">🔥 Streak</div>
          <div className="mt-1.5 text-[27px] font-extrabold">
            {currentStreak} hari
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
          <div className="text-[13px] text-[var(--muted)]">📚 Total Progres</div>
          <div className="mt-1.5 text-[27px] font-extrabold">
            {userEntries.length}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
          <div className="text-[13px] text-[var(--muted)]">⏱ Total Durasi</div>
          <div className="mt-1.5 text-[27px] font-extrabold">
            {formatDuration(totalMinutes)}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--border)] bg-white p-4.5">
          <div className="text-[13px] text-[var(--muted)]">🏆 Peringkat Belajar</div>
          <div className="mt-1.5 text-[27px] font-extrabold">
            {rank === null ? "—" : `#${rank}`}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">Progres Terbaru</h2>
          <ProgressFeedList
            entries={userEntries.slice(0, 4)}
            emptyMessage="Belum ada progres. Yuk mulai hari ini."
          />
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
          <h2 className="mb-4 text-lg font-bold">Target PTN</h2>
          <div className="rounded-xl bg-[var(--blue-soft)] p-4.5">
            <div className="text-xs text-[var(--muted)]">PTN tujuan</div>
            <b className="mt-1 block text-[19px] font-bold text-[var(--ink)]">
              {currentUser.ptn}
            </b>
            <div className="mt-1 text-sm text-[var(--muted)]">
              {currentUser.major}
            </div>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
            Gunakan target ini sebagai pengingat perjalananmu.
          </p>
        </div>
      </div>
    </div>
  );
}
