"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, isTheme, type Theme } from "@/lib/theme";
import { media } from "@/lib/media";
import { cn } from "@/lib/cn";

/** Official wordmark from https://brightdata.com/ (logo_main in symbols_brd.svg). */
const BRIGHT_DATA_HOME = "https://brightdata.com/";

type BrightDataLogoProps = {
  className?: string;
  /** When true, hide from assistive tech (e.g. headline already names Bright Data). */
  decorative?: boolean;
  /** Link to brightdata.com (default off — proposal is not their site). */
  linkToBrand?: boolean;
};

function readThemeFromDom(): Theme {
  const value = document.documentElement.getAttribute("data-theme");
  return isTheme(value) ? value : DEFAULT_THEME;
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export function BrightDataLogo({
  className,
  decorative = false,
  linkToBrand = false,
}: BrightDataLogoProps) {
  const theme = useSyncExternalStore(subscribeToTheme, readThemeFromDom, () => DEFAULT_THEME);
  const src = theme === "dark" ? media.brightDataLogoDark : media.brightDataLogoLight;

  const img = (
    <img
      key={src}
      src={src}
      alt={decorative ? "" : "Bright Data"}
      aria-hidden={decorative ? true : undefined}
      width={179}
      height={40}
      decoding="async"
      className={cn("block h-8 w-auto shrink-0 object-contain object-left", className)}
    />
  );

  if (!linkToBrand) return img;

  return (
    <a
      href={BRIGHT_DATA_HOME}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
    >
      {img}
      {!decorative ? null : <span className="sr-only">Bright Data (opens in a new tab)</span>}
    </a>
  );
}
