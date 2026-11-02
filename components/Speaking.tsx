"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpeakingCountriesPanel } from "@/components/SpeakingCountriesPanel";
import { SpeakingPhotos } from "@/components/SpeakingPhotos";
import { audience, cities, formatNumber, type CityId } from "@/data/proposal";

const SpeakingStageMap = dynamic(
  () => import("@/components/SpeakingStageMap").then((mod) => mod.SpeakingStageMap),
  {
    ssr: false,
    loading: () => (
      <div className="stage-globe-scene stage-globe-scene--embedded flex min-h-[320px] items-center justify-center">
        <p className="font-mono text-xs tracking-widest text-faint uppercase">Loading globe…</p>
      </div>
    ),
  },
);

export function Speaking() {
  const [city, setCity] = useState<CityId | "all">("all");

  return (
    <section id="speaking" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="speaking-title">
      <div className="site-wrap px-5 md:px-8">
        <SectionHeading
          id="speaking-title"
          index="01"
          kicker="Speaking track record"
          title="The rooms, and the people in them."
          lede="Event-wide audiences published by the organisers — not the head-count of one session. Shared stages are shown, and counted once."
        />

        <Reveal className="mt-10">
          <div className="speaking-stage-shell overflow-hidden rounded-3xl border border-line">
            <div className="speaking-stage-shell__header px-5 py-5 md:px-8 md:py-6">
              <p className="kicker">Global stages</p>
              <h3 className="mt-1 font-display text-2xl text-fg md:text-3xl">Where I&apos;ve been on stage</h3>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                One pin per city. Tap a city to fly there and see the conference names, or open the full{" "}
                <Link href={city === "all" ? "/conferences" : `/conferences?city=${city}`} className="text-blue hover:underline">
                  conferences timeline
                </Link>
                .
                {city !== "all" ? (
                  <>
                    {" "}
                    Showing{" "}
                    <span className="text-fg">
                      {cities.find((item) => item.id === city)?.name},{" "}
                      {cities.find((item) => item.id === city)?.country}
                    </span>
                    .
                  </>
                ) : null}
              </p>
            </div>
            <div className="grid border-t border-line lg:grid-cols-12">
              <div className="speaking-stage-shell__globe border-b border-line p-3 md:p-4 lg:col-span-7 lg:min-h-[28rem] lg:border-r lg:border-b-0">
                <SpeakingStageMap city={city} onSelectCity={setCity} />
              </div>
              <div className="speaking-stage-shell__countries p-3 md:p-4 lg:col-span-5 lg:max-h-[40rem] lg:overflow-y-auto">
                <SpeakingCountriesPanel city={city} onSelectCity={setCity} />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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

        <SpeakingPhotos />

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
