"use client";

import Link from "next/link";
import { useState } from "react";
import { COIN_PRICING, SNBT_SUBTESTS } from "@/lib/progress-utils";
import { useNassy } from "@/components/frontend/NassyProvider";
import {
  AvatarBadge,
  NassyLogo,
  SubtestThumbnail,
  VerifiedBadgeIcon,
} from "@/components/frontend/SkilvulUi";

const PROGRAM_TABS = [
  {
    id: "bank-soal",
    label: "Bank Soal 7 Subtes",
    badge: "Gratis",
    headline: "Latihan 7 Subtes UTBK-SNBT dengan Pembahasan Terstruktur",
    summary:
      "Kerjakan soal per topik sesuai tingkat kesulitan. Setiap soal langsung menampilkan kunci jawaban dan pembahasan lengkap begitu diperiksa.",
    bullets: [
      "Mencakup seluruh 7 subtes TPS & Literasi SNBT",
      "Filter soal belum dikerjakan, sudah benar, atau perlu evaluasi",
      "Dilengkapi ringkasan materi dan konsep inti di setiap subtes",
    ],
    priceTag: "Gratis",
    href: "/bank-soal",
  },
  {
    id: "tryout",
    label: "Tryout Mingguan",
    badge: `${COIN_PRICING.TRYOUT_WEEKLY_COST} Coin / paket`,
    headline: "Simulasi Ujian Berwaktu dengan Skor Skala SNBT",
    summary:
      "Uji kesiapan ujian dengan timer otomatis, penanda ragu-ragu, penilaian skala SNBT 200–1000, serta rincian akurasi per subtes.",
    bullets: [
      "Bonus 100 Coin saat mendaftar cukup untuk 4x Tryout Mingguan",
      "Evaluasi ketepatan jawaban dan durasi pengerjaan",
      "Terhubung otomatis ke Leaderboard Tryout",
    ],
    priceTag: `${COIN_PRICING.TRYOUT_WEEKLY_COST} Coin`,
    href: "/tryout",
  },
  {
    id: "live-class",
    label: "Live Class Bulanan",
    badge: `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / 30 hari`,
    headline: "Diskusi Soal Intensif Bareng Mentor & Akses Rekaman",
    summary:
      "Buka seluruh jadwal sesi live interaktif dan pustaka video rekaman pembahasan soal selama 30 hari penuh.",
    bullets: [
      "Sesi bedah soal rutin untuk seluruh subtes SNBT",
      "Akses ruang kelas daring, materi PDF, dan rekaman video",
      "Dapat langsung diaktifkan menggunakan bonus 100 Coin pendaftaran",
    ],
    priceTag: `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin`,
    href: "/live-class",
  },
] as const;

const STUDENT_STORIES = [
  {
    name: "Nadia Putri",
    target: "Kedokteran · Universitas Indonesia",
    quote:
      "Bank soalnya rapi per subtes. Jadi gampang cek topik PK dan PM mana yang masih sering salah sebelum ikut tryout mingguan.",
  },
  {
    name: "Rafi Pratama",
    target: "STEI · Institut Teknologi Bandung",
    quote:
      "Catatan progres dan streak harian bikin ritme belajar tetap terjaga. Selesai tryout juga langsung kelihatan evaluasi tiap subtes.",
  },
  {
    name: "Alya Azzahra",
    target: "Psikologi · Universitas Gadjah Mada",
    quote:
      "Bonus 100 Coin di awal langsung kepakai buat ikut tryout dan coba Live Class. Pembahasannya ringkas dan mudah dipahami.",
  },
] as const;

