"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COIN_PRICING,
  formatDateTimeId,
  getDaysRemaining,
  isLiveClassPassActive,
  SNBT_SUBTESTS,
} from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type { LiveClassSession } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

export default function LiveClassPage() {
  const {
    currentUser,
    coinBalance,
    openTopupModal,
    updateWalletLocally,
    refreshWallet,
    markSchemaNeedsMigration,
    showToast,
  } = useNassy();

  const [sessions, setSessions] = useState<LiveClassSession[]>([]);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "live" | "upcoming" | "recorded"
  >("ALL");
  const [subtestFilter, setSubtestFilter] = useState<string>("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchSessions() {
      if (!currentUser || !isSupabaseBrowserConfigured()) {
        if (active) setIsLoading(false);
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_live_classes_for_user");
        if (!active) return;
        if (error) throw error;
        setSessions((data as LiveClassSession[]) ?? []);
        setErrorMessage(null);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
          setErrorMessage(
            "Tabel Live Class belum tersedia di Supabase. Jalankan file migrasi SQL terlebih dahulu.",
          );
        } else {
          setErrorMessage(
            getErrorMessage(error, "Gagal memuat jadwal Live Class."),
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchSessions();

    return () => {
      active = false;
    };
  }, [currentUser, markSchemaNeedsMigration, reloadNonce]);

  const hasActivePass = isLiveClassPassActive(currentUser?.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser?.liveclass_pass_until);

  const filteredSessions = useMemo(() => {
    return sessions.filter((item) => {
      if (statusFilter !== "ALL" && item.status !== statusFilter) return false;
      if (subtestFilter !== "ALL" && item.subtest !== subtestFilter) return false;
      return true;
    });
  }, [sessions, statusFilter, subtestFilter]);

  async function handleBuyPass() {
    setIsPurchasing(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("purchase_liveclass_pass");
      if (error) throw error;

      const payload = data as {
        coin_balance?: number;
        liveclass_pass_until?: string;
      };
      updateWalletLocally({
        coin_balance: payload.coin_balance,
        liveclass_pass_until: payload.liveclass_pass_until,
      });
      await refreshWallet();
      setReloadNonce((prev) => prev + 1);
      setShowConfirmModal(false);
      showToast(
        `Live Class Pass aktif ${COIN_PRICING.LIVECLASS_DURATION_DAYS} hari! 🎥`,
      );
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal mengaktifkan Live Class Pass."));
    } finally {
      setIsPurchasing(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            🎥 Live Class Bulanan
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Akses penuh seluruh kelas interaktif 7 subtes dan rekaman video
            selama 30 hari hanya dengan {COIN_PRICING.LIVECLASS_MONTHLY_COST}{" "}
            Coin.
          </div>
        </div>

        <button
          type="button"
          onClick={openTopupModal}
          className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:-translate-y-0.5 sm:text-sm"
        >
          🪙 Saldo: {coinBalance} Coin (+ Isi Coin)
        </button>
      </div>

      {/* Monthly Pass Banner */}
      <section
        className={`rounded-2xl border p-5 sm:p-6 ${
          hasActivePass
            ? "border-[#b7e4c7] bg-[#f2fbf6]"
            : "border-[#cde1ff] bg-white"
        }`}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[var(--navy)] shadow-2xs">
              {hasActivePass ? "✓ PASS AKTIF 30 HARI" : "🔒 PASS BELUM AKTIF"}
            </div>
            <h2 className="mt-2.5 text-xl font-bold text-[var(--ink)]">
              {hasActivePass
                ? `Live Class Pass aktif (sisa ${daysLeft} hari)`
                : `Buka Semua Live Class & Rekaman — ${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / Bulan`}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {hasActivePass && currentUser?.liveclass_pass_until
                ? `Berlaku sampai ${formatDateTimeId(currentUser.liveclass_pass_until)}. Link Zoom/Meet, materi PDF, dan rekaman sudah terbuka.`
                : "Satu kali aktivasi langsung membuka seluruh jadwal live session dan arsip rekaman video selama 30 hari penuh."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="shrink-0 cursor-pointer rounded-[10px] bg-[var(--navy)] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            {hasActivePass
              ? `Perpanjang +30 Hari (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`
              : `Aktifkan Pass (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`}
          </button>
        </div>
      </section>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-white p-4">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { key: "ALL", label: "Semua Sesi" },
              { key: "live", label: "🔴 Sedang Live" },
              { key: "upcoming", label: "📅 Mendatang" },
              { key: "recorded", label: "▶ Rekaman" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setStatusFilter(tab.key)}
              className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                statusFilter === tab.key
                  ? "bg-[var(--navy)] text-white"
                  : "bg-[#f4f7fb] text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          aria-label="Filter subtes live class"
          value={subtestFilter}
          onChange={(event) => setSubtestFilter(event.target.value)}
          className="rounded-[10px] border border-[var(--border)] bg-white px-3 py-2 text-xs font-bold text-[var(--ink)] outline-none"
        >
          <option value="ALL">Semua Subtes</option>
          {SNBT_SUBTESTS.map((sub) => (
            <option key={sub.code} value={sub.code}>
              {sub.code} — {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sessions Grid */}
      {isLoading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat jadwal Live Class...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Belum ada kelas yang sesuai dengan filter saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredSessions.map((session) => {
            const statusBadge =
              session.status === "live"
                ? { label: "🔴 LIVE SEKARANG", cls: "bg-[#fef3f2] text-[#b42318]" }
                : session.status === "upcoming"
                  ? { label: "📅 Mendatang", cls: "bg-[#eff6ff] text-[var(--blue)]" }
                  : { label: "▶ Rekaman Video", cls: "bg-[#f1f5f9] text-[var(--navy)]" };

            return (
              <article
                key={session.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-md bg-[var(--blue-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--blue)]">
                      {session.subtest}
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-extrabold ${statusBadge.cls}`}
                    >
                      {statusBadge.label}
                    </span>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">
                    {session.title}
                  </h3>
                  <div className="mt-1 text-xs font-semibold text-[var(--navy)]">
                    Mentor: {session.mentor_name} · {session.duration_minutes}{" "}
                    menit
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--muted)]">
                    Jadwal: {formatDateTimeId(session.scheduled_at)}
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--muted)]">
                    {session.description}
                  </p>
                </div>

                <div className="mt-4 border-t border-[var(--border)] pt-4">
                  {session.has_active_pass ? (
                    <div className="flex flex-wrap gap-2">
                      {session.meeting_url && session.status !== "recorded" ? (
                        <a
                          href={session.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-[10px] bg-[var(--blue)] px-4 py-2.5 text-center text-xs font-bold text-white transition hover:-translate-y-0.5 sm:text-sm"
                        >
                          Masuk Ruang Meeting →
                        </a>
                      ) : null}
                      {session.recording_url ? (
                        <a
                          href={session.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-center text-xs font-bold text-white transition hover:-translate-y-0.5 sm:text-sm"
                        >
                          ▶ Tonton Rekaman
                        </a>
                      ) : null}
                      {session.material_url ? (
                        <a
                          href={session.material_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-[10px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-xs font-bold text-[var(--navy)]"
                        >
                          📄 Materi
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirmModal(true)}
                      className="w-full cursor-pointer rounded-[10px] border border-[#dce7f6] bg-[#f8fbff] px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:bg-[var(--blue-soft)]"
                    >
                      🔒 Aktifkan Live Class Pass ({COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin) untuk Akses Link & Rekaman
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.5)] p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isPurchasing) {
              setShowConfirmModal(false);
            }
          }}
        >
          <div className="w-full max-w-[460px] rounded-[20px] bg-white p-6 shadow-xl">
            <h2 className="m-0 text-xl font-bold text-[var(--ink)]">
              {hasActivePass
                ? "Perpanjang Live Class Pass"
                : "Aktifkan Live Class Pass 30 Hari"}
            </h2>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              Akses penuh seluruh jadwal kelas interaktif, materi PDF, dan
              rekaman video selama 30 hari.
            </p>

            <div className="mt-4 space-y-2 rounded-xl border border-[var(--border)] bg-[#f8fafc] p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Saldo Coin Kamu</span>
                <span className="font-bold text-[var(--ink)]">
                  🪙 {coinBalance} Coin
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">
                  Biaya Pass 30 Hari
                </span>
                <span className="font-bold text-[#b45309]">
                  -{COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--border)] pt-2">
                <span className="font-bold text-[var(--ink)]">Sisa Saldo</span>
                <span
                  className={`font-extrabold ${
                    coinBalance >= COIN_PRICING.LIVECLASS_MONTHLY_COST
                      ? "text-[#147a4b]"
                      : "text-[#d92d20]"
                  }`}
                >
                  🪙 {coinBalance - COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin
                </span>
              </div>
            </div>

            {coinBalance < COIN_PRICING.LIVECLASS_MONTHLY_COST ? (
              <div className="mt-4 rounded-xl border border-[#ffd4d4] bg-[#fff1f1] p-3 text-xs font-medium text-[#a52b36]">
                Saldo Coin kamu kurang dari {COIN_PRICING.LIVECLASS_MONTHLY_COST}{" "}
                Coin. Silakan isi Coin dulu lewat Payment Gateway.
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                disabled={isPurchasing}
                onClick={() => setShowConfirmModal(false)}
                className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
              >
                Batal
              </button>

              {coinBalance < COIN_PRICING.LIVECLASS_MONTHLY_COST ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowConfirmModal(false);
                    openTopupModal();
                  }}
                  className="cursor-pointer rounded-[10px] bg-[var(--blue)] px-4 py-2.5 text-sm font-bold text-white"
                >
                  Isi Coin Sekarang →
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isPurchasing}
                  onClick={() => void handleBuyPass()}
                  className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {isPurchasing
                    ? "Memproses..."
                    : `Aktifkan (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
