import assert from "node:assert/strict";
import test from "node:test";
import {
  audience,
  bestValuePlanId,
  planLines,
  publishingItems,
  quotes,
  serviceById,
  speakingEvents,
  TERM_MONTHS,
} from "./proposal.ts";

test("plan quotes follow the workbook formulas", () => {
  for (const quote of Object.values(quotes)) {
    const list = planLines.reduce(
      (sum, line) => sum + serviceById(line.serviceId).price * line.quantities[quote.id],
      0,
    );
    assert.equal(quote.list, list);
    assert.equal(quote.term, quote.monthly * TERM_MONTHS);
    assert.equal(quote.saving, quote.list - quote.term);
    assert.equal(quote.savingPct, Math.round((quote.saving / quote.list) * 100));
  }
});

test("quoted figures match the November 2026 workbook", () => {
  assert.deepEqual(
    {
      list: quotes.core.list,
      term: quotes.core.term,
      pct: quotes.core.savingPct,
      perEuro: quotes.core.valuePerEuro,
    },
    { list: 34000, term: 25000, pct: 26, perEuro: 1.36 },
  );
  assert.deepEqual(
    {
      list: quotes.growth.list,
      term: quotes.growth.term,
      pct: quotes.growth.savingPct,
      perEuro: quotes.growth.valuePerEuro,
    },
    { list: 74350, term: 50000, pct: 33, perEuro: 1.49 },
  );
  assert.deepEqual(
    {
      list: quotes.pro.list,
      term: quotes.pro.term,
      pct: quotes.pro.savingPct,
      perEuro: quotes.pro.valuePerEuro,
    },
    { list: 107850, term: 75000, pct: 30, perEuro: 1.44 },
  );
  assert.deepEqual(
    {
      list: quotes.elite.list,
      term: quotes.elite.term,
      pct: quotes.elite.savingPct,
      perEuro: quotes.elite.valuePerEuro,
    },
    { list: 138350, term: 100000, pct: 28, perEuro: 1.38 },
  );
  assert.equal(bestValuePlanId, "growth");
});

test("audience totals exclude shared, unpublished and Vilnius attendee figures", () => {
  assert.equal(audience.pastInPerson, 35600);
  assert.equal(audience.pastOnline, 40000);
  assert.equal(audience.pastCombined, 75600);
  assert.equal(audience.upcomingInPerson, 5800);
  assert.equal(audience.upcomingOnline, 20000);
  assert.equal(audience.allCombined, 101400);
  assert.equal(audience.pastEvents, 13);
  assert.equal(audience.upcomingEvents, 6);
  assert.equal(audience.events2026, 16);
  assert.equal(speakingEvents.length, 19);
});

test("publishing calendar covers every scheduled row in the term", () => {
  assert.equal(publishingItems.length, 42);
  assert.ok(publishingItems.every((item) => item.date >= "2026-11-01" && item.date <= "2027-03-31"));
});
