import { SiteHeader } from "@/components/frontend/SiteHeader";

const starterPillars = [
  {
    id: "fitur",
    title: "UI & Halaman Publik",
    description:
      "Kembangkan halaman landing, komponen UI, dan alur interaktif pengguna di direktori app/ serta components/frontend/.",
  },
  {
    id: "progress",
    title: "Integrasi API Siap Pakai",
    description:
      "Siap dihubungkan dengan endpoint back-end dan panel admin dari branch Andre saat rilis ke production.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <SiteHeader />

      <main
        id="beranda"
        className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-12 px-6 py-16"
      >
        <section className="flex max-w-2xl flex-col gap-5">
          <span className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            Production Front-End Workspace · Branch Asta
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            PTN Progress With Nassy
          </h1>
          <p className="text-base leading-7 text-zinc-600 sm:text-lg dark:text-zinc-400">
            Starter front-end berbasis Next.js App Router dan Tailwind CSS.
            Mulai bangun tampilan utama aplikasi dari{" "}
            <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800">
              app/page.tsx
            </code>{" "}
            dan{" "}
            <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-800">
              components/frontend/
            </code>
            .
          </p>
        </section>

        <section className="grid gap-6 sm:grid-cols-2">
          {starterPillars.map((pillar) => (
            <article
              key={pillar.id}
              id={pillar.id}
              className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {pillar.description}
              </p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
