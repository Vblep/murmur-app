import { useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCompose } from "@/components/compose-context";
import { addMineId } from "@/lib/device-memory";
import { createMurmur } from "@/lib/murmurs";
import { composeSchema } from "@/lib/schema";
import { TOPICS, type TopicId } from "@/lib/topics";
import { cn } from "@/lib/utils";

export function ComposeDialog() {
  const { open, setOpen } = useCompose();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState<TopicId>("heart");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function reset() {
    setTitle("");
    setBody("");
    setTopic("heart");
    setError(null);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const parsed = composeSchema.safeParse({ title, body, topic });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check what you wrote.");
      return;
    }
    setPending(true);
    setError(null);
    try {
      const created = await createMurmur({ data: parsed.data });
      addMineId(created.id);
      reset();
      setOpen(false);
      toast("It's in the room.");
      await router.invalidate();
      await router.navigate({ to: "/m/$id", params: { id: String(created.id) } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not leave that murmur.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setError(null);
      }}
    >
      <DialogContent aria-describedby="compose-copy">
        <DialogHeader>
          <DialogTitle>Leave a murmur</DialogTitle>
          <DialogDescription id="compose-copy">
            No name is attached. Skip details that could identify you or anyone
            else.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Topic</legend>
            <div className="flex flex-wrap gap-2">
              {TOPICS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTopic(item.id)}
                  className={cn(
                    "h-9 rounded-full px-3 text-sm transition-[background-color,color,box-shadow] duration-150",
                    topic === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted shadow-[var(--shadow-border)] hover:text-foreground",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="text-xs text-faint">
              {TOPICS.find((item) => item.id === topic)?.hint}
            </p>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="murmur-title">Quiet title</Label>
            <Input
              id="murmur-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={80}
              placeholder="What is this, in a few words?"
            />
            <p className="text-right text-xs tabular-nums text-faint">
              {title.trim().length}/80
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="murmur-body">The thing itself</Label>
            <Textarea
              id="murmur-body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              maxLength={1200}
              placeholder="Write as if the room is dark and kind."
            />
            <p className="text-right text-xs tabular-nums text-faint">
              {body.trim().length}/1,200
            </p>
          </div>

          {error ? (
            <p className="text-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? "Leaving…" : "Leave it here"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
