import type {
  CoinPackageOption,
  PaymentMethodCode,
  Profile,
  ProgressEntry,
  SnbtSubtestCode,
} from "@/lib/supabase/types";

export const SUBTESTS = [
  "PK",
  "PM",
  "LBI",
  "LBE",
  "PPU",
  "PU",
  "PBM",
  "Lainnya",
] as const;

export const SNBT_SUBTESTS: ReadonlyArray<{
  code: SnbtSubtestCode;
  name: string;
  category: "TPS" | "Literasi";
  description: string;
}> = [
  {
    code: "PK",
    name: "Pengetahuan Kuantitatif",
    category: "TPS",
    description: "Aljabar, geometri, fungsi, statistika, dan analisis kecukupan data.",
  },
  {
    code: "PM",
    name: "Penalaran Matematika",
    category: "Literasi",
    description: "Pemodelan matematika kontekstual, soal cerita, dan aritmetika terapan.",
  },
  {
    code: "PU",
    name: "Penalaran Umum",
    category: "TPS",
    description: "Penalaran induktif, deduktif (silogisme), dan penalaran kuantitatif pola.",
  },
  {
    code: "PPU",
    name: "Pengetahuan & Pemahaman Umum",
    category: "TPS",
    description: "Makna kata, imbuhan, relasi semantik, dan gagasan utama paragraf.",
  },
  {
    code: "LBI",
    name: "Literasi Bahasa Indonesia",
    category: "Literasi",
    description: "Pemahaman teks informatif, simpulan tersirat, dan evaluasi argumen.",
  },
  {
    code: "LBE",
    name: "Literasi Bahasa Inggris",
    category: "Literasi",
    description: "Reading comprehension, main idea, vocabulary in context, dan inference.",
  },
  {
    code: "PBM",
    name: "Pemahaman Bacaan & Menulis",
    category: "TPS",
    description: "Kaidah EYD V, penulisan kata baku, kalimat efektif, dan tanda baca.",
  },
] as const;

export const SNBT_SUBTEST_MAP: Record<
  SnbtSubtestCode,
  (typeof SNBT_SUBTESTS)[number]
> = SNBT_SUBTESTS.reduce(
  (acc, item) => {
    acc[item.code] = item;
    return acc;
  },
  {} as Record<SnbtSubtestCode, (typeof SNBT_SUBTESTS)[number]>,
);

export const CLASS_OPTIONS = [
  "Kelas 10",
  "Kelas 11",
  "Kelas 12",
  "Gapyear",
  "Semigapyear",
  "Lainnya",
] as const;

export const COIN_PRICING = {
  WELCOME_BONUS: 100,
  LIVECLASS_MONTHLY_COST: 100,
  LIVECLASS_DURATION_DAYS: 30,
  TRYOUT_WEEKLY_COST: 25,
} as const;

export const COIN_PACKAGES: readonly CoinPackageOption[] = [
  {
    id: "starter",
    name: "Paket Starter",
    coins: 50,
    priceIdr: 10000,
    description: "Cukup untuk 2x Tryout Mingguan.",
  },
  {
    id: "pejuang",
    name: "Paket Pejuang",
    coins: 120,
    priceIdr: 20000,
    badge: "Populer",
    description: "Bisa untuk 1 bulan Live Class + sisa 20 Coin.",
  },
  {
    id: "intensif",
    name: "Paket Intensif",
    coins: 300,
    priceIdr: 45000,
    badge: "Hemat 25%",
    description: "Cocok untuk 2 bulan Live Class + 4x Tryout.",
  },
  {
    id: "juara",
    name: "Paket Juara",
    coins: 700,
    priceIdr: 95000,
    badge: "Best Value",
    description: "Stok belajar intensif hingga hari H SNBT.",
  },
] as const;

export const PAYMENT_METHODS: ReadonlyArray<{
  code: PaymentMethodCode;
  label: string;
  helper: string;
}> = [
  { code: "QRIS", label: "QRIS (Semua E-Wallet / M-Banking)", helper: "Scan QR instan" },
  { code: "VA_BCA", label: "BCA Virtual Account", helper: "Verifikasi otomatis" },
  { code: "VA_BRI", label: "BRI Virtual Account", helper: "Verifikasi otomatis" },
  { code: "EWALLET_GOPAY", label: "GoPay", helper: "Checkout aplikasi Gojek" },
  { code: "EWALLET_OVO", label: "OVO", helper: "Push notif ke aplikasi OVO" },
] as const;

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayIsoDate(): string {
  return toLocalIsoDate(new Date());
}

export function getUserProgress(
  allProgress: readonly ProgressEntry[],
  userId: string | undefined,
): ProgressEntry[] {
  if (!userId) return [];
  return allProgress
    .filter((entry) => entry.user_id === userId)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Calculates consecutive study days ending today or yesterday (local date).
 */
export function calculateStreak(userEntries: readonly ProgressEntry[]): number {
  const uniqueDates = Array.from(new Set(userEntries.map((entry) => entry.date)))
    .sort()
    .reverse();

  if (uniqueDates.length === 0) return 0;

  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  const today = toLocalIsoDate(cursor);

  if (uniqueDates[0] !== today) {
    cursor.setDate(cursor.getDate() - 1);
    if (uniqueDates[0] !== toLocalIsoDate(cursor)) {
      return 0;
    }
  }

  let count = 0;
  for (const dateStr of uniqueDates) {
    if (dateStr === toLocalIsoDate(cursor)) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return count;
}

export function calculateTotalMinutes(entries: readonly ProgressEntry[]): number {
  return entries.reduce((sum, item) => sum + Number(item.duration || 0), 0);
}

export function formatDuration(minutes: number): string {
  const safeMinutes = Math.max(0, Math.floor(minutes));
  return `${Math.floor(safeMinutes / 60)}j ${safeMinutes % 60}m`;
}

export function formatSecondsAsClock(seconds: number): string {
  const safe = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  if (hrs > 0) {
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTimeId(isoString: string): string {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return isoString;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function isLiveClassPassActive(
  passUntil: string | null | undefined,
): boolean {
  if (!passUntil) return false;
  return new Date(passUntil).getTime() > Date.now();
}

export function getDaysRemaining(passUntil: string | null | undefined): number {
  if (!passUntil) return 0;
  const diffMs = new Date(passUntil).getTime() - Date.now();
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function pointsForUser(
  userId: string,
  allProgress: readonly ProgressEntry[],
): number {
  return allProgress.filter((entry) => entry.user_id === userId).length * 10;
}

export function getLeaderboard(
  allUsers: readonly Profile[],
  allProgress: readonly ProgressEntry[],
): Array<{ user: Profile; points: number; progressCount: number }> {
  return allUsers
    .map((user) => {
      const progressCount = allProgress.filter(
        (entry) => entry.user_id === user.id,
      ).length;
      return {
        user,
        points: progressCount * 10,
        progressCount,
      };
    })
    .sort((a, b) => b.points - a.points);
}

export function getUserRank(
  userId: string | undefined,
  allUsers: readonly Profile[],
  allProgress: readonly ProgressEntry[],
): number | null {
  if (!userId) return null;
  const board = getLeaderboard(allUsers, allProgress);
  const index = board.findIndex((item) => item.user.id === userId);
  return index !== -1 ? index + 1 : null;
}
