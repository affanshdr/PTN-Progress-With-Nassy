"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import { SOAL_BUCKET, type StorageEntry } from "@/lib/supabase/types";

export default function AdminBankSoalPage() {
  const [currentPath, setCurrentPath] = useState("");
  const [reloadNonce, setReloadNonce] = useState(0);
  const [entries, setEntries] = useState<StorageEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [targetSubfolder, setTargetSubfolder] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingPath, setDeletingPath] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const navigateToFolder = useCallback((rawPath: string) => {
    const clean = rawPath.replace(/^\/+|\/+$/g, "");
    setIsLoading(true);
    setErrorMessage(null);
    setFeedbackMessage(null);
    setCurrentPath(clean);
  }, []);

  const triggerReload = useCallback(() => {
    setIsLoading(true);
    setErrorMessage(null);
    setReloadNonce((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadFolder() {
      try {
        const res = await fetch(
          `/api/admin/bank-soal?path=${encodeURIComponent(currentPath)}`,
        );
        const json = (await res.json()) as {
          entries?: StorageEntry[];
          error?: string;
        };

        if (!active) return;
        if (!res.ok) {
          throw new Error(json.error ?? "Gagal memuat daftar Bank Soal.");
        }

        setEntries(json.entries ?? []);
      } catch (error) {
        if (!active) return;
        setEntries([]);
        setErrorMessage(
          error instanceof Error ? error.message : "Terjadi kesalahan.",
        );
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void loadFolder();

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
    return entries.filter((item) => item.name.toLowerCase().includes(q));
  }, [entries, searchQuery]);

  async function handleUpload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const cleanSubfolder = targetSubfolder.trim().replace(/^\/+|\/+$/g, "");
      const uploadFolder = [currentPath, cleanSubfolder]
        .filter(Boolean)
        .join("/");

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("folderPath", uploadFolder);
      formData.append("upsert", "true");

      const res = await fetch("/api/admin/bank-soal", {
        method: "POST",
        body: formData,
      });
      const json = (await res.json()) as {
        uploadedPath?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(
          json.error ??
            "Gagal mengunggah file. Pastikan SUPABASE_SERVICE_ROLE_KEY atau storage INSERT policy aktif.",
        );
      }

      setSelectedFile(null);
      setTargetSubfolder("");
      event.currentTarget.reset();
      setFeedbackMessage(`File diunggah ke ${json.uploadedPath}.`);
      triggerReload();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal mengunggah file.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDeleteFile(fullPath: string) {
    setDeletingPath(fullPath);
    setErrorMessage(null);
    setFeedbackMessage(null);

    try {
      const res = await fetch(
        `/api/admin/bank-soal?path=${encodeURIComponent(fullPath)}`,
        { method: "DELETE" },
      );
      const json = (await res.json()) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? "Gagal menghapus file soal.");
      }

      setFeedbackMessage(`File ${fullPath} berhasil dihapus.`);
      triggerReload();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Gagal menghapus file.",
      );
    } finally {
      setDeletingPath(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold text-[#17324d]">
            Kelola Bank Soal
          </h1>
          <p className="mt-1 text-sm text-[#667085]">
            Unggah, telusuri, dan hapus file pada bucket{" "}
            <code className="font-mono text-xs">{SOAL_BUCKET}</code>.
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

      <form
        onSubmit={handleUpload}
        className="grid gap-3 rounded-2xl border border-[#e6eaf0] bg-white p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <div>
          <label
            htmlFor="soal-file"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#526071]"
          >
            Pilih File Soal (PDF / Gambar)
          </label>
          <input
            id="soal-file"
            type="file"
            required
            onChange={(event) =>
              setSelectedFile(event.target.files?.[0] ?? null)
            }
            className="w-full rounded-[10px] border border-[#dfe4ea] px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="soal-subfolder"
            className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-[#526071]"
          >
            Subfolder Tujuan (opsional)
          </label>
          <input
            id="soal-subfolder"
            value={targetSubfolder}
            onChange={(event) => setTargetSubfolder(event.target.value)}
            placeholder={
              currentPath ? `Di dalam ${currentPath}/...` : "Contoh: PK/Latihan-1"
            }
            className="w-full rounded-[10px] border border-[#dfe4ea] px-3 py-2 text-sm outline-none focus:border-[#2d6cdf]"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading || !selectedFile}
          className="cursor-pointer rounded-[10px] bg-[#17324d] px-4 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading ? "Mengunggah..." : "Upload File"}
        </button>
      </form>

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

      <div className="rounded-2xl border border-[#e6eaf0] bg-white p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-[#667085]">
            <button
              type="button"
              onClick={() => navigateToFolder("")}
              className="cursor-pointer border-0 bg-transparent p-1 font-bold text-[#2d6cdf]"
            >
              🏠 Root
            </button>
            {breadcrumbParts.map((crumb) => (
              <span
                key={crumb.path}
                className="inline-flex items-center gap-1.5"
              >
                <span>›</span>
                <button
                  type="button"
                  onClick={() => navigateToFolder(crumb.path)}
                  className="cursor-pointer border-0 bg-transparent p-1 font-bold text-[#2d6cdf]"
                >
                  {crumb.label}
                </button>
              </span>
            ))}
          </div>

          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari di folder ini..."
            className="w-full rounded-[10px] border border-[#dfe4ea] px-3 py-1.5 text-sm outline-none focus:border-[#2d6cdf] sm:w-64"
          />
        </div>

        {isLoading ? (
          <div className="py-8 text-center text-sm text-[#667085]">
            Memuat isi folder...
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="py-8 text-center text-sm text-[#667085]">
            Folder ini masih kosong.
          </div>
        ) : (
          <ul className="divide-y divide-[#e6eaf0]">
            {filteredEntries.map((item) => {
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
                <li
                  key={fullPath}
                  className="flex flex-col justify-between gap-3 py-3 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold break-all text-[#17202a]">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.isFolder ? (
                      <button
                        type="button"
                        onClick={() => navigateToFolder(fullPath)}
                        className="cursor-pointer rounded-lg bg-[#eaf2ff] px-3 py-1.5 text-xs font-bold text-[#2d6cdf]"
                      >
                        Buka Folder
                      </button>
                    ) : (
                      <>
                        {item.publicUrl ? (
                          <a
                            href={item.publicUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-[#eaf2ff] px-3 py-1.5 text-xs font-bold text-[#2d6cdf]"
                          >
                            Buka
                          </a>
                        ) : null}
                        <button
                          type="button"
                          disabled={deletingPath === fullPath}
                          onClick={() => void handleDeleteFile(fullPath)}
                          className="cursor-pointer rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 disabled:opacity-50"
                        >
                          {deletingPath === fullPath ? "Menghapus..." : "Hapus"}
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
