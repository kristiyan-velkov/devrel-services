"use client";

import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/cn";

type ThemeSwitcherProps = {
  className?: string;
};

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-blue hover:bg-ink/5",
        className,
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
    >
      <span aria-hidden="true" className="text-base leading-none">
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}
