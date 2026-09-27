import type { ReactionKind } from "./schema";

const MINE_KEY = "murmur:mine";
const REACTED_KEY = "murmur:reacted";

type ReactionMap = Record<string, Partial<Record<ReactionKind, boolean>>>;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getMineIds(): number[] {
  const ids = readJson<number[]>(MINE_KEY, []);
  return ids.filter((id) => Number.isInteger(id) && id > 0);
}

export function addMineId(id: number) {
  const next = Array.from(new Set([id, ...getMineIds()])).slice(0, 80);
  writeJson(MINE_KEY, next);
}

export function getReactionState(
  id: number,
): Record<ReactionKind, boolean> {
  const map = readJson<ReactionMap>(REACTED_KEY, {});
  const entry = map[String(id)] ?? {};
  return {
    heard: Boolean(entry.heard),
    same: Boolean(entry.same),
    strength: Boolean(entry.strength),
  };
}

export function setReactionState(
  id: number,
  kind: ReactionKind,
  on: boolean,
) {
  const map = readJson<ReactionMap>(REACTED_KEY, {});
  const key = String(id);
  const entry = { ...(map[key] ?? {}), [kind]: on };
  map[key] = entry;
  writeJson(REACTED_KEY, map);
}
