export function SchemaMigrationBanner({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#f7d894] bg-[#fffbeb] text-[#8a5300] ${
        compact ? "p-3.5 text-xs" : "p-4.5 text-sm"
      }`}
    >
      <div className="font-bold">
        ⚠ Migrasi Database Supabase Belum Dijalankan
      </div>
      <p className="mt-1 leading-relaxed text-[#925c09]">
        Untuk mengaktifkan fitur penuh (Coin, Soal + Pembahasan 7 Subtes,
        Tryout Mingguan, Leaderboard Tryout, & Live Class), jalankan script SQL{" "}
        <code className="rounded bg-white/80 px-1.5 py-0.5 font-mono text-xs">
          supabase/migrations/20261113_nassy_coins_tryout_liveclass.sql
        </code>{" "}
        pada <b>Supabase Dashboard → SQL Editor</b>, lalu muat ulang halaman.
      </p>
    </div>
  );
}
