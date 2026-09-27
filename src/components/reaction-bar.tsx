import { Ear, HandHeart, Repeat2 } from "lucide-react";
import { useState } from "react";
import { getReactionState, setReactionState } from "@/lib/device-memory";
import { toggleReaction } from "@/lib/murmurs";
import type { ReactionKind } from "@/lib/schema";
import { cn } from "@/lib/utils";

const REACTIONS: {
  kind: ReactionKind;
  label: string;
  Icon: typeof Ear;
}[] = [
  { kind: "heard", label: "Heard", Icon: Ear },
  { kind: "same", label: "Same", Icon: Repeat2 },
  { kind: "strength", label: "Strength", Icon: HandHeart },
];

export function ReactionBar({
  murmurId,
  heardCount,
  sameCount,
  strengthCount,
}: {
  murmurId: number;
  heardCount: number;
  sameCount: number;
  strengthCount: number;
}) {
  const [counts, setCounts] = useState({
    heard: heardCount,
    same: sameCount,
    strength: strengthCount,
  });
  const [active, setActive] = useState(() => getReactionState(murmurId));
  const [pending, setPending] = useState<ReactionKind | null>(null);

  async function onToggle(kind: ReactionKind) {
    if (pending) return;
    const nextOn = !active[kind];
    setPending(kind);
    setActive((current) => ({ ...current, [kind]: nextOn }));
    setCounts((current) => ({
      ...current,
      [kind]: Math.max(0, current[kind] + (nextOn ? 1 : -1)),
    }));
    setReactionState(murmurId, kind, nextOn);
    try {
      const result = await toggleReaction({
        data: { id: murmurId, kind, on: nextOn },
      });
      setCounts({
        heard: result.heardCount,
        same: result.sameCount,
        strength: result.strengthCount,
      });
    } catch {
      setActive((current) => ({ ...current, [kind]: !nextOn }));
      setCounts((current) => ({
        ...current,
        [kind]: Math.max(0, current[kind] + (nextOn ? -1 : 1)),
      }));
      setReactionState(murmurId, kind, !nextOn);
    } finally {
      setPending(null);
    }
  }

  const valueFor = (kind: ReactionKind) => counts[kind];

  return (
    <div className="flex flex-wrap gap-2">
      {REACTIONS.map(({ kind, label, Icon }) => {
        const on = active[kind];
        return (
          <button
            key={kind}
            type="button"
            onClick={() => onToggle(kind)}
            disabled={pending === kind}
            aria-pressed={on}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-3.5 text-sm transition-[background-color,color,box-shadow] duration-150",
              on
                ? "bg-primary text-primary-foreground"
                : "text-muted shadow-[var(--shadow-border)] hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
            <span className="tabular-nums text-xs opacity-80">
              {valueFor(kind)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
