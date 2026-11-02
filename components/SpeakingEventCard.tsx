"use client";

import {
  cities,
  conferenceSiteLabel,
  conferenceWebsite,
  type SpeakingEvent,
} from "@/data/proposal";
import { countryCode, eventIsOnline, flagSrc, onlineFlagSrc } from "@/lib/countries";
import { cn } from "@/lib/cn";

type SpeakingEventCardProps = {
  event: SpeakingEvent;
  open: boolean;
  onToggle: () => void;
};

export function SpeakingEventCard({ event, open, onToggle }: SpeakingEventCardProps) {
  const website = conferenceWebsite(event);
  const siteLabel = conferenceSiteLabel(website);
  const country = event.cityId ? cities.find((city) => city.id === event.cityId)?.country : null;
  const flag = country && countryCode(country) ? flagSrc(country) : null;
  const online = eventIsOnline(event.place, event.onlineOnly);

  return (
    <article className={cn("conference-row", open && "is-open", event.status === "upcoming" && "is-upcoming")}>
      <div className="conference-row__when">
        <p>{event.when}</p>
        <span className={cn("conference-row__badge", event.status === "upcoming" && "is-next")}>
          {event.status === "past" ? "Held" : "Upcoming"}
        </span>
      </div>

      <div className="conference-row__main">
        <div className="conference-row__flags" aria-hidden="true">
          {flag && country ? (
            // eslint-disable-next-line @next/next/no-img-element -- local country flag SVG
            <img src={flag} alt="" width={22} height={15} className="conference-row__flag" title={country} />
          ) : null}
          {online ? (
            // eslint-disable-next-line @next/next/no-img-element -- local online flag SVG
            <img src={onlineFlagSrc} alt="" width={22} height={15} className="conference-row__flag" title="Online" />
          ) : null}
        </div>
        <div className="min-w-0">
          <h4 className="conference-row__title">{event.name}</h4>
          <p className="conference-row__place">
            {event.place}
            {country ? <> · {country}</> : null}
          </p>
          <p className="conference-row__session">{event.session}</p>
          {open ? (
            <div className="conference-row__detail">
              {event.note ? <p>{event.note}</p> : null}
              <p>
                <span>Source</span>
                {event.sourceHref ? (
                  <a href={event.sourceHref} className="print-url" target="_blank" rel="noopener noreferrer">
                    {event.source}
                  </a>
                ) : (
                  event.source
                )}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <dl className="conference-row__facts">
        <div>
          <dt>In person</dt>
          <dd>{event.inPerson.display}</dd>
        </div>
        <div>
          <dt>Online</dt>
          <dd>{event.online.display}</dd>
        </div>
        {website ? (
          <div>
            <dt>Website</dt>
            <dd>
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="print-url"
                aria-label={`Conference website: ${siteLabel} (opens in a new tab)`}
              >
                {siteLabel}
              </a>
            </dd>
          </div>
        ) : null}
        <div className="conference-row__actions no-print">
          <button type="button" className="conference-row__toggle" aria-expanded={open} onClick={onToggle}>
            {open ? "Hide details" : "Details"}
          </button>
        </div>
      </dl>
    </article>
  );
}
