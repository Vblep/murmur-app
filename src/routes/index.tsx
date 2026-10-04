import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { MurmurCard } from "@/components/murmur-card";
import { useCompose } from "@/components/compose-context";
import { Button } from "@/components/ui/button";
import { getMineIds } from "@/lib/device-memory";
import { getRoomStats, listMurmurs, type MurmurSummary } from "@/lib/murmurs";
import type { FeedSort } from "@/lib/schema";
import { isTopicId, TOPICS, type TopicId } from "@/lib/topics";
import { cn } from "@/lib/utils";

type FeedSearch = {
  topic?: TopicId;
  sort?: FeedSort;
  mine?: boolean;
};

const SORTS: { id: FeedSort; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "unanswered", label: "Unanswered" },
  { id: "heard", label: "Most heard" },
];

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): FeedSearch => {
    const topic =
      typeof search.topic === "string" && isTopicId(search.topic)
        ? search.topic
        : undefined;
    const sort =
      search.sort === "unanswered" ||
      search.sort === "heard" ||
      search.sort === "latest"
        ? search.sort
        : undefined;
    const mine =
      search.mine === true || search.mine === "true" || search.mine === "1"
        ? true
        : undefined;
    return { topic, sort, mine };
  },
  loaderDeps: ({ search }) => ({
    topic: search.topic,
    sort: search.sort,
  }),
  loader: async ({ deps }) => {
    try {
      const [murmurs, stats] = await Promise.all([
        listMurmurs({
          data: {
            topic: deps.topic,
            sort: deps.sort,
          },
        }),
        getRoomStats(),
      ]);
      return { murmurs, stats };
    } catch (error) {
      console.error("[murmur] feed load failed", error);
      return {
        murmurs: [] as MurmurSummary[],
        stats: { murmurs: 0, replies: 0 },
      };
    }
  },
  component: Home,
});

function Home() {
  const { murmurs, stats } = Route.useLoaderData();
  const search = Route.useSearch();
  const { openCompose } = useCompose();
  const [minePosts, setMinePosts] = useState<MurmurSummary[] | null>(null);

  useEffect(() => {
    if (!search.mine) {
      setMinePosts(null);
      return;
    }
    const ids = getMineIds();
    let cancelled = false;
    listMurmurs({ data: { ids } }).then((rows) => {
      if (!cancelled) setMinePosts(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [search.mine, murmurs]);

  const feed = search.mine ? (minePosts ?? []) : murmurs;
  const loadingMine = Boolean(search.mine && minePosts === null);

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pt-10 pb-8 sm:px-6">
      <section className="murmur-rise">
        <p className="text-xs tracking-widest text-muted uppercase">
          Speak freely. Stay unnamed.
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
          Leave what you cannot say out loud.
        </h1>
        <p className="murmur-rise murmur-rise-1 mt-4 max-w-lg text-base leading-relaxed text-muted">
          An anonymous room for problems and the strangers who answer them. No
          profiles. No trail. Just the page, and whoever is listening.
        </p>
        <p className="murmur-rise murmur-rise-2 mt-5 text-sm text-faint tabular-nums">
          {stats.murmurs} {stats.murmurs === 1 ? "murmur" : "murmurs"} ·{" "}
          {stats.replies} {stats.replies === 1 ? "reply" : "replies"}
        </p>
      </section>

      <div className="murmur-rise murmur-rise-3 mt-8 flex flex-wrap items-center gap-2">
        <FilterChip
          active={!search.topic && !search.mine}
          to="/"
          search={{ topic: undefined, sort: search.sort, mine: undefined }}
        >
          All
        </FilterChip>
        {TOPICS.map((topic) => (
          <FilterChip
            key={topic.id}
            active={search.topic === topic.id && !search.mine}
            to="/"
            search={{ topic: topic.id, sort: search.sort, mine: undefined }}
          >
            {topic.label}
          </FilterChip>
        ))}
        <FilterChip
          active={Boolean(search.mine)}
          to="/"
          search={{ topic: undefined, sort: undefined, mine: true }}
        >
          Yours
        </FilterChip>
      </div>

      {!search.mine ? (
        <div className="murmur-rise murmur-rise-4 mt-4 flex flex-wrap gap-1">
          {SORTS.map((item) => (
            <Link
              key={item.id}
              to="/"
              search={{
                topic: search.topic,
                sort: item.id === "latest" ? undefined : item.id,
                mine: undefined,
              }}
              className={cn(
                "inline-flex h-9 items-center rounded-md px-2.5 text-sm transition-colors duration-150",
                (search.sort ?? "latest") === item.id
                  ? "text-foreground"
                  : "text-faint hover:text-muted",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}

      <section className="mt-6 flex flex-col gap-3">
        {loadingMine ? (
          <QuietEmpty
            title="Looking for what you left."
            copy="Posts from this device stay with the browser, not with an account."
          />
        ) : feed.length === 0 ? (
          search.mine ? (
            <QuietEmpty
              title="Nothing from this device yet."
              copy="When you leave a murmur here, you can find it again on this browser."
              action={
                <Button onClick={openCompose} className="mt-2">
                  Share one
                </Button>
              }
            />
          ) : (
            <QuietEmpty
              title="The room is quiet."
              copy="Be the first to speak, or switch the filter."
              action={
                <Button onClick={openCompose} className="mt-2">
                  Leave a murmur
                </Button>
              }
            />
          )
        ) : (
          feed.map((murmur) => (
            <MurmurCard key={murmur.id} murmur={murmur} />
          ))
        )}
      </section>
    </main>
  );
}

function FilterChip({
  active,
  children,
  to,
  search,
}: {
  active: boolean;
  children: string;
  to: "/";
  search: FeedSearch;
}) {
  return (
    <Link
      to={to}
      search={search}
      className={cn(
        "inline-flex h-9 items-center rounded-full px-3 text-sm transition-[background-color,color,box-shadow] duration-150",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted shadow-[var(--shadow-border)] hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

function QuietEmpty({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start rounded-xl bg-card px-5 py-10 shadow-[var(--shadow-border)]">
      <Moon className="size-5 text-muted" />
      <h2 className="mt-4 font-serif text-2xl tracking-tight">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{copy}</p>
      {action}
    </div>
  );
}
