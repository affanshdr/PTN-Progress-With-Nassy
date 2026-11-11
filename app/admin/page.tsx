import { Suspense } from "react";
import { BACKEND_ENDPOINTS, getAdminOverview } from "@/lib/server/admin-summary";

async function RuntimeStatusCard() {
  const overview = await getAdminOverview();

  return (
    <dl className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Layanan
        </dt>
        <dd className="mt-1 font-mono text-sm font-medium text-zinc-950 dark:text-zinc-50">
          {overview.service}
        </dd>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Environment
        </dt>
        <dd className="mt-1 font-mono text-sm font-medium text-zinc-950 dark:text-zinc-50">
          {overview.environment}
        </dd>
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Waktu Server
        </dt>
        <dd className="mt-1 font-mono text-sm font-medium text-zinc-950 dark:text-zinc-50">
          {overview.checkedAt}
        </dd>
      </div>
    </dl>
  );
}

function RuntimeStatusFallback() {
  return (
    <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-4 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
      Memuat status runtime back-end...
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Dashboard Admin & Back-End
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Workspace awal untuk endpoint API di{" "}
          <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            app/api/
          </code>{" "}
          dan halaman admin di{" "}
          <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
            app/admin/
          </code>
          .
        </p>
      </section>

      <section aria-labelledby="runtime-heading" className="flex flex-col gap-3">
        <h2
          id="runtime-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Status Runtime
        </h2>
        <Suspense fallback={<RuntimeStatusFallback />}>
          <RuntimeStatusCard />
        </Suspense>
      </section>

      <section aria-labelledby="endpoints-heading" className="flex flex-col gap-3">
        <h2
          id="endpoints-heading"
          className="text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        >
          Endpoint Back-End Terdaftar
        </h2>
        <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900">
          {BACKEND_ENDPOINTS.map((endpoint) => (
            <li
              key={endpoint.path}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="rounded bg-emerald-100 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {endpoint.method}
                </span>
                <a
                  href={endpoint.path}
                  className="font-mono text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
                >
                  {endpoint.path}
                </a>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {endpoint.description}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
