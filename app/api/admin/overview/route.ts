import { NextResponse } from "next/server";
import { getAdminOverview } from "@/lib/server/admin-summary";

export async function GET() {
  const overview = await getAdminOverview();
  return NextResponse.json(overview);
}
