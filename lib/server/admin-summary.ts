import { connection } from "next/server";
import {
  createServerSupabaseClient,
  hasServiceRoleKey,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { SOAL_BUCKET } from "@/lib/supabase/types";

export interface EndpointSpec {
  readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  readonly path: string;
  readonly description: string;
}

export interface AdminStats {
  readonly userCount: number;
  readonly progressCount: number;
  readonly totalMinutes: number;
  readonly bankRootCount: number;
}

export interface AdminOverview {
  readonly service: string;
  readonly environment: string;
  readonly checkedAt: string;
  readonly supabaseConfigured: boolean;
  readonly usingServiceRole: boolean;
  readonly supabaseError: string | null;
  readonly stats: AdminStats;
  readonly endpoints: readonly EndpointSpec[];
}

export const BACKEND_ENDPOINTS: readonly EndpointSpec[] = [
  {
    method: "GET",
    path: "/api/health",
    description: "Pemeriksaan status layanan back-end dan kesiapan Supabase.",
  },
  {
    method: "GET",
    path: "/api/admin/overview",
    description: "Statistik ringkas pengguna, progres, dan Bank Soal.",
  },
  {
    method: "GET",
    path: "/api/admin/progress",
    description: "Daftar catatan progres belajar seluruh pengguna.",
  },
  {
    method: "DELETE",
    path: "/api/admin/progress?id=<id>",
    description: "Hapus catatan progres tertentu untuk moderasi admin.",
  },
  {
    method: "GET",
    path: "/api/admin/bank-soal?path=<folder>",
    description: "Daftar folder dan file pada bucket SOAL ALTERNATIFA.",
  },
  {
    method: "POST",
    path: "/api/admin/bank-soal",
    description: "Upload file soal baru ke bucket SOAL ALTERNATIFA.",
  },
  {
    method: "DELETE",
    path: "/api/admin/bank-soal?path=<filePath>",
    description: "Hapus file soal dari bucket SOAL ALTERNATIFA.",
  },
] as const;

/**
 * Collects request-time backend & Supabase summary metrics for API routes and /admin.
 */
export async function getAdminOverview(): Promise<AdminOverview> {
  await connection();

  const supabaseConfigured = isSupabaseServerConfigured();
  const usingServiceRole = hasServiceRoleKey();
  let supabaseError: string | null = null;
  let stats: AdminStats = {
    userCount: 0,
    progressCount: 0,
    totalMinutes: 0,
    bankRootCount: 0,
  };

  if (supabaseConfigured) {
    try {
      const supabase = createServerSupabaseClient();
      const [profilesRes, progressRes, storageRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("progress").select("duration"),
        supabase.storage.from(SOAL_BUCKET).list("", { limit: 100 }),
      ]);

      const errors = [
        profilesRes.error?.message,
        progressRes.error?.message,
        storageRes.error?.message,
      ].filter(Boolean);

      if (errors.length > 0) {
        supabaseError = errors.join(" | ");
      }

      const progressRows =
        (progressRes.data as Array<{ duration: number | null }> | null) ?? [];
      const storageRows =
        storageRes.data?.filter(
          (item) => item.name && item.name !== ".emptyFolderPlaceholder",
        ) ?? [];

      stats = {
        userCount: profilesRes.count ?? 0,
        progressCount: progressRows.length,
        totalMinutes: progressRows.reduce(
          (sum, row) => sum + Number(row.duration || 0),
          0,
        ),
        bankRootCount: storageRows.length,
      };
    } catch (error) {
      supabaseError =
        error instanceof Error ? error.message : "Gagal membaca Supabase.";
    }
  } else {
    supabaseError =
      "Variabel env NEXT_PUBLIC_SUPABASE_URL / key belum dikonfigurasi.";
  }

  return {
    service: "ptn-progress-with-nassy-backend",
    environment: process.env.NODE_ENV ?? "development",
    checkedAt: new Date().toISOString(),
    supabaseConfigured,
    usingServiceRole,
    supabaseError,
    stats,
    endpoints: BACKEND_ENDPOINTS,
  };
}
