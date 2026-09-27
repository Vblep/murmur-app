import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-md bg-card-2 px-3 text-base text-foreground shadow-[var(--shadow-border)] transition-[box-shadow,background-color] duration-150 placeholder:text-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
