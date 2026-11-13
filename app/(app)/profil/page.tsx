"use client";

import Link from "next/link";
import {
  formatDateTimeId,
  getDaysRemaining,
  isLiveClassPassActive,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";

export default function ProfilPage() {
  const { currentUser, coinBalance } = useNassy();

  if (!currentUser) return null;

  const initial = (currentUser.name || "N")[0]?.toUpperCase() ?? "N";
  const hasPass = isLiveClassPassActive(currentUser.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser.liveclass_pass_until);

  return (
    <div>
      <div className="mb-6">
        <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
          Profil Saya
        </h1>
        <div className="text-sm text-[var(--muted)]">
          Informasi akun, target PTN, dan status Coin kamu.
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

        <div className="grid gap-3.5 text-sm sm:grid-cols-2">
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
          <div>
            <b className="block text-[var(--ink)]">Saldo Coin</b>
            <div className="font-bold text-[#8a5300]">
              🪙 {coinBalance} Coin ·{" "}
              <Link href="/coin" className="text-[var(--blue)] underline">
                Kelola Dompet
              </Link>
            </div>
          </div>
          <div className="sm:col-span-2">
            <b className="block text-[var(--ink)]">Live Class Pass</b>
            <div className="text-[var(--muted)]">
              {hasPass && currentUser.liveclass_pass_until
                ? `Aktif (${daysLeft} hari tersisa · s.d. ${formatDateTimeId(currentUser.liveclass_pass_until)})`
                : "Belum aktif — aktifkan 100 Coin untuk akses 30 hari di menu Live Class."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
