import assert from "node:assert/strict";
import test from "node:test";
import {
  audience,
  bestValuePlanId,
  contentSocialReach,
  formatContentSocialReachHeadline,
  formatEur,
  compareQuantityLabel,
  planLines,
  publishingItems,
  quotes,
  scopeComparisonCsv,
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
    { list: 18500, term: 25000, pct: -35, perEuro: 0.74 },
  );
  assert.deepEqual(
    {
      list: quotes.growth.list,
      term: quotes.growth.term,
      pct: quotes.growth.savingPct,
      perEuro: quotes.growth.valuePerEuro,
    },
    { list: 61800, term: 59995, pct: 3, perEuro: 1.03 },
  );
  assert.deepEqual(
    {
      list: quotes.pro.list,
      term: quotes.pro.term,
      pct: quotes.pro.savingPct,
      perEuro: quotes.pro.valuePerEuro,
    },
    { list: 117200, term: 79995, pct: 32, perEuro: 1.47 },
  );
  assert.deepEqual(
    {
      list: quotes.elite.list,
      term: quotes.elite.term,
      pct: quotes.elite.savingPct,
      perEuro: quotes.elite.valuePerEuro,
    },
    { list: 221600, term: 114995, pct: 48, perEuro: 1.93 },
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
      linkedin: 16,
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

test("scope comparison csv matches the plan table", () => {
  assert.equal(compareQuantityLabel("articles", 4), "4");
  assert.equal(compareQuantityLabel("india", 1), "Yes");
  assert.equal(compareQuantityLabel("banner", 1), "1 mo");
  assert.equal(compareQuantityLabel("linkedin", 0), "Not included");

  const csv = scopeComparisonCsv().replace(/^\uFEFF/, "");
  const lines = csv.split("\r\n");
  const articles = lines.find((line) => line.startsWith("Sponsored articles / tutorials,"));
  const linkedin = lines.find((line) => line.startsWith("LinkedIn posts,"));
  const banner = lines.find((line) => line.startsWith("Bright Data banner"));
  const monthly = lines.find((line) => line.startsWith("Price per month,"));

  assert.equal(
    articles,
    "Sponsored articles / tutorials,Agreement + proposed,Medium (proposed) + promotion on X.com and Medium,4,8,12,16",
  );
  assert.equal(linkedin, 'LinkedIn posts,,"31,000+ followers",Not included,8,12,16');
  assert.equal(
    banner,
    "Bright Data banner on Kristiyan's official website,,per month,Not included,1 mo,3 mo,5 mo",
  );
  assert.ok(monthly?.includes(formatEur(quotes.core.monthly)));
  assert.ok(monthly?.includes(formatEur(quotes.growth.monthly)));
  assert.ok(!lines.some((line) => line.startsWith("Price for 5 months,")));
  assert.match(csv, /Plan 2 Growth \(.*recommended\)/);
});

test("audience totals exclude shared, unpublished and Vilnius attendee figures", () => {
  assert.equal(audience.pastInPerson, 35600);
  assert.equal(audience.pastOnline, 40000);
  assert.equal(audience.pastCombined, 75600);
  assert.equal(audience.upcomingInPerson, 6800);
  assert.equal(audience.upcomingOnline, 20000);
  assert.equal(audience.allCombined, 102400);
  assert.equal(audience.pastEvents, 15);
  assert.equal(audience.upcomingEvents, 7);
  assert.equal(audience.events2026, 17);
  assert.equal(speakingEvents.length, 22);
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
