"use client";

import { useMemo, useState } from "react";
import {
  calculateTotalMinutes,
  formatDuration,
  getUserProgress,
  pointsForUser,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import {
  AvatarBadge,
  VerifiedBadgeIcon,
  WorkspaceHeroBanner,
} from "@/components/frontend/SkilvulUi";

export default function KomunitasPage() {
  const { currentUser, allUsers, allProgress } = useNassy();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return allUsers;
    return allUsers.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.ptn.toLowerCase().includes(q) ||
        member.major.toLowerCase().includes(q) ||
        member.class_name.toLowerCase().includes(q),
    );
  }, [allUsers, searchQuery]);

  return (
    <div className="space-y-6">
      <WorkspaceHeroBanner
        badge="JEJARING PEJUANG PTN"
        title="Komunitas Belajar SNBT"
        description="Pantau target PTN dan progres belajar teman-teman seperjuangan untuk menjaga semangat dan konsistensi setiap hari."
        actions={
          <div className="rounded-lg border border-[#dce4ef] bg-white px-4 py-2 text-xs font-extrabold text-[var(--navy)]">
            {allUsers.length} Pejuang Terdaftar
          </div>
        }
      />

      {/* Search Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e5eaf1] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari nama teman, target PTN (misal: UI, ITB), jurusan, atau kelas..."
          className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--blue)] focus:bg-white sm:max-w-md"
        />
        <div className="text-xs font-semibold text-[var(--muted)]">
          Menampilkan {filteredMembers.length} dari {allUsers.length} anggota
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="rounded-2xl border border-[#e5eaf1] bg-white py-10 text-center text-sm text-[var(--muted)]">
          {allUsers.length === 0
            ? "Belum ada anggota."
            : "Tidak ada anggota yang cocok dengan pencarianmu."}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => {
            const entries = getUserProgress(allProgress, member.id);
            const latest = entries[0];
            const minutes = calculateTotalMinutes(entries);
            const points = pointsForUser(member.id, allProgress);
            const isMe = currentUser?.id === member.id;

            return (
              <article
                key={member.id}
                className={`flex flex-col justify-between rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-[0_12px_26px_rgba(23,50,77,0.07)] ${
                  isMe ? "border-[#9fc0f7] bg-[#f8fbff]" : "border-[#e5eaf1]"
                }`}
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <AvatarBadge
                      name={member.name}
                      size="md"
                      highlight={isMe || entries.length > 0}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h2 className="m-0 truncate font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--ink)]">
                          {member.name}
                        </h2>
                        {entries.length >= 3 ? <VerifiedBadgeIcon /> : null}
                        {isMe ? (
                          <span className="rounded-full bg-[var(--blue-soft)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--blue)]">
                            Kamu
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-0.5 truncate text-xs font-semibold text-[var(--navy)]">
                        {member.ptn} — {member.major}
                      </div>
                      <div className="text-[11px] text-[var(--muted)]">
                        {member.class_name}
                      </div>
                    </div>
                  </div>

                  {latest ? (
                    <div className="mt-4 rounded-xl border border-[#eef2f7] bg-[#f8fafd] p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded bg-[var(--blue-soft)] px-2 py-0.5 text-[11px] font-extrabold text-[var(--blue)]">
                          {latest.subtest}
                        </span>
                        <span className="text-[11px] text-[var(--muted)]">
                          {latest.date}
                        </span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#4f5d70]">
                        {latest.progress}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-xl border border-dashed border-[#e2e8f0] bg-[#fafcff] p-3 text-xs text-[var(--muted)]">
                      Belum membagikan catatan progres belajar.
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#eef2f7] pt-3 text-xs">
                  <span className="font-bold text-[var(--navy)]">
                    📚 {entries.length} Sesi
                  </span>
                  <span className="text-[var(--muted)]">
                    ⏱ {formatDuration(minutes)}
                  </span>
                  <span className="rounded-full bg-[#eef4ff] px-2.5 py-0.5 font-extrabold text-[var(--blue)]">
                    {points} pts
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
