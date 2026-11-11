"use client";

import Link from "next/link";
import { useNassy } from "@/components/frontend/NassyProvider";

const featureCards = [
  {
    icon: "📚",
    title: "Progress Tracker",
    description:
      "Catat subtes, materi, kendala, target besok, durasi, dan bukti belajar.",
  },
  {
    icon: "🔥",
    title: "Streak",
    description:
      "Bangun konsistensi dari hari ke hari dan lihat rekor belajarmu sendiri.",
  },
  {
    icon: "🏆",
    title: "Leaderboard",
    description: "Ikuti peringkat komunitas berdasarkan poin progres belajar.",
  },
  {
    icon: "👥",
    title: "Community",
    description: "Lihat perjalanan belajar teman dan saling memberi apresiasi.",
  },
  {
    icon: "🎯",
    title: "Target PTN",
    description:
      "Simpan PTN dan program studi tujuan sebagai pengingat perjalananmu.",
  },
  {
    icon: "☁️",
    title: "Database Supabase",
    description: "Data tersimpan permanen secara online dan aman.",
  },
] as const;

export function LandingView() {
  const { currentUser, openAuthModal } = useNassy();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <nav className="sticky top-0 z-20 flex h-[72px] items-center border-b border-[var(--border)] bg-white/92 backdrop-blur-md">
        <div className="mx-auto flex w-[min(1160px,92%)] items-center justify-between">
          <div className="text-sm font-extrabold tracking-tight text-[var(--navy)] sm:text-base">
            PTN Progress <span className="text-[var(--blue)]">with Nassy</span>
          </div>

          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <Link
                href="/dashboard"
                className="rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Buka Dashboard →
              </Link>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--navy)] transition hover:-translate-y-0.5"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Daftar
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <header className="bg-gradient-to-b from-white to-[#f6f8fb] py-16 md:py-22">
        <div className="mx-auto grid w-[min(1160px,92%)] grid-cols-1 items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce7f6] bg-white px-3 py-1.5 text-[13px] font-extrabold text-[var(--blue)]">
              ✦ Study community for PTN fighters
            </div>

            <h1 className="my-4.5 text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-2.5px] text-[var(--ink)]">
              Catat progres.
              <br />
              <span className="text-[var(--blue)]">Jaga konsistensi.</span>
              <br />
              Raih PTN impian.
            </h1>

            <p className="max-w-[650px] text-lg leading-relaxed text-[var(--muted)]">
              PTN Progress with Nassy adalah ruang belajar untuk mencatat
              perjalananmu, membangun streak, melihat progres teman, dan tumbuh
              bersama menuju kampus tujuan.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {currentUser ? (
                <Link
                  href="/dashboard"
                  className="rounded-[10px] bg-[var(--navy)] px-4.5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Masuk ke Workspace →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4.5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
                >
                  Mulai Sekarang →
                </button>
              )}
              <a
                href="#features"
                className="rounded-[10px] border border-[var(--border)] bg-white px-4.5 py-3 text-sm font-bold text-[var(--navy)] transition hover:-translate-y-0.5"
              >
                Lihat Fitur
              </a>
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--border)] bg-white p-5.5 shadow-[0_12px_35px_rgba(20,35,55,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <b className="block text-sm font-bold">Progress Overview</b>
                <div className="text-xs text-[var(--muted)]">
                  Dashboard Online
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--blue-soft)] font-extrabold text-[var(--blue)]">
                N
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold sm:text-2xl">
                  Realtime
                </b>
                <small className="text-xs text-[var(--muted)]">Progres</small>
              </div>
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold sm:text-2xl">
                  Cloud
                </b>
                <small className="text-xs text-[var(--muted)]">Database</small>
              </div>
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold sm:text-2xl">
                  Online
                </b>
                <small className="text-xs text-[var(--muted)]">Status</small>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] border border-[var(--border)] p-4">
              <b className="text-sm font-bold">Belajar hari ini?</b>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">
                Satu progres kecil tetap berarti.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-18">
        <div className="mx-auto w-[min(1160px,92%)]">
          <div className="mx-auto mb-9 max-w-[650px] text-center">
            <h2 className="mb-2.5 text-[34px] font-bold tracking-[-1.2px]">
              Satu tempat untuk perjalanan belajarmu.
            </h2>
            <p className="leading-relaxed text-[var(--muted)]">
              Dirancang sederhana supaya fokus tetap pada belajar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[18px] border border-[var(--border)] bg-white p-6"
              >
                <div className="text-2xl">{card.icon}</div>
                <h3 className="mt-3.5 mb-1.5 text-lg font-bold">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--muted)]">
                  {card.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border)] py-7 text-sm text-[var(--muted)]">
        <div className="mx-auto w-[min(1160px,92%)]">
          © 2026 PTN Progress with Nassy · Built for consistent learners.
        </div>
      </footer>
    </div>
  );
}
