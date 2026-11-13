"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { COIN_PRICING, formatDateTimeId } from "@/lib/progress-utils";
import { getSupabaseClient, isSupabaseBrowserConfigured } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type { TryoutCatalogItem } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

export default function TryoutPage() {
  const {
    currentUser,
    coinBalance,
    openTopupModal,
    updateWalletLocally,
    refreshWallet,
    markSchemaNeedsMigration,
    showToast,
  } = useNassy();

  const [tryouts, setTryouts] = useState<TryoutCatalogItem[]>([]);
  const [nowMs, setNowMs] = useState(0);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmTarget, setConfirmTarget] = useState<TryoutCatalogItem | null>(
    null,
  );
  const [isUnlocking, setIsUnlocking] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchCatalog() {
      if (!currentUser || !isSupabaseBrowserConfigured()) {
        if (active) setIsLoading(false);
        return;
      }
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_tryout_catalog");
        if (!active) return;
        if (error) throw error;
        setTryouts((data as TryoutCatalogItem[]) ?? []);
        setNowMs(Date.now());
        setErrorMessage(null);
      } catch (error) {
        if (!active) return;
        if (isMissingSchemaError(error)) {
          markSchemaNeedsMigration();
          setErrorMessage(
            "Tabel Tryout Mingguan belum tersedia di Supabase. Jalankan file migrasi SQL terlebih dahulu.",
          );
        } else {
          setErrorMessage(getErrorMessage(error, "Gagal memuat daftar Tryout."));
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void fetchCatalog();

    return () => {
      active = false;
    };
  }, [currentUser, markSchemaNeedsMigration, reloadNonce]);

  async function handleConfirmUnlock() {
    if (!confirmTarget) return;
    setIsUnlocking(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("unlock_tryout", {
        p_tryout_id: confirmTarget.id,
      });
      if (error) throw error;

      const payload = data as {
        coin_balance?: number;
        already_unlocked?: boolean;
        coins_paid?: number;
      };
      if (typeof payload.coin_balance === "number") {
        updateWalletLocally({ coin_balance: payload.coin_balance });
      }
      await refreshWallet();
      setReloadNonce((prev) => prev + 1);
      showToast(
        payload.already_unlocked
          ? "Kamu sudah terdaftar di Tryout ini."
          : `Berhasil membuka Tryout (-${payload.coins_paid ?? confirmTarget.coin_cost} Coin)!`,
      );
      setConfirmTarget(null);
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal mendaftar Tryout."));
    } finally {
      setIsUnlocking(false);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="m-0 mb-1.5 text-[28px] font-bold sm:text-[30px]">
            📝 Tryout Mingguan
          </h1>
          <div className="text-sm text-[var(--muted)]">
            Uji kemampuan tiap minggu ({COIN_PRICING.TRYOUT_WEEKLY_COST} Coin
            per Tryout), dapatkan skor skala SNBT, pembahasan, & masuk
            Leaderboard.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/peringkat"
            className="rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-xs font-bold text-[var(--navy)] transition hover:-translate-y-0.5 sm:text-sm"
          >
            🏆 Leaderboard Tryout
          </Link>
          <button
            type="button"
            onClick={openTopupModal}
            className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 sm:text-sm"
          >
            🪙 Saldo: {coinBalance} Coin
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat paket Tryout Mingguan...
        </div>
      ) : errorMessage ? (
        <div className="rounded-2xl border border-[#ffd4d4] bg-[#fff1f1] p-5 text-sm text-[#a52b36]">
          {errorMessage}
        </div>
      ) : tryouts.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Belum ada paket Tryout Mingguan yang dipublikasikan.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {tryouts.map((item) => {
            const startsAt = new Date(item.starts_at).getTime();
            const endsAt = new Date(item.ends_at).getTime();
            const isUpcoming = nowMs > 0 && nowMs < startsAt;
            const isEnded = nowMs > 0 && nowMs > endsAt;
            const isOpenNow = !isUpcoming && !isEnded;

            return (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full bg-[var(--blue-soft)] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                      Minggu #{item.week_number}
                    </span>

                    {item.has_attempted ? (
                      <span className="rounded-full bg-[#ecfdf3] px-3 py-1 text-xs font-extrabold text-[#147a4b]">
                        ✓ Selesai · Skor {item.user_score ?? 0}
                      </span>
                    ) : item.is_registered ? (
                      <span className="rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-extrabold text-[var(--blue)]">
                        ✓ Terdaftar
                      </span>
                    ) : isUpcoming ? (
                      <span className="rounded-full bg-[#fff8e1] px-3 py-1 text-xs font-extrabold text-[#8a5300]">
                        Segera Dibuka
                      </span>
                    ) : isEnded ? (
                      <span className="rounded-full bg-[#f1f5f9] px-3 py-1 text-xs font-bold text-[var(--muted)]">
                        Periode Berakhir
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#fff8e1] px-3 py-1 text-xs font-extrabold text-[#8a5300]">
                        🪙 {item.coin_cost} Coin
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 text-lg font-bold text-[var(--ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {item.description}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[#f8fafc] p-3 text-center">
                    <div>
                      <div className="text-[11px] text-[var(--muted)]">Soal</div>
                      <div className="text-sm font-extrabold text-[var(--ink)]">
                        {item.question_count} nomor
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--muted)]">
                        Durasi
                      </div>
                      <div className="text-sm font-extrabold text-[var(--ink)]">
                        {item.duration_minutes} menit
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-[var(--muted)]">
                        Peserta
                      </div>
                      <div className="text-sm font-extrabold text-[var(--ink)]">
                        {item.participant_count}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-[var(--muted)]">
                    Jadwal: {formatDateTimeId(item.starts_at)} —{" "}
                    {formatDateTimeId(item.ends_at)}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-[var(--border)] pt-4">
                  {item.has_attempted ? (
                    <>
                      <Link
                        href={`/tryout/${item.id}`}
                        className="flex-1 rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5"
                      >
                        Lihat Skor & Pembahasan →
                      </Link>
                      <Link
                        href={`/peringkat?tryout=${item.id}`}
                        className="rounded-[10px] border border-[var(--border)] bg-white px-3.5 py-2.5 text-xs font-bold text-[var(--navy)]"
                      >
                        Ranking
                      </Link>
                    </>
                  ) : item.is_registered ? (
                    isOpenNow ? (
                      <Link
                        href={`/tryout/${item.id}`}
                        className="w-full rounded-[10px] bg-[var(--blue)] px-4 py-2.5 text-center text-sm font-bold text-white transition hover:-translate-y-0.5"
                      >
                        Mulai Kerjakan Tryout →
                      </Link>
                    ) : (
                      <div className="w-full rounded-[10px] border border-[var(--border)] bg-[#f8fafc] px-4 py-2.5 text-center text-xs font-bold text-[var(--muted)]">
                        {isUpcoming
                          ? `Sudah Terdaftar · Dibuka ${formatDateTimeId(item.starts_at)}`
                          : "Periode Tryout Berakhir"}
                      </div>
                    )
                  ) : isEnded ? (
                    <div className="w-full rounded-[10px] border border-[var(--border)] bg-[#f8fafc] px-4 py-2.5 text-center text-xs font-bold text-[var(--muted)]">
                      Pendaftaran Ditutup
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmTarget(item)}
                      className="w-full cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                    >
                      Daftar & Buka Tryout ({item.coin_cost} Coin)
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Confirmation Dialog for Tryout Unlock */}
      {confirmTarget ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.5)] p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget && !isUnlocking) {
              setConfirmTarget(null);
            }
          }}
        >
          <div className="w-full max-w-[460px] rounded-[20px] bg-white p-6 shadow-xl">
            <h2 className="m-0 text-xl font-bold text-[var(--ink)]">
              Konfirmasi Pendaftaran Tryout
            </h2>
            <p className="mt-1.5 text-sm text-[var(--muted)]">
              {confirmTarget.title}
            </p>

            <div className="mt-4 space-y-2 rounded-xl border border-[var(--border)] bg-[#f8fafc] p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Saldo Coin Kamu</span>
                <span className="font-bold text-[var(--ink)]">
                  🪙 {coinBalance} Coin
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Biaya Tryout</span>
                <span className="font-bold text-[#b45309]">
                  -{confirmTarget.coin_cost} Coin
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--border)] pt-2">
                <span className="font-bold text-[var(--ink)]">Sisa Saldo</span>
                <span
                  className={`font-extrabold ${
                    coinBalance >= confirmTarget.coin_cost
                      ? "text-[#147a4b]"
                      : "text-[#d92d20]"
                  }`}
                >
                  🪙 {coinBalance - confirmTarget.coin_cost} Coin
                </span>
              </div>
            </div>

            {coinBalance < confirmTarget.coin_cost ? (
              <div className="mt-4 rounded-xl border border-[#ffd4d4] bg-[#fff1f1] p-3 text-xs font-medium text-[#a52b36]">
                Saldo Coin kamu belum cukup. Isi ulang Coin terlebih dahulu
                untuk mendaftar Tryout ini.
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap justify-end gap-2.5">
              <button
                type="button"
                disabled={isUnlocking}
                onClick={() => setConfirmTarget(null)}
                className="cursor-pointer rounded-[10px] border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-bold text-[var(--muted)]"
              >
                Batal
              </button>

              {coinBalance < confirmTarget.coin_cost ? (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmTarget(null);
                    openTopupModal();
                  }}
                  className="cursor-pointer rounded-[10px] bg-[var(--blue)] px-4 py-2.5 text-sm font-bold text-white"
                >
                  Isi Coin Sekarang →
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isUnlocking}
                  onClick={() => void handleConfirmUnlock()}
                  className="cursor-pointer rounded-[10px] bg-[var(--navy)] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {isUnlocking
                    ? "Memproses..."
                    : `Bayar ${confirmTarget.coin_cost} Coin & Buka`}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
