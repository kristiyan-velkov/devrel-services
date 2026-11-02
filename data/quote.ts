import {
  formatEur,
  identity,
  planLines,
  serviceCategories,
  services,
  type PlanId,
  type Service,
  type ServiceCategory,
} from "./proposal";

export const MAX_QUOTE_QTY = 99;

export type QuoteQuantities = Record<string, number>;

export type QuoteLine = {
  id: string;
  name: string;
  description: string;
  category: Service["category"];
  unit: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type BuiltQuote = {
  lines: QuoteLine[];
  itemCount: number;
  total: number;
};

export function clampQuoteQty(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_QUOTE_QTY, Math.max(0, Math.trunc(value)));
}

export function emptyQuantities(): QuoteQuantities {
  return Object.fromEntries(services.map((service) => [service.id, 0]));
}

export function quantitiesFromPlan(planId: PlanId): QuoteQuantities {
  const next = emptyQuantities();
  for (const line of planLines) {
    next[line.serviceId] = clampQuoteQty(line.quantities[planId]);
  }
  return next;
}

export function buildQuote(quantities: QuoteQuantities): BuiltQuote {
  const lines: QuoteLine[] = [];
  let itemCount = 0;
  let total = 0;

  for (const service of services) {
    const quantity = clampQuoteQty(quantities[service.id] ?? 0);
    if (quantity === 0) continue;
    const lineTotal = service.price * quantity;
    itemCount += quantity;
    total += lineTotal;
    lines.push({
      id: service.id,
      name: service.name,
      description: service.description,
      category: service.category,
      unit: service.unit,
      unitPrice: service.price,
      quantity,
      lineTotal,
    });
  }

  return { lines, itemCount, total };
}

export function quoteLinesByCategory(lines: QuoteLine[]): {
  id: ServiceCategory;
  blurb: string;
  lines: QuoteLine[];
}[] {
  return serviceCategories
    .map((group) => ({
      ...group,
      lines: lines.filter((line) => line.category === group.id),
    }))
    .filter((group) => group.lines.length > 0);
}

export function mailtoForQuote(lines: QuoteLine[], total: number): string {
  const subject = `BulgariTech × Bright Data — custom quote (${formatEur(total)})`;
  const body = [
    "Hello,",
    "",
    `We would like a custom mix of services totalling ${formatEur(total)} (gross EUR).`,
    "",
    ...lines.map(
      (line) =>
        `• ${line.quantity} × ${line.name} (${line.unit}) — ${formatEur(line.lineTotal)}`,
    ),
    "",
    `Total: ${formatEur(total)}`,
    "",
    "Please send the next steps.",
    "",
    "Thank you.",
  ].join("\n");
  return `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
