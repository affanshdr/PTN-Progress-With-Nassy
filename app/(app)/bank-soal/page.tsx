"use client";

import { useState } from "react";
import { WorkspaceHeroBanner } from "@/components/frontend/SkilvulUi";
import { StorageBankView } from "@/components/frontend/StorageBankView";
import { SubtestPracticeView } from "@/components/frontend/SubtestPracticeView";

export default function BankSoalPage() {
  const [activeTab, setActiveTab] = useState<"practice" | "storage">(
    "practice",
  );

  return (
    <div className="space-y-5">
      <WorkspaceHeroBanner
        badge="100% GRATIS · TPS & LITERASI SNBT"
        title="Bank Soal & Pembahasan 7 Subtes"
        description="Latihan terarah untuk PK, PM, PU, PPU, LBI, LBE, dan PBM lengkap dengan kunci jawaban, pembahasan, serta arsip modul PDF."
      />

      {/* Skilvul-style Underlined Tab Bar */}
      <div className="flex items-center gap-6 border-b border-[var(--border)] px-1">
        <button
          type="button"
          onClick={() => setActiveTab("practice")}
          className={`relative cursor-pointer pb-3 text-sm font-extrabold transition ${
            activeTab === "practice"
              ? "text-[var(--blue)] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-[var(--blue)]"
              : "text-[var(--muted)] hover:text-[var(--navy)]"
          }`}
        >
          Latihan Interaktif 7 Subtes
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("storage")}
          className={`relative cursor-pointer pb-3 text-sm font-extrabold transition ${
            activeTab === "storage"
              ? "text-[var(--blue)] after:absolute after:right-0 after:bottom-0 after:left-0 after:h-[3px] after:rounded-full after:bg-[var(--blue)]"
              : "text-[var(--muted)] hover:text-[var(--navy)]"
          }`}
        >
          Arsip Modul PDF (Storage)
        </button>
      </div>

      {activeTab === "practice" ? <SubtestPracticeView /> : <StorageBankView />}
    </div>
  );
}
