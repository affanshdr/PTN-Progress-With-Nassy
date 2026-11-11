"use client";

import { getUserProgress } from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";

export default function KomunitasPage() {
  const { allUsers, allProgress } = useNassy();

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
          Komunitas
        </h1>
        <div className="text-sm text-[var(--muted)]">
          Lihat progres belajar yang dibagikan komunitas.
        </div>
      </div>

      {allUsers.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white py-9 text-center text-sm text-[var(--muted)]">
          Belum ada anggota.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {allUsers.map((member) => {
            const entries = getUserProgress(allProgress, member.id);
            const latest = entries[0];
            const initial = (member.name || "N")[0]?.toUpperCase() ?? "N";

            return (
              <article
                key={member.id}
                className="rounded-2xl border border-[var(--border)] bg-white p-4.5"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--blue-soft)] font-extrabold text-[var(--blue)]">
                    {initial}
                  </div>
                  <div>
                    <h2 className="m-0 text-base font-bold text-[var(--ink)]">
                      {member.name}
                    </h2>
                    <div className="text-xs text-[var(--muted)]">
                      {member.class_name} · {member.ptn}
                    </div>
                  </div>
                </div>

                {latest ? (
                  <>
                    <p className="mt-3 text-sm leading-relaxed text-[#566273]">
                      <b>{latest.subtest}</b> · {latest.progress}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[#536070]">
                        📚 {entries.length} progres
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="mt-3 text-sm text-[#566273]">
                    Belum membagikan progres.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
