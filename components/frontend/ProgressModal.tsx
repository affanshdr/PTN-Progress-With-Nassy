"use client";

import { useState, type FormEvent } from "react";
import { getTodayIsoDate, SUBTESTS } from "@/lib/progress-utils";
import { getSupabaseClient } from "@/lib/supabase/client";
import { useNassy } from "@/components/frontend/NassyProvider";

export function ProgressModal({ initialDate }: { initialDate: string }) {
  const {
    currentUser,
    closeProgressModal,
    refreshData,
    showToast,
  } = useNassy();

  const [date, setDate] = useState(initialDate);
  const [subtest, setSubtest] = useState<string>(SUBTESTS[0]);
  const [progress, setProgress] = useState("");
  const [target, setTarget] = useState("");
  const [duration, setDuration] = useState("");
  const [proofName, setProofName] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!currentUser) {
      showToast("Silakan masuk terlebih dahulu.");
      return;
    }

    setIsSaving(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("progress").insert([
        {
          user_id: currentUser.id,
          date,
          subtest,
          progress: progress.trim(),
          target: target.trim(),
          duration: Number(duration),
          proof: proofName,
        },
      ]);

      if (error) throw error;

      setProgress("");
      setTarget("");
      setDuration("");
      setProofName("");
      setDate(getTodayIsoDate());
      closeProgressModal();
      await refreshData();
      showToast("Progres berhasil disimpan ke database! 🔥");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan.";
      showToast(`Gagal menyimpan: ${message}`);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="progress-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.55)] p-3.5 backdrop-blur-[2px] sm:p-5"
      onClick={(event) => {
        if (event.target === event.currentTarget) closeProgressModal();
      }}
    >
      <div className="max-h-[92vh] w-full max-w-[500px] overflow-auto rounded-2xl border border-[#e5eaf1] bg-white p-5 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="progress-modal-title"
              className="m-0 font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--ink)] sm:text-2xl"
            >
              Tambah Progres Belajar
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Catat materi atau soal yang kamu kerjakan hari ini.
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup dialog"
            onClick={closeProgressModal}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#e5eaf1] bg-white text-base font-bold text-[var(--muted)] transition hover:bg-[#f5f8fc] hover:text-[var(--navy)]"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 grid gap-3.5">
          <div>
            <label
              htmlFor="p-date"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Tanggal
            </label>
            <input
              id="p-date"
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <div>
            <label
              htmlFor="p-subtest"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Subtes
            </label>
            <select
              id="p-subtest"
              value={subtest}
              onChange={(event) => setSubtest(event.target.value)}
              className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            >
              {SUBTESTS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="p-progress"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Progres Belajar
            </label>
            <textarea
              id="p-progress"
              required
              value={progress}
              onChange={(event) => setProgress(event.target.value)}
              placeholder="Contoh: menyelesaikan 30 soal..."
              className="min-h-[105px] w-full resize-y rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <div>
            <label
              htmlFor="p-target"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Kendala / Target Belajar Besok
            </label>
            <textarea
              id="p-target"
              required
              value={target}
              onChange={(event) => setTarget(event.target.value)}
              placeholder="Contoh: masih kesulitan soal cerita..."
              className="min-h-[105px] w-full resize-y rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <div>
            <label
              htmlFor="p-duration"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Durasi Belajar (menit)
            </label>
            <input
              id="p-duration"
              type="number"
              min={1}
              required
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="120"
              className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <div>
            <label
              htmlFor="p-proof"
              className="mb-1.5 block text-[13px] font-bold text-[var(--ink)]"
            >
              Bukti Belajar
            </label>
            <input
              id="p-proof"
              type="file"
              accept="image/*,.pdf"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setProofName(file ? file.name : "");
              }}
              className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-sm outline-none transition focus:border-[var(--blue)] focus:bg-white focus:ring-3 focus:ring-[var(--blue-soft)]"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="mt-1 cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Menyimpan..." : "Simpan Progres"}
          </button>
        </form>
      </div>
    </div>
  );
}
