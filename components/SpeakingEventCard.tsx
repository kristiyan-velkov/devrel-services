"use client";

import {
  cities,
  conferenceLogoUrl,
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
  const logo = conferenceLogoUrl(website);
  const country = event.cityId ? cities.find((city) => city.id === event.cityId)?.country : null;
  const flag = country && countryCode(country) ? flagSrc(country) : null;
  const online = eventIsOnline(event.place, event.onlineOnly);
  const date = parseEventWhen(event.when);
  const session = splitSession(event.session);
  const upcoming = event.status === "upcoming";

  return (
    <article className={cn("conference-row", open && "is-open", upcoming && "is-upcoming")}>
      <span className="conference-row__node" aria-hidden="true" />

      <div className="conference-row__stamp" aria-label={event.when}>
        <span className={cn("conference-row__day", date.days.includes("&") && "is-split")}>{date.days}</span>
        <span className="conference-row__month">{date.month}</span>
        <span className="conference-row__year">{date.year}</span>
        <span className={cn("conference-row__badge", upcoming && "is-next")}>
          {upcoming ? "Upcoming" : "Held"}
        </span>
      </div>

      <div className="conference-row__body">
        <div className="conference-row__head">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- remote favicon, decorative
            <img src={logo} alt="" width={32} height={32} className="conference-row__logo" />
          ) : null}
          <div className="min-w-0">
            <h4 className="conference-row__title">{event.name}</h4>
            <p className="conference-row__place">
              <span className="conference-row__flags" aria-hidden="true">
                {flag && country ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local country flag SVG
                  <img src={flag} alt="" width={18} height={12} className="conference-row__flag" title={country} />
                ) : null}
                {online ? (
                  // eslint-disable-next-line @next/next/no-img-element -- local online flag SVG
                  <img
                    src={onlineFlagSrc}
                    alt=""
                    width={18}
                    height={12}
                    className="conference-row__flag"
                    title="Online"
                  />
                ) : null}
              </span>
              {event.place}
              {country ? <> · {country}</> : null}
            </p>
          </div>
        </div>

        <div className={cn("conference-row__session", `is-${session.kind}`)}>
          <span className="conference-row__kind">{session.label}</span>
          <p>{session.title}</p>
        </div>

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
      </div>
    </article>
  );
}

type EventDate = {
  days: string;
  month: string;
  year: string;
};

function parseEventWhen(when: string): EventDate {
  const year = when.match(/(\d{4})$/)?.[1] ?? "";
  const twoMonths = when.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+&\s+(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (twoMonths) {
    return { days: `${twoMonths[1]} & ${twoMonths[3]}`, month: `${twoMonths[2]}–${twoMonths[4]}`, year };
  }
  const twoDays = when.match(/^(\d{1,2})\s+&\s+(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (twoDays) {
    return { days: `${twoDays[1]} & ${twoDays[2]}`, month: twoDays[3] ?? "", year };
  }
  const range = when.match(/^(\d{1,2}–\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (range) {
    return { days: range[1] ?? when, month: range[2] ?? "", year };
  }
  const single = when.match(/^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/);
  if (single) {
    return { days: single[1] ?? when, month: single[2] ?? "", year };
  }
  return { days: when, month: "", year: "" };
}

type SessionKind = "talk" | "workshop" | "summit" | "speaker" | "session";

function splitSession(session: string): { kind: SessionKind; label: string; title: string } {
  const talk = session.match(/^Talk:\s*(.+)$/i);
  if (talk?.[1]) return { kind: "talk", label: "Talk", title: talk[1] };
  const workshop = session.match(/^Workshop(?: \(remote\))?:\s*(.+)$/i);
  if (workshop?.[1]) {
    return {
      kind: "workshop",
      label: session.toLowerCase().includes("remote") ? "Workshop · remote" : "Workshop",
      title: workshop[1],
    };
  }
  if (/captain|summit/i.test(session)) return { kind: "summit", label: "Summit", title: session };
  if (/^Speaker/i.test(session)) {
    const reserved = /reserved/i.test(session);
    return { kind: "speaker", label: "Speaker", title: reserved ? "Slot reserved" : "On the programme" };
  }
  return { kind: "session", label: "Session", title: session };
}
