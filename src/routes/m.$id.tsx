import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ReactionBar } from "@/components/reaction-bar";
import { RelativeTime } from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createReply, getMurmur } from "@/lib/murmurs";
import { replySchema } from "@/lib/schema";
import { TOPIC_BY_ID } from "@/lib/topics";

export const Route = createFileRoute("/m/$id")({
  loader: async ({ params }) => {
    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) throw notFound();
    const murmur = await getMurmur({ data: { id } });
    if (!murmur) throw notFound();
    return murmur;
  },
  notFoundComponent: MurmurMissing,
  component: MurmurPage,
});

function MurmurPage() {
  const murmur = Route.useLoaderData();
  const topic = TOPIC_BY_ID[murmur.topic];
  const router = useRouter();
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = replySchema.safeParse({ murmurId: murmur.id, body });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check what you wrote.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      await createReply({ data: parsed.data });
      setBody("");
      toast("Left without a name.");
      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not leave that reply.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pt-8 pb-12 sm:px-6">
      <Link
        to="/"
        className="inline-flex h-11 items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        The room
      </Link>

      <article className="murmur-rise mt-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span className="tracking-wide uppercase">{topic.label}</span>
          <span aria-hidden="true">·</span>
          <RelativeTime date={murmur.createdAt} />
        </div>
        <h1 className="mt-3 font-serif text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          {murmur.title}
        </h1>
        <p className="mt-5 whitespace-pre-wrap text-base leading-relaxed text-foreground/90">
          {murmur.body}
        </p>
      </article>

      <section className="murmur-rise murmur-rise-2 mt-8">
        <ReactionBar
          key={murmur.id}
          murmurId={murmur.id}
          heardCount={murmur.heardCount}
          sameCount={murmur.sameCount}
          strengthCount={murmur.strengthCount}
        />
      </section>

      <section className="murmur-rise murmur-rise-3 mt-12">
        <h2 className="font-serif text-2xl tracking-tight">
          {murmur.replies.length === 0
            ? "No replies yet"
            : murmur.replies.length === 1
              ? "1 reply"
              : `${murmur.replies.length} replies`}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Answer as a stranger. Be specific, and be kind.
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <Label htmlFor="reply-body" className="sr-only">
            Your reply
          </Label>
          <Textarea
            id="reply-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            maxLength={600}
            placeholder="Write back without introducing yourself."
            className="min-h-28"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs tabular-nums text-faint">
              {body.trim().length}/600
            </p>
            <Button type="submit" disabled={pending} size="sm">
              {pending ? "Sending…" : "Reply anonymously"}
            </Button>
          </div>
          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}
        </form>
      </section>

      <ol className="mt-8 flex flex-col gap-3">
        {murmur.replies.map((reply) => (
          <li
            key={reply.id}
            className="rounded-xl bg-card px-5 py-5 shadow-[var(--shadow-border)]"
          >
            <p className="text-xs tracking-wide text-faint uppercase">
              Someone in the room ·{" "}
              <RelativeTime date={reply.createdAt} />
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
              {reply.body}
            </p>
          </li>
        ))}
      </ol>
    </main>
  );
}

function MurmurMissing() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-16 sm:px-6">
      <p className="text-xs tracking-widest text-muted uppercase">Gone quiet</p>
      <h1 className="mt-3 font-serif text-3xl tracking-tight">
        This murmur is not here.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        It may have been a bad link. The rest of the room is still open.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex h-11 w-fit items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Back to the room
      </Link>
    </main>
  );
}
