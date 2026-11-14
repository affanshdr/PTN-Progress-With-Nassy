"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  calculateStreak,
  getUserProgress,
  getUserRank,
} from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import { SchemaMigrationBanner } from "@/components/frontend/SchemaMigrationBanner";
import {
  AvatarBadge,
  NassyLogo,
  VerifiedBadgeIcon,
} from "@/components/frontend/SkilvulUi";

interface TopNavItem {
  href: string;
  label: string;
  children?: ReadonlyArray<{
    href: string;
    label: string;
    desc: string;
  }>;
}

const topNavItems: readonly TopNavItem[] = [
  { href: "/bank-soal", label: "Materi" },
  { href: "/tryout", label: "Tryout" },
  { href: "/live-class", label: "Live Class" },
  {
    href: "/komunitas",
    label: "Komunitas",
    children: [
      {
        href: "/komunitas",
        label: "Komunitas Pejuang",
        desc: "Lihat target PTN dan progres belajar teman seperjuangan",
      },
      {
        href: "/peringkat",
        label: "Leaderboard & Peringkat",
        desc: "Peringkat skor Tryout SNBT dan poin konsistensi belajar",
      },
    ],
  },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function CenterDesktopNav() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!openDropdown) return;

    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <nav
      ref={navRef}
      aria-label="Navigasi utama"
      className="hidden items-center gap-8 md:flex"
    >
      {topNavItems.map((item) => {
        const isActive = item.children
          ? item.children.some((child) => isRouteActive(pathname, child.href))
          : isRouteActive(pathname, item.href);

        if (item.children) {
          const isOpen = openDropdown === item.label;
          return (
            <div key={item.label} className="relative">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() =>
                  setOpenDropdown((prev) =>
                    prev === item.label ? null : item.label,
                  )
                }
                className={`inline-flex cursor-pointer items-center gap-1.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "text-[var(--blue)]"
                    : "text-[#526071] hover:text-[var(--navy)]"
                }`}
              >
                <span>{item.label}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2.5 4.5L6 8L9.5 4.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen ? (
                <div className="absolute left-1/2 mt-2 w-[280px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-2 shadow-[0_16px_38px_rgba(16,36,56,0.12)]">
                  {item.children.map((child) => {
                    const childActive = isRouteActive(pathname, child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`block rounded-xl p-3 transition ${
                          childActive
                            ? "bg-[var(--blue-soft)]/70 text-[var(--blue)]"
                            : "hover:bg-[#f8fafc]"
                        }`}
                      >
                        <div className="text-sm font-bold text-[var(--navy)]">
                          {child.label}
                        </div>
                        <div className="mt-0.5 text-xs leading-relaxed text-[var(--muted)]">
                          {child.desc}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`py-2 text-sm font-semibold transition ${
              isActive
                ? "text-[var(--blue)]"
                : "text-[#526071] hover:text-[var(--navy)]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MobileMenuDrawer({
  onClose,
  onLogout,
}: {
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();
  const mobileLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/bank-soal", label: "Materi (7 Subtes & PDF)" },
    { href: "/tryout", label: "Tryout Mingguan" },
    { href: "/live-class", label: "Live Class" },
    { href: "/komunitas", label: "Komunitas Pejuang" },
    { href: "/peringkat", label: "Leaderboard & Peringkat" },
    { href: "/progres", label: "Catatan Progres" },
    { href: "/coin", label: "Dompet Coin" },
    { href: "/profil", label: "Profil Saya" },
  ] as const;

  return (
    <div
      className="border-t border-[var(--border)] bg-white px-4 py-4 shadow-md md:hidden"
      role="dialog"
      aria-label="Menu navigasi mobile"
    >
      <div className="flex flex-col gap-1">
        {mobileLinks.map((item) => {
          const isActive = isRouteActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-[var(--blue-soft)] text-[var(--blue)]"
                  : "text-[#475467] hover:bg-[#f8fafc]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          onClose();
          onLogout();
        }}
        className="mt-3 w-full cursor-pointer rounded-xl border border-[#ffd4d4] bg-[#fff5f5] py-2.5 text-xs font-bold text-[#a52b36]"
      >
        Keluar Akun
      </button>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const {
    currentUser,
    coinBalance,
    allUsers,
    allProgress,
    schemaNeedsMigration,
    isInitializing,
    openAuthModal,
    logout,
  } = useNassy();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const userEntries = useMemo(
    () => getUserProgress(allProgress, currentUser?.id),
    [allProgress, currentUser?.id],
  );
  const currentStreak = useMemo(
    () => calculateStreak(userEntries),
    [userEntries],
  );
  const rank = useMemo(
    () => getUserRank(currentUser?.id, allUsers, allProgress),
    [allProgress, allUsers, currentUser?.id],
  );

  useEffect(() => {
    if (!profileMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [profileMenuOpen]);

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="grid min-h-screen place-items-center px-6 text-sm font-medium text-[var(--muted)]">
          Memeriksa sesi belajarmu...
        </div>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <div className="grid min-h-screen place-items-center px-4 sm:px-6">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 text-center shadow-[0_12px_35px_rgba(20,35,55,0.08)] sm:p-8">
            <div className="flex justify-center">
              <NassyLogo compact />
            </div>
            <h1 className="mt-5 text-xl font-extrabold text-[var(--ink)]">
              Masuk untuk melanjutkan
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              Masuk atau daftar untuk mengakses Materi 7 Subtes, Tryout
              Mingguan, Live Class, dan Komunitas.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="cursor-pointer rounded-lg bg-[var(--navy)] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--blue)]"
              >
                Masuk
              </button>
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="cursor-pointer rounded-lg border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-bold text-[var(--navy)] transition hover:border-[var(--blue)]"
              >
                Daftar Gratis
              </button>
              <Link
                href="/"
                className="rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)] hover:text-[var(--ink)]"
              >
                Beranda
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden" aria-hidden="true">
          {children}
        </div>
      </div>
    );
  }

  const firstName = currentUser.name.trim().split(/\s+/)[0] || currentUser.name;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--background)] pb-14">
      {/* Skilvul-style Top Navbar: Left Logo | Center Features | Right User Button */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-[min(1160px,92%)] items-center justify-between gap-4">
          <Link href="/dashboard" className="min-w-0 shrink-0">
            <NassyLogo compact />
          </Link>

          <Suspense fallback={null}>
            <CenterDesktopNav />
          </Suspense>

          <div className="flex shrink-0 items-center gap-2.5">
            {/* Skilvul User Pill Button (`[AS] AFFAN`) */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#dfe5ee] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--ink)] transition hover:border-[var(--blue)] sm:px-3.5 sm:py-2"
              >
                <AvatarBadge name={currentUser.name} size="sm" />
                <span className="max-w-[110px] truncate uppercase">
                  {firstName}
                </span>
              </button>

              {profileMenuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-[280px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_16px_38px_rgba(16,36,56,0.14)]"
                >
                  <Link
                    href="/profil"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block border-b border-[var(--border)] bg-[#f8fafc] p-4 transition hover:bg-[var(--blue-soft)]/40"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarBadge name={currentUser.name} size="md" highlight />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span className="truncate text-sm font-extrabold text-[var(--navy)]">
                            {currentUser.name}
                          </span>
                          <VerifiedBadgeIcon />
                        </div>
                        <div className="mt-0.5 truncate text-xs text-[var(--muted)]">
                          {currentUser.ptn} · {currentUser.class_name}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[var(--navy)]">
                      <span>🪙 {coinBalance} Coin</span>
                      <span className="h-3 w-px bg-[var(--border)]" />
                      <span>Streak {currentStreak}h</span>
                      <span className="h-3 w-px bg-[var(--border)]" />
                      <span>{rank === null ? "—" : `Rank #${rank}`}</span>
                    </div>
                  </Link>

                  <div className="py-1.5">
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#f8fafc] hover:text-[var(--blue)]"
                    >
                      Dashboard Belajar
                    </Link>
                    <Link
                      href="/progres"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#f8fafc] hover:text-[var(--blue)]"
                    >
                      Catatan Progres
                    </Link>
                    <Link
                      href="/coin"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#f8fafc] hover:text-[var(--blue)]"
                    >
                      <span>Dompet Coin</span>
                      <span className="rounded-full bg-[#fff8e1] px-2 py-0.5 text-xs font-bold text-[#8a5300]">
                        {coinBalance} Coin
                      </span>
                    </Link>
                    <Link
                      href="/profil"
                      role="menuitem"
                      onClick={() => setProfileMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#f8fafc] hover:text-[var(--blue)]"
                    >
                      Profil Saya
                    </Link>
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      void logout();
                    }}
                    className="w-full cursor-pointer border-t border-[var(--border)] px-4 py-2.5 text-left text-sm font-bold text-[#b42318] transition hover:bg-[#fff5f5]"
                  >
                    Keluar
                  </button>
                </div>
              ) : null}
            </div>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-[#dfe5ee] bg-white text-xs font-extrabold text-[var(--navy)] md:hidden"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <Suspense fallback={null}>
            <MobileMenuDrawer
              onClose={() => setMobileMenuOpen(false)}
              onLogout={() => void logout()}
            />
          </Suspense>
        ) : null}
      </header>

      {/* Main Content Container (Full-width clean workspace without left sidebar) */}
      <main className="mx-auto w-[min(1160px,92%)] pt-6 sm:pt-8">
        {schemaNeedsMigration ? (
          <div className="mb-5">
            <SchemaMigrationBanner compact />
          </div>
        ) : null}
        {children}
      </main>
    </div>
  );
}
