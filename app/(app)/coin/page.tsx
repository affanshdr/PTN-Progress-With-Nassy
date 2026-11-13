"use client";

import { useState } from "react";
import {
  COIN_PACKAGES,
  COIN_PRICING,
  formatDateTimeId,
  formatIdr,
  getDaysRemaining,
  isLiveClassPassActive,
} from "@/lib/progress-utils";
import type { CoinTopupOrder } from "@/lib/supabase/types";
import { useNassy } from "@/components/frontend/NassyProvider";
import { WorkspaceHeroBanner } from "@/components/frontend/SkilvulUi";
import { TopupGatewayModal } from "@/components/frontend/TopupGatewayModal";

export default function CoinPage() {
  const {
    currentUser,
    coinBalance,
    coinTransactions,
    topupOrders,
    openTopupModal,
  } = useNassy();

  const [pendingCheckoutOrder, setPendingCheckoutOrder] =
    useState<CoinTopupOrder | null>(null);

  if (!currentUser) return null;

  const hasPass = isLiveClassPassActive(currentUser.liveclass_pass_until);
  const daysLeft = getDaysRemaining(currentUser.liveclass_pass_until);

  return (
    <div className="space-y-6">
      <WorkspaceHeroBanner
        badge="DOMPET & TOP-UP"
        title="Dompet Coin & Top-Up"
        description="Kelola saldo Coin untuk membuka akses Tryout Mingguan SNBT, Live Class Bulanan, dan pembahasan lengkap."
        actions={
          <button
            type="button"
            onClick={openTopupModal}
            className="w-full cursor-pointer rounded-lg bg-[var(--navy)] px-4.5 py-2.5 text-center text-sm font-bold text-white transition hover:bg-[var(--navy-deep)] sm:w-auto"
          >
            + Isi Ulang Coin
          </button>
        }
      />

      {/* Wallet Overview & Pricing Summary */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#f2d07b] bg-[#fffcf0] p-5">
          <div className="text-xs font-extrabold tracking-wide text-[#8a5300] uppercase">
            Saldo Coin Saat Ini
          </div>
          <div className="mt-2 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold text-[var(--navy)]">
            🪙 {coinBalance} Coin
          </div>
          <div className="mt-2 text-xs text-[#925c09]">
            Setiap akun baru mendapat bonus {COIN_PRICING.WELCOME_BONUS} Coin
            saat pendaftaran.
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-5">
          <div className="text-xs font-extrabold tracking-wide text-[var(--muted)] uppercase">
            Status Live Class Pass
          </div>
          <div className="mt-2 font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--ink)]">
            {hasPass ? `✓ Aktif (${daysLeft} hari lagi)` : "Belum Aktif"}
          </div>
          <div className="mt-2 text-xs text-[var(--muted)]">
            {hasPass && currentUser.liveclass_pass_until
              ? `Berlaku hingga ${formatDateTimeId(currentUser.liveclass_pass_until)}`
              : `Aktifkan 30 hari penuh dengan ${COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin di menu Live Class.`}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5eaf1] bg-white p-5">
          <div className="text-xs font-extrabold tracking-wide text-[var(--muted)] uppercase">
            Tarif Fitur Nassy
          </div>
          <ul className="mt-2.5 space-y-2 text-xs text-[var(--ink)]">
            <li className="flex justify-between">
              <span>Soal + Pembahasan 7 Subtes</span>
              <b className="text-[#147a4b]">Gratis</b>
            </li>
            <li className="flex justify-between">
              <span>Tryout Mingguan</span>
              <b>{COIN_PRICING.TRYOUT_WEEKLY_COST} Coin / event</b>
            </li>
            <li className="flex justify-between">
              <span>Live Class Pass (30 hari)</span>
              <b>{COIN_PRICING.LIVECLASS_MONTHLY_COST} Coin / bulan</b>
            </li>
          </ul>
        </div>
      </div>

      {/* Dummy Payment Gateway Packages Preview */}
      <section className="rounded-2xl border border-[#e5eaf1] bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="m-0 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--ink)]">
              Paket Top-Up Coin (Simulasi Payment Gateway)
            </h2>
            <p className="mt-0.5 text-xs text-[var(--muted)]">
              Menggunakan alur checkout dummy (QRIS, BCA/BRI VA, GoPay, OVO)
              yang siap dihubungkan ke Midtrans atau Xendit.
            </p>
          </div>
          <button
            type="button"
            onClick={openTopupModal}
            className="cursor-pointer rounded-lg bg-[var(--blue)] px-4 py-2 text-xs font-bold text-white transition hover:bg-[var(--blue-hover)]"
          >
            Buka Checkout Top-Up →
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {COIN_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="flex flex-col justify-between rounded-2xl border border-[#e5eaf1] bg-[#fcfdff] p-4 transition hover:-translate-y-0.5 hover:border-[#c3d6f4] hover:bg-white hover:shadow-[0_10px_22px_rgba(23,50,77,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--navy)]">
                    🪙 {pkg.coins} Coin
                  </span>
                  {pkg.badge ? (
                    <span className="rounded-full bg-[var(--blue-soft)] px-2.5 py-0.5 text-[10px] font-extrabold text-[var(--blue)]">
                      {pkg.badge}
                    </span>
                  ) : null}
                </div>
                <div className="mt-1.5 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--blue)]">
                  {formatIdr(pkg.priceIdr)}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted)]">
                  {pkg.description}
                </p>
              </div>
              <button
                type="button"
                onClick={openTopupModal}
                className="mt-4 w-full cursor-pointer rounded-lg border border-[#dce4ef] bg-white py-2 text-xs font-bold text-[var(--navy)] transition hover:border-[var(--blue)] hover:bg-[var(--blue-soft)] hover:text-[var(--blue)]"
              >
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pending / Recent Top-up Orders */}
      {topupOrders.length > 0 ? (
        <section className="rounded-2xl border border-[#e5eaf1] bg-white p-5 sm:p-6">
          <h2 className="m-0 mb-3 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--ink)]">
            Riwayat Tagihan Top-Up
          </h2>
          <div className="divide-y divide-[#eef2f7]">
            {topupOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3.5 text-sm"
              >
                <div>
                  <div className="font-bold text-[var(--ink)]">
                    {order.package_name} · {formatIdr(order.price_idr)}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    <span className="font-mono">{order.order_code}</span> ·{" "}
                    {order.payment_method} · {formatDateTimeId(order.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {order.status === "pending" ? (
                    <button
                      type="button"
                      onClick={() => setPendingCheckoutOrder(order)}
                      className="cursor-pointer rounded-lg bg-[var(--blue)] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[var(--blue-hover)]"
                    >
                      Lanjut Bayar
                    </button>
                  ) : (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        order.status === "paid"
                          ? "bg-[#ecfdf3] text-[#147a4b]"
                          : "bg-[#f1f5f9] text-[var(--muted)]"
                      }`}
                    >
                      {order.status === "paid" ? "✓ Lunas" : order.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Coin Transactions Ledger */}
      <section className="rounded-2xl border border-[#e5eaf1] bg-white p-5 sm:p-6">
        <h2 className="m-0 mb-3 font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-[var(--ink)]">
          Mutasi Coin Terbaru
        </h2>
        {coinTransactions.length === 0 ? (
          <div className="py-6 text-center text-sm text-[var(--muted)]">
            Belum ada riwayat transaksi coin.
          </div>
        ) : (
          <div className="divide-y divide-[#eef2f7]">
            {coinTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3.5 text-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="break-words font-bold text-[var(--ink)]">
                    {tx.title}
                  </div>
                  <div className="text-xs text-[var(--muted)]">
                    {formatDateTimeId(tx.created_at)} · Saldo akhir:{" "}
                    {tx.balance_after} Coin
                  </div>
                </div>
                <div
                  className={`shrink-0 font-extrabold ${
                    tx.amount >= 0 ? "text-[#147a4b]" : "text-[#b45309]"
                  }`}
                >
                  {tx.amount >= 0 ? `+${tx.amount}` : tx.amount} Coin
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {pendingCheckoutOrder ? (
        <TopupGatewayModal
          key={pendingCheckoutOrder.id}
          isOpen
          initialOrder={pendingCheckoutOrder}
          onClose={() => setPendingCheckoutOrder(null)}
        />
      ) : null}
    </div>
  );
}
