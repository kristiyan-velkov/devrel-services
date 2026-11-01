import { cn } from "@/lib/cn";

export function buttonClass(variant: "primary" | "ghost") {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight transition-colors",
    variant === "primary"
      ? "bg-[var(--blue-strong)] text-[var(--btn-primary-fg)] hover:bg-[var(--btn-primary-hover)]"
      : "border border-line bg-ink/5 text-fg hover:border-blue hover:bg-ink/8",
  );
}
