import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCompose } from "@/components/compose-context";

export function SiteHeader() {
  const { openCompose } = useCompose();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="font-serif text-xl tracking-tight italic text-foreground"
        >
          Murmur
        </Link>
        <Button size="sm" onClick={openCompose} className="px-4">
          Share
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const [open, setOpen] = useState(false);

  return (
    <footer className="mx-auto mt-auto w-full max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-faint">
        <p>
          Murmur is not a crisis service. If you are in immediate danger,
          contact local emergency services.
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-muted transition-colors duration-150 hover:text-foreground"
          >
            How this room works
          </button>
          <span>No accounts. Nothing here is tied to a name.</span>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How this room works</DialogTitle>
            <DialogDescription>
              A few quiet rules so the space stays worth being in.
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 text-sm leading-relaxed text-muted">
            <li>No names, no profiles, no followers.</li>
            <li>
              Anyone can read. Anyone can reply. Replies are unnamed too.
            </li>
            <li>
              Leave out emails, addresses, workplaces, and anything that could
              identify you or someone else.
            </li>
            <li>
              Be the kind of stranger you would want to meet at two in the
              morning.
            </li>
            <li>
              Murmur is a listening room, not medical, legal, or emergency help.
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
