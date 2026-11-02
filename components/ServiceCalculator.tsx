"use client";

import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  formatEur,
  identity,
  planOrder,
  plans,
  serviceCategories,
  services,
  type PlanId,
  type Service,
} from "@/data/proposal";
import { buttonClass } from "@/lib/buttons";
import { cn } from "@/lib/cn";
import {
  buildQuote,
  clampQuoteQty,
  emptyQuantities,
  mailtoForQuote,
  quantitiesFromPlan,
  quoteLinesByCategory,
  type QuoteQuantities,
} from "@/data/quote";

export function ServiceCalculator() {
  const [quantities, setQuantities] = useState<QuoteQuantities>(emptyQuantities);
  const [preset, setPreset] = useState<PlanId | "custom">("custom");
  const quote = useMemo(() => buildQuote(quantities), [quantities]);
  const grouped = useMemo(() => quoteLinesByCategory(quote.lines), [quote.lines]);
  const hasItems = quote.lines.length > 0;

  function setQuantity(id: string, value: number) {
    setPreset("custom");
    setQuantities((current) => ({ ...current, [id]: clampQuoteQty(value) }));
  }

  function applyPlan(id: PlanId) {
    setPreset(id);
    setQuantities(quantitiesFromPlan(id));
  }

  function reset() {
    setPreset("custom");
    setQuantities(emptyQuantities());
  }

  function exportPdf() {
    if (!hasItems) return;
    const root = document.documentElement;
    root.classList.add("print-calculator");
    const done = () => {
      root.classList.remove("print-calculator");
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  }

  return (
    <section id="calculator" className="scroll-mt-28 py-20 md:py-28" aria-labelledby="calculator-title">
      <div className="calculator-ui site-wrap px-5 md:px-8">
        <SectionHeading
          id="calculator-title"
          index="02"
          kicker="Custom mix"
          title="Build a quote. Change the counts. Export a PDF."
          lede="Set how many of each service you want. The total updates as you go. Start from a plan or from zero — then export only the selected lines."
        />

        <nav className="no-print mt-8 flex flex-wrap gap-2" aria-label="On this page">
          <a href="#services" className={buttonClass("ghost")}>
            Catalogue
          </a>
          <a href="#calculator" className={buttonClass("primary")} aria-current="page">
            Custom mix
          </a>
        </nav>

        <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <p className="font-mono text-[11px] tracking-widest text-faint uppercase">Start from</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Start from a plan">
            <PresetChip active={preset === "custom" && !hasItems} onClick={reset}>
              Empty
            </PresetChip>
            {planOrder.map((id) => {
              const plan = plans.find((item) => item.id === id);
              return (
                <PresetChip key={id} active={preset === id} onClick={() => applyPlan(id)}>
                  Plan {plan?.number} · {plan?.name}
                </PresetChip>
              );
            })}
          </div>
        </div>

        <div className="calculator-summary no-print sticky top-20 z-20 mt-8 rounded-3xl border border-line bg-card/95 p-4 shadow-lg backdrop-blur-md md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-faint uppercase">Selected total</p>
              <p className="mt-1 font-display text-3xl tabular-nums text-fg">{formatEur(quote.total)}</p>
              <p className="mt-1 text-sm text-muted">
                {hasItems
                  ? `${quote.lines.length} service${quote.lines.length === 1 ? "" : "s"} · ${quote.itemCount} unit${quote.itemCount === 1 ? "" : "s"} · gross EUR`
                  : "Add quantities to see a total"}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                className={cn(buttonClass("ghost"), "disabled:opacity-40")}
                onClick={reset}
                disabled={!hasItems}
              >
                Reset
              </button>
              <button
                type="button"
                className={cn(buttonClass("ghost"), "disabled:opacity-40")}
                onClick={exportPdf}
                disabled={!hasItems}
              >
                Export PDF
              </button>
              {hasItems ? (
                <a href={mailtoForQuote(quote.lines, quote.total)} className={buttonClass("primary")}>
                  Email this quote
                </a>
              ) : (
                <span className={cn(buttonClass("primary"), "pointer-events-none opacity-40")}>
                  Email this quote
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {serviceCategories.map((group) => {
            const rows = services.filter((service) => service.category === group.id);
            return (
              <section key={group.id} aria-labelledby={`calc-${group.id}`}>
                <h3 id={`calc-${group.id}`} className="font-display text-2xl">
                  {group.id}
                </h3>
                <p className="mt-1 max-w-3xl text-sm text-muted">{group.blurb}</p>
                <ul className="mt-3 divide-y divide-line rounded-2xl border border-line">
                  {rows.map((service) => (
                    <CalculatorRow
                      key={service.id}
                      service={service}
                      quantity={quantities[service.id] ?? 0}
                      onQuantity={setQuantity}
                    />
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <div id="calculator-print" className="calculator-print" hidden={!hasItems} aria-hidden={!hasItems}>
        <p className="calculator-print__kicker">
          {identity.company} · {identity.person}
        </p>
        <h1 className="calculator-print__title">Custom service quote</h1>
        <p className="calculator-print__lede">
          For {identity.counterparty} · {identity.dateLabel} · {identity.termLong}
        </p>
        {grouped.map((group) => (
          <section key={group.id} className="calculator-print__group">
            <h2>{group.id}</h2>
            <table>
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit price</th>
                  <th scope="col">Line total</th>
                </tr>
              </thead>
              <tbody>
                {group.lines.map((line) => (
                  <tr key={line.id}>
                    <td>
                      <strong>{line.name}</strong>
                      <span>
                        {line.description} · {line.unit}
                      </span>
                    </td>
                    <td>{line.quantity}</td>
                    <td>{formatEur(line.unitPrice)}</td>
                    <td>{formatEur(line.lineTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
        <p className="calculator-print__total">
          Total {formatEur(quote.total)}
          <span>Gross EUR. No tax calculated. {identity.email}</span>
        </p>
      </div>
    </section>
  );
}

function CalculatorRow({
  service,
  quantity,
  onQuantity,
}: {
  service: Service;
  quantity: number;
  onQuantity: (id: string, value: number) => void;
}) {
  const selected = quantity > 0;
  return (
    <li
      className={cn(
        "grid gap-3 px-4 py-4 md:grid-cols-[minmax(0,1.5fr)_auto] md:items-center",
        selected && "bg-surface-subtle",
      )}
    >
      <div>
        <p className="font-medium text-fg">{service.name}</p>
        <p className="mt-1 text-sm text-muted">{service.description}</p>
        <p className="mt-1 font-mono text-[11px] text-faint">
          {formatEur(service.price)} · {service.unit}
        </p>
      </div>
      <div className="flex items-center justify-between gap-4 md:justify-end">
        <QtyStepper
          id={service.id}
          name={service.name}
          quantity={quantity}
          onQuantity={onQuantity}
        />
        <p
          className={cn(
            "min-w-24 text-right font-mono text-sm tabular-nums",
            selected ? "text-fg" : "text-faint",
          )}
        >
          {selected ? formatEur(service.price * quantity) : "—"}
        </p>
      </div>
    </li>
  );
}

function QtyStepper({
  id,
  name,
  quantity,
  onQuantity,
}: {
  id: string;
  name: string;
  quantity: number;
  onQuantity: (id: string, value: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-surface-subtle">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center text-lg text-muted hover:text-fg"
        aria-label={`Remove one ${name}`}
        disabled={quantity === 0}
        onClick={() => onQuantity(id, quantity - 1)}
      >
        −
      </button>
      <input
        id={`qty-${id}`}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={`${name} quantity`}
        value={quantity}
        onChange={(event) => onQuantity(id, Number.parseInt(event.target.value, 10) || 0)}
        className="h-11 w-12 border-0 bg-transparent text-center font-mono text-sm tabular-nums text-fg outline-none"
      />
      <button
        type="button"
        className="grid h-11 w-11 place-items-center text-lg text-muted hover:text-fg"
        aria-label={`Add one ${name}`}
        onClick={() => onQuantity(id, quantity + 1)}
      >
        +
      </button>
    </div>
  );
}

function PresetChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-3 text-sm",
        active ? "chip-active" : "border-line text-muted",
      )}
    >
      {children}
    </button>
  );
}
