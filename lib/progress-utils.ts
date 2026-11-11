import type { Profile, ProgressEntry } from "@/lib/supabase/types";

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

export const CLASS_OPTIONS = [
  "Kelas 10",
  "Kelas 11",
  "Kelas 12",
  "Gapyear",
  "Semigapyear",
  "Lainnya",
] as const;

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

  const toIsoDate = (date: Date) => date.toISOString().slice(0, 10);
  const today = toIsoDate(cursor);

  if (uniqueDates[0] !== today) {
    cursor.setDate(cursor.getDate() - 1);
    if (uniqueDates[0] !== toIsoDate(cursor)) {
      return 0;
    }
  }

  let count = 0;
  for (const dateStr of uniqueDates) {
    if (dateStr === toIsoDate(cursor)) {
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

export function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}
