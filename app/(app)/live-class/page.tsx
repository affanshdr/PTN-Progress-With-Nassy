"use client";

import { useEffect, useMemo, useState } from "react";
import {
  COIN_PRICING,
  formatDateTimeId,
  getDaysRemaining,
  isLiveClassPassActive,
  SNBT_SUBTEST_MAP,
  SNBT_SUBTESTS,
} from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type { LiveClassSession, SnbtSubtestCode } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";
import {
  SubtestThumbnail,
  WorkspaceHeroBanner,
} from "@/components/frontend/SkilvulUi";

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
    <div className="space-y-6">
      <WorkspaceHeroBanner
        title="Live Class Bulanan"
        description={`Akses seluruh sesi kelas interaktif 7 subtes, materi PDF, dan rekaman video selama 30 hari (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin).`}
        actions={
          <button
            type="button"
            onClick={openTopupModal}
            className="cursor-pointer rounded-lg border border-[#d6e3f5] bg-white px-4 py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] sm:text-sm"
          >
            Saldo: {coinBalance} Coin (+ Isi)
          </button>
        }
      />

      {/* Monthly Pass Highlight Banner (Skilvul Upsell Ribbon Pattern) */}
      <section
        className={`rounded-2xl border p-5 sm:p-6 ${
          hasActivePass
            ? "border-[#b7e4c7] bg-[#f2fbf6]"
            : "border-[#c7daf8] bg-gradient-to-r from-[#f4f8ff] to-[#ffffff]"
        }`}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dce6f4] bg-white px-3 py-1 text-[11px] font-extrabold tracking-wide text-[var(--navy)]">
              <span
                className={`h-2 w-2 rounded-full ${
                  hasActivePass ? "bg-[#147a4b]" : "bg-[#f59e0b]"
                }`}
              />
              {hasActivePass ? "PASS AKTIF 30 HARI" : "PASS BELUM AKTIF"}
            </div>
            <h2 className="mt-2.5 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--ink)] sm:text-xl">
              {hasActivePass
                ? `Live Class Pass aktif — sisa ${daysLeft} hari`
                : `Buka Semua Live Class & Rekaman (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / Bulan)`}
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {hasActivePass && currentUser?.liveclass_pass_until
                ? `Berlaku sampai ${formatDateTimeId(currentUser.liveclass_pass_until)}. Link Zoom/Meet, materi PDF, dan arsip rekaman sudah terbuka.`
                : "Satu kali aktivasi langsung membuka seluruh jadwal live session dan arsip rekaman video selama 30 hari penuh."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full shrink-0 cursor-pointer rounded-lg bg-[var(--navy)] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] md:w-auto"
          >
            {hasActivePass
              ? `Perpanjang +30 Hari (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`
              : `Aktifkan Pass (${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)`}
          </button>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#e5eaf1] bg-white px-5 pt-3 pb-4 sm:flex-row sm:items-center sm:justify-between sm:pb-3">
        <div className="flex flex-wrap gap-5 border-b border-transparent">
          {(
            [
              { key: "ALL", label: "Semua Sesi" },
              { key: "live", label: "Sedang Live" },
              { key: "upcoming", label: "Mendatang" },
              { key: "recorded", label: "Rekaman" },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setStatusFilter(tab.key)}
                className={`cursor-pointer border-b-2 pb-2.5 text-sm font-bold transition ${
                  active
                    ? "border-[var(--blue)] text-[var(--blue)]"
                    : "border-transparent text-[var(--muted)] hover:text-[var(--navy)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <select
          aria-label="Filter subtes live class"
          value={subtestFilter}
          onChange={(event) => setSubtestFilter(event.target.value)}
          className="w-full rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2 text-xs font-bold text-[var(--ink)] outline-none focus:border-[var(--blue)] sm:w-auto"
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
        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat jadwal Live Class...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Belum ada kelas yang sesuai dengan filter saat ini.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredSessions.map((session) => {
            const statusBadge =
              session.status === "live"
                ? "LIVE SEKARANG"
                : session.status === "upcoming"
                  ? "Mendatang"
                  : "Rekaman";
            const thumbCode: SnbtSubtestCode | "ALL" =
              session.subtest in SNBT_SUBTEST_MAP
                ? (session.subtest as SnbtSubtestCode)
                : "ALL";

            return (
              <article
                key={session.id}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e5eaf1] bg-white transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:shadow-[0_14px_30px_rgba(23,50,77,0.08)]"
              >
                <div>
                  <SubtestThumbnail
                    code={thumbCode}
                    topRightLabel={statusBadge}
                  />

                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-jakarta)] text-[17px] leading-snug font-extrabold text-[var(--ink)]">
                      {session.title}
                    </h3>

                    <div className="mt-1.5 text-xs font-semibold text-[var(--navy)]">
                      {session.mentor_name} · {session.duration_minutes} menit
                    </div>
                    <div className="mt-0.5 text-xs text-[var(--muted)]">
                      {formatDateTimeId(session.scheduled_at)}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--muted)]">
                      {session.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#eef2f7] px-5 py-4">
                  {session.has_active_pass ? (
                    <div className="flex flex-wrap gap-2">
                      {session.meeting_url && session.status !== "recorded" ? (
                        <a
                          href={session.meeting_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-lg bg-[var(--blue)] px-3.5 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[var(--blue-hover)]"
                        >
                          Masuk Meeting →
                        </a>
                      ) : null}
                      {session.recording_url ? (
                        <a
                          href={session.recording_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-lg bg-[var(--navy)] px-3.5 py-2.5 text-center text-xs font-bold text-white transition hover:bg-[var(--navy-deep)]"
                        >
                          ▶ Rekaman
                        </a>
                      ) : null}
                      {session.material_url ? (
                        <a
                          href={session.material_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg border border-[#dce4ef] bg-[#f8fafd] px-3 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--navy)]"
                        >
                          📄 Materi
                        </a>
                      ) : null}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirmModal(true)}
                      className="w-full cursor-pointer rounded-lg border border-[#d6e3f5] bg-[#f6f9ff] px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:bg-[var(--blue-soft)] hover:text-[var(--blue)]"
                    >
                      🔒 Aktifkan Pass ({COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin)
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
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.55)] p-4 backdrop-blur-[2px]"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isPurchasing) {
              setShowConfirmModal(false);
            }
          }}
        >
          <div className="w-full max-w-[460px] rounded-2xl border border-[#e5eaf1] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="m-0 font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--ink)]">
                  {hasActivePass
                    ? "Perpanjang Live Class Pass"
                    : "Aktifkan Live Class Pass 30 Hari"}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  Akses penuh seluruh jadwal kelas interaktif, materi PDF, dan
                  rekaman video selama 30 hari.
                </p>
              </div>
              <button
                type="button"
                disabled={isPurchasing}
                onClick={() => setShowConfirmModal(false)}
                aria-label="Tutup modal"
                className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#e5eaf1] text-base font-bold text-[var(--muted)] hover:bg-[#f5f8fc] hover:text-[var(--navy)]"
              >
                ×
              </button>
            </div>

            <div className="mt-4 space-y-2 rounded-xl border border-[#e5eaf1] bg-[#f8fafd] p-4 text-sm">
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
              <div className="flex justify-between border-t border-[#e5eaf1] pt-2">
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

            <div className="mt-5 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isPurchasing}
                onClick={() => setShowConfirmModal(false)}
                className="w-full cursor-pointer rounded-lg border border-[#dce4ef] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)] sm:w-auto"
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
                  className="w-full cursor-pointer rounded-lg bg-[var(--blue)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--blue-hover)] sm:w-auto"
                >
                  Isi Coin Sekarang →
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isPurchasing}
                  onClick={() => void handleBuyPass()}
                  className="w-full cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] disabled:opacity-60 sm:w-auto"
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