export function LandingView() {
  const { currentUser, openAuthModal } = useNassy();
  const [activeProgramId, setActiveProgramId] = useState<string>(
    PROGRAM_TABS[0].id,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeProgram =
    PROGRAM_TABS.find((tab) => tab.id === activeProgramId) ?? PROGRAM_TABS[0];

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[var(--ink)]">
      {/* Top Navbar (Logo Left | 4 Core Features Center | User/Auth Right) */}
      <nav className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-[min(1160px,92%)] items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <NassyLogo compact />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-[#526071] md:flex">
            <Link
              href="/bank-soal"
              className="transition hover:text-[var(--navy)]"
            >
              Materi
            </Link>
            <Link
              href="/tryout"
              className="transition hover:text-[var(--navy)]"
            >
              Tryout
            </Link>
            <Link
              href="/live-class"
              className="transition hover:text-[var(--navy)]"
            >
              Live Class
            </Link>
            <Link
              href="/komunitas"
              className="transition hover:text-[var(--navy)]"
            >
              Komunitas
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-xl border border-[#dfe5ee] bg-white px-3 py-1.5 text-xs font-bold tracking-wide text-[var(--ink)] transition hover:border-[var(--blue)] sm:px-3.5 sm:py-2"
              >
                <AvatarBadge name={currentUser.name} size="sm" />
                <span className="max-w-[110px] truncate uppercase">
                  {currentUser.name.trim().split(/\s+/)[0] || currentUser.name}
                </span>
              </Link>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="cursor-pointer rounded-lg px-4 py-2 text-sm font-bold text-[var(--navy)] transition hover:bg-[#f4f7fb]"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                >
                  Daftar Gratis
                </button>
              </div>
            )}

            <button
              type="button"
              aria-label="Toggle menu navigasi"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-[#dfe5ee] bg-white text-sm font-bold text-[var(--navy)] md:hidden"
            >
              {mobileNavOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <div className="border-t border-[var(--border)] bg-white px-4 py-4 md:hidden">
            <div className="mx-auto flex w-[min(1160px,100%)] flex-col gap-1.5 text-sm font-semibold text-[var(--ink)]">
              <Link
                href="/bank-soal"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Materi
              </Link>
              <Link
                href="/tryout"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Tryout
              </Link>
              <Link
                href="/live-class"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Live Class
              </Link>
              <Link
                href="/komunitas"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Komunitas
              </Link>
              {!currentUser ? (
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-[var(--border)] pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      openAuthModal("login");
                    }}
                    className="cursor-pointer rounded-lg border border-[var(--border)] bg-white py-2.5 text-xs font-bold text-[var(--navy)]"
                  >
                    Masuk
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileNavOpen(false);
                      openAuthModal("register");
                    }}
                    className="cursor-pointer rounded-lg bg-[var(--navy)] py-2.5 text-xs font-bold text-white"
                  >
                    Daftar Gratis
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>

      {/* Hero Section */}
      <header className="border-b border-[var(--border)] bg-gradient-to-b from-white to-[#f7f9fc] py-12 sm:py-16">
        <div className="mx-auto w-[min(1160px,92%)]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="min-w-0">
              <span className="inline-flex items-center rounded-full bg-[var(--blue-soft)] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                Persiapan UTBK-SNBT Terarah
              </span>

              <h1 className="mt-4 text-[clamp(30px,4.5vw,50px)] leading-[1.1] font-extrabold tracking-[-1.2px] text-[var(--navy)]">
                Latihan 7 Subtes, Uji Skor Tryout, &amp;{" "}
                <span className="text-[var(--blue)]">Raih PTN Impian</span>
              </h1>

              <p className="mt-4 max-w-[560px] text-base leading-relaxed text-[var(--muted)]">
                Pelajari seluruh subtes SNBT lengkap dengan pembahasan gratis,
                pantau progres belajar harian, dan ukur kesiapanmu lewat Tryout
                Mingguan serta Live Class.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {currentUser ? (
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-[var(--navy)] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                  >
                    Lanjutkan ke Dashboard →
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="cursor-pointer rounded-lg bg-[var(--navy)] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                  >
                    Mulai Belajar Gratis →
                  </button>
                )}

                <a
                  href="#subtes"
                  className="rounded-lg border border-[var(--border)] bg-white px-5 py-3 text-center text-sm font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
                >
                  Lihat Materi 7 Subtes
                </a>
              </div>
            </div>

            {/* Clean Overview Card */}
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_12px_32px_rgba(23,50,77,0.06)] sm:p-6">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-3.5">
                <div>
                  <div className="text-sm font-extrabold text-[var(--navy)]">
                    Ringkasan Ruang Belajar
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    Akses langsung setelah mendaftar akun
                  </div>
                </div>
                <span className="rounded-full bg-[#ecfdf3] px-2.5 py-1 text-xs font-extrabold text-[#147a4b]">
                  Bonus +{COIN_PRICING.WELCOME_BONUS} Coin
                </span>
              </div>

              <div className="mt-4 divide-y divide-[#eef2f7] text-sm">
                <div className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="font-bold text-[var(--ink)]">
                      Bank Soal &amp; Pembahasan 7 Subtes
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      PK, PM, PU, PPU, LBI, LBE, PBM
                    </div>
                  </div>
                  <span className="shrink-0 font-extrabold text-[#147a4b]">
                    Gratis
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="font-bold text-[var(--ink)]">
                      Tryout Mingguan Berwaktu
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      Skor skala SNBT &amp; analisis per subtes
                    </div>
                  </div>
                  <span className="shrink-0 font-extrabold text-[var(--blue)]">
                    {COIN_PRICING.TRYOUT_WEEKLY_COST} Coin
                  </span>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div>
                    <div className="font-bold text-[var(--ink)]">
                      Live Class &amp; Rekaman Video
                    </div>
                    <div className="text-xs text-[var(--muted)]">
                      Akses penuh seluruh sesi selama 30 hari
                    </div>
                  </div>
                  <span className="shrink-0 font-extrabold text-[var(--navy)]">
                    {COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 7 Subtes Grid */}
      <section id="subtes" className="py-14 sm:py-16">
        <div className="mx-auto w-[min(1160px,92%)]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[30px]">
              7 Subtes UTBK-SNBT
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Pilih subtes untuk mulai latihan soal interaktif beserta kunci dan
              pembahasannya.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SNBT_SUBTESTS.map((sub) => (
              <article
                key={sub.code}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-sm"
              >
                <div>
                  <SubtestThumbnail
                    code={sub.code}
                    topRightLabel={sub.category}
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-1 text-base font-extrabold text-[var(--ink)]">
                      {sub.name}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                      {sub.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#eef2f7] px-4 py-3">
                  {currentUser ? (
                    <Link
                      href="/bank-soal"
                      className="block w-full rounded-lg bg-[#f4f7fb] py-2 text-center text-xs font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue)] hover:text-white"
                    >
                      Mulai Latihan →
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("register")}
                      className="block w-full cursor-pointer rounded-lg bg-[#f4f7fb] py-2 text-center text-xs font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue)] hover:text-white"
                    >
                      Mulai Latihan →
                    </button>
                  )}
                </div>
              </article>
            ))}

            {/* 8th Card: Tryout Mingguan */}
            <article className="flex flex-col justify-between rounded-2xl border border-[#cde1ff] bg-[#f8fbff] transition hover:-translate-y-0.5 hover:shadow-sm">
              <div>
                <SubtestThumbnail code="ALL" topRightLabel="Simulasi" />
                <div className="p-4">
                  <h3 className="text-base font-extrabold text-[var(--navy)]">
                    Tryout Mingguan SNBT
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
                    Gabungan 7 subtes dalam simulasi berwaktu dengan penilaian
                    skala SNBT dan peringkat nasional.
                  </p>
                </div>
              </div>
              <div className="border-t border-[#e1ecfb] px-4 py-3">
                {currentUser ? (
                  <Link
                    href="/tryout"
                    className="block w-full rounded-lg bg-[var(--navy)] py-2 text-center text-xs font-extrabold text-white transition hover:bg-[var(--blue)]"
                  >
                    Lihat Jadwal Tryout →
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="block w-full cursor-pointer rounded-lg bg-[var(--navy)] py-2 text-center text-xs font-extrabold text-white transition hover:bg-[var(--blue)]"
                  >
                    Coba Tryout →
                  </button>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Program Belajar Section */}
      <section
        id="programs"
        className="border-t border-[var(--border)] bg-[#f8fafc] py-14 sm:py-16"
      >
        <div className="mx-auto w-[min(1160px,92%)]">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[30px]">
                Program Belajar di Nassy
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Pilih mode belajar yang sesuai dengan kebutuhan persiapanmu.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {PROGRAM_TABS.map((tab) => {
                const isSelected = tab.id === activeProgram.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveProgramId(tab.id)}
                    className={`cursor-pointer rounded-lg border px-4 py-2 text-xs font-bold transition sm:text-sm ${
                      isSelected
                        ? "border-[var(--navy)] bg-[var(--navy)] text-white"
                        : "border-[var(--border)] bg-white text-[var(--muted)] hover:text-[var(--navy)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 items-center gap-6 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs sm:p-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <span className="inline-block rounded-full bg-[var(--blue-soft)] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                {activeProgram.badge}
              </span>
              <h3 className="mt-3 text-xl font-extrabold text-[var(--navy)] sm:text-2xl">
                {activeProgram.headline}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {activeProgram.summary}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
                {activeProgram.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-xs font-extrabold text-[var(--blue)]">
                      ✓
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#e5eaf1] bg-[#f8fafd] p-5">
              <div className="text-xs font-bold text-[var(--muted)]">
                Akses Program
              </div>
              <div className="mt-1 text-2xl font-extrabold text-[var(--navy)]">
                {activeProgram.priceTag}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                Pendaftar baru langsung mendapatkan bonus{" "}
                {COIN_PRICING.WELCOME_BONUS} Coin di dompet akun.
              </p>

              {currentUser ? (
                <Link
                  href={activeProgram.href}
                  className="mt-4 block w-full rounded-lg bg-[var(--navy)] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                >
                  Buka {activeProgram.label} →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="mt-4 block w-full cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                >
                  Daftar &amp; Mulai Sekarang →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Student Stories */}
      <section id="stories" className="border-t border-[var(--border)] py-14 sm:py-16">
        <div className="mx-auto w-[min(1160px,92%)]">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[30px]">
              Cerita Pejuang PTN
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Pengalaman teman-teman yang rutin berlatih dan mencatat progres di
              Nassy.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STUDENT_STORIES.map((story) => (
              <article
                key={story.name}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-5"
              >
                <p className="text-sm leading-relaxed text-[#475467]">
                  “{story.quote}”
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-[#eef2f7] pt-3.5">
                  <AvatarBadge name={story.name} size="sm" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 text-sm font-bold text-[var(--navy)]">
                      <span className="truncate">{story.name}</span>
                      <VerifiedBadgeIcon />
                    </div>
                    <div className="truncate text-xs text-[var(--muted)]">
                      {story.target}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="border-t border-[var(--border)] bg-[#f8fafc] py-10 text-sm text-[var(--muted)]">
        <div className="mx-auto flex w-[min(1160px,92%)] flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <NassyLogo compact />
            <p className="mt-2 max-w-md text-xs text-[var(--muted)]">
              Platform persiapan UTBK-SNBT dengan Bank Soal 7 Subtes, Tryout
              Mingguan, Live Class, dan pelacak progres belajar.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-semibold text-[var(--navy)]">
            <a href="#subtes" className="hover:text-[var(--blue)]">
              7 Subtes
            </a>
            <a href="#programs" className="hover:text-[var(--blue)]">
              Program Belajar
            </a>
            <a href="#stories" className="hover:text-[var(--blue)]">
              Testimoni
            </a>
          </div>
        </div>

        <div className="mx-auto mt-6 w-[min(1160px,92%)] border-t border-[var(--border)] pt-5 text-xs text-[var(--muted)]">
          © 2026 PTN Progress with Nassy.
        </div>
      </footer>
    </div>
  );
}
