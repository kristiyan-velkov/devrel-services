import Link from "next/link";
import { buttonClass } from "@/lib/buttons";
import { formatEur, quotes } from "@/data/proposal";

export function FinalCta() {
  return (
    <section id="start" className="scroll-mt-28 px-5 py-20 md:px-8 md:py-28" aria-labelledby="cta-title">
      <div className="site-wrap overflow-hidden rounded-[2rem] border border-line bg-bg-raise px-6 py-12 md:px-12 md:py-16">
        <p className="kicker">Next step</p>
        <h2 id="cta-title" className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
          Let&apos;s build the developer pipeline for Bright Data.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Plan 2 is {formatEur(quotes.growth.monthly)} a month — {formatEur(quotes.growth.term)} for
          November through March — and it is the best value of the four. WeAreDevelopers India is
          25–26 November.
        </p>
        <div className="mt-8">
          <Link href="/plans#choose" className={buttonClass("primary")}>
            Choose plans
          </Link>
        </div>
      </div>
    </section>
  );
}
