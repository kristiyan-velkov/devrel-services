"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  isoDate,
  monthCells,
  pilotDelivery,
  publishingIntro,
  publishingItems,
  publishingMonths,
  tierMeta,
  type PublishTier,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
type TierFilter = "all" | PublishTier;

const tierClass: Record<PublishTier, string> = {
  core: "badge-mint",
  growth: "badge-blue",
  addon: "badge-amber",
  pilot: "bg-surface-emphasis text-fg",
};

export function Publishing() {
  const [monthId, setMonthId] = useState<(typeof publishingMonths)[number]["id"]>("2026-11");
  const [tier, setTier] = useState<TierFilter>("all");
  const [selected, setSelected] = useState("2026-11-10");

  return (
    <section id="publishing" className="print-break scroll-mt-28 py-20 md:py-28" aria-labelledby="publishing-title">
      <div className="site-wrap px-5 md:px-8">
        <SectionHeading
          id="publishing-title"
          index="06"
          kicker="Publishing plan"
          title="November to March, already on a calendar."
          lede={publishingIntro.body}
        />

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter calendar by contract">
          <TierButton active={tier === "all"} onClick={() => setTier("all")}>All</TierButton>
          {(["core", "growth", "addon"] as const).map((id) => (
            <TierButton key={id} active={tier === id} onClick={() => setTier(id)}>
              {tierMeta[id].label}
            </TierButton>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-3 text-xs text-muted">
          {(["core", "growth", "addon"] as const).map((id) => (
            <li key={id} className="flex items-center gap-2">
              <span className={cn("h-2.5 w-2.5 rounded-full", id === "core" ? "bg-mint" : id === "growth" ? "bg-blue" : "bg-amber")} />
              <span>
                {tierMeta[id].label}. {tierMeta[id].hint}
              </span>
            </li>
          ))}
        </ul>

        <article className="glass mt-6 rounded-2xl p-4 md:p-5">
          <p className="font-mono text-[11px] tracking-widest text-faint uppercase">Before this term</p>
          <h3 className="mt-1 font-display text-xl">{pilotDelivery.deliverable}</h3>
          <p className="mt-1 text-sm text-muted">
            30 Oct 2026 · {pilotDelivery.topic} · {pilotDelivery.channels} · {pilotDelivery.status}
          </p>
        </article>

        <div className="no-print mt-6 flex gap-2 overflow-x-auto" role="tablist" aria-label="Months">
          {publishingMonths.map((month) => {
            const count = publishingItems.filter((item) => item.date.startsWith(month.id) && (tier === "all" || item.tier === tier)).length;
            return (
              <button
                key={month.id}
                type="button"
                role="tab"
                id={`tab-${month.id}`}
                aria-selected={monthId === month.id}
                aria-controls={`panel-${month.id}`}
                className={cn(
                  "min-h-11 shrink-0 rounded-full border px-4 text-sm",
                  monthId === month.id ? "chip-active" : "border-line text-muted",
                )}
                onClick={() => {
                  setMonthId(month.id);
                  const first = publishingItems.find((item) => item.date.startsWith(month.id));
                  if (first) setSelected(first.date);
                }}
              >
                {month.label}
                <span className="ml-2 font-mono text-xs text-faint">{count}</span>
              </button>
            );
          })}
        </div>

        {publishingMonths.map((month) => {
          const active = month.id === monthId;
          const cells = monthCells(month.year, month.month);
          const items = publishingItems.filter((item) => item.date.startsWith(month.id));
          return (
            <div
              key={month.id}
              id={`panel-${month.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${month.id}`}
              hidden={!active}
              className="print-all mt-4"
            >
              <h3 className="font-display text-2xl print:mt-8">
                {month.label} {month.yearLabel}
              </h3>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] tracking-widest text-faint uppercase">
                {weekdays.map((day) => (
                  <div key={day} className="py-1">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {cells.map((day, index) => {
                  if (day == null) return <div key={`empty-${month.id}-${index}`} />;
                  const date = isoDate(month.year, month.month, day);
                  const dayItems = items.filter((item) => item.date === date);
                  const shown = dayItems.filter((item) => tier === "all" || item.tier === tier);
                  const isSelected = selected === date;
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelected(date)}
                      aria-pressed={isSelected}
                      aria-label={`${day} ${month.label} ${month.yearLabel}, ${shown.length} items`}
                      className={cn(
                        "min-h-16 rounded-xl border px-1 py-1 text-left md:min-h-20",
                        isSelected ? "chip-active" : "border-line/80 bg-surface-subtle",
                      )}
                    >
                      <span className="font-mono text-xs text-fg">{day}</span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {dayItems.map((item) => (
                          <span
                            key={`${item.date}-${item.deliverable}`}
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              tier !== "all" && item.tier !== tier && "hidden",
                              item.tier === "core" ? "bg-mint" : item.tier === "growth" ? "bg-blue" : "bg-amber",
                            )}
                          />
                        ))}
                      </span>
                    </button>
                  );
                })}
              </div>
              <ol className="mt-4 space-y-2">
                {items.map((item) => {
                  const show = tier === "all" || item.tier === tier;
                  const selectedCount = items.filter(
                    (entry) => entry.date === selected && (tier === "all" || entry.tier === tier),
                  ).length;
                  const narrow = active && selected.startsWith(month.id) && selectedCount > 0;
                  const highlight = item.date === selected;
                  return (
                    <li
                      key={`${item.date}-${item.deliverable}`}
                      hidden={!show || (narrow && item.date !== selected)}
                      className={cn("print-all rounded-2xl border px-4 py-3", highlight ? "border-blue" : "border-line")}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase", tierClass[item.tier])}>
                          {tierMeta[item.tier].label}
                        </span>
                        <time dateTime={item.date} className="font-mono text-xs text-faint">{item.date}</time>
                      </div>
                      <p className="mt-2 font-medium text-fg">{item.deliverable}</p>
                      <p className="text-sm text-muted">{item.topic}</p>
                      <p className="mt-1 text-xs text-faint">
                        {item.channels} · {item.promotion} · {item.status}
                      </p>
                    </li>
                  );
                })}
              </ol>
              {active && selected.startsWith(month.id) && items.filter((item) => item.date === selected && (tier === "all" || item.tier === tier)).length === 0 ? (
                <p className="mt-3 text-sm text-muted no-print">Nothing scheduled that day for this filter. Pick another day, or clear the filter.</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TierButton({
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
        active ? "chip-active" : "border-line text-muted",
      )}
    >
      {children}
    </button>
  );
}
