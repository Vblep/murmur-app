import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { RelativeTime } from "@/components/relative-time";
import type { MurmurSummary } from "@/lib/murmurs";
import { TOPIC_BY_ID } from "@/lib/topics";

export function MurmurCard({ murmur }: { murmur: MurmurSummary }) {
  const topic = TOPIC_BY_ID[murmur.topic];

  return (
    <Link
      to="/m/$id"
      params={{ id: String(murmur.id) }}
      className="feed-card block rounded-xl bg-card p-5 shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 ease-out hover:shadow-[var(--shadow-border-hover)] active:scale-[0.99]"
    >
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        <span className="tracking-wide uppercase">{topic.label}</span>
        <span aria-hidden="true">·</span>
        <RelativeTime date={murmur.createdAt} />
      </div>
      <h2 className="mt-2 font-serif text-xl leading-snug font-medium tracking-tight text-foreground">
        {murmur.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {murmur.excerpt}
        {murmur.truncated ? "…" : ""}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-faint">
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-3.5" />
          <span className="tabular-nums">{murmur.replyCount}</span>
          {murmur.replyCount === 1 ? "reply" : "replies"}
        </span>
        <span className="tabular-nums">
          {murmur.heardCount} heard
        </span>
      </div>
    </Link>
  );
}
