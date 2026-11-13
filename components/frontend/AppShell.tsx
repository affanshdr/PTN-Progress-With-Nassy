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
  NavIcon,
  VerifiedBadgeIcon,
  type NavIconKey,
} from "@/components/frontend/SkilvulUi";

interface SidebarLinkItem {
  href: string;
  label: string;
  shortLabel: string;
  icon: NavIconKey;
}

const sidebarLinks: readonly SidebarLinkItem[] = [
  { href: "/dashboard", label: "Dashboard", shortLabel: "Home", icon: "dashboard" },
  {
    href: "/bank-soal",
    label: "Bank Soal 7 Subtes",
    shortLabel: "7 Subtes",
    icon: "bank-soal",
  },
  {
    href: "/tryout",
    label: "Tryout Mingguan",
    shortLabel: "Tryout",
    icon: "tryout",
  },
  {
    href: "/live-class",
    label: "Live Class",
    shortLabel: "Live Class",
    icon: "live-class",
  },
  {
    href: "/peringkat",
    label: "Peringkat Belajar",
    shortLabel: "Ranking",
    icon: "peringkat",
  },
  {
    href: "/progres",
    label: "Progres Belajar",
    shortLabel: "Progres",
    icon: "progres",
  },
  {
    href: "/komunitas",
    label: "Komunitas",
    shortLabel: "Komunitas",
    icon: "komunitas",
  },
  {
    href: "/coin",
    label: "Coin & Top-Up",
    shortLabel: "Coin",
    icon: "coin",
  },
  { href: "/profil", label: "Profil Saya", shortLabel: "Profil", icon: "profil" },
] as const;

function isRouteActive(pathname: string, href: string): boolean {
  return (
    pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`))
  );
}

function SidebarNav({
  userName,
  ptn,
  rank,
}: {
  userName: string;
  ptn: string;
  rank: number | null;
}) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Navigasi ruang belajar"
      className="fixed right-0 bottom-0 left-0 z-30 flex h-[62px] items-center gap-1 overflow-x-auto border-t border-[var(--border)] bg-white/95 px-2 py-1.5 backdrop-blur-md lg:sticky lg:top-[86px] lg:block lg:h-auto lg:self-start lg:rounded-2xl lg:border lg:bg-white lg:p-4 lg:shadow-2xs"
    >
      {/* Skilvul-style Student Mini Profile Header inside Desktop Sidebar */}
      <div className="mb-4 hidden border-b border-[var(--border)] pb-4 lg:block">
        <div className="flex items-center gap-3">
          <AvatarBadge name={userName} size="md" highlight />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-extrabold text-[var(--navy)]">
                {userName}
              </span>
              <VerifiedBadgeIcon />
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="rounded-full bg-[var(--blue-soft)] px-2 py-0.5 text-[10px] font-extrabold text-[var(--blue)]">
                {rank === null ? "Pejuang" : `Rank #${rank}`}
              </span>
              <span className="truncate">{ptn}</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-1 lg:block lg:space-y-1">
        {sidebarLinks.map((item) => {
          const isActive = isRouteActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-bold transition lg:w-full lg:px-3.5 lg:py-2.5 lg:text-sm ${
                isActive
                  ? "bg-[var(--blue-soft)] text-[var(--blue)]"
                  : "text-[#526071] hover:bg-[#f8fafc] hover:text-[var(--navy)]"
              }`}
            >
              <NavIcon
                name={item.icon}
                className={`h-4 w-4 lg:h-[18px] lg:w-[18px] ${
                  isActive ? "text-[var(--blue)]" : "text-[#667085]"
                }`}
              />
              <span className="lg:hidden">{item.shortLabel}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

function TopQuickNav() {
  const pathname = usePathname();
  const quickItems = sidebarLinks.slice(0, 5);

  return (
    <div className="hidden items-center gap-1 xl:flex">
      {quickItems.map((item) => {
        const isActive = isRouteActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              isActive
                ? "bg-[var(--blue-soft)] text-[var(--blue)]"
                : "text-[#475467] hover:bg-[#f4f7fb] hover:text-[var(--navy)]"
            }`}
          >
            {item.shortLabel}
          </Link>
        );
      })}
    </div>
  );
}

