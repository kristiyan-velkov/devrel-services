import { HeroGlobe } from "@/components/HeroGlobe";
import { buttonClass } from "@/lib/buttons";
import {
  audience,
  formatEur,
  formatNumber,
  identity,
  mailtoForPlan,
  quotes,
  terminalScript,
} from "@/data/proposal";
const stats = [
  { value: formatNumber(audience.pastCombined), label: "developers already reached", detail: "counted, past events" },
  { value: String(audience.pastEvents), label: "conferences, 2025–2026", detail: "plus upcoming stages" },
  { value: formatEur(quotes.growth.monthly), label: "Plan 2, per month", detail: `${formatEur(quotes.growth.term)} over 5 months` },
  { value: `${quotes.growth.savingPct}%`, label: "below the list price", detail: "best value of the four plans" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroGlobe />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-14 md:px-8 md:pt-24 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="kicker">Proposal · {identity.dateLabel} · {identity.company}</p>
          <h1 className="mt-4 max-w-xl font-display text-[2.7rem] leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
            Put Bright Data in front of{" "}
            <span className="text-[var(--blue-strong)]">100,000+ developers.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            {identity.person}, {identity.company}, proposes a five-month DevRel partnership
            with {identity.counterparty} — {identity.termLong}. Plan 2 is the one to take:
            {" "}{formatEur(quotes.growth.monthly)} a month against {formatEur(quotes.growth.list)} of
            list-priced work.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#plans" className={buttonClass("primary")}>
              See the plans
            </a>
            <a href={mailtoForPlan("growth")} className={buttonClass("ghost")}>
              Choose Plan 2
            </a>
          </div>
          <p className="mt-4 font-mono text-xs text-faint">
            From {identity.person} / {identity.company}. Not an official Bright Data site.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-10">
          <div className="glass rounded-2xl p-4 shadow-[0_20px_70px_rgba(0,0,0,0.28)]">
            <div className="flex items-center gap-2 border-b border-line pb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-mint/80" />
              <p className="ml-2 truncate font-mono text-[11px] tracking-wide text-faint">
                partner.sh · illustrative
              </p>
            </div>
            <div className="mt-4 min-h-52 font-mono text-[13px] leading-relaxed sm:text-sm">
              <p className="sr-only">{terminalScript.map((line) => line.text).join(". ")}</p>
              <p aria-hidden="true">
                <span className="text-mint">$</span>{" "}
                <span className="typed-cmd caret text-fg">{terminalScript[0]?.text}</span>
              </p>
              <ul aria-hidden="true" className="mt-3 space-y-1.5 text-muted">
                {terminalScript.slice(1).map((line, index) => (
                  <li
                    key={line.text}
                    className="term-line"
                    style={{ animationDelay: `${1.45 + index * 0.28}s` }}
                  >
                    <span className={line.kind === "ok" ? "text-mint" : "text-blue"} aria-hidden="true">
                      {line.kind === "ok" ? "ok" : "›"}
                    </span>{" "}
                    {line.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-2xl px-4 py-4">
              <dt className="font-display text-2xl text-fg tabular-nums">{stat.value}</dt>
              <dd className="mt-1 text-sm text-fg">{stat.label}</dd>
              <dd className="font-mono text-[11px] tracking-wide text-faint">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
