"use client";

import { getLeaderboard } from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";

export default function PeringkatPage() {
  const { allUsers, allProgress } = useNassy();
  const leaderboard = getLeaderboard(allUsers, allProgress);

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
          🏆 Peringkat
        </h1>
        <div className="text-sm text-[var(--muted)]">
          Papan peringkat berdasarkan poin progres.
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
        {leaderboard.length === 0 ? (
          <div className="py-9 text-center text-sm text-[var(--muted)]">
            Belum ada anggota.
          </div>
        ) : (
          leaderboard.map((item, idx) => (
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
    </div>
  );
}
