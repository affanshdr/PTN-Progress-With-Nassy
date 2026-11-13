"use client";

import {
  calculateStreak,
  calculateTotalMinutes,
  formatDuration,
  getUserProgress,
  pointsForUser,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import { ProgressFeedList } from "@/components/frontend/ProgressFeedList";
import { WorkspaceHeroBanner } from "@/components/frontend/SkilvulUi";

export default function ProgresPage() {
  const { currentUser, allProgress, openProgressModal } = useNassy();

  if (!currentUser) return null;

  const userEntries = getUserProgress(allProgress, currentUser.id);
  const totalMinutes = calculateTotalMinutes(userEntries);
  const streak = calculateStreak(userEntries);
  const points = pointsForUser(currentUser.id, allProgress);

  return (
    <div className="space-y-6">
      <WorkspaceHeroBanner
        badge="LOG AKTIVITAS HARIAN"
        title="Progres Belajar"
        description="Semua catatan perjalanan belajarmu dari 7 subtes SNBT, lengkap dengan durasi belajar dan poin konsistensi."
        actions={
          <button
            type="button"
            onClick={openProgressModal}
            className="w-full cursor-pointer rounded-lg bg-[var(--navy)] px-4.5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] sm:w-auto"
          >
            + Tambah Progres
          </button>
        }
      />

      {/* Compact Skilvul Metric Strip */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-4.5">
          <div className="text-xs font-bold text-[var(--muted)]">
            Total Catatan Belajar
          </div>
          <div className="mt-1.5 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--navy)]">
            {userEntries.length} Sesi
          </div>
        </div>
        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-4.5">
          <div className="text-xs font-bold text-[var(--muted)]">
            Akumulasi Waktu Fokus
          </div>
          <div className="mt-1.5 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--blue)]">
            {formatDuration(totalMinutes)}
          </div>
        </div>
        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-4.5">
          <div className="text-xs font-bold text-[var(--muted)]">
            Streak &amp; Poin Konsistensi
          </div>
          <div className="mt-1.5 font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--ink)]">
            {streak} hari · {points} pts
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-[#e5eaf1] bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#eef2f7] pb-3">
          <h2 className="m-0 font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--ink)]">
            Riwayat Catatan Progres
          </h2>
          <span className="rounded-full bg-[#f1f5fb] px-3 py-1 text-xs font-bold text-[var(--navy)]">
            {userEntries.length} Entri
          </span>
        </div>

        <ProgressFeedList
          entries={userEntries}
          emptyMessage="Belum ada catatan progres."
        />
      </section>
    </div>
  );
}
