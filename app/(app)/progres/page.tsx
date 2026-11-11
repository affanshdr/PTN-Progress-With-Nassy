"use client";

import { getUserProgress } from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import { ProgressFeedList } from "@/components/frontend/ProgressFeedList";

export default function ProgresPage() {
  const { currentUser, allProgress, openProgressModal } = useNassy();

  if (!currentUser) return null;

  const userEntries = getUserProgress(allProgress, currentUser.id);

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            Progres Belajar
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Semua catatan perjalanan belajarmu.
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

      <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
        <ProgressFeedList
          entries={userEntries}
          emptyMessage="Belum ada catatan progres."
        />
      </div>
    </div>
  );
}
