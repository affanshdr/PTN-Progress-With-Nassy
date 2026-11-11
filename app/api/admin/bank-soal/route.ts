import { connection, NextResponse, type NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { SOAL_BUCKET, type StorageEntry } from "@/lib/supabase/types";

function normalizeStoragePath(raw: string | null): string {
  return (raw ?? "")
    .replaceAll("\\", "/")
    .replace(/^\/+|\/+$/g, "");
}

export async function GET(request: NextRequest) {
  await connection();

  const cleanPath = normalizeStoragePath(
    request.nextUrl.searchParams.get("path"),
  );

  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.storage
      .from(SOAL_BUCKET)
      .list(cleanPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const entries: StorageEntry[] = (data ?? [])
      .filter((item) => item.name && item.name !== ".emptyFolderPlaceholder")
      .map((item) => {
        const isFolder = item.id === null;
        const fullPath = cleanPath ? `${cleanPath}/${item.name}` : item.name;
        const metadataSize =
          typeof item.metadata?.size === "number" ? item.metadata.size : null;

        return {
          id: item.id ?? null,
          name: item.name,
          isFolder,
          updatedAt: item.updated_at ?? null,
          sizeBytes: metadataSize,
          publicUrl: isFolder
            ? undefined
            : supabase.storage.from(SOAL_BUCKET).getPublicUrl(fullPath).data
                .publicUrl,
        };
      });

    return NextResponse.json({
      bucket: SOAL_BUCKET,
      path: cleanPath,
      entries,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal membaca Bank Soal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderInput = formData.get("folderPath");
    const upsertFlag = formData.get("upsert") === "true";

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "File soal wajib dipilih." },
        { status: 400 },
      );
    }

    const cleanFolder = normalizeStoragePath(
      typeof folderInput === "string" ? folderInput : "",
    );
    const safeFileName = file.name.replace(/[/\\]/g, "_");
    const targetPath = cleanFolder
      ? `${cleanFolder}/${safeFileName}`
      : safeFileName;

    const supabase = createServerSupabaseClient();
    const bytes = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from(SOAL_BUCKET)
      .upload(targetPath, bytes, {
        contentType: file.type || "application/octet-stream",
        upsert: upsertFlag,
      });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const publicUrl = supabase.storage
      .from(SOAL_BUCKET)
      .getPublicUrl(targetPath).data.publicUrl;

    return NextResponse.json(
      {
        uploadedPath: targetPath,
        publicUrl,
      },
      { status: 201 },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal mengunggah file soal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const cleanPath = normalizeStoragePath(
    request.nextUrl.searchParams.get("path"),
  );

  if (!cleanPath) {
    return NextResponse.json(
      { error: "Parameter query `path` wajib diisi." },
      { status: 400 },
    );
  }

  try {
    const supabase = createServerSupabaseClient();
    const { error } = await supabase.storage
      .from(SOAL_BUCKET)
      .remove([cleanPath]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ deletedPath: cleanPath });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal menghapus file soal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
