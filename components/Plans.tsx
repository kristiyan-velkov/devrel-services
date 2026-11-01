"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Counter } from "@/components/Counter";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonClass } from "@/lib/buttons";
import {
  bestValuePlanId,
  formatEur,
  formatEurExact,
  includedInEveryPlan,
  mailtoForPlan,
  planLines,
  planNotes,
  planOrder,
  plans,
  quotes,
  serviceById,
  TERM_MONTHS,
  type PlanId,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

type Billing = "month" | "term";

export function Plans() {
  const [billing, setBilling] = useState<Billing>("month");
  const reduce = useReducedMotion();
  const maxValue = Math.max(...planOrder.map((id) => quotes[id].valuePerEuro));

  return (
    <section id="plans" className="print-break scroll-mt-28 py-20 md:py-28" aria-labelledby="plans-title">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          id="plans-title"
          index="04"
          kicker="Plans"
          title="Four ways in. One is the obvious yes."
          lede={`Each plan includes the one before it, for ${TERM_MONTHS} months. List value is the same work at à la carte prices. Plan 2 returns the most of that value per euro.`}
        />

        <div
          className="mt-8 inline-flex rounded-full border border-line p-1"
          role="radiogroup"
          aria-label="Show monthly or five-month price"
        >
          {(
            [
              ["month", "Monthly"],
              ["term", "5 months"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={billing === id}
              className={cn(
                "min-h-10 rounded-full px-4 text-sm",
                billing === id ? "bg-[var(--blue-strong)] text-ink" : "text-muted",
              )}
              onClick={() => setBilling(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {plans.map((plan, index) => {
            const quote = quotes[plan.id];
            const primary = billing === "month" ? quote.monthly : quote.term;
            const secondary =
              billing === "month"
                ? `${formatEur(quote.term)} for 5 months`
                : `${formatEur(quote.monthly)} per month`;
            return (
              <Reveal key={plan.id} delay={index * 0.04} className={cn("h-full", plan.recommended && "order-first lg:order-none")}>
                <article
                  className={cn(
                    "plan-card glass flex h-full flex-col rounded-3xl p-5",
                    plan.recommended && "is-recommended",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="kicker">
                      Plan {plan.number} · {plan.kicker}
                    </p>
                    {plan.recommended ? (
                      <span className="badge-mint rounded-full px-2 py-1 text-center font-mono text-[10px] tracking-wide uppercase">
                        Recommended
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-3 font-display text-3xl">{plan.name}</h3>
                  <p className="mt-2 min-h-16 text-sm leading-relaxed text-muted">{plan.summary}</p>
                  <div className="mt-4">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={`${plan.id}-${billing}`}
                        className="font-display text-4xl tabular-nums"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        {formatEur(primary)}
                        <span className="ml-1 font-mono text-xs tracking-normal text-faint">
                          {billing === "month" ? "/ mo" : " term"}
                        </span>
                      </motion.p>
                    </AnimatePresence>
                    <p className="mt-1 text-sm text-muted">{secondary}</p>
                  </div>
                  <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-mint/40 bg-mint/10 px-3 py-1 font-mono text-[11px] text-mint">
                    <span>Save {quote.savingPct}%</span>
                    <span aria-hidden="true">·</span>
                    <Counter value={quote.saving} format={formatEur} />
                  </p>
                  {plan.id === bestValuePlanId ? (
                    <p className="mt-2 font-mono text-[11px] tracking-wide text-blue uppercase">
                      Best value · {quote.valuePerEuro.toFixed(2)} list per €1
                    </p>
                  ) : (
                    <p className="mt-2 font-mono text-[11px] text-faint">
                      {quote.valuePerEuro.toFixed(2)} list per €1
                    </p>
                  )}
                  <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                    <div
                      className={cn("h-full rounded-full", plan.recommended ? "bg-mint" : "bg-blue")}
                      style={{ width: `${(quote.valuePerEuro / maxValue) * 100}%` }}
                    />
                  </div>
                  <p className="mt-5 text-sm text-fg">{plan.includes}</p>
                  <ul className="mt-3 flex-1 space-y-2 text-sm text-muted">
                    {plan.adds.map((item) => (
                      <li key={item} className="grid grid-cols-[auto_1fr] gap-2">
                        <span aria-hidden="true" className="text-blue">
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={mailtoForPlan(plan.id)}
                    className={cn("mt-6", plan.recommended ? buttonClass("primary") : buttonClass("ghost"))}
                  >
                    Choose Plan {plan.number}
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="compare-scroll mt-12 overflow-x-auto rounded-3xl border border-line" tabIndex={0} role="region" aria-label="Full plan comparison. Scroll horizontally if needed.">
          <table className="compare-table w-full min-w-[760px] text-left text-sm">
            <caption className="sr-only">
              Comparison of Plan 1 Core, Plan 2 Growth, Plan 3 Pro and Plan 4 Elite for November 2026 to March 2027
            </caption>
            <thead className="bg-[#0d1728] font-mono text-[11px] tracking-wide text-faint uppercase">
              <tr>
                <th scope="col" className="sticky left-0 bg-[#0d1728] px-4 py-3 font-medium">Included over 5 months</th>
                <th scope="col" className="px-3 py-3 font-medium">List</th>
                {planOrder.map((id) => {
                  const plan = plans.find((item) => item.id === id);
                  return (
                    <th key={id} scope="col" className={cn("px-3 py-3 font-medium", id === "growth" && "text-blue")}>
                      P{plan?.number} {plan?.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {planLines.map((line) => {
                const price = serviceById(line.serviceId).price;
                return (
                  <tr key={line.id} className="border-t border-line">
                    <th scope="row" className="sticky left-0 bg-[#0b1322] px-4 py-3 font-medium text-fg">
                      {line.label}
                      <span className="mt-0.5 block font-normal text-faint">{serviceById(line.serviceId).unit}</span>
                    </th>
                    <td className="px-3 py-3 font-mono text-muted tabular-nums">{formatEur(price)}</td>
                    {planOrder.map((id) => (
                      <td key={id} className={cn("px-3 py-3 tabular-nums", line.quantities[id] === 0 ? "text-faint" : "text-fg")}>
                        {line.quantities[id]}
                      </td>
                    ))}
                  </tr>
                );
              })}
              {includedInEveryPlan.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="sticky left-0 bg-[#0b1322] px-4 py-3 font-medium">{row.label}</th>
                  <td className="px-3 py-3 text-faint">—</td>
                  {planOrder.map((id) => (
                    <td key={id} className="px-3 py-3 text-fg">{row.value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot className="border-t border-line bg-[#0d1728] font-medium">
              <MoneyRow label="List value" pick={(id) => formatEur(quotes[id].list)} />
              <MoneyRow label="Price per month" pick={(id) => formatEur(quotes[id].monthly)} />
              <MoneyRow label="Price for 5 months" pick={(id) => formatEur(quotes[id].term)} emphasize />
              <MoneyRow label="Saving vs list" pick={(id) => formatEur(quotes[id].saving)} />
              <MoneyRow label="Saving" pick={(id) => `${quotes[id].savingPct}%`} />
              <MoneyRow label="List value per €1" pick={(id) => formatEurExact(quotes[id].valuePerEuro)} />
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-xs text-faint lg:hidden">Swipe the table sideways to compare all four plans.</p>
        <ul className="mt-6 max-w-3xl space-y-2 text-sm leading-relaxed text-muted">
          {planNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MoneyRow({
  label,
  pick,
  emphasize = false,
}: {
  label: string;
  pick: (id: PlanId) => string;
  emphasize?: boolean;
}) {
  return (
    <tr className="border-t border-line">
      <th scope="row" className="sticky left-0 bg-[#0d1728] px-4 py-3 text-left">{label}</th>
      <td className="px-3 py-3" />
      {planOrder.map((id) => (
        <td key={id} className={cn("px-3 py-3 tabular-nums", emphasize && id === "growth" && "text-blue")}>
          {pick(id)}
          {label === "List value per €1" && id === bestValuePlanId ? (
            <span className="mt-1 block font-mono text-[10px] tracking-wide text-mint uppercase">Best value</span>
          ) : null}
        </td>
      ))}
    </tr>
  );
}
