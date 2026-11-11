"use client";

import {
  calculateStreak,
  calculateTotalMinutes,
  formatDuration,
  getUserProgress,
  getUserRank,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import { ProgressFeedList } from "@/components/frontend/ProgressFeedList";

export default function DashboardPage() {
  const { currentUser, allUsers, allProgress, openProgressModal } = useNassy();

  if (!currentUser) return null;

  const userEntries = getUserProgress(allProgress, currentUser.id);
  const currentStreak = calculateStreak(userEntries);
  const totalMinutes = calculateTotalMinutes(userEntries);
  const rank = getUserRank(currentUser.id, allUsers, allProgress);

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            Selamat datang, {currentUser.name} 👋
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Satu hari, satu progres.
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
          <div className="text-[13px] text-[var(--muted)]">🏆 Peringkat</div>
          <div className="mt-1.5 text-[27px] font-extrabold">
            {rank === null ? "—" : `#${rank}`}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.25fr_0.75fr]">
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
