"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { SpeakingEventCard } from "@/components/SpeakingEventCard";
import {
  cities,
  eventCountByCity,
  identity,
  speakingEvents,
  type CityId,
} from "@/data/proposal";
import { eventIsOnline, flagEmoji } from "@/lib/countries";
import { cn } from "@/lib/cn";

type StatusFilter = "all" | "past" | "upcoming";
type PlaceFilter = CityId | "all" | "online";

const statusFilters: Array<[StatusFilter, string]> = [
  ["all", "All"],
  ["past", "Held"],
  ["upcoming", "Upcoming"],
];

function isCityId(value: string | undefined): value is CityId {
  return Boolean(value && cities.some((city) => city.id === value));
}

export function ConferencesTimeline() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [city, setCity] = useState<PlaceFilter>(() => parseConferencePlace(searchParams.get("city") ?? undefined));
  const [activeId, setActiveId] = useState("");

  const cityOptions = useMemo(
    () => cities.filter((place) => eventCountByCity(place.id) > 0),
    [],
  );
  const onlineCount = speakingEvents.filter((event) => eventIsOnline(event.place, event.onlineOnly)).length;
  const nextUp = speakingEvents.find((event) => event.status === "upcoming");

  const visible = speakingEvents.filter((event) => {
    const statusOk = status === "all" || event.status === status;
    const cityOk =
      city === "all" ||
      (city === "online"
        ? eventIsOnline(event.place, event.onlineOnly)
        : event.cityId === city);
    return statusOk && cityOk;
  });

  const years = useMemo(() => {
    const map = new Map<number, typeof visible>();
    for (const event of visible) {
      const bucket = map.get(event.year) ?? [];
      bucket.push(event);
      map.set(event.year, bucket);
    }
    return [...map.entries()].sort(([a], [b]) => a - b);
  }, [visible]);

  const held = speakingEvents.filter((event) => event.status === "past").length;
  const upcoming = speakingEvents.filter((event) => event.status === "upcoming").length;
  const firstYear = speakingEvents[0]?.year;
  const lastYear = speakingEvents[speakingEvents.length - 1]?.year;

  return (
    <section id="conferences" className="conference-page scroll-mt-28 py-16 md:py-24" aria-labelledby="conferences-title">
      <div className="site-wrap px-5 md:px-8">
        <div className="conference-hero">
          <SectionHeading
            id="conferences-title"
            index="01"
            kicker="Conferences"
            title="Speaking record."
            lede="Chronological register of in-person and online appearances. Audience figures are organiser-published event totals, not the size of one room."
          />
          <p className="conference-hero__span" aria-hidden="true">
            {firstYear}—{lastYear}
          </p>
        </div>

        <dl className="conference-summary">
          <div>
            <dt>Events listed</dt>
            <dd>{speakingEvents.length}</dd>
          </div>
          <div>
            <dt>Already held</dt>
            <dd>{held}</dd>
          </div>
          <div>
            <dt>Upcoming</dt>
            <dd>{upcoming}</dd>
          </div>
          <div>
            <dt>Cities</dt>
            <dd>{cityOptions.length}</dd>
          </div>
        </dl>

        {nextUp ? (
          <a href={`#speaking-event-${nextUp.id}`} className="conference-next no-print">
            <span className="conference-next__kicker">Next on stage</span>
            <span className="conference-next__when">{nextUp.when}</span>
            <span className="conference-next__name">{nextUp.name}</span>
            <span className="conference-next__place">{nextUp.place}</span>
          </a>
        ) : null}

        <div className="conference-toolbar no-print">
          <div className="conference-seg" role="group" aria-label="Filter by status">
            {statusFilters.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={status === id}
                className={cn("conference-seg__btn", status === id && "is-on")}
                onClick={() => setStatus(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="conference-city">
            <span>Place</span>
            <select
              value={city}
              onChange={(event) => setCity(parseConferencePlace(event.target.value))}
            >
              <option value="all">All places</option>
              <option value="online">Online ({onlineCount})</option>
              {cityOptions.map((place) => (
                <option key={place.id} value={place.id}>
                  {flagEmoji(place.country)} {place.name}, {place.country}
                </option>
              ))}
            </select>
          </label>
          <p className="conference-toolbar__count">
            {visible.length} {visible.length === 1 ? "event" : "events"} · {identity.person}
          </p>
        </div>

        {years.length === 0 ? (
          <p className="conference-empty">No events match this filter.</p>
        ) : (
          <ol className="conference-register">
            {years.map(([year, events]) => (
              <li key={year} className="conference-year">
                <div className="conference-year__head">
                  <h3 className="conference-year__label">{year}</h3>
                  <p className="conference-year__meta">
                    {events.length} {events.length === 1 ? "event" : "events"}
                  </p>
                </div>
                <ol className="conference-year__list">
                  {events.map((event) => {
                    const open = activeId === event.id;
                    return (
                      <li
                        key={event.id}
                        id={`speaking-event-${event.id}`}
                        className="print-all scroll-mt-28"
                      >
                        <SpeakingEventCard
                          event={event}
                          open={open}
                          onToggle={() => setActiveId(open ? "" : event.id)}
                        />
                      </li>
                    );
                  })}
                </ol>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

function parseConferencePlace(value: string | undefined): PlaceFilter {
  if (value === "online") return "online";
  return isCityId(value) ? value : "all";
}
