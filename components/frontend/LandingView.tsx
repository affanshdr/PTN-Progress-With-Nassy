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

const MARQUEE_TAGS = [
  "Pengetahuan Kuantitatif (PK)",
  "Penalaran Matematika (PM)",
  "Penalaran Umum (PU)",
  "Pengetahuan & Pemahaman Umum (PPU)",
  "Literasi Bahasa Indonesia (LBI)",
  "Literasi Bahasa Inggris (LBE)",
  "Pemahaman Bacaan & Menulis (PBM)",
  "Tryout Mingguan SNBT",
  "Live Class Mentor",
  "Streak & Progress Tracker",
] as const;

const HERO_BANNERS = [
  {
    id: "subtes",
    pill: "100% GRATIS",
    title: "Latihan 7 Subtes SNBT + Pembahasan Langkah Demi Langkah",
    desc: "Akses PK, PM, PU, PPU, LBI, LBE, PBM kapan saja lengkap dengan kunci jawaban dan arsip modul PDF.",
    cta: "Coba Bank Soal",
  },
  {
    id: "tryout",
    pill: `${COIN_PRICING.TRYOUT_WEEKLY_COST} COIN / EVENT`,
    title: "Tryout Mingguan Berwaktu dengan Skor Skala SNBT & Leaderboard",
    desc: "Simulasi ujian lengkap dengan penanda ragu-ragu, analisis akurasi per subtes, dan peringkat nasional.",
    cta: "Lihat Tryout Mingguan",
  },
  {
    id: "liveclass",
    pill: `${COIN_PRICING.LIVECLASS_MONTHLY_COST} COIN / 30 HARI`,
    title: "Live Class Interaktif & Rekaman VOD Bareng Mentor PTN",
    desc: "Bedah soal HOTS setiap minggu plus akses ulang rekaman video dan materi PDF selama 30 hari penuh.",
    cta: "Pelajari Live Class",
  },
] as const;

const PROGRAM_TABS = [
  {
    id: "bank-soal",
    label: "Bank Soal 7 Subtes",
    badge: "Akses Gratis Selamanya",
    headline: "Kuasai 7 Subtes UTBK-SNBT dengan Pembahasan Terstruktur",
    summary:
      "Latihan soal per topik dengan tingkat kesulitan Mudah, Sedang, dan Sulit. Setiap jawaban langsung menampilkan kunci dan pembahasan mendalam serta tersimpan otomatis di riwayat belajarmu.",
    bullets: [
      "Mencakup seluruh 7 subtes TPS & Literasi SNBT",
      "Filter soal belum dikerjakan, sudah benar, atau perlu review",
      "Dilengkapi arsip modul PDF di Supabase Storage",
    ],
    priceTag: "GRATIS",
    href: "/bank-soal",
  },
  {
    id: "tryout",
    label: "Tryout Mingguan",
    badge: `Hanya ${COIN_PRICING.TRYOUT_WEEKLY_COST} Coin / Tryout`,
    headline: "Ukur Kesiapan Ujian Lewat Simulasi SNBT Berwaktu & Ranking",
    summary:
      "Rasakan atmosfer ujian sesungguhnya dengan timer otomatis, draft jawaban aman, tombol ragu-ragu, penilaian skala SNBT 200–1000, serta grafik evaluasi tiap subtes.",
    bullets: [
      "Bonus 100 Coin saat daftar cukup untuk 4x Tryout Mingguan",
      "Analisis akurasi & waktu pengerjaan per subtes",
      "Terhubung langsung ke Podium Leaderboard Mingguan",
    ],
    priceTag: `${COIN_PRICING.TRYOUT_WEEKLY_COST} Coin`,
    href: "/tryout",
  },
  {
    id: "live-class",
    label: "Live Class Bulanan",
    badge: `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / 30 Hari`,
    headline: "Belajar Bareng Mentor & Akses Rekaman VOD Tanpa Batas",
    summary:
      "Aktifkan Live Class Pass untuk membuka seluruh jadwal kelas tatap muka daring dan pustaka rekaman pembahasan soal sulit selama 30 hari.",
    bullets: [
      "Jadwal live interaktif untuk seluruh subtes SNBT",
      "Akses link Zoom/Meet, materi PDF, dan rekaman VOD",
      "Bisa langsung diaktifkan memakai bonus 100 Coin akun baru",
    ],
    priceTag: `${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin`,
    href: "/live-class",
  },
] as const;

