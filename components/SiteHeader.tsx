"use client";

import { useState } from "react";
import { Mark } from "@/components/Mark";
import { buttonClass } from "@/lib/buttons";
import { mailtoForPlan } from "@/data/proposal";
import { cn } from "@/lib/cn";

const links = [
  { href: "#why", label: "Why Kristiyan" },
  { href: "#speaking", label: "Stage" },
  { href: "#plans", label: "Plans" },
  { href: "#publishing", label: "Calendar" },
  { href: "#terms", label: "Terms" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-[#070b14]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-2 text-fg">
          <Mark className="h-6 w-6 text-blue" />
          <span className="font-display text-lg leading-none">
            Bulgari<span className="text-blue">Tech</span>
          </span>
          <span className="sr-only">Back to top</span>
        </a>
        <nav aria-label="Proposal" className="hidden items-center gap-5 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted hover:text-fg">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={mailtoForPlan("growth")} className={cn(buttonClass("primary"), "hidden sm:inline-flex")}>
            Choose Plan 2
          </a>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-line lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="font-mono text-xs">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Proposal" className="border-t border-line px-5 py-4 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-lg px-2 py-3 text-fg hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href={mailtoForPlan("growth")} className={buttonClass("primary")}>
                Choose Plan 2
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
