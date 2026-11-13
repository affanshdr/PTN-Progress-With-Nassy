import type { ReactNode } from "react";
import type { SnbtSubtestCode } from "@/lib/supabase/types";

export type NavIconKey =
  | "dashboard"
  | "bank-soal"
  | "tryout"
  | "live-class"
  | "peringkat"
  | "progres"
  | "komunitas"
  | "coin"
  | "profil";

/**
 * Extracts up to two uppercase initials for Skilvul-style circular avatars.
 */
export function getInitials(name: string | null | undefined): string {
  const parts = (name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "N";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

/**
 * Geometric isometric cube mark paired with the PTN Progress with Nassy wordmark.
 */
export function NassyLogo({
  compact = false,
  light = false,
}: {
  compact?: boolean;
  light?: boolean;
}) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2.5">
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 2.5L28 9.2V22.8L16 29.5L4 22.8V9.2L16 2.5Z"
          fill="#17324D"
        />
        <path d="M16 2.5L28 9.2L16 15.9L4 9.2L16 2.5Z" fill="#2D6CDF" />
        <path d="M16 15.9L28 9.2V22.8L16 29.5V15.9Z" fill="#1F4D8C" />
        <path d="M16 15.9L4 9.2V22.8L16 29.5V15.9Z" fill="#132940" />
        <path
          d="M11 19.5V12.5L15.2 17.5V12.5"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={`truncate font-extrabold tracking-tight ${
          compact ? "text-sm sm:text-base" : "text-base sm:text-lg"
        } ${light ? "text-white" : "text-[var(--navy)]"}`}
      >
        PTN Progress{" "}
        <span className={light ? "text-[#93c5fd]" : "text-[var(--blue)]"}>
          with Nassy
        </span>
      </span>
    </span>
  );
}

/**
 * Green verified check icon matching Skilvul's profile dropdown badge.
 */
export function VerifiedBadgeIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      aria-label="Akun terverifikasi"
      className="shrink-0"
    >
      <path
        d="M7 0.5C3.1402 0.5 0 3.6402 0 7.5C0 11.3598 3.1402 14.5 7 14.5C10.8598 14.5 14 11.3598 14 7.5C14 3.6402 10.8598 0.5 7 0.5ZM5.6007 10.5891L3.0016 7.9956L3.99 7.0044L5.5993 8.6109L9.3051 4.9051L10.2949 5.8949L5.6007 10.5891Z"
        fill="#147A4B"
      />
    </svg>
  );
}

/**
 * Circular user initials avatar styled after Skilvul's navbar & leaderboard rows.
 */