function MobileMenuDrawer({
  userName,
  ptn,
  rank,
  onClose,
  onLogout,
}: {
  userName: string;
  ptn: string;
  rank: number | null;
  onClose: () => void;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  return (
    <div
      className="fixed inset-x-0 top-[64px] bottom-[62px] z-40 overflow-y-auto border-t border-[var(--border)] bg-white p-4 shadow-lg lg:hidden"
      role="dialog"
      aria-label="Menu navigasi lengkap"
    >
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[#f8fafc] p-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarBadge name={userName} size="md" highlight />
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-extrabold text-[var(--navy)]">
                {userName}
              </span>
              <VerifiedBadgeIcon />
            </div>
            <div className="truncate text-xs text-[var(--muted)]">
              {rank !== null ? `Rank #${rank} · ` : ""}
              {ptn}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-lg border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-bold text-[var(--muted)]"
        >
          Tutup ✕
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {sidebarLinks.map((item) => {
          const isActive = isRouteActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold transition ${
                isActive
                  ? "border-[var(--blue)] bg-[var(--blue-soft)] text-[var(--blue)]"
                  : "border-[var(--border)] bg-white text-[#526071]"
              }`}
            >
              <NavIcon name={item.icon} className="h-4 w-4" />
              <span className="truncate">{item.label}</span>
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
        className="mt-4 w-full cursor-pointer rounded-xl border border-[#ffd4d4] bg-[#fff5f5] py-3 text-xs font-bold text-[#a52b36]"
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
      <div className="grid min-h-screen place-items-center bg-[var(--background)] px-6 text-sm font-medium text-[var(--muted)]">
        Memeriksa sesi belajarmu...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-[var(--background)] px-4 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 text-center shadow-[0_12px_35px_rgba(20,35,55,0.08)] sm:p-8">
          <div className="flex justify-center">
            <NassyLogo compact />
          </div>
          <h1 className="mt-5 text-xl font-extrabold text-[var(--ink)]">
            Masuk untuk melanjutkan
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Masuk atau daftar untuk mengakses Bank Soal 7 Subtes, Tryout
            Mingguan, Live Class, Leaderboard, serta bonus 100 Coin akun baru.
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
              Daftar (+100 Coin)
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
    );
  }

  const firstName = currentUser.name.trim().split(/\s+/)[0] || currentUser.name;

  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--background)] pb-24 lg:pb-10">
      {/* Sticky Top Navbar ala Skilvul Logged-in Header */}
      <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[64px] max-w-[1320px] items-center justify-between gap-3 px-4 sm:h-[70px] sm:px-6">
          <div className="flex min-w-0 items-center gap-3 sm:gap-6">
            <button
              type="button"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka semua menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-white text-xs font-extrabold text-[var(--navy)] lg:hidden"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            <Link href="/dashboard" className="min-w-0">
              <NassyLogo compact />
            </Link>

            <Suspense fallback={null}>
              <TopQuickNav />
            </Suspense>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            <Link
              href="/coin"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#f2d07b] bg-[#fff8e1] px-3 py-1.5 text-xs font-extrabold text-[#8a5300] transition hover:bg-[#fef3c7] sm:text-sm"
              title="Lihat saldo & isi ulang Coin"
            >
              <span>🪙</span>
              <span>{coinBalance} Coin</span>
            </Link>

            {/* Skilvul-style Profile Pill & Rich Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-white py-1 pr-3 pl-1 text-xs font-extrabold text-[var(--navy)] transition hover:border-[var(--blue)] sm:text-sm"
              >
                <AvatarBadge name={currentUser.name} size="sm" />
                <span className="hidden max-w-[110px] truncate uppercase sm:inline">
                  {firstName}
                </span>
                <span className="text-[10px] text-[var(--muted)]">▾</span>
              </button>

              {profileMenuOpen ? (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-[300px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_18px_45px_rgba(16,36,56,0.16)]"
                >
                  <Link
                    href="/profil"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block border-b border-[var(--border)] bg-[#f8fafc] p-4 transition hover:bg-[var(--blue-soft)]/45"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarBadge name={currentUser.name} size="lg" highlight />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-extrabold text-[var(--navy)]">
                            {currentUser.name}
                          </span>
                          <VerifiedBadgeIcon />
                        </div>
                        <div className="mt-0.5 truncate text-xs text-[var(--muted)]">
                          {currentUser.ptn} · {currentUser.class_name}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[var(--muted)]">
                        ›
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs font-bold text-[var(--navy)]">
                      <span>{coinBalance} Coin</span>
                      <span className="h-3.5 w-px bg-[var(--border)]" />
                      <span>{currentStreak} Hari Streak</span>
                      <span className="h-3.5 w-px bg-[var(--border)]" />
                      <span>{rank === null ? "—" : `Rank #${rank}`}</span>
                    </div>
                  </Link>

                  <div className="py-1.5">
                    {(
                      [
                        { href: "/dashboard", label: "Dashboard Saya" },
                        { href: "/bank-soal", label: "Bank Soal 7 Subtes" },
                        { href: "/tryout", label: "Tryout Mingguan" },
                        { href: "/live-class", label: "Live Class" },
                        { href: "/coin", label: "Dompet Coin & Top-Up" },
                      ] as const
                    ).map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold text-[#344054] transition hover:bg-[#f8fafc] hover:text-[var(--blue)]"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      void logout();
                    }}
                    className="w-full cursor-pointer border-t border-[var(--border)] px-4 py-3 text-left text-sm font-bold text-[#b42318] transition hover:bg-[#fff5f5]"
                  >
                    Keluar
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <Suspense fallback={null}>
          <MobileMenuDrawer
            userName={currentUser.name}
            ptn={currentUser.ptn}
            rank={rank}
            onClose={() => setMobileMenuOpen(false)}
            onLogout={() => void logout()}
          />
        </Suspense>
      ) : null}

      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-6 px-4 pt-5 sm:px-6 lg:grid-cols-[252px_1fr] lg:pt-6">
        <Suspense
          fallback={
            <aside className="hidden h-[400px] rounded-2xl border border-[var(--border)] bg-white lg:block" />
          }
        >
          <SidebarNav
            userName={currentUser.name}
            ptn={currentUser.ptn}
            rank={rank}
          />
        </Suspense>

        <main className="min-w-0">
          {schemaNeedsMigration ? (
            <div className="mb-5">
              <SchemaMigrationBanner compact />
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
}
