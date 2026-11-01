"use client";

import { useMemo, useState } from "react";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  audience,
  cities,
  formatNumber,
  projectCity,
  speakingEvents,
  speakingNotes,
  type CityId,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

type Filter = "all" | "past" | "upcoming";

const cityPosition = new Map(
  cities.map((city) => {
    const point = projectCity(city.lat, city.lon);
    return [city.id, point] as const;
  }),
);

export function Speaking() {
  const [filter, setFilter] = useState<Filter>("all");
  const [city, setCity] = useState<CityId | "all">("all");
  const [activeId, setActiveId] = useState(speakingEvents[0]?.id ?? "");

  const route = useMemo(
    () =>
      speakingEvents
        .filter((event) => event.cityId)
        .map((event) => {
          const point = event.cityId ? cityPosition.get(event.cityId) : undefined;
          return point ? { ...point, status: event.status, id: event.id } : null;
        })
        .filter((point): point is { x: number; y: number; status: "past" | "upcoming"; id: string } =>
          point != null,
        ),
    [],
  );

  return (
    <section id="speaking" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="speaking-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="speaking-title"
          index="02"
          kicker="Speaking track record"
          title="The rooms, and the people in them."
          lede="Event-wide audiences published by the organisers — not the head-count of one session. Shared stages are shown, and counted once."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            value={audience.pastCombined}
            label="Counted audience, already held"
            detail={`${formatNumber(audience.pastInPerson)} in person + ${formatNumber(audience.pastOnline)} online`}
          />
          <Stat
            value={audience.allCombined}
            label="Including upcoming, counted"
            detail={`${formatNumber(audience.allInPerson)} in person + ${formatNumber(audience.allOnline)} online`}
          />
          <Stat
            value={audience.pastEvents}
            label="Conferences already held"
            detail="2025–2026, including co-located stages"
          />
          <Stat
            value={audience.events2026}
            label="Speaking events in 2026"
            detail={`${audience.upcomingEvents} more confirmed, one of them in 2027`}
          />
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-faint">
          Small print: totals use organiser figures only. “not published”, shared Amsterdam audiences and the
          attendee-reported Vilnius totals are left out. Online GitNation audiences overlap. In-person and online
          numbers are the event’s audience, not session attendance.
        </p>

        <Reveal className="mt-8">
          <div className="glass relative overflow-hidden rounded-3xl p-4 md:p-6">
            <div className="flex items-baseline justify-between gap-4">
              <p className="kicker">Stage plot</p>
              <p className="font-mono text-[11px] text-faint">Equirectangular · 2025–2027</p>
            </div>
            <div className="relative mt-4 aspect-[2/1] min-h-64">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {Array.from({ length: 5 }, (_, index) => {
                  const y = 10 + index * 20;
                  return <line key={`h-${y}`} x1="0" y1={y} x2="100" y2={y} stroke="rgba(158,196,255,0.15)" strokeWidth="0.15" />;
                })}
                {Array.from({ length: 7 }, (_, index) => {
                  const x = 8 + index * 14;
                  return <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="100" stroke="rgba(158,196,255,0.12)" strokeWidth="0.15" />;
                })}
                <polyline
                  fill="none"
                  stroke="rgba(158,196,255,0.55)"
                  strokeWidth="0.35"
                  points={route.map((point) => `${point.x},${point.y}`).join(" ")}
                />
              </svg>
              {cities.map((item) => {
                const point = cityPosition.get(item.id);
                if (!point) return null;
                const selected = city === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    aria-pressed={selected}
                    aria-label={selected ? `Show all cities, stop filtering ${item.name}` : `Show events in ${item.name}`}
                    onClick={() => setCity(selected ? "all" : item.id)}
                  >
                    <span
                      className={cn(
                        "block h-3.5 w-3.5 rounded-full border border-white/80",
                        selected ? "bg-mint" : "bg-blue group-hover:bg-[var(--blue-strong)]",
                      )}
                    />
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded-full bg-[#06101c] px-2 py-0.5 font-mono text-[11px] whitespace-nowrap text-fg",
                        selected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by city">
              {cities.map((item) => {
                const selected = city === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    className={cn(
                      "min-h-10 rounded-full border px-3 text-sm",
                      selected ? "border-mint bg-mint/10 text-fg" : "border-line text-muted",
                    )}
                    onClick={() => setCity(selected ? "all" : item.id)}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-muted">
              London, Amsterdam, Berlin, Gdańsk and Vilnius sit close together on this plot. Pick a city to isolate it.
              Online-only stages — AI Coding Summit 2025 and 2026, Node Congress 2026 — are in the timeline, not on the plot.
              {city !== "all" ? ` Showing ${cities.find((item) => item.id === city)?.name}. The totals above do not change.` : ""}
            </p>
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter events">
          {(
            [
              ["all", "All events"],
              ["past", "Already held"],
              ["upcoming", "Upcoming"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={filter === id}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm",
                filter === id ? "border-blue bg-white/10 text-fg" : "border-line text-muted",
              )}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
          {city !== "all" ? (
            <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm text-fg" onClick={() => setCity("all")}>
              Clear city
            </button>
          ) : null}
        </div>

        <ol className="mt-6 space-y-3">
          {speakingEvents.map((event) => {
            const match = (filter === "all" || event.status === filter) && (city === "all" || event.cityId === city);
            const open = activeId === event.id;
            return (
              <li key={event.id} hidden={!match} className="print-all">
                <article className={cn("glass rounded-2xl p-4 md:p-5", open && "border-blue/50")}>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between gap-4 text-left"
                    aria-expanded={open}
                    onClick={() => setActiveId(open ? "" : event.id)}
                  >
                    <span>
                      <span className="font-mono text-[11px] tracking-widest text-blue uppercase">
                        {event.status === "past" ? "Held" : "Upcoming"} · {event.when}
                      </span>
                      <span className="mt-1 block font-display text-xl text-fg">{event.name}</span>
                      <span className="mt-1 block text-sm text-muted">{event.place}</span>
                    </span>
                    <span className="font-mono text-xs text-faint">{open ? "–" : "+"}</span>
                  </button>
                  {open ? (
                    <div className="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-3">
                      <p className="text-sm text-muted md:col-span-3">{event.session}</p>
                      <p>
                        <span className="block font-mono text-[11px] tracking-widest text-faint uppercase">In person</span>
                        <span className="text-lg text-fg">{event.inPerson.display}</span>
                      </p>
                      <p>
                        <span className="block font-mono text-[11px] tracking-widest text-faint uppercase">Online</span>
                        <span className="text-lg text-fg">{event.online.display}</span>
                      </p>
                      <p>
                        <span className="block font-mono text-[11px] tracking-widest text-faint uppercase">Source</span>
                        {event.sourceHref ? (
                          <a href={event.sourceHref} className="print-url text-blue underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                            {event.source}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        ) : (
                          <span className="text-fg">{event.source}</span>
                        )}
                      </p>
                      {event.note ? <p className="text-sm text-muted md:col-span-3">{event.note}</p> : null}
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ol>

        <details className="mt-6 rounded-2xl border border-line px-4 py-3">
          <summary className="cursor-pointer font-medium text-fg">How the numbers were counted</summary>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            {speakingNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

function Stat({ value, label, detail }: { value: number; label: string; detail: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <p className="font-display text-3xl text-fg">
        <Counter value={value} format={formatNumber} />
      </p>
      <p className="mt-1 text-sm text-fg">{label}</p>
      <p className="mt-1 text-xs text-faint">{detail}</p>
    </div>
  );
}