export function AvatarBadge({
  name,
  size = "md",
  highlight = false,
}: {
  name: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
}) {
  const sizeClass =
    size === "lg"
      ? "h-12 w-12 text-base"
      : size === "sm"
        ? "h-8 w-8 text-xs"
        : "h-10 w-10 text-sm";

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-extrabold uppercase ${sizeClass} ${
        highlight
          ? "bg-[var(--navy)] text-white"
          : "bg-[var(--blue-soft)] text-[var(--blue)]"
      }`}
    >
      {getInitials(name)}
    </span>
  );
}

const NAV_ICON_PATHS: Record<NavIconKey, string> = {
  dashboard:
    "M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-9.5Z",
  "bank-soal":
    "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Zm0 0V19a2 2 0 0 1 2-2h14",
  tryout:
    "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 8 2 2 4-4",
  "live-class":
    "M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14M5 7h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z",
  peringkat:
    "M8 21h8m-4-4v4m-5-9a5 5 0 0 0 10 0V5H7v7Zm-2-6h2v4H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm12 0h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2V6Z",
  progres:
    "M4 19h16M7 15v-4m5 4V7m5 8v-6",
  komunitas:
    "M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1m18 0v-1a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm6 1a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
  coin:
    "M12 6c4.418 0 8 1.343 8 3s-3.582 3-8 3-8-1.343-8-3 3.582-3 8-3Zm0 6v6m8-9v6c0 1.657-3.582 3-8 3s-8-1.343-8-3V9",
  profil:
    "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
};

/**
 * Renders a crisp 18px vector icon for Skilvul-style sidebar and navbar links.
 */
export function NavIcon({
  name,
  className = "h-[18px] w-[18px]",
}: {
  name: NavIconKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d={NAV_ICON_PATHS[name]} />
    </svg>
  );
}

const SUBTEST_THEME: Record<
  SnbtSubtestCode | "ALL",
  { bg: string; facet: string; badge: string; symbol: string }
> = {
  ALL: {
    bg: "from-[#17324d] to-[#2d6cdf]",
    facet: "bg-white/15",
    badge: "7 Subtes",
    symbol: "SNBT",
  },
  PK: {
    bg: "from-[#17324d] to-[#2459bd]",
    facet: "bg-[#60a5fa]/25",
    badge: "TPS",
    symbol: "∑x",
  },
  PM: {
    bg: "from-[#1a3a5c] to-[#2d6cdf]",
    facet: "bg-[#93c5fd]/25",
    badge: "Literasi",
    symbol: "f(x)",
  },
  PU: {
    bg: "from-[#163654] to-[#2563eb]",
    facet: "bg-[#60a5fa]/25",
    badge: "TPS",
    symbol: "P→Q",
  },
  PPU: {
    bg: "from-[#1c3d5a] to-[#3b82f6]",
    facet: "bg-[#bfdbfe]/25",
    badge: "TPS",
    symbol: "Aa",
  },
  LBI: {
    bg: "from-[#15304b] to-[#1d4ed8]",
    facet: "bg-[#93c5fd]/25",
    badge: "Literasi",
    symbol: "ID",
  },
  LBE: {
    bg: "from-[#183756] to-[#2563eb]",
    facet: "bg-[#60a5fa]/25",
    badge: "Literasi",
    symbol: "EN",
  },
  PBM: {
    bg: "from-[#17324d] to-[#3b82f6]",
    facet: "bg-[#bfdbfe]/25",
    badge: "TPS",
    symbol: "¶",
  },
};

/**
 * Skilvul-inspired 16:9 isometric course badge thumbnail for subtest cards.
 */
export function SubtestThumbnail({
  code,
  topRightLabel,
  bottomLeftLabel,
}: {
  code: SnbtSubtestCode | "ALL";
  topRightLabel?: string;
  bottomLeftLabel?: string;
}) {
  const theme = SUBTEST_THEME[code];

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-t-[13px] bg-gradient-to-br ${theme.bg} p-3.5 text-white`}
    >
      <div className="bg-skilvul-grid pointer-events-none absolute inset-0 opacity-35" />

      {/* Isometric diamond emblem echoing Skilvul course icons */}
      <div className="relative flex h-full items-center justify-center">
        <div
          className={`grid h-14 w-14 rotate-45 place-items-center rounded-xl border border-white/25 ${theme.facet} shadow-sm backdrop-blur-xs`}
        >
          <span className="-rotate-45 font-mono text-base font-extrabold tracking-tight text-white">
            {theme.symbol}
          </span>
        </div>
      </div>

      <span className="absolute top-2.5 left-2.5 rounded-full bg-white/92 px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--navy)] shadow-2xs">
        {code === "ALL" ? "SEMUA" : code}
      </span>

      {topRightLabel ? (
        <span className="absolute top-2.5 right-2.5 rounded-full bg-[#eaf2ff] px-2.5 py-0.5 text-[11px] font-extrabold text-[var(--blue)] shadow-2xs">
          {topRightLabel}
        </span>
      ) : null}

      <span className="absolute bottom-2.5 left-2.5 rounded-full bg-white/18 px-2.5 py-0.5 text-[11px] font-bold text-white backdrop-blur-xs">
        {bottomLeftLabel ?? theme.badge}
      </span>
    </div>
  );
}

/**
 * Skilvul-style catalog & workspace hero banner rendered in Nassy's navy-blue palette.
 */
export function WorkspaceHeroBanner({
  badge,
  title,
  description,
  actions,
}: {
  badge: string;
  title: string;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy)] to-[var(--blue)] p-5 text-white shadow-[0_12px_30px_rgba(23,50,77,0.12)] sm:p-7">
      <div className="bg-skilvul-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
        <div className="min-w-0 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#dbeafe]">
            {badge}
          </span>
          <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight text-white sm:text-[30px]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm leading-relaxed text-[#dbeafe]/90">
            {description}
          </p>
        </div>

        {actions ? (
          <div className="flex w-full shrink-0 flex-wrap items-center gap-2.5 lg:w-auto lg:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
    </section>
  );
}
