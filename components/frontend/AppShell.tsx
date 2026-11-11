"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useNassy } from "@/components/frontend/NassyProvider";

const sidebarLinks = [
  { href: "/dashboard", label: "⌂ Dashboard" },
  { href: "/progres", label: "▣ Progres" },
  { href: "/bank-soal", label: "📚 Bank Soal" },
  { href: "/komunitas", label: "◎ Komunitas" },
  { href: "/peringkat", label: "♛ Peringkat" },
  { href: "/profil", label: "◯ Profil" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { currentUser, isInitializing, openAuthModal, logout } = useNassy();

  if (isInitializing) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--background)] px-6 text-sm text-[var(--muted)]">
        Memeriksa sesi belajarmu...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--background)] px-6">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-7 text-center shadow-[0_12px_35px_rgba(20,35,55,0.08)]">
          <div className="text-lg font-extrabold tracking-tight text-[var(--navy)]">
            PTN Progress <span className="text-[var(--blue)]">with Nassy</span>
          </div>
          <h1 className="mt-4 text-xl font-bold text-[var(--ink)]">
            Masuk untuk melanjutkan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Halaman workspace belajar memerlukan akun aktif supaya progres dan
            target PTN kamu tersimpan di Supabase.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2.5">
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white"
            >
              Masuk
            </button>
            <button
              type="button"
              onClick={() => openAuthModal("register")}
              className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--navy)]"
            >
              Daftar
            </button>
            <Link
              href="/"
              className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] pb-20 lg:pb-0">
      <nav className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-[var(--border)] bg-white px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="text-sm font-extrabold tracking-tight text-[var(--navy)] sm:text-base"
        >
          PTN Progress <span className="text-[var(--blue)]">with Nassy</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <span className="text-[13px] text-[var(--muted)]">
            {currentUser.name}
          </span>
          <button
            type="button"
            onClick={() => void logout()}
            className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2 text-sm font-bold text-[var(--navy)] transition hover:-translate-y-0.5"
          >
            Keluar
          </button>
        </div>
      </nav>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 lg:grid-cols-[220px_1fr]">
        <aside className="fixed right-0 bottom-0 left-0 z-30 flex h-[66px] overflow-x-auto border-t border-[var(--border)] bg-white p-1.5 lg:sticky lg:top-[70px] lg:block lg:h-auto lg:min-h-[calc(100vh-70px)] lg:self-start lg:border-t-0 lg:border-r lg:px-3.5 lg:py-5.5">
          {sidebarLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block min-w-[105px] rounded-full px-3 py-3 text-center text-xs font-bold transition lg:my-0.5 lg:w-full lg:text-left lg:text-sm ${
                  isActive
                    ? "bg-[var(--blue-soft)] text-[var(--blue)]"
                    : "text-[#526071] hover:bg-[var(--blue-soft)] hover:text-[var(--blue)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </aside>

        <main className="px-4 py-6 sm:px-7 sm:py-7.5">{children}</main>
      </div>
    </div>
  );
}
