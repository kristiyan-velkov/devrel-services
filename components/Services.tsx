"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  formatEur,
  serviceCategories,
  services,
  type Service,
  type ServiceCategory,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

function matches(service: Service, category: ServiceCategory | "all", needle: string) {
  const inCategory = category === "all" || service.category === category;
  const haystack = `${service.name} ${service.description} ${service.category} ${service.unit}`.toLowerCase();
  return inCategory && (needle.length === 0 || haystack.includes(needle));
}

export function Services() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const needle = query.trim().toLowerCase();
  const visible = services.filter((service) => matches(service, category, needle)).length;

  return (
    <section id="services" className="print-break scroll-mt-28 py-20 md:py-28" aria-labelledby="services-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="services-title"
          index="05"
          kicker="À la carte"
          title="Buy a single piece, or read the list behind the plans."
          lede="These are the prices used to calculate list value. Anything outside the chosen plan needs written approval before it starts. The PDF always prints the full catalogue."
        />

        <div className="mt-8 flex flex-col gap-4">
          <label className="block max-w-md">
            <span className="font-mono text-[11px] tracking-widest text-faint uppercase">Search the catalogue</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Article, hackathon, banner…"
              className="mt-2 min-h-11 w-full rounded-2xl border border-line bg-black/20 px-4 text-fg placeholder:text-faint"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
              All
            </FilterChip>
            {serviceCategories.map((item) => (
              <FilterChip key={item.id} active={category === item.id} onClick={() => setCategory(item.id)}>
                {item.id}
              </FilterChip>
            ))}
          </div>
          <p aria-live="polite" className="font-mono text-xs text-faint">
            {visible} of {services.length} services
          </p>
        </div>

        <div className="mt-4 space-y-8">
          {serviceCategories.map((group) => {
            const rows = services.filter((service) => service.category === group.id);
            const anyVisible = rows.some((service) => matches(service, category, needle));
            return (
              <section key={group.id} aria-labelledby={`cat-${group.id}`} hidden={!anyVisible} className="print-all">
                <h3 id={`cat-${group.id}`} className="font-display text-2xl">{group.id}</h3>
                <p className="mt-1 max-w-3xl text-sm text-muted">{group.blurb}</p>
                <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
                  {rows.map((service) => {
                    const match = matches(service, category, needle);
                    return (
                      <li
                        key={service.id}
                        hidden={!match}
                        className="print-all-grid grid gap-2 px-4 py-4 md:grid-cols-[1.4fr_1fr_auto] md:items-center"
                      >
                        <p className="font-medium text-fg">{service.name}</p>
                        <p className="text-sm text-muted">{service.description}</p>
                        <p className="font-mono text-sm text-fg tabular-nums md:text-right">
                          {formatEur(service.price)}
                          <span className="mt-0.5 block text-[11px] text-faint">{service.unit}</span>
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
        {visible === 0 ? (
          <p className="mt-6 text-muted" role="status">
            Nothing in the catalogue matches that filter.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-3 text-sm",
        active ? "border-blue bg-white/10 text-fg" : "border-line text-muted",
      )}
    >
      {children}
    </button>
  );
}
