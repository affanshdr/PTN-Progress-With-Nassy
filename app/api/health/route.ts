import { connection, NextResponse } from "next/server";

export async function GET() {
  await connection();

  return NextResponse.json({
    status: "ok",
    service: "ptn-progress-with-nassy-backend",
    environment: process.env.NODE_ENV ?? "development",
    timestamp: new Date().toISOString(),
  });
}
