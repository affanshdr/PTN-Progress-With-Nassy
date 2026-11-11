import Link from "next/link";

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Fitur", href: "#fitur" },
  { label: "Progress", href: "#progress" },
] as const;

/**
 * Shared navigation header for public front-end pages.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/80 backdrop-blur dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
        >
          PTN Progress With Nassy
        </Link>

        <nav aria-label="Navigasi utama" className="flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
