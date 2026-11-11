"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminProgressRecord } from "@/app/api/admin/progress/route";

const SUBTEST_FILTERS = [
  "ALL",
  "PK",
  "PM",
  "LBI",
  "LBE",
  "PPU",
  "PU",
  "PBM",
  "Lainnya",
] as const;

export default function AdminProgresPage() {
  const [records, setRecords] = useState<AdminProgressRecord[]>([]);
  const [subtestFilter, setSubtestFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [reloadNonce, setReloadNonce] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const triggerReload = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    setReloadNonce((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadRecords() {
      try {
        const params = new URLSearchParams();
        if (subtestFilter !== "ALL") params.set("subtest", subtestFilter);
        if (searchQuery.trim()) params.set("q", searchQuery.trim());

        const res = await fetch(`/api/admin/progress?${params.toString()}`);
        const json = (await res.json()) as {
          records?: AdminProgressRecord[];
          error?: string;
        };

        if (!active) return;
        if (!res.ok) {
          throw new Error(json.error ?? "Gagal mengambil daftar progres.");
        }

        setRecords(json.records ?? []);
      } catch (error) {
        if (!active) return;
        setErrorMessage(
          error instanceof Error ? error.message : "Terjadi kesalahan.",
        );
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadRecords();

    return () => {
      active = false;
    };
  }, [subtestFilter, searchQuery, reloadNonce]);

  async function handleDelete(id: string | number | undefined) {
    if (id === undefined || id === null) return;
    setDeletingId(id);
    setFeedbackMessage(null);
    setErrorMessage(null);

    try {
      const res = await fetch(
        `/api/admin/progress?id=${encodeURIComponent(String(id))}`,
        { method: "DELETE" },
      );
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(
          json.error ??
            "Gagal menghapus progres. Pastikan SUPABASE_SERVICE_ROLE_KEY atau RLS delete policy tersedia.",
        );
      }

      setFeedbackMessage("Catatan progres berhasil dihapus.");
      triggerReload();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menghapus progres.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#17324d]">
            Kelola Progres Pengguna
          </h1>
          <p className="mt-1 text-sm text-[#667085]">
            Pantau dan moderasi catatan belajar yang masuk ke tabel{" "}
            <code className="font-mono text-xs">progress</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={triggerReload}
          disabled={isLoading}
          className="cursor-pointer rounded-[10px] border border-[#e6eaf0] bg-white px-4 py-2 text-sm font-bold text-[#17324d] disabled:opacity-60"
        >
          ↻ Muat ulang
        </button>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border border-[#e6eaf0] bg-white p-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => {
            setIsLoading(true);
            setSearchQuery(event.target.value);
          }}
          placeholder="Cari nama siswa, materi progres, atau target..."
          className="min-w-[220px] flex-1 rounded-[10px] border border-[#dfe4ea] px-3 py-2 text-sm outline-none focus:border-[#2d6cdf]"
        />

        <select
          aria-label="Filter subtes"
          value={subtestFilter}
          onChange={(event) => {
            setIsLoading(true);
            setSubtestFilter(event.target.value);
          }}
          className="rounded-[10px] border border-[#dfe4ea] bg-white px-3 py-2 text-sm font-semibold text-[#17324d] outline-none focus:border-[#2d6cdf]"
        >
          {SUBTEST_FILTERS.map((subtest) => (
            <option key={subtest} value={subtest}>
              {subtest === "ALL" ? "Semua Subtes" : subtest}
            </option>
          ))}
        </select>
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {errorMessage}
        </div>
      ) : null}

      {feedbackMessage ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          {feedbackMessage}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-[#e6eaf0] bg-white">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-[#667085]">
            Memuat catatan progres...
          </div>
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-sm text-[#667085]">
            Belum ada catatan progres yang sesuai filter.
          </div>
        ) : (
          <ul className="divide-y divide-[#e6eaf0]">
            {records.map((item, idx) => (
              <li
                key={item.id ?? `${item.user_id}-${item.date}-${idx}`}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-start"
              >
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <b className="text-sm text-[#17324d]">{item.userName}</b>
                    <span className="text-xs text-[#667085]">
                      ({item.userClass} · {item.userPtn})
                    </span>
                    <span className="rounded bg-[#eaf2ff] px-2 py-0.5 text-xs font-bold text-[#2d6cdf]">
                      {item.subtest}
                    </span>
                    <span className="font-mono text-xs text-[#667085]">
                      {item.date} · {item.duration} menit
                    </span>
                  </div>
                  <p className="text-sm text-[#17202a]">{item.progress}</p>
                  <p className="text-xs text-[#667085]">
                    Target/kendala: {item.target}
                    {item.proof ? ` · Bukti: ${item.proof}` : ""}
                  </p>
                </div>

                {item.id !== undefined ? (
                  <button
                    type="button"
                    disabled={deletingId === item.id}
                    onClick={() => void handleDelete(item.id)}
                    className="shrink-0 cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === item.id ? "Menghapus..." : "Hapus"}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
