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
      <div className="rounded-xl border border-dashed border-[var(--border)] bg-[#f8fafc] py-10 text-center text-sm text-[var(--muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((item, idx) => (
        <article
          key={item.id ?? `${item.date}-${item.subtest}-${idx}`}
          className="rounded-xl border border-[var(--border)] bg-[#fcfdff] p-4 transition hover:border-[#cddcf0]"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--navy)] px-2.5 py-0.5 text-[11px] font-extrabold text-white">
                {item.subtest}
              </span>
              <span className="text-xs font-bold text-[var(--muted)]">
                {item.date}
              </span>
            </div>
            <span className="rounded-full bg-[var(--blue-soft)] px-2.5 py-1 text-xs font-extrabold text-[var(--blue)]">
              ⏱ {formatDuration(Number(item.duration || 0))}
            </span>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed font-medium text-[var(--ink)]">
            {item.progress}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--muted)]">
            <span>
              <b className="text-[var(--navy)]">Target/Kendala:</b>{" "}
              {item.target}
            </span>
            {item.proof ? (
              <span className="rounded-md bg-[#f1f5f9] px-2 py-0.5 font-semibold text-[var(--navy)]">
                📎 {item.proof}
              </span>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
