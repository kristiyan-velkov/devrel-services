import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  audience,
  competitors,
  credentials,
  profiles,
  reach,
} from "@/data/proposal";

export function Why() {
  return (
    <section id="why" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="why-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="why-title"
          index="01"
          kicker="Why Kristiyan"
          title="An engineer developers already read."
          lede="Hands-on front-end work, a stage record, and a rule on competitors. No borrowed logos, no anonymous quotes."
        />
        <div className="mt-10 grid gap-3 md:grid-cols-6">
          <Reveal className="glass rounded-3xl p-6 md:col-span-4 md:row-span-2 md:p-8">
            <p className="kicker">The practice</p>
            <ul className="mt-5 space-y-4">
              {credentials.map((item) => (
                <li key={item.label} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
                  <span className="font-mono text-xs tracking-widest text-blue uppercase">{item.label}</span>
                  <span className="text-lg leading-snug text-fg">{item.value}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          {reach.map((item) => (
            <Reveal key={item.label} className="glass rounded-3xl p-5 md:col-span-2">
              <p className="font-display text-4xl text-fg">{item.figure}</p>
              <p className="mt-1 text-muted">{item.label}</p>
            </Reveal>
          ))}
          <Reveal className="glass rounded-3xl p-6 md:col-span-3">
            <p className="kicker">On stage</p>
            <p className="mt-3 font-display text-3xl leading-tight">
              {audience.pastEvents} conferences in 2025–2026.
            </p>
            <p className="mt-3 text-muted">
              75,000+ developers in person and online — the precise counted total is{" "}
              {audience.pastCombined.toLocaleString("en-GB")}. {audience.events2026} speaking events in 2026,
              with more already confirmed.
            </p>
          </Reveal>
          <Reveal className="glass rounded-3xl p-6 md:col-span-3">
            <p className="kicker">What ships</p>
            <p className="mt-3 text-lg leading-relaxed text-fg">
              Every piece ships with a working GitHub demo. Developers can copy it, run it and adopt it —
              not just read about Bright Data.
            </p>
          </Reveal>
          <Reveal className="rounded-3xl border border-line bg-[#0c1628] p-6 md:col-span-6">
            <p className="kicker">Exclusivity, included</p>
            <p className="mt-3 max-w-3xl text-muted">
              No paid promotion of these competitors for the term of the agreement:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {competitors.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-line px-3 py-1 font-mono text-xs tracking-wide text-fg"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="md:col-span-6">
            <ul className="flex flex-wrap gap-3">
              {profiles.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    className="print-url inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-fg hover:border-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
