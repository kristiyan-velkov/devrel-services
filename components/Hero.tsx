import Image from "next/image";
import Link from "next/link";
import { BrightDataLogo } from "@/components/BrightDataLogo";
import { HeroGlobe } from "@/components/HeroGlobe";
import { buttonClass } from "@/lib/buttons";
import { media } from "@/lib/media";
import {
  contentSocialReach,
  formatContentSocialReachHeadline,
  heroRoles,
  heroStats,
  identity,
  profiles,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <HeroGlobe />
      <div className="relative site-wrap grid gap-10 px-5 pt-16 pb-14 md:px-8 md:pt-24 lg:grid-cols-12 lg:pt-28">
        <div className="lg:col-span-7">
          <h1 className="max-w-xl font-display text-[2.7rem] leading-[0.98] text-fg sm:text-6xl lg:text-7xl">
            <span className="sr-only">
              Put Bright Data in front of {formatContentSocialReachHeadline()} people.
            </span>
            <span aria-hidden className="flex flex-wrap items-center gap-x-3 gap-y-2">
              Put
              <BrightDataLogo decorative className="h-[0.82em] min-h-8 w-auto sm:min-h-9 lg:min-h-10" />
              in front of
            </span>{" "}
            <span aria-hidden className="text-[var(--blue-strong)]">
              {formatContentSocialReachHeadline()} people.
            </span>
          </h1>
          <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-faint">
            Combined reach across {contentSocialReach.headlineChannels} — blog posts, newsletter,
            and social channels (conference stages are additional).
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m <strong className="font-medium text-fg">{identity.person}</strong> — I help
            developer brands reach engineers through conference stages, newsletters, and
            production-ready demos. This proposal outlines a five-month DevRel partnership with{" "}
            {identity.counterparty} ({identity.termLong}).
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {heroRoles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-line bg-surface-subtle px-3 py-1 font-mono text-[11px] tracking-wide text-fg"
              >
                {role}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/plans" className={buttonClass("primary")}>
              See the plans
            </Link>
            <Link href="/conferences" className={buttonClass("ghost")}>
              Conferences
            </Link>
          </div>
          <p className="mt-4 max-w-xl font-mono text-xs leading-relaxed text-faint">
            Personal proposal from {identity.person}. Delivered via {identity.company}. Not an
            official Bright Data website.
          </p>
        </div>

        <div className="lg:col-span-5 lg:pt-4">
          <div className="glass panel-shadow overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/5] w-full max-h-[28rem] bg-bg-raise">
              <Image
                src={media.kristiyanOffice}
                alt={`${identity.person} — DevRel and tech speaker`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-[center_20%]"
              />
            </div>
            <div className="border-t border-line p-5">
              <p className="font-display text-2xl text-fg">{identity.person}</p>
              <p className="mt-1 text-sm text-muted">
                DevRel · Tech speaker · Docker Captain · SpaceX AI Ambassador
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Book author, blogger, and principal front-end engineer — focused on AI, security,
                and adoption-ready developer content.
              </p>
              <p className="kicker mt-5">Find me online</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {profiles.map((profile) => (
                  <li key={profile.href}>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${profile.label} (opens in a new tab)`}
                      className={cn(
                        "print-url inline-flex min-h-9 items-center rounded-full border border-line px-3 text-xs text-fg",
                        "hover:border-blue hover:bg-surface-subtle",
                      )}
                    >
                      {profile.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-12">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="glass flex flex-col rounded-2xl px-4 py-4">
                <dt className="font-display text-2xl text-fg tabular-nums">{stat.value}</dt>
                <dd className="mt-1 text-sm text-fg">{stat.label}</dd>
                <dd className="font-mono text-[11px] tracking-wide text-faint">{stat.detail}</dd>
                <dd className="mt-3">
                  <a
                    href={stat.social.href}
                    className="print-url inline-flex min-h-9 items-center rounded-full border border-line px-3 text-xs font-medium text-blue hover:border-blue hover:bg-surface-subtle"
                    {...(stat.social.href.startsWith("#")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {stat.social.label}
                    {!stat.social.href.startsWith("#") ? (
                      <span aria-hidden="true" className="ml-1 font-mono text-faint">
                        ↗
                      </span>
                    ) : null}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
