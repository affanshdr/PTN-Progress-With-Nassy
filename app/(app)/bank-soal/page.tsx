"use client";

import { useState } from "react";
import { StorageBankView } from "@/components/frontend/StorageBankView";
import { SubtestPracticeView } from "@/components/frontend/SubtestPracticeView";

export default function BankSoalPage() {
  const [activeTab, setActiveTab] = useState<"practice" | "storage">(
    "practice",
  );

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            📚 Soal + Pembahasan 7 Subtes
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Latihan gratis PK, PM, PU, PPU, LBI, LBE, & PBM lengkap dengan
            pembahasan, plus arsip modul PDF.
          </div>
        </div>

        <div className="inline-flex rounded-xl border border-[var(--border)] bg-white p-1">
          <button
            type="button"
            onClick={() => setActiveTab("practice")}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "practice"
                ? "bg-[var(--navy)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Latihan Interaktif
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("storage")}
            className={`cursor-pointer rounded-lg px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
              activeTab === "storage"
                ? "bg-[var(--navy)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Arsip File (Storage)
          </button>
        </div>
      </div>

      {activeTab === "practice" ? <SubtestPracticeView /> : <StorageBankView />}
    </div>
  );
}
