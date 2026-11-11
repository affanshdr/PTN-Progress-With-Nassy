import { connection } from "next/server";

export interface EndpointSpec {
  readonly method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  readonly path: string;
  readonly description: string;
}

export interface AdminOverview {
  readonly service: string;
  readonly environment: string;
  readonly checkedAt: string;
  readonly endpoints: readonly EndpointSpec[];
}

export const BACKEND_ENDPOINTS: readonly EndpointSpec[] = [
  {
    method: "GET",
    path: "/api/health",
    description: "Pemeriksaan status layanan back-end dan runtime environment.",
  },
  {
    method: "GET",
    path: "/api/admin/overview",
    description: "Ringkasan status dan daftar endpoint untuk dashboard admin.",
  },
] as const;

/**
 * Collects request-time backend overview data for API routes and the admin page.
 */
export async function getAdminOverview(): Promise<AdminOverview> {
  // Ensure Cache Components defers timestamp generation to request time.
  await connection();

  return {
    service: "ptn-progress-with-nassy-backend",
    environment: process.env.NODE_ENV ?? "development",
    checkedAt: new Date().toISOString(),
    endpoints: BACKEND_ENDPOINTS,
  };
}
