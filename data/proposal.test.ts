import assert from "node:assert/strict";
import test from "node:test";
import {
  audience,
  bestValuePlanId,
  contentSocialReach,
  formatContentSocialReachHeadline,
  planLines,
  publishingItems,
  quotes,
  serviceById,
  speakingEvents,
  totalContentSocialReach,
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
    { list: 20000, term: 25000, pct: -25, perEuro: 0.8 },
  );
  assert.deepEqual(
    {
      list: quotes.growth.list,
      term: quotes.growth.term,
      pct: quotes.growth.savingPct,
      perEuro: quotes.growth.valuePerEuro,
    },
    { list: 65650, term: 60000, pct: 9, perEuro: 1.09 },
  );
  assert.deepEqual(
    {
      list: quotes.pro.list,
      term: quotes.pro.term,
      pct: quotes.pro.savingPct,
      perEuro: quotes.pro.valuePerEuro,
    },
    { list: 119750, term: 75000, pct: 37, perEuro: 1.6 },
  );
  assert.deepEqual(
    {
      list: quotes.elite.list,
      term: quotes.elite.term,
      pct: quotes.elite.savingPct,
      perEuro: quotes.elite.valuePerEuro,
    },
    { list: 216150, term: 100000, pct: 54, perEuro: 2.16 },
  );
  assert.equal(bestValuePlanId, "elite");
});

test("Elite quantities match the agreed Plan 4 scope", () => {
  const byId = Object.fromEntries(planLines.map((line) => [line.id, line.quantities.elite]));
  assert.deepEqual(
    {
      articles: byId.articles,
      demos: byId.demos,
      sessions: byId.sessions,
      reports: byId.reports,
      linkedin: byId.linkedin,
      few: byId.few,
      youtube: byId.youtube,
      recipes: byId.recipes,
      banner: byId.banner,
      india: byId.india,
      workshops: byId.workshops,
      talks: byId.talks,
      hackathons: byId.hackathons,
      articleAd: byId["article-ad"],
      brand: byId.brand,
      collab: byId.collab,
    },
    {
      articles: 16,
      demos: 8,
      sessions: 7,
      reports: 7,
      linkedin: 12,
      few: 16,
      youtube: 10,
      recipes: 6,
      banner: 5,
      india: 1,
      workshops: 3,
      talks: 5,
      hackathons: 5,
      articleAd: 6,
      brand: 5,
      collab: 3,
    },
  );
});

test("Growth quantities match the agreed Plan 2 scope", () => {
  const byId = Object.fromEntries(planLines.map((line) => [line.id, line.quantities.growth]));
  assert.deepEqual(
    {
      articles: byId.articles,
      demos: byId.demos,
      sessions: byId.sessions,
      reports: byId.reports,
      linkedin: byId.linkedin,
      few: byId.few,
      youtube: byId.youtube,
      recipes: byId.recipes,
      banner: byId.banner,
      india: byId.india,
    },
    {
      articles: 8,
      demos: 5,
      sessions: 3,
      reports: 3,
      linkedin: 8,
      few: 8,
      youtube: 3,
      recipes: 3,
      banner: 1,
      india: 1,
    },
  );
});

test("Core quantities match the signed agreement", () => {
  const byId = Object.fromEntries(planLines.map((line) => [line.id, line.quantities.core]));
  assert.deepEqual(
    {
      articles: byId.articles,
      demos: byId.demos,
      sessions: byId.sessions,
      reports: byId.reports,
    },
    { articles: 4, demos: 3, sessions: 2, reports: 1 },
  );
});

test("audience totals exclude shared, unpublished and Vilnius attendee figures", () => {
  assert.equal(audience.pastInPerson, 35600);
  assert.equal(audience.pastOnline, 40000);
  assert.equal(audience.pastCombined, 75600);
  assert.equal(audience.upcomingInPerson, 5800);
  assert.equal(audience.upcomingOnline, 20000);
  assert.equal(audience.allCombined, 101400);
  assert.equal(audience.pastEvents, 15);
  assert.equal(audience.upcomingEvents, 6);
  assert.equal(audience.events2026, 17);
  assert.equal(speakingEvents.length, 21);
});

test("content and social reach headline sums newsletter and social followers", () => {
  const expected =
    contentSocialReach.newsletterAnnual +
    contentSocialReach.linkedInFollowers +
    contentSocialReach.mediumFollowers +
    contentSocialReach.frontendWorldFollowers;
  assert.equal(totalContentSocialReach(), expected);
  assert.equal(formatContentSocialReachHeadline(), "300,000+");
});

test("publishing calendar covers every scheduled row in the term", () => {
  assert.equal(publishingItems.length, 42);
  assert.ok(publishingItems.every((item) => item.date >= "2026-11-01" && item.date <= "2027-03-31"));
});
