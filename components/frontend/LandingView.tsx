"use client";

import Link from "next/link";
import { COIN_PRICING } from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";

const featureCards = [
  {
    icon: "📚",
    title: "Soal + Pembahasan 7 Subtes",
    description:
      "Latihan interaktif gratis mencakup PK, PM, PU, PPU, LBI, LBE, dan PBM lengkap dengan kunci & pembahasan.",
  },
  {
    icon: "📝",
    title: "Tryout Mingguan & Leaderboard",
    description: `Ikuti Tryout mingguan hanya ${COIN_PRICING.TRYOUT_WEEKLY_COST} Coin, dilengkapi timer, auto-skor SNBT, pembahasan, dan papan peringkat.`,
  },
  {
    icon: "🎥",
    title: "Live Class Bulanan",
    description: `Aktifkan Live Class Pass ${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin untuk akses penuh kelas interaktif dan rekaman selama 30 hari.`,
  },
  {
    icon: "🪙",
    title: "Bonus 100 Coin Akun Baru",
    description:
      "Setiap pendaftar baru langsung menerima 100 Coin awal untuk mencoba Tryout atau mengaktifkan Live Class Pass.",
  },
  {
    icon: "🔥",
    title: "Progress & Streak Tracker",
    description:
      "Catat progres harian, durasi belajar, dan bangun streak konsistensi menuju PTN impian.",
  },
  {
    icon: "👥",
    title: "Komunitas Pejuang PTN",
    description:
      "Lihat perjalanan belajar teman seperjuangan dan bersaing sehat di Leaderboard.",
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
                  Daftar (+100 Coin)
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
              ✦ 7 Subtes · Tryout Mingguan · Live Class · Bonus 100 Coin
            </div>

            <h1 className="my-4.5 text-[clamp(40px,6vw,72px)] leading-[1.02] font-extrabold tracking-[-2.5px] text-[var(--ink)]">
              Latihan terarah.
              <br />
              <span className="text-[var(--blue)]">Tryout terukur.</span>
              <br />
              Raih PTN impian.
            </h1>

            <p className="max-w-[650px] text-lg leading-relaxed text-[var(--muted)]">
              Pelajari 7 subtes SNBT lengkap dengan pembahasannya, ikuti Tryout
              mingguan dengan Leaderboard nasional, dan bergabung di Live Class
              bareng mentor terbaik.
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
                  Daftar & Klaim 100 Coin →
                </button>
              )}
              <a
                href="#features"
                className="rounded-[10px] border border-[var(--border)] bg-white px-4.5 py-3 text-sm font-bold text-[var(--navy)] transition hover:-translate-y-0.5"
              >
                Lihat Fitur & Tarif Coin
              </a>
            </div>
          </div>

          <div className="rounded-[22px] border border-[var(--border)] bg-white p-5.5 shadow-[0_12px_35px_rgba(20,35,55,0.08)]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <b className="block text-sm font-bold">Ekonomi Coin Nassy</b>
                <div className="text-xs text-[var(--muted)]">
                  Transparan & Fleksibel
                </div>
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#fff8e1] text-lg">
                🪙
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold text-[var(--navy)] sm:text-2xl">
                  +100
                </b>
                <small className="text-xs text-[var(--muted)]">
                  Bonus Daftar
                </small>
              </div>
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold text-[var(--blue)] sm:text-2xl">
                  25
                </b>
                <small className="text-xs text-[var(--muted)]">
                  Coin / Tryout
                </small>
              </div>
              <div className="rounded-[14px] border border-[var(--border)] p-4">
                <b className="block text-xl font-extrabold text-[var(--navy)] sm:text-2xl">
                  100
                </b>
                <small className="text-xs text-[var(--muted)]">
                  Live Class / Bln
                </small>
              </div>
            </div>

            <div className="mt-4 rounded-[14px] border border-[var(--border)] p-4">
              <b className="text-sm font-bold">7 Subtes Lengkap Gratis</b>
              <p className="mt-1.5 text-[13px] text-[var(--muted)]">
                PK · PM · PU · PPU · LBI · LBE · PBM disertai kunci jawaban dan
                pembahasan langkah demi langkah.
              </p>
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="py-18">
        <div className="mx-auto w-[min(1160px,92%)]">
          <div className="mx-auto mb-9 max-w-[650px] text-center">
            <h2 className="mb-2.5 text-[34px] font-bold tracking-[-1.2px]">
              Semua amunisi UTBK-SNBT dalam satu tempat.
            </h2>
            <p className="leading-relaxed text-[var(--muted)]">
              Mulai dari latihan subtes gratis hingga Tryout mingguan dan Live
              Class intensif.
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
