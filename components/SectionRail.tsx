"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const links = [
  { id: "top", index: "—", label: "Overview" },
  { id: "speaking", index: "01", label: "Speaking" },
  { id: "start", index: "02", label: "Next step" },
];

export function SectionRail() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const nodes = links
      .map((link) => document.getElementById(link.id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.3, 0.6] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="On this page" className="no-print fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 min-[1400px]:block">
      <ol className="flex flex-col gap-3">
        {links.map((link) => {
          const current = active === link.id;
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={current ? "true" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={cn(
                    "h-px bg-surface-rail transition-[width] duration-300",
                    current ? "w-8 bg-blue" : "w-4 group-hover:w-6",
                  )}
                />
                <span className={cn("font-mono text-[11px] tracking-[0.18em]", current ? "text-fg" : "text-faint")}>
                  {link.index}
                </span>
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
