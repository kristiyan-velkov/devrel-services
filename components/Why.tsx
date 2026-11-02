import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  audience,
  competitors,
  credentials,
  identity,
  profiles,
  reach,
  whySection,
} from "@/data/proposal";
import { media } from "@/lib/media";
import { cn } from "@/lib/cn";

export function Why() {
  return (
    <section id="why" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="why-title">
      <div className="site-wrap px-5 md:px-8">
        <SectionHeading
          id="why-title"
          index="01"
          kicker="Why Kristiyan"
          title="An engineer developers already read."
          lede={whySection.lede}
        />
        <div className="mt-10 grid gap-3 md:grid-cols-6">
          <Reveal className="glass rounded-3xl p-6 md:col-span-4 md:row-span-2 md:p-8">
            <p className="kicker">The practice</p>
            <ul className="mt-5 space-y-6">
              {credentials.map((item) => (
                <li key={item.label} className="grid gap-2 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                  <span className="font-mono text-xs tracking-widest text-blue uppercase">{item.label}</span>
                  <div>
                    <p className="text-lg leading-snug text-fg">{item.headline}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.detail}</p>
                    {"links" in item && item.links ? (
                      <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                        {item.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="print-url text-xs font-medium text-blue hover:underline"
                          >
                            {link.label} ↗
                          </a>
                        ))}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-3 md:col-span-2 md:grid-cols-1 md:content-start">
            {reach.map((item) => (
              <Reveal key={item.label} className="glass rounded-3xl p-5">
                <p className="font-display text-4xl text-fg">{item.figure}</p>
                <p className="mt-1 font-medium text-fg">{item.label}</p>
                <p className="mt-1 text-sm text-muted">{item.detail}</p>
                <a
                  href={item.social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.social.label} (opens in a new tab)`}
                  className="print-url mt-3 inline-flex min-h-9 items-center text-xs font-medium text-blue hover:underline"
                >
                  {item.social.label} ↗
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal className="glass overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
            <div className="relative aspect-[3/4] min-h-48 bg-bg-raise">
              <Image
                src={media.kristiyanOnStage}
                alt={`${identity.person} speaking at a conference`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                className="object-cover"
              />
            </div>
            <p className="border-t border-line p-4 font-mono text-[11px] text-faint">
              Conference stages · workshops · live demos
            </p>
          </Reveal>

          <Reveal className="glass rounded-3xl p-6 md:col-span-4">
            <p className="kicker">On stage</p>
            <p className="mt-3 font-display text-3xl leading-tight">{whySection.onStage.headline}</p>
            <p className="mt-3 text-muted">{whySection.onStage.summary}</p>
            <p className="mt-3 text-sm text-fg">
              <span className="font-medium">{audience.events2026} speaking events</span> already on the calendar
              for 2026, with more confirmations in progress.{" "}
              <Link href="/conferences" className="text-blue hover:underline">
                See the full track record
              </Link>
              .
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {whySection.onStage.highlights.map((line) => (
                <li key={line} className="grid grid-cols-[auto_1fr] gap-2">
                  <span className="text-blue" aria-hidden="true">
                    ›
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="glass rounded-3xl p-6 md:col-span-6 lg:col-span-2">
            <p className="kicker">What ships</p>
            <p className="mt-3 text-lg leading-relaxed text-fg">{whySection.whatShips.lead}</p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {whySection.whatShips.items.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] gap-2">
                  <span className="text-mint" aria-hidden="true">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="rounded-3xl border border-line bg-bg-raise p-6 md:col-span-6 lg:col-span-4">
            <p className="kicker">Exclusivity, included</p>
            <p className="mt-3 max-w-3xl text-muted">{whySection.exclusivity.lead}</p>
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
            <p className="mt-4 max-w-3xl text-sm text-faint">{whySection.exclusivity.note}</p>
          </Reveal>

          <Reveal className="glass rounded-3xl p-6 md:col-span-6">
            <p className="kicker">Find me online</p>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Follow along for tutorials, stage announcements, and behind-the-scenes demos from the partnership.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profiles.map((profile) => (
                <li key={profile.href}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.label} (opens in a new tab)`}
                    className={cn(
                      "print-url inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm text-fg",
                      "hover:border-blue hover:bg-surface-subtle",
                    )}
                  >
                    {profile.label}
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
