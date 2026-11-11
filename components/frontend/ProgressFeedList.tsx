import { formatDuration } from "@/lib/progress-utils";
import type { ProgressEntry } from "@/lib/supabase/types";

interface ProgressFeedListProps {
  entries: readonly ProgressEntry[];
  emptyMessage: string;
}

export function ProgressFeedList({
  entries,
  emptyMessage,
}: ProgressFeedListProps) {
  if (entries.length === 0) {
    return (
      <div className="py-9 text-center text-sm text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {entries.map((item, idx) => (
        <div
          key={item.id ?? `${item.date}-${item.subtest}-${idx}`}
          className="border-t border-[var(--border)] py-4 first:border-t-0 first:pt-0 last:pb-0"
        >
          <div className="flex items-center justify-between gap-2.5">
            <b className="text-sm font-bold text-[var(--ink)]">
              {item.subtest} · {item.date}
            </b>
            <span className="rounded-[7px] bg-[var(--blue-soft)] px-2 py-1 text-xs font-extrabold text-[var(--blue)]">
              {formatDuration(Number(item.duration || 0))}
            </span>
          </div>
          <p className="my-2 text-sm leading-relaxed text-[#4e5968]">
            {item.progress}
          </p>
          <div className="text-xs text-[var(--muted)]">
            Target/kendala: {item.target}
            {item.proof ? ` · Bukti: ${item.proof}` : ""}
          </div>
        </div>
      ))}
    </div>
  );
}
