"use client";

import { useNassy } from "@/components/frontend/NassyProvider";

export default function ProfilPage() {
  const { currentUser } = useNassy();

  if (!currentUser) return null;

  const initial = (currentUser.name || "N")[0]?.toUpperCase() ?? "N";

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
          Profil Saya
        </h1>
        <div className="text-sm text-[var(--muted)]">
          Informasi akun dan targetmu.
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--blue-soft)] font-extrabold text-[var(--blue)]">
            {initial}
          </div>
          <div>
            <h2 className="m-0 text-xl font-bold text-[var(--ink)]">
              {currentUser.name}
            </h2>
            <div className="text-sm text-[var(--muted)]">
              {currentUser.email}
            </div>
          </div>
        </div>

        <hr className="my-5 border-0 border-t border-[var(--border)]" />

        <div className="grid gap-3.5 text-sm">
          <div>
            <b className="block text-[var(--ink)]">Kelas</b>
            <div className="text-[var(--muted)]">{currentUser.class_name}</div>
          </div>
          <div>
            <b className="block text-[var(--ink)]">PTN Tujuan</b>
            <div className="text-[var(--muted)]">{currentUser.ptn}</div>
          </div>
          <div>
            <b className="block text-[var(--ink)]">Program Studi</b>
            <div className="text-[var(--muted)]">{currentUser.major}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
