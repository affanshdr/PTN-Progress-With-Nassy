import Link from "next/link";
import { Suspense } from "react";
import { BACKEND_ENDPOINTS, getAdminOverview } from "@/lib/server/admin-summary";

function formatMinutes(totalMinutes: number): string {
  const safe = Math.max(0, Math.floor(totalMinutes));
  return `${Math.floor(safe / 60)}j ${safe % 60}m`;
}

async function AdminLiveOverview() {
  const overview = await getAdminOverview();

  return (
    <div className="flex flex-col gap-6">
      {overview.supabaseError ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <b>Catatan koneksi Supabase:</b> {overview.supabaseError}
        </div>
      ) : null}

      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#e6eaf0] bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
            Total Anggota
          </dt>
          <dd className="mt-2 text-3xl font-extrabold text-[#17324d]">
            {overview.stats.userCount}
          </dd>
        </div>
        <div className="rounded-2xl border border-[#e6eaf0] bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
            Catatan Progres
          </dt>
          <dd className="mt-2 text-3xl font-extrabold text-[#17324d]">
            {overview.stats.progressCount}
          </dd>
        </div>
        <div className="rounded-2xl border border-[#e6eaf0] bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
            Total Durasi Belajar
          </dt>
          <dd className="mt-2 text-3xl font-extrabold text-[#17324d]">
            {formatMinutes(overview.stats.totalMinutes)}
          </dd>
        </div>
        <div className="rounded-2xl border border-[#e6eaf0] bg-white p-5">
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
            Root Bank Soal
          </dt>
          <dd className="mt-2 text-3xl font-extrabold text-[#17324d]">
            {overview.stats.bankRootCount} item
          </dd>
        </div>
      </dl>

      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#e6eaf0] bg-white p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
            Supabase Mode
          </dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-[#17202a]">
            {overview.usingServiceRole
              ? "Service Role Key (Server)"
              : overview.supabaseConfigured
                ? "Anon Key (RLS Aktif)"
                : "Belum Dikonfigurasi"}
          </dd>
        </div>
        <div className="rounded-xl border border-[#e6eaf0] bg-white p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
            Environment
          </dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-[#17202a]">
            {overview.environment}
          </dd>
        </div>
        <div className="rounded-xl border border-[#e6eaf0] bg-white p-4">
          <dt className="text-xs font-medium uppercase tracking-wide text-[#667085]">
            Terakhir Diperiksa
          </dt>
          <dd className="mt-1 font-mono text-sm font-semibold text-[#17202a]">
            {overview.checkedAt}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function AdminOverviewFallback() {
  return (
    <div className="rounded-xl border border-dashed border-[#cbd5e1] bg-white p-5 text-sm text-[#667085]">
      Memuat metrik Supabase dan status back-end...
    </div>
  );
}

export default function AdminPage() {
  return (
    <>
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-[#17324d]">
            Dashboard Admin & Back-End
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[#667085]">
            Kelola data progres belajar pengguna, bucket{" "}
            <code className="rounded bg-[#eaf2ff] px-1.5 py-0.5 font-mono text-xs text-[#2d6cdf]">
              SOAL ALTERNATIFA
            </code>
            , dan API back-end sebelum di-merge ke production.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/admin/progres"
            className="rounded-[10px] border border-[#e6eaf0] bg-white px-4 py-2.5 text-sm font-bold text-[#17324d] hover:bg-[#f6f8fb]"
          >
            Kelola Progres
          </Link>
          <Link
            href="/admin/bank-soal"
            className="rounded-[10px] bg-[#17324d] px-4 py-2.5 text-sm font-bold text-white"
          >
            Kelola Bank Soal
          </Link>
        </div>
      </section>

      <div className="rounded-xl border border-blue-200 bg-[#f0f6ff] p-4 text-xs leading-relaxed text-[#315a92]">
        <b>Pengingat Keamanan untuk Andre:</b> Tambahkan autentikasi admin dan
        pengecekan role (serta isi{" "}
        <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> di{" "}
        <code className="font-mono">.env.local</code> untuk operasi tulis/hapus
        server-side) sebelum rute <code className="font-mono">/admin</code>{" "}
        dirilis ke production.
      </div>

      <section aria-labelledby="runtime-heading" className="flex flex-col gap-3">
        <h2
          id="runtime-heading"
          className="text-sm font-bold uppercase tracking-wide text-[#526071]"
        >
          Ringkasan Supabase & Runtime
        </h2>
        <Suspense fallback={<AdminOverviewFallback />}>
          <AdminLiveOverview />
        </Suspense>
      </section>

      <section aria-labelledby="endpoints-heading" className="flex flex-col gap-3">
        <h2
          id="endpoints-heading"
          className="text-sm font-bold uppercase tracking-wide text-[#526071]"
        >
          Endpoint Back-End Terdaftar
        </h2>
        <ul className="divide-y divide-[#e6eaf0] overflow-hidden rounded-2xl border border-[#e6eaf0] bg-white">
          {BACKEND_ENDPOINTS.map((endpoint) => (
            <li
              key={`${endpoint.method}-${endpoint.path}`}
              className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="rounded bg-[#eaf2ff] px-2 py-0.5 font-mono text-xs font-bold text-[#2d6cdf]">
                  {endpoint.method}
                </span>
                <code className="font-mono text-sm font-semibold text-[#17202a]">
                  {endpoint.path}
                </code>
              </div>
              <p className="text-sm text-[#667085]">{endpoint.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
