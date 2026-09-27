import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-36 w-full resize-y rounded-lg bg-card-2 px-3 py-3 text-base leading-relaxed text-foreground shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
