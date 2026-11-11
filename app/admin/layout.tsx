import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin | PTN Progress with Nassy",
  description:
    "Panel admin dan manajemen back-end Supabase untuk PTN Progress with Nassy.",
};

const adminNavItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/progres", label: "Kelola Progres" },
  { href: "/admin/bank-soal", label: "Kelola Bank Soal" },
] as const;

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#f6f8fb] text-[#17202a]">
      <header className="sticky top-0 z-20 border-b border-[#e6eaf0] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-base font-extrabold tracking-tight text-[#17324d]"
            >
              Admin <span className="text-[#2d6cdf]">Nassy</span>
            </Link>
            <span className="rounded-full bg-[#eaf2ff] px-2.5 py-0.5 text-xs font-bold text-[#2d6cdf]">
              Branch Andre
            </span>
          </div>

          <nav
            aria-label="Navigasi admin"
            className="flex flex-wrap items-center gap-5"
          >
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[#526071] transition-colors hover:text-[#17324d]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-lg border border-[#e6eaf0] px-3 py-1.5 text-xs font-bold text-[#17324d] transition-colors hover:bg-[#f6f8fb]"
            >
              Halaman Publik
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
