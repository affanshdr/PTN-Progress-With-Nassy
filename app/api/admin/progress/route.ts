import { connection, NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Profile, ProgressEntry } from "@/lib/supabase/types";

export interface AdminProgressRecord extends ProgressEntry {
  userName: string;
  userEmail: string;
  userClass: string;
  userPtn: string;
}

export async function GET(request: NextRequest) {
  await connection();

  try {
    const supabase = createServerSupabaseClient();
    const subtestFilter =
      request.nextUrl.searchParams.get("subtest")?.trim() ?? "";
    const queryFilter =
      request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";

    let progressQuery = supabase
      .from("progress")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (subtestFilter && subtestFilter !== "ALL") {
      progressQuery = progressQuery.eq("subtest", subtestFilter);
    }

    const [{ data: progressRows, error: progressErr }, { data: profiles, error: profileErr }] =
      await Promise.all([
        progressQuery,
        supabase.from("profiles").select("id, name, email, class_name, ptn"),
      ]);

    if (progressErr) {
      return NextResponse.json({ error: progressErr.message }, { status: 500 });
    }
    if (profileErr) {
      return NextResponse.json({ error: profileErr.message }, { status: 500 });
    }

    const profileMap = new Map<string, Partial<Profile>>();
    for (const profile of (profiles as Array<Partial<Profile>>) ?? []) {
      if (profile.id) profileMap.set(profile.id, profile);
    }

    let records: AdminProgressRecord[] = (
      (progressRows as ProgressEntry[]) ?? []
    ).map((row) => {
      const owner = profileMap.get(row.user_id);
      return {
        ...row,
        userName: owner?.name ?? "Pengguna",
        userEmail: owner?.email ?? "-",
        userClass: owner?.class_name ?? "-",
        userPtn: owner?.ptn ?? "-",
      };
    });

    if (queryFilter) {
      records = records.filter(
        (item) =>
          item.userName.toLowerCase().includes(queryFilter) ||
          item.progress.toLowerCase().includes(queryFilter) ||
          item.target.toLowerCase().includes(queryFilter) ||
          item.subtest.toLowerCase().includes(queryFilter),
      );
    }

    return NextResponse.json({ records });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal memuat data progres.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const idParam = request.nextUrl.searchParams.get("id")?.trim();
  if (!idParam) {
    return NextResponse.json(
      { error: "Parameter query `id` wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.from("progress").delete().eq("id", idParam);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deletedId: idParam });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal menghapus progres.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
