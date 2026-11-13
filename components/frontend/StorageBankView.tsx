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
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2.5">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Cari nama file PDF/modul di folder ini..."
          className="min-w-[200px] flex-1 rounded-[10px] border border-[var(--border)] px-3 py-2.5 text-sm outline-none focus:border-[var(--blue)] focus:ring-3 focus:ring-[var(--blue-soft)]"
        />
        <button
          type="button"
          onClick={handleReload}
          disabled={isLoading}
          className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:-translate-y-0.5 disabled:opacity-60"
        >
          ↻ Muat ulang
        </button>
      </div>

      <div className="my-2.5 mb-4.5 flex flex-wrap items-center gap-1.5 text-[13px] text-[var(--muted)]">
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {filteredEntries.length === 0 ? (
            <div className="col-span-full py-9 text-center text-sm text-[var(--muted)]">
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
                  className="flex min-w-0 items-center gap-3 rounded-[13px] border border-[var(--border)] bg-white p-3.5"
                >
                  <span className="text-2xl">{icon}</span>
                  <span className="flex-1 text-sm font-bold break-words">
                    {item.name}
                  </span>
                  {item.isFolder ? (
                    <button
                      type="button"
                      onClick={() => navigateToFolder(fullPath)}
                      className="cursor-pointer rounded-[9px] border-0 bg-[var(--blue-soft)] px-3 py-2 text-xs font-bold text-[var(--blue)]"
                    >
                      Buka
                    </button>
                  ) : item.publicUrl ? (
                    <a
                      href={item.publicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[9px] bg-[var(--blue-soft)] px-3 py-2 text-xs font-bold text-[var(--blue)]"
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

      <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted)]">
        File dibaca langsung dari bucket <b>{SOAL_BUCKET}</b>.
      </p>
    </div>
  );
}
