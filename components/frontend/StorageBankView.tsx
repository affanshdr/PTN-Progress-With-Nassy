"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getSupabaseClient,
  isSupabaseBrowserConfigured,
} from "@/lib/supabase/client";
import { SOAL_BUCKET, type StorageEntry } from "@/lib/supabase/types";

export function StorageBankView() {
  const [currentPath, setCurrentPath] = useState("");
  const [reloadNonce, setReloadNonce] = useState(0);
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState(
    "Memuat file dari Supabase Storage...",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigateToFolder = useCallback((rawPath: string) => {
    const cleanPath = rawPath.replace(/^\/+|\/+$/g, "");
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage("Memuat file dari Supabase Storage...");
    setCurrentPath(cleanPath);
  }, []);

  const handleReload = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    setStatusMessage("Memuat file dari Supabase Storage...");
    setReloadNonce((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function fetchFolder() {
      try {
        if (!isSupabaseBrowserConfigured()) {
          throw new Error(
            "Konfigurasi NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY belum diisi.",
          );
        }

        const supabase = getSupabaseClient();
        const { data, error } = await supabase.storage
          .from(SOAL_BUCKET)
          .list(currentPath, {
            limit: 100,
            offset: 0,
            sortBy: { column: "name", order: "asc" },
          });

        if (!active) return;
        if (error) throw error;

        const mapped: StorageEntry[] = (data ?? [])
          .filter(
            (item) => item.name && item.name !== ".emptyFolderPlaceholder",
          )
          .map((item) => {
            const isFolder = item.id === null;
            const fullPath = currentPath
              ? `${currentPath}/${item.name}`
              : item.name;
            return {
              id: item.id ?? null,
              name: item.name,
              isFolder,
              publicUrl: isFolder
                ? undefined
                : supabase.storage.from(SOAL_BUCKET).getPublicUrl(fullPath).data
                    .publicUrl,
            };
          });

        setEntries(mapped);
        setSearchQuery("");
        setStatusMessage(
          mapped.length
            ? `${mapped.length} item ditemukan`
            : "Folder ini masih kosong.",
        );
      } catch (error) {
        if (!active) return;
        const msg =
          error instanceof Error ? error.message : "Gagal membaca storage.";
        setEntries([]);
        setErrorMessage(msg);
        setStatusMessage("");
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchFolder();

    return () => {
      active = false;
    };
  }, [currentPath, reloadNonce]);

  const breadcrumbParts = useMemo(() => {
    if (!currentPath) return [];
    const segments = currentPath.split("/");
    return segments.map((label, idx) => ({
      label,
      path: segments.slice(0, idx + 1).join("/"),
    }));
  }, [currentPath]);

  const filteredEntries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return entries;
    return entries.filter((entry) => entry.name.toLowerCase().includes(q));
  }, [entries, searchQuery]);

  return (
    <div className="rounded-2xl border border-[#e5eaf1] bg-white p-5 sm:p-6">
      <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari nama file PDF/modul di folder ini..."
          className="min-w-0 w-full flex-1 rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3.5 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)] sm:min-w-[200px] sm:w-auto"
        />
        <button
          type="button"
          onClick={handleReload}
          disabled={isLoading}
          className="w-full cursor-pointer rounded-lg border border-[#dce4ef] bg-white px-4 py-2.5 text-center text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:text-[var(--blue)] disabled:opacity-60 sm:w-auto"
        >
          ↻ Muat ulang
        </button>
      </div>

      <div className="my-2.5 mb-5 flex flex-wrap items-center gap-1.5 rounded-xl border border-[#eef2f7] bg-[#f8fafd] px-3 py-2 text-[13px] text-[var(--muted)]">
        <button
          type="button"
          onClick={() => navigateToFolder("")}
          className="cursor-pointer border-0 bg-transparent p-1 font-bold text-[var(--blue)]"
        >
          🏠 Semua File
        </button>
        {breadcrumbParts.map((crumb) => (
          <span key={crumb.path} className="inline-flex items-center gap-1.5">
            <span>›</span>
            <button
              type="button"
              onClick={() => navigateToFolder(crumb.path)}
              className="cursor-pointer border-0 bg-transparent p-1 font-bold text-[var(--blue)]"
            >
              {crumb.label}
            </button>
          </span>
        ))}
      </div>

      {errorMessage ? (
        <div className="rounded-xl border border-[#ffd4d4] bg-[#fff1f1] p-3.5 text-sm leading-relaxed text-[#a52b36]">
          <b>Belum bisa membaca daftar file Storage.</b>
          <br />
          {errorMessage}
        </div>
      ) : null}

      {statusMessage ? (
        <div className="mb-3 text-sm text-[var(--muted)]">{statusMessage}</div>
      ) : null}

      {!isLoading && !errorMessage ? (
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
          {filteredEntries.length === 0 ? (
            <div className="col-span-full rounded-xl border border-dashed border-[#dce4ef] py-10 text-center text-sm text-[var(--muted)]">
              Belum ada folder atau file pada lokasi ini.
            </div>
          ) : (
            filteredEntries.map((item) => {
              const fullPath = currentPath
                ? `${currentPath}/${item.name}`
                : item.name;
              const ext = (item.name.split(".").pop() ?? "").toLowerCase();
              const icon = item.isFolder
                ? "📁"
                : ext === "pdf"
                  ? "📄"
                  : "📎";

              return (
                <div
                  key={fullPath}
                  className="flex min-w-0 items-center gap-3 rounded-xl border border-[#e5eaf1] bg-white p-3.5 transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-[0_10px_20px_rgba(23,50,77,0.06)]"
                >
                  <span className="shrink-0 text-2xl">{icon}</span>
                  <span className="min-w-0 flex-1 break-all text-sm font-bold text-[var(--ink)]">
                    {item.name}
                  </span>
                  {item.isFolder ? (
                    <button
                      type="button"
                      onClick={() => navigateToFolder(fullPath)}
                      className="cursor-pointer rounded-lg border-0 bg-[var(--blue-soft)] px-3 py-2 text-xs font-bold text-[var(--blue)] transition hover:bg-[var(--blue)] hover:text-white"
                    >
                      Buka
                    </button>
                  ) : item.publicUrl ? (
                    <a
                      href={item.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-[var(--blue-soft)] px-3 py-2 text-xs font-bold text-[var(--blue)] transition hover:bg-[var(--blue)] hover:text-white"
                    >
                      Buka
                    </a>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      ) : null}

      <p className="mt-4 text-[13px] leading-relaxed text-[var(--muted)]">
        File dibaca langsung dari bucket <b>{SOAL_BUCKET}</b>.
      </p>
    </div>
  );
}
