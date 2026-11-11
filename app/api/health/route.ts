import { connection, NextResponse } from "next/server";
import {
  hasServiceRoleKey,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function GET() {
  await connection();

  return NextResponse.json({
    status: "ok",
    service: "ptn-progress-with-nassy-backend",
    environment: process.env.NODE_ENV ?? "development",
    supabaseConfigured: isSupabaseServerConfigured(),
    usingServiceRole: hasServiceRoleKey(),
    timestamp: new Date().toISOString(),
  });
}
