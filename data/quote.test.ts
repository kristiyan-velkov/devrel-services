import assert from "node:assert/strict";
import test from "node:test";
import { quotes, serviceById } from "./proposal.ts";
import { buildQuote, clampQuoteQty, emptyQuantities, quantitiesFromPlan } from "./quote.ts";

test("clampQuoteQty keeps quantities between 0 and 99", () => {
  assert.equal(clampQuoteQty(2.8), 2);
  assert.equal(clampQuoteQty(-4), 0);
  assert.equal(clampQuoteQty(140), 99);
  assert.equal(clampQuoteQty(Number.NaN), 0);
});

test("an empty mix totals zero", () => {
  const quote = buildQuote(emptyQuantities());
  assert.equal(quote.total, 0);
  assert.equal(quote.itemCount, 0);
  assert.equal(quote.lines.length, 0);
});

test("selected services multiply unit price by quantity", () => {
  const quantities = emptyQuantities();
  quantities.article = 3;
  quantities.youtube = 2;
  const quote = buildQuote(quantities);
  assert.equal(quote.itemCount, 5);
  assert.equal(
    quote.total,
    serviceById("article").price * 3 + serviceById("youtube").price * 2,
  );
});

test("plan presets match the derived list values", () => {
  for (const id of ["core", "growth", "pro", "elite"] as const) {
    assert.equal(buildQuote(quantitiesFromPlan(id)).total, quotes[id].list);
  }
});
