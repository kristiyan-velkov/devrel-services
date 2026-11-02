"use client";

import Image from "next/image";
import { shortConferenceLabel, speakingByCountry, type CityId } from "@/data/proposal";
import { flagSrc } from "@/lib/countries";
import { cn } from "@/lib/cn";

type SpeakingCountriesPanelProps = {
  city: CityId | "all";
  onSelectCity: (city: CityId | "all") => void;
};

export function SpeakingCountriesPanel({ city, onSelectCity }: SpeakingCountriesPanelProps) {
  const countries = speakingByCountry();
  const cityCount = countries.reduce((total, group) => total + group.locations.length, 0);

  return (
    <div className="speaking-countries-panel speaking-countries-panel--compact">
      <div className="speaking-countries-panel__head">
        <p className="kicker text-[10px]">On the map</p>
        <p className="mt-0.5 font-display text-sm text-fg">
          {cityCount} cities · {countries.length} countries
        </p>
        <p className="mt-1 text-xs text-muted">Tap a city to focus the globe and timeline.</p>
      </div>
      <ul className="speaking-countries-panel__list">
        {countries.map(({ country, locations }) => (
          <li key={country} className="speaking-country-card speaking-country-card--compact">
            <div className="speaking-country-card__head">
              <span className="speaking-country-card__flag speaking-country-card__flag--sm" aria-hidden>
                <Image src={flagSrc(country)} alt="" width={22} height={16} className="h-3.5 w-5 rounded-sm object-cover" />
              </span>
              <span className="min-w-0 flex-1 font-display text-xs font-semibold text-fg">{country}</span>
            </div>
            <ul className="speaking-country-card__locations">
              {locations.map(({ city: place, events }) => {
                const selected = city === place.id;
                return (
                  <li key={place.id} className="speaking-location-row">
                    <button
                      type="button"
                      aria-pressed={selected}
                      className={cn("speaking-location-row__city", selected && "speaking-location-row__city--active")}
                      onClick={() => onSelectCity(selected ? "all" : place.id)}
                    >
                      {place.name}
                      <span className="speaking-location-row__count">{events.length}</span>
                    </button>
                    <ul className="speaking-location-row__events" aria-label={`Conferences in ${place.name}`}>
                      {events.map((event) => (
                        <li key={event.id} className="speaking-conference-tag">
                          {shortConferenceLabel(event.name)}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
