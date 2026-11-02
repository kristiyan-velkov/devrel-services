"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { buttonClass } from "@/lib/buttons";
import {
  compareQuantityLabel,
  formatEur,
  includedInEveryPlan,
  isNewPlanFeature,
  mailtoForPlan,
  planCtaEnabled,
  planLines,
  planOrder,
  plans,
  previousPlanId,
  quotes,
  scopeComparisonCsv,
  scopeComparisonFilename,
  serviceById,
  TERM_MONTHS,
  type Plan,
  type PlanId,
  type PlanLine,
} from "@/data/proposal";
import { cn } from "@/lib/cn";

export function Plans() {
  const [focus, setFocus] = useState<PlanId>("growth");

  return (
    <section id="plans" className="print-break scroll-mt-28 py-20 md:py-28" aria-labelledby="choose">
      <div className="mx-auto site-wrap px-5 md:px-8">
        <SectionHeading
          id="choose"
          index="02"
          kicker="Plans"
          title="Choose your plan."
          lede={`All prices are per month (${TERM_MONTHS}-month term). Each plan includes the previous one.`}
        />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Highlight a plan">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={focus === plan.id}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm",
                focus === plan.id ? "chip-active" : "border-line text-muted",
              )}
              onClick={() => setFocus(plan.id)}
            >
              Plan {plan.number} · {plan.name}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.id}
              delay={index * 0.04}
              className="h-full"
            >
              <PlanCard
                plan={plan}
                quote={quotes[plan.id]}
                emphasized={focus === plan.id}
                onFocus={() => setFocus(plan.id)}
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">Compare scope</p>
            <h3 id="plan-compare" className="mt-2 font-display text-2xl text-fg">
              What is included — and what is not
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              Green means the plan includes it. Grey means it does not. Quantities are for the full{" "}
              {TERM_MONTHS}-month term.
            </p>
            <PlanLegend />
          </div>
          <div className="no-print flex flex-wrap gap-2" role="group" aria-label="Export the scope comparison">
            <button type="button" className={buttonClass("ghost")} onClick={downloadScopeCsv}>
              Export CSV
            </button>
            <button type="button" className={buttonClass("ghost")} onClick={exportScopePdf}>
              Export PDF
            </button>
          </div>
        </div>

        <div
          className="compare-scroll mt-6 overflow-x-auto rounded-2xl border border-line"
          tabIndex={0}
          role="region"
          aria-labelledby="plan-compare"
        >
          <table className="compare-table w-full min-w-[860px] text-left text-sm">
            <caption className="sr-only">
              Comparison of Plan 1 Core, Plan 2 Growth, Plan 3 Pro and Plan 4 Elite for November 2026 to
              March 2027. Green cells are included. Grey cells are not included.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="compare-feature-col compare-head-cell">
                  Included over {TERM_MONTHS} months
                </th>
                {planOrder.map((id) => {
                  const plan = plans.find((item) => item.id === id);
                  const quote = quotes[id];
                  return (
                    <th
                      key={id}
                      scope="col"
                      className={cn("compare-plan-col compare-head-cell", focus === id && "is-focus")}
                    >
                      <span className="block font-mono text-[10px] tracking-wide text-faint uppercase">
                        Plan {plan?.number}
                        {plan?.recommended ? " · Recommended" : ""}
                      </span>
                      <span className={cn("mt-1 block font-display text-lg", id === "growth" && "text-blue")}>
                        {plan?.name}
                      </span>
                      <span className="mt-1 block font-mono text-xs tabular-nums text-muted">
                        {formatEur(quote.monthly)} /month
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {planLines.map((line) => (
                <tr key={line.id} className="compare-row">
                    <th scope="row" className="compare-feature-col compare-feature-cell">
                      <span className="block font-medium text-fg">{line.label}</span>
                      {line.basis ? <span className="plan-feature__basis">{line.basis}</span> : null}
                      <span className="mt-0.5 block font-normal text-faint">
                        {line.where ?? serviceById(line.serviceId).unit}
                      </span>
                    </th>
                  {planOrder.map((id) => (
                    <CompareCell
                      key={id}
                      quantity={line.quantities[id]}
                      planId={id}
                      line={line}
                      focused={focus === id}
                    />
                  ))}
                </tr>
              ))}
              {includedInEveryPlan.map((row) => (
                <tr key={row.label} className="compare-row">
                  <th scope="row" className="compare-feature-col compare-feature-cell">
                    <span className="block font-medium text-fg">{row.label}</span>
                    <span className="plan-feature__basis">{row.basis}</span>
                    <span className="mt-0.5 block font-normal text-faint">{row.where}</span>
                  </th>
                  {planOrder.map((id) => (
                    <td
                      key={id}
                      className={cn("compare-plan-col compare-cell compare-cell--in", focus === id && "is-focus")}
                    >
                      <InclusionMark included />
                      <span className="compare-cell__qty">{row.value}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <MoneyRow
                label="Price per month"
                pick={(id) => formatEur(quotes[id].monthly)}
                emphasize
                focus={focus}
              />
            </tfoot>
          </table>
        </div>
        <p className="mt-3 text-xs text-faint lg:hidden">Swipe the table sideways to compare all four plans.</p>
      </div>
    </section>
  );
}

function PlanLegend() {
  return (
    <ul className="plan-legend mt-5">
      <li className="plan-legend__item">
        <InclusionMark included />
        <span>Included</span>
      </li>
      <li className="plan-legend__item">
        <InclusionMark included={false} />
        <span>Not included</span>
      </li>
      <li className="plan-legend__item">
        <span className="plan-new">New</span>
        <span>Added versus the plan below</span>
      </li>
    </ul>
  );
}

function PlanCard({
  plan,
  quote,
  emphasized,
  onFocus,
}: {
  plan: Plan;
  quote: (typeof quotes)[PlanId];
  emphasized: boolean;
  onFocus: () => void;
}) {
  const previous = previousPlanId(plan.id);
  const previousPlan = previous ? plans.find((item) => item.id === previous) : null;
  const included = planLines.filter((line) => line.quantities[plan.id] > 0);
  const excluded = planLines.filter((line) => line.quantities[plan.id] === 0);
  const newFeatures = planLines.filter((line) => isNewPlanFeature(line, plan.id));

  return (
    <article
      className={cn(
        "plan-card flex h-full flex-col",
        plan.recommended && "is-recommended",
        emphasized && "is-emphasized",
      )}
      onMouseEnter={onFocus}
    >
      <span className="plan-card__num" aria-hidden="true">
        {plan.number}
      </span>
      <div className="plan-card__head">
        <div className="plan-card__meta">
          <p className="kicker">
            Plan {plan.number} · {plan.kicker}
          </p>
          {plan.recommended ? (
            <span className="badge-mint rounded-full px-2 py-1 text-center font-mono text-[10px] tracking-wide uppercase">
              Recommended
            </span>
          ) : null}
        </div>
        <h3 className="plan-card__name">{plan.name}</h3>
        <p className="plan-card__price">
          {formatEur(quote.monthly)}
          <span>/month</span>
        </p>
        {quote.saving > 0 ? (
          <p className="plan-card__save">
            <span>Save {quote.savingPct}% vs list</span>
          </p>
        ) : (
          <p className="plan-card__save">
            <span>Signed rate</span>
          </p>
        )}
        <p className="plan-card__summary">{plan.summary}</p>
        {previousPlan ? (
          <p className="plan-card__stack">
            Includes everything in{" "}
            <span className="font-medium text-fg">
              Plan {previousPlan.number} · {previousPlan.name}
            </span>
            {newFeatures.length > 0 ? (
              <>
                {" "}
                plus <span className="font-medium text-fg">{newFeatures.length} additions</span>.
              </>
            ) : null}
          </p>
        ) : (
          <p className="plan-card__stack">Baseline scope — higher plans add on top.</p>
        )}
      </div>

      <div className="plan-card__body">
        <p className="plan-scope-kicker plan-scope-kicker--in">
          Included
          <span>{included.length + includedInEveryPlan.length}</span>
        </p>
        <ul className="plan-card__list">
          {included.map((line) => (
            <FeatureRow
              key={line.id}
              included
              quantity={quantityLabel(line, plan.id)}
              label={line.label}
              isNew={isNewPlanFeature(line, plan.id)}
            />
          ))}
          {includedInEveryPlan.map((row) => (
            <FeatureRow
              key={row.label}
              included
              quantity={row.value}
              label={row.label}
            />
          ))}
        </ul>

        {excluded.length > 0 ? (
          <>
            <p className="plan-scope-kicker plan-scope-kicker--out">
              Not included
              <span>{excluded.length}</span>
            </p>
            <ul className="plan-card__list">
              {excluded.map((line) => (
                <FeatureRow key={line.id} included={false} label={line.label} />
              ))}
            </ul>
          </>
        ) : (
          <p className="plan-scope-kicker plan-scope-kicker--in">Nothing left out of this list</p>
        )}

        {planCtaEnabled(plan.id) ? (
          <a
            href={mailtoForPlan(plan.id)}
            className={cn(
              "no-print plan-card__cta",
              plan.recommended ? buttonClass("primary") : buttonClass("ghost"),
            )}
          >
            Choose Plan {plan.number}
          </a>
        ) : null}
      </div>
    </article>
  );
}

function FeatureRow({
  included,
  label,
  quantity,
  isNew = false,
}: {
  included: boolean;
  label: string;
  quantity?: string;
  isNew?: boolean;
}) {
  const qtyTone = quantity ? quantityDisplayTone(quantity) : null;

  return (
    <li
      className={cn("plan-feature", included ? "plan-feature--in" : "plan-feature--out")}
      aria-label={
        included
          ? `${label}, included${quantity && quantity !== "Included" ? `, ${quantity}` : ""}`
          : `${label}, not included`
      }
    >
      <InclusionMark included={included} />
      <div className="plan-feature__content">
        {included && quantity ? (
          <div className="plan-feature__main">
            <span className={cn("plan-feature__qty", qtyTone && `plan-feature__qty--${qtyTone}`)}>
              {quantity}
            </span>
            <span className="plan-feature__label">
              <span className="plan-feature__text">{label}</span>
              {isNew ? <span className="plan-new">New</span> : null}
            </span>
          </div>
        ) : (
          <span className="plan-feature__label plan-feature__label--solo">
            <span className="plan-feature__text">{label}</span>
            {isNew ? <span className="plan-new">New</span> : null}
          </span>
        )}
      </div>
    </li>
  );
}

function quantityDisplayTone(quantity: string) {
  if (/^\d+$/.test(quantity) || /^\d+ mo$/.test(quantity) || quantity === "Yes") return "num";
  return "text";
}

function CompareCell({
  quantity,
  planId,
  line,
  focused,
}: {
  quantity: number;
  planId: PlanId;
  line: PlanLine;
  focused: boolean;
}) {
  const included = quantity > 0;
  return (
    <td
      className={cn(
        "compare-plan-col compare-cell",
        included ? "compare-cell--in" : "compare-cell--out",
        focused && "is-focus",
      )}
    >
      {included ? (
        <>
          <InclusionMark included />
          <span className="compare-cell__qty">{quantityLabel(line, planId)}</span>
          {isNewPlanFeature(line, planId) ? <span className="plan-new">New</span> : null}
        </>
      ) : (
        <>
          <InclusionMark included={false} />
          <span className="compare-cell__empty">Not included</span>
        </>
      )}
    </td>
  );
}

function InclusionMark({ included }: { included: boolean }) {
  return (
    <span className={cn("plan-mark", included ? "plan-mark--in" : "plan-mark--out")} aria-hidden="true">
      {included ? (
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
          <path
            d="M3.4 8.2 6.2 11l6.4-6.6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
          <path
            d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
}

function MoneyRow({
  label,
  pick,
  emphasize = false,
  focus,
}: {
  label: string;
  pick: (id: PlanId) => string;
  emphasize?: boolean;
  focus: PlanId;
}) {
  return (
    <tr className="compare-money-row">
      <th scope="row" className="compare-feature-col compare-money-label">
        {label}
      </th>
      {planOrder.map((id) => (
        <td
          key={id}
          className={cn(
            "compare-plan-col compare-money-cell",
            emphasize && id === "growth" && "text-blue",
            focus === id && "is-focus",
          )}
        >
          {pick(id)}
        </td>
      ))}
    </tr>
  );
}

function quantityLabel(line: PlanLine, planId: PlanId) {
  const quantity = line.quantities[planId];
  if (quantity === 0) return "";
  return compareQuantityLabel(line.id, quantity);
}

function downloadScopeCsv() {
  const csv = scopeComparisonCsv();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = scopeComparisonFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportScopePdf() {
  const root = document.documentElement;
  const sheet = document.getElementById("plans-print");
  if (!sheet) return;

  root.classList.add("print-plans");
  sheet.removeAttribute("aria-hidden");

  const done = () => {
    root.classList.remove("print-plans");
    sheet.setAttribute("aria-hidden", "true");
    window.removeEventListener("afterprint", done);
  };

  window.addEventListener("afterprint", done);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      window.print();
    });
  });
}

