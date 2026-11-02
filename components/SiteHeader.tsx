"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BulgariTechLogo } from "@/components/BulgariTechLogo";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { buttonClass } from "@/lib/buttons";
import { navLinkIsActive, primaryNav } from "@/lib/navigation";
import { socialLinks } from "@/data/proposal";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a
          href="/"
          className="flex min-w-0 items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
        >
          <BulgariTechLogo className="h-7 max-w-[11rem] sm:h-8" />
          <span className="sr-only">BulgariTech — proposal home</span>
        </a>
        <nav aria-label="Proposal" className="hidden items-center gap-5 lg:flex">
          {primaryNav.map((link) => {
            const active = navLinkIsActive(pathname, link);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn("text-sm", active ? "text-fg" : "text-muted hover:text-fg")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <a
            href={socialLinks.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonClass("primary"), "hidden sm:inline-flex")}
          >
            Contact me
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
            {primaryNav.map((link) => {
              const active = navLinkIsActive(pathname, link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-2 py-3",
                      active ? "bg-surface-muted text-fg" : "text-fg hover:bg-surface-subtle",
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="flex items-center gap-2 pt-2">
              <ThemeSwitcher />
              <a
                href={socialLinks.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClass("primary")}
              >
                Contact me
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
