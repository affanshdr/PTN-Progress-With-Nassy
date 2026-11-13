"use client";

import Link from "next/link";
import {
  calculateStreak,
  calculateTotalMinutes,
  formatDateTimeId,
  formatDuration,
  getDaysRemaining,
  getUserProgress,
  getUserRank,
  isLiveClassPassActive,
  pointsForUser,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import {
  AvatarBadge,
  VerifiedBadgeIcon,
  WorkspaceHeroBanner,
} from "@/components/frontend/SkilvulUi";

export default function ProfilPage() {
  const { currentUser, coinBalance, allUsers, allProgress } = useNassy();

  if (!currentUser) return null;

  const hasPass = isLiveClassPassActive(currentUser.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser.liveclass_pass_until);
  const userEntries = getUserProgress(allProgress, currentUser.id);
  const totalMinutes = calculateTotalMinutes(userEntries);
  const streak = calculateStreak(userEntries);
  const points = pointsForUser(currentUser.id, allProgress);
  const rank = getUserRank(currentUser.id, allUsers, allProgress);

  return (
    <div className="space-y-6">
      <WorkspaceHeroBanner
        badge="IDENTITAS AKADEMIK"
        title="Profil Pejuang SNBT"
        description="Informasi akun belajar, target kampus & program studi, serta ringkasan statistik belajar kamu di Nassy."
        actions={
          <Link
            href="/coin"
            className="inline-flex items-center rounded-lg bg-[var(--navy)] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--navy-deep)] sm:text-sm"
          >
            🪙 Kelola Dompet Coin
          </Link>
        }
      />

      {/* Skilvul-Style Profile Summary Header Card */}
      <section className="overflow-hidden rounded-2xl border border-[#e5eaf1] bg-white">
        <div className="flex flex-col justify-between gap-5 border-b border-[#eef2f7] bg-gradient-to-r from-[#f5f8fd] to-white p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-center gap-4">
            <AvatarBadge name={currentUser.name} size="lg" highlight />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <h2 className="m-0 font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
                  {currentUser.name}
                </h2>
                <VerifiedBadgeIcon />
              </div>
              <div className="mt-0.5 break-all text-sm text-[var(--muted)]">
                {currentUser.email}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[var(--blue-soft)] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                  🎯 {currentUser.ptn} · {currentUser.major}
                </span>
                <span className="rounded-full border border-[#dce4ef] bg-white px-3 py-1 text-xs font-bold text-[var(--navy)]">
                  {currentUser.class_name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-center">
              <div className="text-[11px] font-bold text-[var(--muted)]">
                Peringkat Belajar
              </div>
              <div className="mt-0.5 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--navy)]">
                {rank ? `#${rank}` : "-"}
              </div>
            </div>
            <div className="rounded-xl border border-[#e5eaf1] bg-white px-4 py-3 text-center">
              <div className="text-[11px] font-bold text-[var(--muted)]">
                Poin Konsistensi
              </div>
              <div className="mt-0.5 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--blue)]">
                {points} pts
              </div>
            </div>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid gap-4 p-5 text-sm sm:grid-cols-2 sm:p-6">
          <div className="rounded-xl border border-[#eef2f7] bg-[#fafcff] p-4">
            <div className="text-xs font-bold text-[var(--muted)]">
              Kelas / Angkatan
            </div>
            <div className="mt-1 font-bold text-[var(--ink)]">
              {currentUser.class_name}
            </div>
          </div>
          <div className="rounded-xl border border-[#eef2f7] bg-[#fafcff] p-4">
            <div className="text-xs font-bold text-[var(--muted)]">
              PTN &amp; Program Studi Tujuan
            </div>
            <div className="mt-1 font-bold text-[var(--ink)]">
              {currentUser.ptn} — {currentUser.major}
            </div>
          </div>
          <div className="rounded-xl border border-[#eef2f7] bg-[#fafcff] p-4">
            <div className="text-xs font-bold text-[var(--muted)]">
              Total Sesi &amp; Waktu Belajar
            </div>
            <div className="mt-1 font-bold text-[var(--ink)]">
              {userEntries.length} catatan · {formatDuration(totalMinutes)} (Streak{" "}
              {streak} hari)
            </div>
          </div>
          <div className="rounded-xl border border-[#f2d07b] bg-[#fffcf0] p-4">
            <div className="text-xs font-bold text-[#8a5300]">Saldo Coin</div>
            <div className="mt-1 flex items-center justify-between gap-2 font-bold text-[var(--navy)]">
              <span>🪙 {coinBalance} Coin</span>
              <Link
                href="/coin"
                className="text-xs font-extrabold text-[var(--blue)] underline"
              >
                Top-Up →
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-[#eef2f7] bg-[#fafcff] p-4 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-bold text-[var(--muted)]">
                  Status Live Class Pass
                </div>
                <div className="mt-1 font-bold text-[var(--ink)]">
                  {hasPass && currentUser.liveclass_pass_until
                    ? `✓ Aktif (${daysLeft} hari tersisa · s.d. ${formatDateTimeId(currentUser.liveclass_pass_until)})`
                    : "Belum aktif — aktifkan 100 Coin untuk akses penuh 30 hari di menu Live Class."}
                </div>
              </div>
              <Link
                href="/live-class"
                className="rounded-lg border border-[#dce4ef] bg-white px-3.5 py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
              >
                Buka Live Class →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
