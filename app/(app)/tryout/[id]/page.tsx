import { Suspense } from "react";
import { TryoutRoomView } from "@/components/frontend/TryoutRoomView";

async function TryoutRoomParams({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TryoutRoomView tryoutId={id} />;
}

export default function TryoutDetailPage({
  params,
}: PageProps<"/tryout/[id]">) {
  return (
    <Suspense
      fallback={
        <div className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-[var(--muted)]">
          Memuat ruang Tryout...
        </div>
      }
    >
      <TryoutRoomParams params={params} />
    </Suspense>
  );
}