const STUDENT_STORIES = [
  {
    name: "Nadia Putri",
    target: "Target: Kedokteran · Universitas Indonesia",
    quote:
      "Tampilan bank soalnya rapi banget per subtes. Jadi gampang cek mana topik PK dan PM yang masih sering salah sebelum ikut tryout mingguan.",
  },
  {
    name: "Rafi Pratama",
    target: "Target: STEI · Institut Teknologi Bandung",
    quote:
      "Leaderboard dan streak harian bikin belajar nggak gampang bolos. Apalagi tryout-nya langsung kasih breakdown skor tiap subtes.",
  },
  {
    name: "Alya Azzahra",
    target: "Target: Psikologi · Universitas Gadjah Mada",
    quote:
      "Bonus 100 Coin di awal langsung kepake buat cobain tryout dan buka Live Class Pass. Pembahasannya jelas dan enak dibaca ulang.",
  },
] as const;

const AVATAR_SAMPLES = ["NP", "RP", "AA", "DK", "MF"] as const;

export function LandingView() {
  const { currentUser, openAuthModal } = useNassy();
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [activeProgramId, setActiveProgramId] = useState<string>(
    PROGRAM_TABS[0].id,
  );
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeBanner = HERO_BANNERS[activeHeroIdx] ?? HERO_BANNERS[0];
  const activeProgram =
    PROGRAM_TABS.find((tab) => tab.id === activeProgramId) ?? PROGRAM_TABS[0];

  function handleActionOrAuth(href: string) {
    if (currentUser) {
      return href;
    }
    return undefined;
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[var(--ink)]">
      {/* Sticky Top Navbar ala Skilvul */}
      <nav className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] w-[min(1200px,92%)] items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="shrink-0">
              <NassyLogo compact />
            </Link>

            <div className="hidden items-center gap-6 text-sm font-semibold text-[#475467] lg:flex">
              <a
                href="#programs"
                className="transition hover:text-[var(--blue)]"
              >
                Program Belajar
              </a>
              <a href="#subtes" className="transition hover:text-[var(--blue)]">
                7 Subtes
              </a>
              <a href="#impact" className="transition hover:text-[var(--blue)]">
                Keunggulan
              </a>
              <a
                href="#stories"
                className="transition hover:text-[var(--blue)]"
              >
                Cerita Pejuang
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {currentUser ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-[var(--navy)] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[var(--navy-deep)] sm:text-sm"
              >
                Buka Dashboard →
              </Link>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="cursor-pointer rounded-lg px-4 py-2 text-sm font-bold text-[var(--blue)] transition hover:bg-[var(--blue-soft)]"
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--blue)]"
                >
                  Daftar (+100 Coin)
                </button>
              </div>
            )}

            <button
              type="button"
              aria-label="Toggle menu navigasi"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] bg-white text-sm font-bold text-[var(--navy)] lg:hidden"
            >
              {mobileNavOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileNavOpen ? (
          <div className="border-t border-[var(--border)] bg-white px-4 py-4 lg:hidden">
            <div className="mx-auto flex w-[min(1200px,100%)] flex-col gap-2 text-sm font-semibold text-[var(--ink)]">
              <a
                href="#programs"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Program Belajar
              </a>
              <a
                href="#subtes"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                7 Subtes SNBT
              </a>
              <a
                href="#impact"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Keunggulan
              </a>
              <a
                href="#stories"
                onClick={() => setMobileNavOpen(false)}
                className="rounded-lg px-3 py-2 hover:bg-[var(--blue-soft)]"
              >
                Cerita Pejuang
              </a>
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
                    Daftar (+100 Coin)
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </nav>

      {/* Hero Section ala Skilvul */}
      <header className="bg-skilvul-grid relative border-b border-[var(--border)] bg-gradient-to-b from-white via-white to-[#f6f9fe] pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d6e4fa] bg-[var(--blue-soft)] px-3.5 py-1.5 text-xs font-extrabold text-[var(--blue)]">
                ✦ #PejuangPTN · 7 Subtes · Tryout Mingguan · Live Class
              </div>

              <h1 className="mt-4 text-[clamp(32px,5vw,56px)] leading-[1.08] font-extrabold tracking-[-1.2px] text-[var(--navy)] sm:tracking-[-1.8px]">
                Latihan Tanpa Batas &amp;{" "}
                <span className="text-[var(--blue)]">Raih PTN Impianmu</span>
              </h1>

              <p className="mt-4 max-w-[600px] text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                #BelajarTerarah bersama Nassy. Kuasai 7 subtes SNBT lengkap
                dengan pembahasan, uji skor di Tryout Mingguan, dan ikuti Live
                Class bareng mentor.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                {currentUser ? (
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-[var(--navy)] px-6 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[var(--blue)]"
                  >
                    Lanjutkan ke Dashboard →
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="cursor-pointer rounded-lg bg-[var(--navy)] px-6 py-3.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[var(--blue)]"
                  >
                    Mulai Belajar &amp; Klaim 100 Coin →
                  </button>
                )}

                <a
                  href="#subtes"
                  className="rounded-lg border border-[var(--border)] bg-white px-6 py-3.5 text-center text-sm font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)]"
                >
                  Lihat 7 Subtes Gratis
                </a>
              </div>

              {/* Social Proof Avatar Stack ala Skilvul */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2.5">
                  {AVATAR_SAMPLES.map((initials, idx) => (
                    <span
                      key={initials}
                      className={`grid h-9 w-9 place-items-center rounded-full border-2 border-white text-xs font-extrabold ${
                        idx % 2 === 0
                          ? "bg-[var(--navy)] text-white"
                          : "bg-[var(--blue-soft)] text-[var(--blue)]"
                      }`}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-xs font-semibold text-[var(--muted)] sm:text-sm">
                  Siap temani <b className="text-[var(--navy)]">Pejuang PTN</b>{" "}
                  membangun konsistensi belajar harian.
                </p>
              </div>
            </div>

            {/* Right Isometric Tag Grid & Economy Preview Card */}
            <div className="relative min-w-0 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_18px_45px_rgba(23,50,77,0.08)] sm:p-6">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] pb-4">
                <div>
                  <div className="text-xs font-extrabold tracking-wide text-[var(--blue)] uppercase">
                    Ekosistem Belajar Nassy
                  </div>
                  <div className="mt-0.5 text-base font-extrabold text-[var(--navy)]">
                    Ringkas, Terukur &amp; Transparan
                  </div>
                </div>
                <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-extrabold text-[#147a4b]">
                  +100 Coin Awal
                </span>
              </div>

              {/* Floating Skill Pills Cluster */}
              <div className="mt-4 flex flex-wrap gap-2">
                {SNBT_SUBTESTS.map((sub) => (
                  <span
                    key={sub.code}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[#f8fafc] px-3 py-1.5 text-xs font-bold text-[var(--navy)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--blue)]" />
                    {sub.code} · {sub.name}
                  </span>
                ))}
              </div>

              {/* 3 Economy Pillars */}
              <div className="mt-5 grid grid-cols-3 gap-2.5">
                <div className="rounded-xl border border-[var(--border)] bg-[#f8fafc] p-3 text-center">
                  <div className="text-lg font-extrabold text-[#147a4b] sm:text-xl">
                    GRATIS
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                    7 Subtes + PDF
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[#f8fafc] p-3 text-center">
                  <div className="text-lg font-extrabold text-[var(--blue)] sm:text-xl">
                    {COIN_PRICING.TRYOUT_WEEKLY_COST} Coin
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                    Tryout Mingguan
                  </div>
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[#f8fafc] p-3 text-center">
                  <div className="text-lg font-extrabold text-[var(--navy)] sm:text-xl">
                    {COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-[var(--muted)]">
                    Live Class 30h
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Hero Program Carousel Banner ala Skilvul */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#d6e4fa] bg-gradient-to-r from-[var(--navy-deep)] via-[var(--navy)] to-[var(--blue)] p-5 text-white shadow-[0_16px_38px_rgba(23,50,77,0.14)] sm:p-6">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div className="min-w-0 max-w-2xl">
                <span className="inline-block rounded-full bg-white/18 px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#dbeafe]">
                  {activeBanner.pill}
                </span>
                <h2 className="mt-2.5 text-xl font-extrabold text-white sm:text-2xl">
                  {activeBanner.title}
                </h2>
                <p className="mt-1 text-sm text-[#dbeafe]/90">
                  {activeBanner.desc}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {currentUser ? (
                  <Link
                    href="/dashboard"
                    className="rounded-lg bg-white px-4 py-2.5 text-xs font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue-soft)] sm:text-sm"
                  >
                    {activeBanner.cta} →
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="cursor-pointer rounded-lg bg-white px-4 py-2.5 text-xs font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue-soft)] sm:text-sm"
                  >
                    {activeBanner.cta} →
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/15 pt-4">
              {HERO_BANNERS.map((banner, idx) => (
                <button
                  key={banner.id}
                  type="button"
                  onClick={() => setActiveHeroIdx(idx)}
                  className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition ${
                    idx === activeHeroIdx
                      ? "bg-white text-[var(--navy)]"
                      : "bg-white/12 text-white/85 hover:bg-white/20"
                  }`}
                >
                  0{idx + 1}. {banner.pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Infinite Category Marquee Pill Strip ala Skilvul */}
      <div className="overflow-hidden border-b border-[var(--border)] bg-[#f8fafc] py-3.5">
        <div className="animate-nassy-marquee flex w-max gap-3">
          {[...MARQUEE_TAGS, ...MARQUEE_TAGS].map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              aria-hidden={idx >= MARQUEE_TAGS.length}
              className="inline-flex shrink-0 items-center rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-bold text-[var(--navy)] shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Segmented Intensive Program Section ala Skilvul */}
      <section id="programs" className="py-14 sm:py-18">
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[34px]">
              Pilihan Mode Belajar Lengkap untuk Tembus SNBT
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              Pilih ritme belajar sesuai targetmu—dari latihan subtes gratis
              sampai Tryout dan Live Class intensif.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {PROGRAM_TABS.map((tab) => {
              const isSelected = tab.id === activeProgram.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveProgramId(tab.id)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-extrabold transition sm:px-5 sm:py-2.5 sm:text-sm ${
                    isSelected
                      ? "border-[var(--navy)] bg-[var(--navy)] text-white shadow-xs"
                      : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--blue)] hover:text-[var(--navy)]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[var(--blue)] p-6 text-white shadow-[0_18px_40px_rgba(23,50,77,0.14)] sm:p-9 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold text-[#dbeafe]">
                {activeProgram.badge}
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                {activeProgram.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#dbeafe]/95 sm:text-base">
                {activeProgram.summary}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-white/95">
                {activeProgram.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                      ✓
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xs">
              <div className="text-xs font-bold tracking-wide text-[#dbeafe] uppercase">
                Tarif Fitur
              </div>
              <div className="mt-1 text-3xl font-extrabold text-white">
                {activeProgram.priceTag}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#dbeafe]/90">
                Akun baru otomatis menerima {COIN_PRICING.WELCOME_BONUS} Coin
                untuk langsung mencoba Tryout dan Live Class.
              </p>

              {handleActionOrAuth(activeProgram.href) ? (
                <Link
                  href={activeProgram.href}
                  className="mt-5 block w-full rounded-lg bg-white px-4 py-3 text-center text-sm font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue-soft)]"
                >
                  Buka {activeProgram.label} →
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal("register")}
                  className="mt-5 block w-full cursor-pointer rounded-lg bg-white px-4 py-3 text-center text-sm font-extrabold text-[var(--navy)] transition hover:bg-[var(--blue-soft)]"
                >
                  Daftar &amp; Mulai Sekarang →
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured 7 Subtes Grid ala "Kelas Unggulan" Skilvul */}
      <section
        id="subtes"
        className="border-t border-[var(--border)] bg-[#f8fafc] py-14 sm:py-18"
      >
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-extrabold tracking-wide text-[var(--blue)] uppercase">
                Kurikulum SNBT Lengkap
              </span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[32px]">
                7 Subtes Unggulan
              </h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Setiap subtes dilengkapi latihan interaktif, kunci jawaban, dan
                pembahasan mendalam.
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SNBT_SUBTESTS.map((sub) => (
              <article
                key={sub.code}
                className="flex flex-col justify-between rounded-[14px] border border-[var(--border)] bg-white shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <SubtestThumbnail
                    code={sub.code}
                    topRightLabel="Pembahasan"
                    bottomLeftLabel={sub.category}
                  />
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-base font-extrabold text-[var(--ink)]">
                      {sub.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                      {sub.description}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs">
                      <span className="font-semibold text-[var(--muted)]">
                        {sub.category} · Kunci + Modul
                      </span>
                      <span className="font-extrabold text-[#147a4b]">
                        GRATIS
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  {currentUser ? (
                    <Link
                      href="/bank-soal"
                      className="block w-full rounded-lg bg-[var(--blue)] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--blue-hover)]"
                    >
                      Mulai Latihan
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => openAuthModal("register")}
                      className="block w-full cursor-pointer rounded-lg bg-[var(--blue)] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--blue-hover)]"
                    >
                      Mulai Latihan
                    </button>
                  )}
                </div>
              </article>
            ))}

            {/* 8th Grid Card for Weekly Tryout */}
            <article className="flex flex-col justify-between rounded-[14px] border border-[#cde1ff] bg-gradient-to-b from-[#f4f8ff] to-white shadow-2xs transition hover:-translate-y-0.5 hover:shadow-md">
              <div>
                <SubtestThumbnail
                  code="ALL"
                  topRightLabel="Skala SNBT"
                  bottomLeftLabel="Simulasi Penuh"
                />
                <div className="p-4">
                  <h3 className="text-base font-extrabold text-[var(--navy)]">
                    Paket Lengkap Tryout &amp; Live Class
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                    Gabungan 7 subtes dalam simulasi berwaktu plus diskusi live
                    mingguan bareng mentor.
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs">
                    <span className="font-semibold text-[var(--muted)]">
                      Bonus Daftar
                    </span>
                    <span className="font-extrabold text-[var(--blue)]">
                      +100 Coin
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-4">
                {currentUser ? (
                  <Link
                    href="/tryout"
                    className="block w-full rounded-lg bg-[var(--navy)] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--navy-deep)]"
                  >
                    Buka Tryout Mingguan
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="block w-full cursor-pointer rounded-lg bg-[var(--navy)] py-2.5 text-center text-xs font-extrabold text-white transition hover:bg-[var(--navy-deep)]"
                  >
                    Daftar &amp; Klaim 100 Coin
                  </button>
                )}
              </div>
            </article>
          </div>

          <div className="mt-6">
            {currentUser ? (
              <Link
                href="/bank-soal"
                className="block w-full rounded-xl border border-[var(--blue)] bg-white py-3 text-center text-sm font-extrabold text-[var(--blue)] transition hover:bg-[var(--blue-soft)]"
              >
                Lihat Semua Soal &amp; Arsip Modul →
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal("register")}
                className="block w-full cursor-pointer rounded-xl border border-[var(--blue)] bg-white py-3 text-center text-sm font-extrabold text-[var(--blue)] transition hover:bg-[var(--blue-soft)]"
              >
                Buka Semua 7 Subtes Gratis →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Dark Charcoal/Navy Impact Metrics Card ala Skilvul */}
      <section id="impact" className="py-14 sm:py-18">
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="overflow-hidden rounded-3xl bg-[#102438] p-7 text-white shadow-[0_20px_50px_rgba(16,36,56,0.18)] sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="inline-block rounded-full bg-white/12 px-3 py-1 text-xs font-bold text-[#93c5fd]">
                  Terukur &amp; Konsisten
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-[34px]">
                  Semua Amunisi Belajar Pejuang PTN dalam Satu Workspace
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[#cbd5e1] sm:text-base">
                  Catat durasi belajar, jaga streak harian, evaluasi akurasi
                  per subtes, dan pantau posisi peringkatmu menuju kampus
                  impian.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3.5 sm:gap-4">
                <div className="rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="text-3xl font-extrabold text-[#93c5fd] sm:text-4xl">
                    7
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#e2e8f0] sm:text-sm">
                    Subtes SNBT Lengkap
                  </div>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="text-3xl font-extrabold text-white sm:text-4xl">
                    +{COIN_PRICING.WELCOME_BONUS}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#e2e8f0] sm:text-sm">
                    Bonus Coin Pendaftar Baru
                  </div>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="text-3xl font-extrabold text-white sm:text-4xl">
                    {COIN_PRICING.TRYOUT_WEEKLY_COST}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#e2e8f0] sm:text-sm">
                    Coin per Tryout Mingguan
                  </div>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/6 p-5">
                  <div className="text-3xl font-extrabold text-[#93c5fd] sm:text-4xl">
                    30h
                  </div>
                  <div className="mt-1 text-xs font-semibold text-[#e2e8f0] sm:text-sm">
                    Akses Live Class &amp; VOD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Pejuang PTN Stories Grid ala Skilvul */}
      <section
        id="stories"
        className="border-t border-[var(--border)] bg-[#f8fafc] py-14 sm:py-18"
      >
        <div className="mx-auto w-[min(1200px,92%)]">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-[var(--navy)] sm:text-[32px]">
              Belajar Bareng Komunitas Pejuang PTN
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
              Dirancang agar kamu tetap fokus, konsisten mencatat progres, dan
              termotivasi oleh pencapaian teman seperjuangan.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {STUDENT_STORIES.map((story) => (
              <article
                key={story.name}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs"
              >
                <p className="text-sm leading-relaxed text-[#475467]">
                  “{story.quote}”
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-[var(--border)] pt-4">
                  <AvatarBadge name={story.name} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-sm font-extrabold text-[var(--navy)]">
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

      {/* Structured Multi-Column Footer ala Skilvul */}
      <footer className="border-t border-[var(--border)] bg-white py-12 text-sm text-[var(--muted)]">
        <div className="mx-auto grid w-[min(1200px,92%)] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <NassyLogo compact />
            <p className="mt-3 max-w-md text-xs leading-relaxed text-[var(--muted)] sm:text-sm">
              Platform persiapan UTBK-SNBT dengan Bank Soal 7 Subtes gratis,
              Tryout Mingguan skala SNBT, Live Class intensif, pelacak streak
              harian, dan Leaderboard Pejuang PTN.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-extrabold tracking-wide text-[var(--navy)] uppercase">
              Fitur Belajar
            </h3>
            <ul className="mt-3 space-y-2 text-xs font-medium sm:text-sm">
              <li>
                <a href="#subtes" className="hover:text-[var(--blue)]">
                  Soal + Pembahasan 7 Subtes
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--blue)]">
                  Tryout Mingguan SNBT
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[var(--blue)]">
                  Live Class &amp; Rekaman
                </a>
              </li>
              <li>
                <a href="#impact" className="hover:text-[var(--blue)]">
                  Progress &amp; Streak Tracker
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold tracking-wide text-[var(--navy)] uppercase">
              Mulai Sekarang
            </h3>
            <ul className="mt-3 space-y-2 text-xs font-medium sm:text-sm">
              {currentUser ? (
                <li>
                  <Link href="/dashboard" className="hover:text-[var(--blue)]">
                    Buka Workspace Belajar →
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAuthModal("login")}
                      className="cursor-pointer border-0 bg-transparent p-0 font-medium text-[var(--muted)] hover:text-[var(--blue)]"
                    >
                      Masuk Akun
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openAuthModal("register")}
                      className="cursor-pointer border-0 bg-transparent p-0 font-medium text-[var(--muted)] hover:text-[var(--blue)]"
                    >
                      Daftar Akun Baru (+100 Coin)
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex w-[min(1200px,92%)] flex-wrap items-center justify-between gap-2 border-t border-[var(--border)] pt-6 text-xs text-[var(--muted)]">
          <span>© 2026 PTN Progress with Nassy · Built for consistent learners.</span>
          <span>Layout terinspirasi sistem desain Skilvul</span>
        </div>
      </footer>
    </div>
  );
}
