"use client";

import { useState } from "react";
import {
  COIN_PACKAGES,
  formatIdr,
  PAYMENT_METHODS,
} from "@/lib/progress-utils";
import { getSupabaseClient } from "@/lib/supabase/client";
import { getErrorMessage, isMissingSchemaError } from "@/lib/supabase/errors";
import type {
  CoinPackageOption,
  CoinTopupOrder,
  PaymentMethodCode,
} from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";

interface GatewaySimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrder?: CoinTopupOrder | null;
}

export function TopupGatewayModal({
  isOpen,
  onClose,
  initialOrder = null,
}: GatewaySimulationModalProps) {
  const { currentUser, updateWalletLocally, refreshWallet, showToast } =
    useNassy();

  const [selectedPackageId, setSelectedPackageId] =
    useState<CoinPackageOption["id"]>("pejuang");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodCode>("QRIS");
  const [activeOrder, setActiveOrder] = useState<CoinTopupOrder | null>(
    initialOrder,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const currentOrder = activeOrder ?? initialOrder;
  const selectedPkg =
    COIN_PACKAGES.find((item) => item.id === selectedPackageId) ??
    COIN_PACKAGES[1];

  async function handleCreateOrder() {
    if (!currentUser) {
      showToast("Silakan masuk terlebih dahulu.");
      return;
    }

    setIsProcessing(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("create_dummy_topup_order", {
        p_package_id: selectedPkg.id,
        p_payment_method: paymentMethod,
      });
      if (error) throw error;
      setActiveOrder(data as CoinTopupOrder);
      await refreshWallet();
    } catch (error) {
      if (isMissingSchemaError(error)) {
        showToast(
          "Jalankan migrasi SQL Supabase terlebih dahulu untuk memakai Top-Up Coin.",
        );
      } else {
        showToast(getErrorMessage(error, "Gagal membuat tagihan top-up."));
      }
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleSimulatePaid() {
    if (!currentOrder) return;
    setIsProcessing(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("complete_dummy_topup_order", {
        p_order_id: currentOrder.id,
      });
      if (error) throw error;

      const payload = data as { coin_balance?: number };
      if (typeof payload.coin_balance === "number") {
        updateWalletLocally({ coin_balance: payload.coin_balance });
      } else {
        await refreshWallet();
      }
      showToast(`Top-up +${currentOrder.coins} Coin berhasil! 🪙`);
      setActiveOrder(null);
      onClose();
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal menyelesaikan pembayaran dummy."));
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleCancelOrder() {
    if (!currentOrder) {
      onClose();
      return;
    }
    setIsProcessing(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.rpc("cancel_dummy_topup_order", {
        p_order_id: currentOrder.id,
      });
      if (error) throw error;
      await refreshWallet();
      showToast("Tagihan dibatalkan.");
      setActiveOrder(null);
      onClose();
    } catch (error) {
      showToast(getErrorMessage(error, "Gagal membatalkan tagihan."));
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="topup-modal-title"
      className="fixed inset-0 z-50 grid place-items-center bg-[rgba(10,20,30,0.55)] p-4 backdrop-blur-[2px]"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isProcessing) {
          setActiveOrder(null);
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-[540px] overflow-auto rounded-2xl border border-[#e5eaf1] bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="topup-modal-title"
              className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--ink)]"
            >
              {currentOrder ? "Selesaikan Pembayaran" : "Isi Ulang Coin"}
            </h2>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              Pilih paket Coin dan metode pembayaran.
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup dialog"
            disabled={isProcessing}
            onClick={() => {
              setActiveOrder(null);
              onClose();
            }}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#e5eaf1] bg-white text-base font-bold text-[var(--muted)] transition hover:bg-[#f5f8fc] hover:text-[var(--navy)]"
          >
            ×
          </button>
        </div>

        {!currentOrder ? (
          <div className="mt-5 space-y-5">
            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                1. Pilih Paket Coin
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {COIN_PACKAGES.map((pkg) => {
                  const isSelected = pkg.id === selectedPackageId;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedPackageId(pkg.id)}
                      className={`cursor-pointer rounded-xl border p-3.5 text-left transition ${
                        isSelected
                          ? "border-[var(--blue)] bg-[var(--blue-soft)]/60 ring-2 ring-[var(--blue)]/20"
                          : "border-[var(--border)] bg-white hover:border-[#cdd7e5]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-extrabold text-[var(--navy)]">
                          🪙 {pkg.coins} Coin
                        </span>
                        {pkg.badge ? (
                          <span className="rounded-full bg-[var(--navy)] px-2 py-0.5 text-[10px] font-bold text-white">
                            {pkg.badge}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-1 text-base font-bold text-[var(--blue)]">
                        {formatIdr(pkg.priceIdr)}
                      </div>
                      <div className="mt-1 text-xs text-[var(--muted)]">
                        {pkg.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
                2. Pilih Metode Pembayaran
              </div>
              <div className="grid gap-2">
                {PAYMENT_METHODS.map((method) => {
                  const active = method.code === paymentMethod;
                  return (
                    <button
                      key={method.code}
                      type="button"
                      onClick={() => setPaymentMethod(method.code)}
                      className={`flex cursor-pointer flex-wrap items-center justify-between gap-1 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${
                        active
                          ? "border-[var(--blue)] bg-[var(--blue-soft)]/50 font-bold text-[var(--navy)]"
                          : "border-[var(--border)] bg-white text-[var(--ink)] hover:border-[#cdd7e5]"
                      }`}
                    >
                      <span>{method.label}</span>
                      <span className="text-xs text-[var(--muted)]">
                        {method.helper}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] px-4 py-3 text-sm">
              <span className="text-[var(--muted)]">Total Tagihan</span>
              <span className="text-base font-extrabold text-[var(--navy)]">
                {formatIdr(selectedPkg.priceIdr)} ({selectedPkg.coins} Coin)
              </span>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => void handleCreateOrder()}
              className="w-full cursor-pointer rounded-lg bg-[var(--navy)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isProcessing ? "Membuat Tagihan..." : "Lanjut ke Pembayaran →"}
            </button>
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl border border-[var(--border)] bg-[#f8fafc] p-4">
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Kode Order</span>
                <span className="font-mono font-bold text-[var(--ink)]">
                  {currentOrder.order_code}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Paket</span>
                <span className="font-bold text-[var(--ink)]">
                  {currentOrder.package_name} (🪙 {currentOrder.coins} Coin)
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-[var(--muted)]">
                <span>Metode</span>
                <span className="font-bold text-[var(--ink)]">
                  {currentOrder.payment_method}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
                <span className="text-sm font-bold text-[var(--ink)]">
                  Total Pembayaran
                </span>
                <span className="text-lg font-extrabold text-[var(--blue)]">
                  {formatIdr(currentOrder.price_idr)}
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-[#c5d4ea] bg-[var(--blue-soft)]/35 p-4 text-center">
              {currentOrder.payment_method === "QRIS" ? (
                <>
                  <div className="mx-auto grid h-24 w-24 place-items-center rounded-xl border border-[var(--border)] bg-white font-mono text-xs font-bold text-[var(--navy)]">
                    QRIS
                    <br />
                    {currentOrder.order_code.slice(-6)}
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    Konfirmasi pembayaran di bawah setelah transaksi selesai.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xs text-[var(--muted)]">
                    Nomor Virtual Account / Referensi Pembayaran
                  </div>
                  <div className="mt-1 break-all font-mono text-lg font-extrabold tracking-wider text-[var(--navy)]">
                    8808{currentOrder.order_code.replace(/\D/g, "").slice(-10)}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => void handleSimulatePaid()}
                className="flex-1 cursor-pointer rounded-lg bg-[#147a4b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#10663e] disabled:opacity-60"
              >
                {isProcessing
                  ? "Memverifikasi..."
                  : "Konfirmasi Pembayaran"}
              </button>
              <button
                type="button"
                disabled={isProcessing}
                onClick={() => void handleCancelOrder()}
                className="cursor-pointer rounded-lg border border-[#dce4ef] bg-white px-4 py-3 text-sm font-bold text-[var(--muted)] hover:text-[#a52b36]"
              >
                Batalkan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
