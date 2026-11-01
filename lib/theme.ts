export const THEME_STORAGE_KEY = "bulgaritech-theme";

export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function themeColor(theme: Theme): string {
  return theme === "dark" ? "#070b14" : "#f6f8fc";
}
