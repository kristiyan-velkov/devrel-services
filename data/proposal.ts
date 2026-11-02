/**
 * BulgariTech × Bright Data — proposal content and commercial figures.
 *
 * Source of truth: BulgariTech_BrightData_Plan_Nov2026-Mar2027 workbook
 * (tabs: Agreed Services, Speaking Track Record, Additional Services, Plans,
 * Publishing Plan), dated 1 November 2026.
 *
 * Edit prices, quantities and copy here. Plan totals, savings and audience
 * sums are derived — do not hard-code them in components.
 *
 * Do not add tax or net-of-tax calculations. Prices stay gross EUR as quoted.
 */

export const TERM_MONTHS = 5;

export const identity = {
  person: "Kristiyan Velkov",
  company: "BulgariTech EOOD",
  counterparty: "Bright Data Ltd.",
  email: "info.bulgaritech@gmail.com",
  dateLabel: "1 November 2026",
  dateIso: "2026-11-01",
  termLabel: "Nov 2026 – Mar 2027",
  termLong: "November 2026 – March 2027",
  pilotLabel: "1 Oct – 31 Dec 2026",
} as const;

export const socialLinks = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kristiyan-velkov-763130b3/",
  },
  medium: { label: "Medium", href: "https://medium.com/@kristiyanvelkov" },
  x: { label: "X.com", href: "https://x.com/krisvelkov" },
  website: { label: "Website", href: "https://kristiyanvelkov.com/" },
  frontendWorld: {
    label: "Front-end World",
    href: "https://www.linkedin.com/company/frontend-world-newsletter",
  },
} as const;

export const profiles = [
  socialLinks.x,
  socialLinks.linkedin,
  socialLinks.medium,
  socialLinks.frontendWorld,
  socialLinks.website,
] as const;

export const competitors = [
  "Oxylabs",
  "Decodo",
  "Smartproxy",
  "NetNut",
  "SOAX",
  "Webshare",
  "IPRoyal",
  "Zyte",
  "Apify",
  "ScraperAPI",
] as const;

/** Blog, newsletter, and social footprint (headline reach — not deduplicated unique people). */
export const contentSocialReach = {
  newsletterAnnual: 250_000,
  linkedInFollowers: 31_000,
  mediumFollowers: 7_000,
  frontendWorldFollowers: 3_000,
  /** Hero, meta, and OG — newsletter plus blog and social footprint. */
  headlineTotal: 300_000,
  headlineChannels:
    "Front-end World newsletter, Medium, LinkedIn, and Front-end World social",
} as const;

export function totalContentSocialReach(): number {
  const c = contentSocialReach;
  return (
    c.newsletterAnnual +
    c.linkedInFollowers +
    c.mediumFollowers +
    c.frontendWorldFollowers
  );
}

const reachGrouped = new Intl.NumberFormat("en-GB");

export function formatContentSocialReachHeadline(): string {
  return `${reachGrouped.format(contentSocialReach.headlineTotal)}+`;
}

export const meta = {
  title:
    "BulgariTech × Bright Data — DevRel Partnership Proposal (Nov 2026 – Mar 2027)",
  shortTitle: "BulgariTech × Bright Data — DevRel Proposal",
  description: `Proposal from Kristiyan Velkov and BulgariTech EOOD to put Bright Data in front of ${formatContentSocialReachHeadline()} people across newsletter, blog posts, and social media from November 2026 to March 2027. Four cumulative plans from €5,000 to €20,000 a month. Plan 2, Growth, is recommended.`,
  ogAlt:
    "BulgariTech proposal for a Bright Data DevRel partnership, November 2026 to March 2027. Plan 2 Growth is recommended.",
} as const;

export type ServiceCategory =
  | "Conferences"
  | "Content"
  | "Video"
  | "Social & website"
  | "Live sessions & events"
  | "Advisory"
  | "Partnership & community"
  | "Case study";

export type Service = {
  id: string;
  name: string;
  description: string;
  unit: string;
  price: number;
  category: ServiceCategory;
};

export const serviceCategories: { id: ServiceCategory; blurb: string }[] = [
  {
    id: "Conferences",
    blurb:
      "Bright Data brand on stage in front of 3,000+ developers. WeAreDevelopers India is included in Plan 2 and above. React Day Berlin is included in Plan 3 and above.",
  },
  {
    id: "Content",
    blurb: "Articles, demos, recipes and reports a developer can run.",
  },
  {
    id: "Video",
    blurb:
      "YouTube walkthroughs, native LinkedIn and X.com video, live video, and short clips.",
  },
  {
    id: "Social & website",
    blurb: "Distribution beyond the article itself.",
  },
  {
    id: "Live sessions & events",
    blurb:
      "Webinars, workshops, talks, meetups and AMAs. Conference fees are fee-only.",
  },
  {
    id: "Advisory",
    blurb: "Consulting and product feedback, private unless otherwise agreed.",
  },
  {
    id: "Partnership & community",
    blurb:
      "Front-end World, hackathons, on-site brand and collaborations. Hackathon prize pools are provided by Bright Data and are not included in the fee.",
  },
  {
    id: "Case study",
    blurb: "A named integration project, scoped separately from the retainer.",
  },
];

export const services: Service[] = [
  {
    id: "wad-india",
    name: "WeAreDevelopers Conference India – talk",
    description:
      "25–26 Nov 2026, Bengaluru · 3,000+ developers · talk + Bright Data T-shirt + promotion before, during and after.",
    unit: "per event",
    price: 5000,
    category: "Conferences",
  },
  {
    id: "react-day-berlin",
    name: "React Day Berlin 2026 – talk",
    description:
      "4–7 Dec 2026, Berlin & Online (in-person + remote audience) · talk + Bright Data T-shirt + promotion before, during and after.",
    unit: "per event",
    price: 3500,
    category: "Conferences",
  },
  {
    id: "conference-pack-5",
    name: "Conference pack – 5 events",
    description:
      "5 appearances — talk + Bright Data T-shirt + promotion before, during and after at each event.",
    unit: "per pack",
    price: 10000,
    category: "Conferences",
  },
  {
    id: "conference-pack-10",
    name: "Conference pack – 10 events",
    description:
      "10 appearances — talk + Bright Data T-shirt + promotion before, during and after at each event.",
    unit: "per pack",
    price: 15000,
    category: "Conferences",
  },
  {
    id: "article",
    name: "Sponsored article / tutorial",
    description: "Technical article or tutorial, published and promoted.",
    unit: "per article",
    price: 2000,
    category: "Content",
  },
  {
    id: "github-demo",
    name: "GitHub demo",
    description: "Working demo repository with README and setup guide.",
    unit: "per repo",
    price: 1000,
    category: "Content",
  },
  {
    id: "recipe",
    name: "Recipe",
    description:
      "Practical guide: a real problem and how to solve it with Bright Data.",
    unit: "per recipe",
    price: 2000,
    category: "Content",
  },
  {
    id: "benchmark",
    name: "Benchmark report",
    description: "Reproducible benchmark with public repo and article.",
    unit: "per report",
    price: 3000,
    category: "Content",
  },
  {
    id: "seo-refresh",
    name: "SEO content refresh",
    description:
      "Update of a published article to keep it current and ranking.",
    unit: "per article",
    price: 600,
    category: "Content",
  },
  {
    id: "bulgarian",
    name: "Bulgarian translation",
    description: "Bulgarian adaptation of an article for the local audience.",
    unit: "per article",
    price: 500,
    category: "Content",
  },
  {
    id: "youtube",
    name: "YouTube video",
    description: "Dedicated 10–20 min tutorial / walkthrough.",
    unit: "per video",
    price: 1500,
    category: "Video",
  },
  {
    id: "linkedin-video",
    name: "LinkedIn video",
    description: "Native 1–3 min product video.",
    unit: "per video",
    price: 1200,
    category: "Video",
  },
  {
    id: "x-video",
    name: "X.com video",
    description: "Native 1–3 min product video.",
    unit: "per video",
    price: 1500,
    category: "Video",
  },
  {
    id: "live-video",
    name: "Live video",
    description:
      "Live product video / stream, priced separately from a webinar.",
    unit: "per video",
    price: 1500,
    category: "Video",
  },
  {
    id: "clips",
    name: "Short clips pack",
    description: "3 short vertical clips (LinkedIn / X.com / Shorts).",
    unit: "per pack",
    price: 900,
    category: "Video",
  },
  {
    id: "linkedin-post",
    name: "LinkedIn promo post",
    description: "Dedicated post promoting Bright Data.",
    unit: "per post",
    price: 600,
    category: "Social & website",
  },
  {
    id: "newsletter",
    name: "Newsletter mention",
    description: "Sponsored section in the newsletter.",
    unit: "per issue",
    price: 800,
    category: "Social & website",
  },
  {
    id: "banner",
    name: "Website banner",
    description: "Bright Data banner on the official website.",
    unit: "per month",
    price: 1500,
    category: "Social & website",
  },
  {
    id: "webinar",
    name: "Webinar",
    description: "60-min live online session with Q&A.",
    unit: "per session",
    price: 2500,
    category: "Live sessions & events",
  },
  {
    id: "workshop",
    name: "Half-day workshop",
    description: "3–4 h hands-on workshop.",
    unit: "per workshop",
    price: 4500,
    category: "Live sessions & events",
  },
  {
    id: "talk-europe",
    name: "Conference talk – Europe",
    description: "Talk + Bright Data T-shirt + promotion (fee only).",
    unit: "per event",
    price: 3500,
    category: "Live sessions & events",
  },
  {
    id: "talk-outside",
    name: "Conference talk – outside Europe",
    description: "Talk + Bright Data T-shirt + promotion (fee only).",
    unit: "per event",
    price: 5000,
    category: "Live sessions & events",
  },
  {
    id: "meetup",
    name: "Developer meetup",
    description: "Bulgarian / EU meetup with Bright Data talk and branding.",
    unit: "per meetup",
    price: 2000,
    category: "Live sessions & events",
  },
  {
    id: "ama",
    name: "Community AMA",
    description: "60-min AMA on Discord / Slack.",
    unit: "per AMA",
    price: 1000,
    category: "Live sessions & events",
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Technical / DX consulting.",
    unit: "per hour",
    price: 200,
    category: "Advisory",
  },
  {
    id: "feedback-session",
    name: "Product feedback session",
    description: "2-hour session + written summary.",
    unit: "per session",
    price: 800,
    category: "Advisory",
  },
  {
    id: "feedback-report",
    name: "Product feedback report",
    description: "Comprehensive DX and product report.",
    unit: "per report",
    price: 2500,
    category: "Advisory",
  },
  {
    id: "frontend-world",
    name: "Front-end World publication",
    description:
      "Publication of an article in Front-end World (Kristiyan's community / publication).",
    unit: "per article",
    price: 500,
    category: "Partnership & community",
  },
  {
    id: "hackathon",
    name: "Hackathon",
    description:
      "Challenge design, promotion, mentoring and judging. Prize pool provided by Bright Data.",
    unit: "per hackathon",
    price: 5000,
    category: "Partnership & community",
  },
  {
    id: "brand-activation",
    name: "Conference brand activation",
    description:
      "Bright Data T-shirt, mentions, on-site networking and social posts at an event where Kristiyan speaks.",
    unit: "per event",
    price: 2500,
    category: "Partnership & community",
  },
  {
    id: "devrel-collab",
    name: "DevRel collaboration campaign",
    description:
      "Joint content or live session with another DevRel, plus cross-promotion. Third-party fees, if any, are separate.",
    unit: "per campaign",
    price: 3000,
    category: "Partnership & community",
  },
  {
    id: "article-ad",
    name: "Article ad placement",
    description: "Bright Data ad / link on all of Kristiyan's articles.",
    unit: "per month",
    price: 2000,
    category: "Partnership & community",
  },
  {
    id: "pakli",
    name: "Pakli.bg case study",
    description:
      "Integration of 3 Bright Data scrapers into Pakli.bg + case study.",
    unit: "per project",
    price: 10000,
    category: "Case study",
  },
];

const serviceMap = new Map(services.map((service) => [service.id, service]));

export function serviceById(id: string) {
  const service = serviceMap.get(id);
  if (!service) throw new Error(`Unknown service: ${id}`);
  return service;
}

export type PlanId = "core" | "growth" | "pro" | "elite";

export type Plan = {
  id: PlanId;
  number: 1 | 2 | 3 | 4;
  name: string;
  kicker: string;
  monthly: number;
  recommended: boolean;
  summary: string;
  includes: string;
  adds: string[];
};

export const plans: Plan[] = [
  {
    id: "core",
    number: 1,
    name: "Core",
    kicker: "Agreed scope",
    monthly: 5000,
    recommended: false,
    summary:
      "The signed agreement: four articles, three GitHub demos, two live sessions, one private feedback report, and promotion on X.com and Medium.",
    includes: "The baseline. Everything above this is added on top.",
    adds: [
      "4 sponsored articles / tutorials on Medium (proposed)",
      "3 supporting GitHub demos",
      "2 live online sessions",
      "1 product feedback report, sent privately",
      "Promotion of the materials on X.com and Medium",
      "Up to 2 revision rounds per deliverable",
    ],
  },
  {
    id: "growth",
    number: 2,
    name: "Growth",
    kicker: "Recommended",
    monthly: 11999,
    recommended: true,
    summary:
      "Core, plus 8 articles, 5 demos, LinkedIn, Front-end World, video, recipes, a month on the homepage, and Bengaluru.",
    includes: "Everything in Core, plus:",
    adds: [
      "8 sponsored articles / tutorials (4 more than Core)",
      "5 supporting GitHub demos",
      "3 live online sessions",
      "3 product feedback reports",
      "8 LinkedIn posts",
      "8 Front-end World publications",
      "3 YouTube videos",
      "3 Recipes — how to use Bright Data well",
      "1 month banner on kristiyanvelkov.com",
      "WeAreDevelopers India brand activation, 25–26 Nov 2026",
    ],
  },
  {
    id: "pro",
    number: 3,
    name: "Pro",
    kicker: "Stage & workshops",
    monthly: 15999,
    recommended: false,
    summary:
      "Growth, plus more sessions, reports, video and recipes, one hands-on workshop, three conference talks and two hackathons. The banner runs for three months.",
    includes: "Everything in Growth, plus:",
    adds: [
      "5 live online sessions",
      "5 product feedback reports",
      "5 YouTube videos",
      "4 Recipes",
      "3 months banner on kristiyanvelkov.com",
      "WeAreDevelopers India brand activation",
      "1 hands-on workshop",
      "3 conference talks (React Day Berlin 2026 + 2 in 2027, TBD)",
      "2 hackathons — prize pools provided by Bright Data",
    ],
  },
  {
    id: "elite",
    number: 4,
    name: "Elite",
    kicker: "Strategic partner",
    monthly: 22999,
    recommended: false,
    summary:
      "Pro, stepped up: 16 articles, more video and live work, five conference talks, five hackathons, the banner for the whole term, and Bright Data on every other stage.",
    includes: "Everything in Pro, plus:",
    adds: [
      "16 sponsored articles / tutorials",
      "8 supporting GitHub demos",
      "7 live online sessions",
      "7 product feedback reports",
      "16 LinkedIn posts",
      "16 Front-end World publications",
      "10 YouTube videos",
      "6 Recipes",
      "5 months banner on kristiyanvelkov.com",
      "WeAreDevelopers India brand activation",
      "3 hands-on workshops",
      "5 conference talks",
      "5 hackathons — prize pools provided by Bright Data",
      "Bright Data link on every article for 6 months",
      "Brand promotion at all other events where he speaks (est. 5)",
      "3 collaboration campaigns with other DevRels",
    ],
  },
];

export type PlanLine = {
  id: string;
  serviceId: string;
  label: string;
  where?: string;
  basis?: string;
  quantities: Record<PlanId, number>;
};

/** Absolute quantities over the 5-month term. Each plan includes the previous one. */
export const planLines: PlanLine[] = [
  {
    id: "articles",
    serviceId: "article",
    label: "Sponsored articles / tutorials",
    where: "Medium (proposed) + promotion on X.com and Medium",
    basis: "Agreement + proposed",
    quantities: { core: 4, growth: 8, pro: 12, elite: 16 },
  },
  {
    id: "demos",
    serviceId: "github-demo",
    label: "Supporting GitHub demos",
    where: "GitHub — Kristiyan Velkov public repositories (proposed)",
    basis: "Agreement + proposed",
    quantities: { core: 3, growth: 5, pro: 5, elite: 8 },
  },
  {
    id: "sessions",
    serviceId: "webinar",
    label: "Live online sessions",
    where:
      "Online — platform TBD, e.g. YouTube Live / LinkedIn Live (proposed)",
    basis: "Agreement + proposed",
    quantities: { core: 2, growth: 3, pro: 5, elite: 7 },
  },
  {
    id: "reports",
    serviceId: "feedback-report",
    label: "Product feedback report",
    where: "Not published — sent privately to Bright Data by email (proposed)",
    basis: "Proposed",
    quantities: { core: 1, growth: 3, pro: 5, elite: 7 },
  },
  {
    id: "linkedin",
    serviceId: "linkedin-post",
    label: "LinkedIn posts",
    where: "31,000+ followers",
    quantities: { core: 0, growth: 8, pro: 12, elite: 16 },
  },
  {
    id: "few",
    serviceId: "frontend-world",
    label: "Front-end World publications",
    quantities: { core: 0, growth: 8, pro: 12, elite: 16 },
  },
  {
    id: "youtube",
    serviceId: "youtube",
    label: "YouTube videos",
    quantities: { core: 0, growth: 3, pro: 5, elite: 10 },
  },
  {
    id: "recipes",
    serviceId: "recipe",
    label: "Recipes – how to use Bright Data in the best way",
    quantities: { core: 0, growth: 3, pro: 4, elite: 6 },
  },
  {
    id: "banner",
    serviceId: "banner",
    label: "Bright Data banner on Kristiyan's official website",
    quantities: { core: 0, growth: 1, pro: 3, elite: 5 },
  },
  {
    id: "india",
    serviceId: "wad-india",
    label:
      "WeAreDevelopers India – brand activation (talk, T-shirt, attendees & brands)",
    quantities: { core: 0, growth: 1, pro: 1, elite: 1 },
  },
  {
    id: "workshops",
    serviceId: "workshop",
    label: "Hands-on workshops",
    quantities: { core: 0, growth: 0, pro: 1, elite: 3 },
  },
  {
    id: "talks",
    serviceId: "talk-europe",
    label: "Conference talks (e.g. React Day Berlin 2026 + 2 TBD)",
    quantities: { core: 0, growth: 0, pro: 3, elite: 5 },
  },
  {
    id: "hackathons",
    serviceId: "hackathon",
    label: "Hackathons (prize pool provided by Bright Data)",
    quantities: { core: 0, growth: 0, pro: 2, elite: 5 },
  },
  {
    id: "article-ad",
    serviceId: "article-ad",
    label: "Bright Data ad / link on every article (6 months)",
    quantities: { core: 0, growth: 0, pro: 0, elite: 6 },
  },
  {
    id: "brand",
    serviceId: "brand-activation",
    label: "Brand promotion at all other events where he speaks (est. 5)",
    quantities: { core: 0, growth: 0, pro: 0, elite: 5 },
  },
  {
    id: "collab",
    serviceId: "devrel-collab",
    label: "Collaboration campaigns with other DevRels",
    quantities: { core: 0, growth: 0, pro: 0, elite: 3 },
  },
];

export const includedInEveryPlan = [
  {
    label: "Promotion of the materials",
    value: "Included",
    where: "X.com and Medium",
    basis: "Agreement",
  },
  {
    label: "Revision rounds",
    value: "Up to 2",
    where: "Per deliverable",
    basis: "Agreement",
  },
] as const;

export type PlanQuote = {
  id: PlanId;
  monthly: number;
  list: number;
  term: number;
  saving: number;
  /** Rounded percentage, matching the workbook's 0% format. */
  savingPct: number;
  /** List value per €1 paid, rounded to 2 decimals. */
  valuePerEuro: number;
};

function listValue(id: PlanId) {
  return planLines.reduce((sum, line) => {
    return sum + serviceById(line.serviceId).price * line.quantities[id];
  }, 0);
}

function quoteFor(id: PlanId): PlanQuote {
  const monthly = plans.find((plan) => plan.id === id)?.monthly;
  if (monthly == null) throw new Error(`Unknown plan: ${id}`);
  const list = listValue(id);
  const term = monthly * TERM_MONTHS;
  const saving = list - term;
  const savingPct = list === 0 ? 0 : Math.round((saving / list) * 100);
  const valuePerEuro = term === 0 ? 0 : Math.round((list / term) * 100) / 100;
  return { id, monthly, list, term, saving, savingPct, valuePerEuro };
}

export const quotes: Record<PlanId, PlanQuote> = {
  core: quoteFor("core"),
  growth: quoteFor("growth"),
  pro: quoteFor("pro"),
  elite: quoteFor("elite"),
};

export const planOrder: PlanId[] = ["core", "growth", "pro", "elite"];

export const bestValuePlanId: PlanId = planOrder.reduce((best, id) =>
  quotes[id].valuePerEuro > quotes[best].valuePerEuro ? id : best,
);

export function previousPlanId(id: PlanId): PlanId | null {
  const index = planOrder.indexOf(id);
  return index > 0 ? planOrder[index - 1]! : null;
}

export function isNewPlanFeature(line: PlanLine, planId: PlanId): boolean {
  const quantity = line.quantities[planId];
  if (quantity === 0) return false;
  const previous = previousPlanId(planId);
  if (!previous) return false;
  return quantity > line.quantities[previous];
}

/** Cell text for the scope comparison. Zero means the plan does not include the line. */
export function compareQuantityLabel(lineId: string, quantity: number): string {
  if (quantity === 0) return "Not included";
  if (lineId === "india") return "Yes";
  if (lineId === "banner" || lineId === "article-ad") return `${quantity} mo`;
  return String(quantity);
}

function csvCell(value: string) {
  if (/[",\n\r]/.test(value)) return `"${value.replaceAll('"', '""')}"`;
  return value;
}

/** UTF-8 CSV of the scope comparison, including a BOM so Excel keeps the euro sign. */
export function scopeComparisonCsv(): string {
  const headers = [
    `Included over ${TERM_MONTHS} months`,
    "Basis",
    "Where",
    ...planOrder.map((id) => {
      const plan = plans.find((item) => item.id === id);
      const quote = quotes[id];
      const recommended = plan?.recommended ? ", recommended" : "";
      return `Plan ${plan?.number} ${plan?.name} (${formatEur(quote.monthly)}/month${recommended})`;
    }),
  ];

  const rows: string[][] = [
    ["BulgariTech × Bright Data — scope comparison"],
    ["For", identity.counterparty],
    ["From", `${identity.company} (${identity.person})`],
    ["Term", identity.termLong],
    ["Quantities", `Full ${TERM_MONTHS}-month term`],
    ["Prepared", identity.dateLabel],
    [],
    headers,
  ];

  for (const line of planLines) {
    rows.push([
      line.label,
      line.basis ?? "",
      line.where ?? serviceById(line.serviceId).unit,
      ...planOrder.map((id) => compareQuantityLabel(line.id, line.quantities[id])),
    ]);
  }

  for (const row of includedInEveryPlan) {
    rows.push([row.label, row.basis, row.where, ...planOrder.map(() => row.value)]);
  }

  rows.push([
    "Price per month",
    "",
    "",
    ...planOrder.map((id) => formatEur(quotes[id].monthly)),
  ]);
  rows.push([]);
  rows.push([
    "Hackathon prize pools are provided by Bright Data and are not in the fee. Conference fees are fee-only.",
  ]);

  return `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
}

export const scopeComparisonFilename = "BulgariTech-BrightData-scope-Nov2026-Mar2027.csv";

export function planFeatureLabel(line: PlanLine, planId: PlanId): string {
  const quantity = line.quantities[planId];
  if (quantity === 0) return line.label;
  const unit = serviceById(line.serviceId).unit;
  if (line.id === "banner") {
    return `${quantity} month${quantity === 1 ? "" : "s"} · ${line.label}`;
  }
  return `${quantity} × ${line.label.replace(/^Sponsored /, "")}`;
}

export const agreement = {
  name: "Influencer Agreement",
  pilot: "1 October – 31 December 2026",
  monthly: 5000,
  months: 3,
  deliverables: [
    {
      name: "Sponsored articles / tutorials",
      where: "Medium (proposed) + promotion on X.com and Medium",
      quantity: "4",
      basis: "Agreement + proposed",
    },
    {
      name: "Supporting GitHub demos",
      where: "GitHub — Kristiyan Velkov public repositories (proposed)",
      quantity: "3",
      basis: "Agreement + proposed",
    },
    {
      name: "Promotion of the materials",
      where: "X.com and Medium",
      quantity: "Included",
      basis: "Agreement",
    },
    {
      name: "Live online sessions",
      where:
        "Online — platform TBD, e.g. YouTube Live / LinkedIn Live (proposed)",
      quantity: "1",
      basis: "Agreement + proposed",
    },
    {
      name: "Product feedback report",
      where:
        "Not published — sent privately to Bright Data by email (proposed)",
      quantity: "1",
      basis: "Proposed",
    },
    {
      name: "Revision rounds",
      where: "Per deliverable",
      quantity: "Up to 2",
      basis: "Agreement",
    },
  ],
} as const;

export type AudienceCell = {
  display: string;
  /** Organiser figure included in the totals. Null when unpublished, shared or attendee-reported. */
  counted: number | null;
};

export type CityId =
  | "london"
  | "vilnius"
  | "gdansk"
  | "amsterdam"
  | "berlin"
  | "istanbul"
  | "sanjose"
  | "newyork"
  | "cancun"
  | "bengaluru"
  | "singapore";

export type ConferenceCity = {
  id: CityId;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

export const cities: ConferenceCity[] = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    lat: 51.51,
    lon: -0.13,
  },
  {
    id: "vilnius",
    name: "Vilnius",
    country: "Lithuania",
    lat: 54.69,
    lon: 25.28,
  },
  { id: "gdansk", name: "Gdańsk", country: "Poland", lat: 54.35, lon: 18.65 },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.37,
    lon: 4.9,
  },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lon: 13.41 },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    lat: 41.01,
    lon: 28.97,
  },
  {
    id: "sanjose",
    name: "San José",
    country: "United States",
    lat: 37.34,
    lon: -121.89,
  },
  {
    id: "newyork",
    name: "New York",
    country: "United States",
    lat: 40.71,
    lon: -74.01,
  },
  { id: "cancun", name: "Cancún", country: "Mexico", lat: 21.16, lon: -86.85 },
  {
    id: "bengaluru",
    name: "Bengaluru",
    country: "India",
    lat: 12.97,
    lon: 77.59,
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    lat: 1.35,
    lon: 103.82,
  },
];

export type SpeakingLocationGroup = {
  city: ConferenceCity;
  events: SpeakingEvent[];
};

export function inPersonSpeakingByLocation(): SpeakingLocationGroup[] {
  const map = new Map<CityId, SpeakingEvent[]>();
  for (const event of speakingEvents) {
    if (!event.cityId || event.onlineOnly) continue;
    const bucket = map.get(event.cityId) ?? [];
    bucket.push(event);
    map.set(event.cityId, bucket);
  }
  return cities
    .filter((city) => map.has(city.id))
    .map((city) => ({ city, events: map.get(city.id)! }));
}

export function speakingByCountry(): Array<{
  country: string;
  locations: SpeakingLocationGroup[];
}> {
  const groups = inPersonSpeakingByLocation();
  const map = new Map<string, SpeakingLocationGroup[]>();
  for (const group of groups) {
    const bucket = map.get(group.city.country) ?? [];
    bucket.push(group);
    map.set(group.city.country, bucket);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([country, locations]) => ({
      country,
      locations: locations.sort((a, b) =>
        a.city.name.localeCompare(b.city.name),
      ),
    }));
}

export function onlineSpeakingEvents(): SpeakingEvent[] {
  return speakingEvents.filter((event) => event.onlineOnly || !event.cityId);
}

export function eventCountByCity(cityId: CityId): number {
  return speakingEvents.filter((event) => event.cityId === cityId).length;
}

/** Short label for globe markers (no year / parentheticals). */
export function shortConferenceLabel(name: string): string {
  return name
    .replace(/\s+\d{4}(\s|$)/, " ")
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export type GlobeCityCluster = {
  cityId: CityId;
  lat: number;
  lng: number;
  name: string;
  country: string;
  conferences: string[];
  count: number;
};

/** One pin per city — conference names live on the card, not as 3D text. */
export function globeCityClusters(): GlobeCityCluster[] {
  return inPersonSpeakingByLocation().map(({ city, events }) => ({
    cityId: city.id,
    lat: city.lat,
    lng: city.lon,
    name: city.name,
    country: city.country,
    conferences: events.map((event) => shortConferenceLabel(event.name)),
    count: events.length,
  }));
}

export type SpeakingEvent = {
  id: string;
  name: string;
  year: number;
  when: string;
  place: string;
  session: string;
  inPerson: AudienceCell;
  online: AudienceCell;
  source: string;
  sourceHref?: string;
  /** Conference homepage (falls back to sourceHref when omitted). */
  websiteHref?: string;
  status: "past" | "upcoming";
  cityId?: CityId;
  onlineOnly?: boolean;
  note?: string;
};

export function conferenceWebsite(event: SpeakingEvent): string | undefined {
  return event.websiteHref ?? event.sourceHref;
}

export function conferenceLogoUrl(website?: string): string | undefined {
  if (!website) return undefined;
  try {
    const { hostname } = new URL(website);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`;
  } catch {
    return undefined;
  }
}

export function conferenceSiteLabel(website?: string): string | undefined {
  if (!website) return undefined;
  try {
    return new URL(website).hostname.replace(/^www\./, "");
  } catch {
    return website;
  }
}

const num = (value: number): AudienceCell => ({
  display: new Intl.NumberFormat("en-GB").format(value),
  counted: value,
});

const unpublished: AudienceCell = { display: "not published", counted: null };
const onlineOnly: AudienceCell = { display: "– (online only)", counted: null };

export const speakingEvents: SpeakingEvent[] = [
  {
    id: "ai-coding-2025",
    name: "AI Coding Summit 2025 (GitNation)",
    year: 2025,
    when: "23–24 Oct 2025",
    place: "Online",
    session:
      "Talk: Docker MCP – Packaging & Deploying AI Tools with Model Context Protocol",
    inPerson: onlineOnly,
    online: num(5000),
    source: "GitNation badge (via LinkedIn)",
    websiteHref: "https://gitnation.com",
    status: "past",
    onlineOnly: true,
    note: "About 5,000 registered participants, per GitNation's registration badge.",
  },
  {
    id: "docker-summit-istanbul-2025",
    name: "Docker Captains Summit Istanbul 2025",
    year: 2025,
    when: "23–25 Oct 2025",
    place: "Istanbul · in person",
    session: "Docker Captain — invited summit",
    inPerson: unpublished,
    online: unpublished,
    source: "Docker Captains programme",
    sourceHref: "https://www.docker.com/community/captains/",
    websiteHref: "https://www.docker.com/community/captains/",
    status: "past",
    cityId: "istanbul",
    note: "Invite-only Docker Captains Summit. Not a public conference talk, so it is excluded from the audience totals.",
  },
  {
    id: "react-advanced-2025",
    name: "React Advanced London 2025",
    year: 2025,
    when: "28 Nov & 1 Dec 2025",
    place: "London & Online",
    session: "Workshop: DevOps for React Developers – From Code to Production",
    inPerson: num(800),
    online: num(5000),
    source: "reactadvanced.com/2025",
    sourceHref: "https://reactadvanced.com/2025",
    websiteHref: "https://reactadvanced.com",
    status: "past",
    cityId: "london",
  },
  {
    id: "ai-coding-2026",
    name: "AI Coding Summit 2026 (GitNation)",
    year: 2026,
    when: "26–27 Feb 2026",
    place: "Online",
    session: "Talk: Security Pitfalls in AI-Generated Code",
    inPerson: onlineOnly,
    online: unpublished,
    source: "gitnation.com",
    sourceHref: "https://gitnation.com",
    websiteHref: "https://aicodingsummit.com",
    status: "past",
    onlineOnly: true,
    note: "The organiser has not published an audience figure, so this event is excluded from the totals.",
  },
  {
    id: "node-congress-2026",
    name: "Node Congress 2026",
    year: 2026,
    when: "26–27 Mar 2026",
    place: "Online",
    session:
      "Workshop: DevOps for JavaScript Developers – From Code to Production",
    inPerson: onlineOnly,
    online: num(5000),
    source: "nodecongress.com",
    sourceHref: "https://nodecongress.com",
    status: "past",
    onlineOnly: true,
  },
  {
    id: "vilnius-2026",
    name: "Vilnius AI Summit 2026",
    year: 2026,
    when: "21–23 Apr 2026",
    place: "Vilnius · in person",
    session: "Speaker",
    inPerson: { display: "1,000+ ³", counted: null },
    online: unpublished,
    source: "ai.lt speaker page",
    sourceHref: "https://ai.lt",
    status: "past",
    cityId: "vilnius",
    note: "1,000+ attendees at the 2026 edition per attendee reports. The organiser total is not published, so the figure is excluded from the totals.",
  },
  {
    id: "infoshare-2026",
    name: "Infoshare 2026",
    year: 2026,
    when: "20–21 May 2026",
    place: "Gdańsk · in person",
    session: "Talk: Security Pitfalls in AI-Generated Code (21 May)",
    inPerson: num(6000),
    online: unpublished,
    source: "infoshare.pl",
    sourceHref: "https://infoshare.pl",
    status: "past",
    cityId: "gdansk",
  },
  {
    id: "jsnation-2026",
    name: "JSNation 2026",
    year: 2026,
    when: "11 & 15 Jun 2026",
    place: "Amsterdam & Online",
    session:
      "Workshop: DevOps for Front-end Developers – From Local Code to Production",
    inPerson: num(1500),
    online: num(10000),
    source: "gitnation.com/sponsors",
    sourceHref: "https://gitnation.com/sponsors",
    websiteHref: "https://jsnation.com",
    status: "past",
    cityId: "amsterdam",
    note: "The co-located TechLead Conf and Web Engineering Summit audiences are counted once, here.",
  },
  {
    id: "techlead-2026",
    name: "TechLead Conf Amsterdam 2026",
    year: 2026,
    when: "11 Jun 2026",
    place: "Amsterdam",
    session:
      "Talk: Training Engineers for AI Without Turning Them into Prompt Monkeys",
    inPerson: { display: "1,500 ⁴", counted: null },
    online: { display: "– ⁴", counted: null },
    source: "gitnation.com/sponsors",
    sourceHref: "https://gitnation.com/sponsors",
    websiteHref: "https://techleadconf.com",
    status: "past",
    cityId: "amsterdam",
    note: "Co-located with JSNation 2026 on the same day and venue. Shared audience, shown for reference and counted once under JSNation.",
  },
  {
    id: "webeng-2026",
    name: "Web Engineering Summit 2026",
    year: 2026,
    when: "11 & 15 Jun 2026",
    place: "Amsterdam & Online",
    session:
      "Workshop: DevOps for Front-end Developers – From Local Code to Production",
    inPerson: { display: "1,500 ⁴", counted: null },
    online: { display: "10,000 ⁴", counted: null },
    source: "webengineeringsummit.com",
    sourceHref: "https://webengineeringsummit.com",
    status: "past",
    cityId: "amsterdam",
    note: "Co-located with JSNation 2026 on the same day and venue. Shared audience, shown for reference and counted once under JSNation.",
  },
  {
    id: "react-summit-2026",
    name: "React Summit 2026",
    year: 2026,
    when: "12 & 16 Jun 2026",
    place: "Amsterdam & Online",
    session:
      "Workshop: DevOps for Front-end Developers – From Local Code to Production",
    inPerson: num(1500),
    online: num(10000),
    source: "reactsummit.com",
    sourceHref: "https://reactsummit.com",
    status: "past",
    cityId: "amsterdam",
  },
  {
    id: "wad-berlin-2026",
    name: "WeAreDevelopers World Congress 2026",
    year: 2026,
    when: "8–10 Jul 2026",
    place: "Berlin · in person",
    session: "Speaker",
    inPerson: num(15000),
    online: unpublished,
    source: "Press release (GlobeNewswire)",
    websiteHref: "https://www.wearedevelopers.com/world-congress",
    status: "past",
    cityId: "berlin",
  },
  {
    id: "wad-na-2026",
    name: "WeAreDevelopers World Congress North America 2026",
    year: 2026,
    when: "23–25 Sep 2026",
    place: "San José, CA · in person",
    session: "Speaker",
    inPerson: num(10000),
    online: unpublished,
    source: "wearedevelopers.com press",
    sourceHref: "https://wearedevelopers.com",
    status: "past",
    cityId: "sanjose",
  },
  {
    id: "docker-summit-mexico-2026",
    name: "Docker Captains Summit Mexico 2026",
    year: 2026,
    when: "5–10 Oct 2026",
    place: "Cancún · in person",
    session: "Docker Captain — invited summit",
    inPerson: unpublished,
    online: unpublished,
    source: "Docker Captains programme",
    sourceHref: "https://www.docker.com/community/captains/",
    websiteHref: "https://www.docker.com/community/captains/",
    status: "past",
    cityId: "cancun",
    note: "Invite-only Docker Captains Summit. Not a public conference talk, so it is excluded from the audience totals.",
  },
  {
    id: "react-advanced-2026",
    name: "React Advanced London 2026",
    year: 2026,
    when: "23 & 26 Oct 2026",
    place: "London & Online",
    session:
      "Workshop (remote): DevOps for React Developers – From Code to Production",
    inPerson: num(800),
    online: num(5000),
    source: "reactadvanced.com",
    sourceHref: "https://reactadvanced.com",
    websiteHref: "https://reactadvanced.com",
    status: "past",
    cityId: "london",
  },
  {
    id: "jsnation-us-2026",
    name: "JSNation US 2026",
    year: 2026,
    when: "16 & 19 Nov 2026",
    place: "New York & Online",
    session: "Talk: Security Pitfalls in AI-Generated Code",
    inPerson: num(700),
    online: unpublished,
    source: "jsnation.us",
    sourceHref: "https://jsnation.us",
    status: "upcoming",
    cityId: "newyork",
  },
  {
    id: "react-summit-us-2026",
    name: "React Summit US 2026",
    year: 2026,
    when: "17 & 20 Nov 2026",
    place: "New York & Online",
    session:
      "Talk: React Won't Save You – Front-End Security Mistakes We Keep Shipping",
    inPerson: num(800),
    online: num(10000),
    source: "reactsummit.us",
    sourceHref: "https://reactsummit.us",
    status: "upcoming",
    cityId: "newyork",
  },
  {
    id: "wad-india-2026",
    name: "WeAreDevelopers Conference India 2026",
    year: 2026,
    when: "25–26 Nov 2026",
    place: "Bengaluru · in person",
    session: "Speaker",
    inPerson: num(3000),
    online: unpublished,
    source: "wearedevelopers.com",
    sourceHref: "https://wearedevelopers.com",
    status: "upcoming",
    cityId: "bengaluru",
  },
  {
    id: "react-day-berlin-2026",
    name: "React Day Berlin 2026",
    year: 2026,
    when: "4 & 8 Dec 2026",
    place: "Berlin & Online",
    session:
      "Talk: Beyond the Prompt – Production-Ready AI Features in Full-Stack React",
    inPerson: num(800),
    online: num(5000),
    source: "reactday.berlin",
    sourceHref: "https://reactday.berlin",
    status: "upcoming",
    cityId: "berlin",
  },
  {
    id: "ai-coding-berlin-2026",
    name: "AI Coding Summit Berlin 2026 (GitNation)",
    year: 2026,
    when: "4 & 7 Dec 2026",
    place: "Berlin & Online",
    session:
      "Workshop: Building Production-Ready React Applications with Cursor AI",
    inPerson: num(500),
    online: num(5000),
    source: "aicodingsummit.com/berlin",
    sourceHref: "https://aicodingsummit.com/berlin",
    websiteHref: "https://aicodingsummit.com/berlin",
    status: "upcoming",
    cityId: "berlin",
  },
  {
    id: "react-summit-asia-2027",
    name: "React Summit Asia 2027",
    year: 2027,
    when: "22 Mar 2027",
    place: "Singapore · in person",
    session: "Speaker (slot reserved)",
    inPerson: num(1000),
    online: unpublished,
    source: "gitnation.com/landings/react-summit",
    sourceHref: "https://gitnation.com/landings/react-summit",
    websiteHref: "https://gitnation.com/landings/react-summit",
    status: "upcoming",
    cityId: "singapore",
    note: "The biggest React conference in Asia. 30+ speakers. Organiser-stated audience of 1,000.",
  },
  {
    id: "vilnius-2027",
    name: "Vilnius AI Summit 2027",
    year: 2027,
    when: "15–16 Apr 2027",
    place: "Vilnius · in person",
    session: "Speaker (slot reserved)",
    inPerson: { display: "1,000+ ³", counted: null },
    online: unpublished,
    source: "ai.lt",
    sourceHref: "https://ai.lt",
    status: "upcoming",
    cityId: "vilnius",
    note: "Slot reserved. The figure shown is the 2026 attendee-reported total. It is excluded from the totals. Outside the Nov 2026 – Mar 2027 term.",
  },
];

function sumCounted(
  status: "past" | "upcoming" | "all",
  field: "inPerson" | "online",
) {
  return speakingEvents.reduce((sum, event) => {
    if (status !== "all" && event.status !== status) return sum;
    return sum + (event[field].counted ?? 0);
  }, 0);
}

export const audience = {
  pastInPerson: sumCounted("past", "inPerson"),
  pastOnline: sumCounted("past", "online"),
  upcomingInPerson: sumCounted("upcoming", "inPerson"),
  upcomingOnline: sumCounted("upcoming", "online"),
  get pastCombined() {
    return this.pastInPerson + this.pastOnline;
  },
  get upcomingCombined() {
    return this.upcomingInPerson + this.upcomingOnline;
  },
  get allInPerson() {
    return this.pastInPerson + this.upcomingInPerson;
  },
  get allOnline() {
    return this.pastOnline + this.upcomingOnline;
  },
  get allCombined() {
    return this.pastCombined + this.upcomingCombined;
  },
  pastEvents: speakingEvents.filter((event) => event.status === "past").length,
  upcomingEvents: speakingEvents.filter((event) => event.status === "upcoming")
    .length,
  events2026: speakingEvents.filter((event) => event.year === 2026).length,
};

export const speakingNotes = [
  "In-person and online figures are event-wide audiences as published by the organisers (in-person attendees and registered remote/online participants), not session head-counts.",
  "Online audiences of GitNation events overlap.",
  "Totals count published organiser figures only. Shared audiences, unpublished figures and the attendee-reported Vilnius totals are excluded.",
  "³ Vilnius AI Summit: 1,000+ attendees at the 2026 edition per attendee reports (organiser total not published; 2027 shows the 2026 figure). AI Coding Summit 2025: about 5,000 registered participants per GitNation's registration badge.",
  "⁴ Co-located with JSNation 2026 on the same day and venue (Amsterdam, 11 June) — shared audience, shown for reference and counted once under JSNation.",
  "“not published” means the organiser does not state a figure. Figures without a marker are stated for that edition.",
] as const;

export type PublishTier = "core" | "growth" | "addon" | "pilot";

export type PublishItem = {
  date: string;
  deliverable: string;
  topic: string;
  channels: string;
  promotion: string;
  tier: PublishTier;
  status: string;
};

export const pilotDelivery: PublishItem = {
  date: "2026-10-30",
  deliverable: "Pilot article #1 + GitHub demo #1",
  topic: "(delivered in October – before this 5-month term)",
  channels: "Medium · GitHub",
  promotion: "X.com + Medium",
  tier: "pilot",
  status: "Delivered (assumed – confirm)",
};

export const publishingItems: PublishItem[] = [
  {
    date: "2026-11-10",
    deliverable: "Article / tutorial 1 of 4 (Core)",
    topic:
      "Scraping JavaScript-heavy sites with Bright Data Scraping Browser + Playwright",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Planned · draft to Bright Data by Thu 5 Nov",
  },
  {
    date: "2026-11-10",
    deliverable: "GitHub demo 1 of 3 (Core)",
    topic: "scraping-browser-playwright-starter (TypeScript)",
    channels: "GitHub",
    promotion: "X.com",
    tier: "core",
    status: "Planned · shared with the article draft",
  },
  {
    date: "2026-11-16",
    deliverable: "Live session 1 of 2 – announcement",
    topic: "Announcement post",
    channels: "X.com, Medium",
    promotion: "X.com + Medium",
    tier: "core",
    status: "Planned",
  },
  {
    date: "2026-11-17",
    deliverable: "WeAreDevelopers India – pre-event post 1",
    topic:
      "Speaking at WeAreDevelopers India – what I'll show with Bright Data",
    channels: "X.com, LinkedIn",
    promotion: "X.com + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-18",
    deliverable: "Article / tutorial 2 of 12 (Plan 2 extra)",
    topic: "Web Scraper API: structured data from popular sites in minutes",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Fri 13 Nov",
  },
  {
    date: "2026-11-19",
    deliverable: "Live online session 1 of 2",
    topic:
      "Give your AI agent the web: Bright Data MCP Server + LLM, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X.com + Medium",
    tier: "core",
    status: "Planned · agenda to Bright Data by Mon 16 Nov",
  },
  {
    date: "2026-11-23",
    deliverable: "WeAreDevelopers India – pre-event post 2",
    topic: "“See you in Bengaluru” – session time, Bright Data mention",
    channels: "X.com, LinkedIn",
    promotion: "X.com + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-25",
    deliverable: "WeAreDevelopers India – brand activation, day 1",
    topic:
      "Talk + Bright Data T-shirt + conversations with attendees and brands; live posts",
    channels: "On site – BIEC, Bengaluru",
    promotion: "X.com + LinkedIn (live)",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-26",
    deliverable: "WeAreDevelopers India – brand activation, day 2",
    topic: "On-site networking with attendees and brands; live posts",
    channels: "On site – BIEC, Bengaluru",
    promotion: "X.com + LinkedIn (live)",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-30",
    deliverable: "WeAreDevelopers India – post-event recap",
    topic: "Recap: talk highlights, slides, Bright Data links",
    channels: "X.com, LinkedIn, Medium",
    promotion: "X.com + LinkedIn + Medium",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-12-01",
    deliverable: "Article / tutorial 2 of 4 (Core)",
    topic:
      "Web Unlocker in practice: reliable data from protected e-commerce sites",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status:
      "Planned · draft to Bright Data by Fri 20 Nov (early – conference travel)",
  },
  {
    date: "2026-12-01",
    deliverable: "React Day Berlin – pre-event post 1",
    topic:
      "Speaking at React Day Berlin – production-ready AI features in React",
    channels: "X.com, LinkedIn",
    promotion: "X.com + LinkedIn",
    tier: "addon",
    status:
      "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-03",
    deliverable: "React Day Berlin – pre-event post 2",
    topic: "“See you in Berlin” – session time, Bright Data mention",
    channels: "X.com, LinkedIn",
    promotion: "X.com + LinkedIn",
    tier: "addon",
    status:
      "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-04",
    deliverable: "React Day Berlin 2026 – conference",
    topic:
      "Talk “Beyond the Prompt…” + Bright Data T-shirt + on-site promotion (talk slot TBC)",
    channels: "Berlin & Online",
    promotion: "X.com + LinkedIn (live)",
    tier: "addon",
    status:
      "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-07",
    deliverable: "React Day Berlin 2026 – final day",
    topic: "On-site / online promotion; live posts",
    channels: "Berlin & Online",
    promotion: "X.com + LinkedIn (live)",
    tier: "addon",
    status:
      "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-09",
    deliverable: "React Day Berlin – post-event recap",
    topic: "Recap: talk highlights, slides, Bright Data links",
    channels: "X.com, LinkedIn, Medium",
    promotion: "X.com + LinkedIn + Medium",
    tier: "addon",
    status:
      "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-10",
    deliverable: "Article / tutorial 3 of 4 (Core)",
    topic:
      "Real-time search data for apps and agents with Bright Data SERP API",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status:
      "Planned · draft to Bright Data by Thu 3 Dec (early – conference travel)",
  },
  {
    date: "2026-12-10",
    deliverable: "GitHub demo 2 of 3 (Core)",
    topic: "serp-api-nextjs-demo",
    channels: "GitHub",
    promotion: "X.com",
    tier: "core",
    status: "Planned · shared with the article draft",
  },
  {
    date: "2026-12-10",
    deliverable: "Live session 2 of 2 – announcement",
    topic: "Announcement post",
    channels: "X.com, Medium",
    promotion: "X.com + Medium",
    tier: "core",
    status: "Planned",
  },
  {
    date: "2026-12-15",
    deliverable: "Live online session 2 of 2",
    topic:
      "From raw web to insights: Web Scraper API + Datasets, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X.com + Medium",
    tier: "core",
    status: "Planned · agenda to Bright Data by Thu 10 Dec",
  },
  {
    date: "2026-12-17",
    deliverable: "Article / tutorial 5 of 12 (Plan 2 extra)",
    topic:
      "Choosing the right Bright Data proxy: residential vs datacenter vs ISP",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 14 Dec",
  },
  {
    date: "2026-12-18",
    deliverable: "Product feedback report (Core)",
    topic: "DX, docs and onboarding findings + prioritised recommendations",
    channels: "Private – email to Bright Data",
    promotion: "—",
    tier: "core",
    status: "Planned · not published",
  },
  {
    date: "2026-12-21",
    deliverable: "Mid-term review call",
    topic: "Results so far + Jan–Mar content calendar",
    channels: "Call with Bright Data",
    promotion: "—",
    tier: "core",
    status: "Planned",
  },
  {
    date: "2027-01-04",
    deliverable: "Website banner (1 month: 4 – 29 Jan 2027)",
    topic: "Bright Data banner on Kristiyan's official website",
    channels: "Official website",
    promotion: "—",
    tier: "growth",
    status: "Proposed – Plan 2",
  },
  {
    date: "2027-01-12",
    deliverable: "Article / tutorial 4 of 4 (Core)",
    topic: "Getting started with the Bright Data MCP Server for AI agents",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status:
      "Proposed – draft to Bright Data by Thu 7 Jan · requires amendment/renewal",
  },
  {
    date: "2027-01-12",
    deliverable: "GitHub demo 3 of 3 (Core)",
    topic: "bright-data-mcp-agent-starter (Next.js + MCP)",
    channels: "GitHub",
    promotion: "X.com",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
  {
    date: "2027-01-14",
    deliverable: "Recipe 1 of 2 – best way to use Bright Data",
    topic: "Turn any page into LLM-ready Markdown with Web Unlocker",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 11 Jan",
  },
  {
    date: "2027-01-21",
    deliverable: "YouTube video 1 of 3",
    topic: "Build a web-browsing AI agent in 20 minutes with Bright Data MCP",
    channels: "YouTube",
    promotion: "X.com + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 18 Jan",
  },
  {
    date: "2027-01-26",
    deliverable: "Article / tutorial 7 of 12 (Plan 2 extra)",
    topic: "RAG with fresh web data: Web Unlocker → Markdown → vector DB",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 21 Jan",
  },
  {
    date: "2027-02-09",
    deliverable: "Article / tutorial 8 of 12 (Plan 2 extra)",
    topic: "Price monitoring with Web Scraper API – no scraper maintenance",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 4 Feb",
  },
  {
    date: "2027-02-09",
    deliverable: "GitHub demo 4 of 5 (Plan 2 extra)",
    topic: "price-tracker-nextjs (Web Scraper API + cron)",
    channels: "GitHub",
    promotion: "X.com",
    tier: "growth",
    status: "Proposed – Plan 2",
  },
  {
    date: "2027-02-15",
    deliverable: "Live session 3 of 3 – announcement (Plan 2 extra)",
    topic: "Announcement post",
    channels: "X.com, Medium",
    promotion: "X.com + Medium",
    tier: "growth",
    status: "Proposed – Plan 2",
  },
  {
    date: "2027-02-18",
    deliverable: "Live online session 3 of 3 (Plan 2 extra)",
    topic: "E-commerce data pipelines end-to-end, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X.com + Medium",
    tier: "growth",
    status: "Proposed – Plan 2 · agenda to Bright Data by Mon 15 Feb",
  },
  {
    date: "2027-02-23",
    deliverable: "Article / tutorial 9 of 12 (Plan 2 extra)",
    topic: "Datasets vs scraping: when to use ready-made Bright Data datasets",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 18 Feb",
  },
  {
    date: "2027-02-25",
    deliverable: "YouTube video 2 of 3",
    topic: "Build a price tracker with Web Scraper API + Next.js",
    channels: "YouTube",
    promotion: "X.com + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 22 Feb",
  },
  {
    date: "2027-03-02",
    deliverable: "Article / tutorial 10 of 12 (Plan 2 extra)",
    topic: "SERP API for developers: rank tracking in TypeScript",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 25 Feb",
  },
  {
    date: "2027-03-11",
    deliverable: "Recipe 2 of 2 – best way to use Bright Data",
    topic: "Geo-targeted SERP results for 10 countries with SERP API + proxies",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 8 Mar",
  },
  {
    date: "2027-03-16",
    deliverable: "Article / tutorial 11 of 12 (Plan 2 extra)",
    topic: "Scaling scrapers responsibly: rate limits, retries and compliance",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 11 Mar",
  },
  {
    date: "2027-03-23",
    deliverable: "Article / tutorial 12 of 12 (Plan 2 extra)",
    topic: "From prototype to production: monitoring Bright Data jobs",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X.com + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 18 Mar",
  },
  {
    date: "2027-03-23",
    deliverable: "GitHub demo 5 of 5 (Plan 2 extra)",
    topic: "serp-rank-tracker (SERP API + Postgres)",
    channels: "GitHub",
    promotion: "X.com",
    tier: "growth",
    status: "Proposed – Plan 2",
  },
  {
    date: "2027-03-25",
    deliverable: "YouTube video 3 of 3",
    topic: "SERP API: build an SEO rank tracker live",
    channels: "YouTube",
    promotion: "X.com + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 22 Mar",
  },
  {
    date: "2027-03-29",
    deliverable: "Product feedback report 2 of 2 (Plan 2 extra)",
    topic: "Term findings + recommendations",
    channels: "Private – email to Bright Data",
    promotion: "—",
    tier: "growth",
    status: "Proposed – Plan 2",
  },
];

export const publishingMonths = [
  {
    id: "2026-11",
    label: "November",
    yearLabel: "2026",
    year: 2026,
    month: 10,
  },
  {
    id: "2026-12",
    label: "December",
    yearLabel: "2026",
    year: 2026,
    month: 11,
  },
  { id: "2027-01", label: "January", yearLabel: "2027", year: 2027, month: 0 },
  { id: "2027-02", label: "February", yearLabel: "2027", year: 2027, month: 1 },
  { id: "2027-03", label: "March", yearLabel: "2027", year: 2027, month: 2 },
] as const;

export const tierMeta: Record<PublishTier, { label: string; hint: string }> = {
  core: {
    label: "Plan 1 · Core",
    hint: "Nov–Dec under the existing agreement. Jan–Mar needs an amendment.",
  },
  growth: {
    label: "Plan 2 · Growth",
    hint: "Included when you choose Plan 2 or higher. Otherwise an add-on.",
  },
  addon: {
    label: "Additional service",
    hint: "Written approval required. React Day Berlin is included in Plan 3+.",
  },
  pilot: {
    label: "Pilot",
    hint: "Before this five-month term.",
  },
};

export const publishingIntro = {
  title: "Publishing plan — recommended Plan 2, Nov 2026 – Mar 2027",
  body: "Shows the Plan 1 (Core) signed scope — 4 articles, 3 demos, 2 live sessions and 1 report — plus Plan 2 extras (8 articles, 5 demos, 8 Front-end World publications and 8 LinkedIn posts). Drafts are emailed to Bright Data about 3 business days before publishing for acceptance. Topics are proposed working titles. Weekdays only; no publishing 24 Dec – 1 Jan.",
} as const;

export const bonus = {
  deadlineLabel: "15 November 2026",
  deadlineIso: "2026-11-15",
  recipeValue: 2000,
  items: [
    {
      title: "One Recipe, free",
      detail:
        "1 additional Recipe at no charge (list value €1,200), on top of the plan you choose.",
    },
    {
      title: "Five business days from a launch",
      detail:
        "Priority turnaround: content about new Bright Data launches published within 5 business days of the launch, subject to Bright Data's acceptance.",
    },
    {
      title: "Exclusivity holds",
      detail:
        "No paid promotion of the 10 listed competitors for the whole 5-month term, plus 3 months, as in the agreement.",
    },
  ],
} as const;

export const heroRoles = [
  "DevRel",
  "Tech Speaker",
  "Docker Captain",
  "SpaceX AI Ambassador",
  "AI & Security",
  "Front-end & DevOps",
  "Book Author & Blogger",
] as const;

export const heroStats = [
  {
    value: "250,000",
    label: "people reached annually",
    detail: "Front-end World newsletter",
    social: socialLinks.frontendWorld,
  },
  {
    value: "31,000",
    label: "LinkedIn followers",
    detail: "professional network",
    social: socialLinks.linkedin,
  },
  {
    value: "7,000+",
    label: "Medium followers",
    detail: "technical writing",
    social: socialLinks.medium,
  },
  {
    value: "3,000+",
    label: "Front-end World followers",
    detail: "community",
    social: socialLinks.frontendWorld,
  },
  {
    value: "100,000+",
    label: "conference reach",
    detail: "in-person and online across major stages",
    social: { label: "Speaking track record", href: "/#speaking" },
  },
  {
    value: "13+",
    label: "IT conferences",
    detail: "including the largest European developer events",
    social: { label: "See conferences", href: "/conferences" },
  },
] as const;

export const whySection = {
  lede: "Developer relations engineer, international speaker, and author — reaching engineers through stages, newsletters, and code they can run the same day.",
  onStage: {
    headline: "13+ major IT conferences",
    summary:
      "100,000+ people reached across in-person and online stages at Europe’s largest developer events — plus 250,000 readers annually through the Front-end World newsletter.",
    highlights: [
      "GitNation portfolio: React Summit, JSNation, AI Coding Summit, TestJS Summit and related stages",
      "Mix of keynotes, workshops, and live coding — web data, AI, React, TypeScript, and platform engineering",
      "Audiences counted from organiser-published totals (in-person and registered online), not session head-counts",
    ] as const,
  },
  whatShips: {
    lead: "Bright Data gets teachable assets — not slideware. Every major deliverable is built so a developer can fork, run, and adapt it.",
    items: [
      "Runnable GitHub repositories linked from every article, recipe, and demo",
      "Medium tutorials, Front-end World publication, and LinkedIn distribution under Plan 2",
      "YouTube walkthroughs, live sessions, and short clips for social channels",
      "Conference talks and workshops with Q&A tuned to data extraction and developer tooling",
      "Office hours and async support so teams can unblock integration questions",
    ] as const,
  },
  exclusivity: {
    lead: "For the full term of this agreement, Kristiyan will not accept paid promotional work for direct competitors in the web data / proxy category:",
    note: "Organic mentions, comparisons in educational content, and impartial technical coverage remain fine — paid endorsements and sponsorships for these brands do not.",
  },
} as const;

export const reach = [
  {
    figure: "31K+",
    label: "LinkedIn followers",
    detail: "Daily posts on AI, front-end, and developer tooling",
    social: socialLinks.linkedin,
  },
  {
    figure: "7K+",
    label: "Medium followers",
    detail: "Long-form tutorials and technical deep dives",
    social: socialLinks.medium,
  },
  {
    figure: "3K+",
    label: "Front-end World followers",
    detail: "Community around the newsletter and publication",
    social: socialLinks.frontendWorld,
  },
  {
    figure: "250K+",
    label: "newsletter reach / year",
    detail: "Front-end World — editorial reach to front-end engineers",
    social: socialLinks.frontendWorld,
  },
] as const;

export const credentials = [
  {
    label: "DevRel",
    headline: "Professional with strong technical knowledge",
    detail:
      "AI, application security, front-end, DevOps, React, TypeScript, and Docker. Launch narratives, demo apps, and education tracks designed for engineers evaluating Bright Data — from first API call to production patterns.",
  },
  {
    label: "Stage",
    headline: "International tech speaker",
    detail:
      "Regular slots at major IT conferences across Europe and online — workshops and talks where audiences expect working code, not marketing decks. Biggest IT events, including WeAreDevelopers.",
  },
  {
    label: "Community",
    headline: "Docker Captain · SpaceX AI Ambassador",
    detail:
      "Trusted in vendor-neutral communities: Docker’s captain programme and SpaceX’s AI ambassador network — credibility that transfers to partner launches.",
  },
  {
    label: "Books",
    headline: "4 published technical books",
    detail:
      "Mastering React.js Interviews, Mastering TypeScript Core Utility Types, and Docker for React.js Developers — sold to thousands of people. Long-form teaching at scale, not slideware.",
    links: [
      { label: "kristiyanvelkov.com", href: "https://kristiyanvelkov.com/" },
      { label: "dockerfrontend.com", href: "https://dockerfrontend.com/" },
    ],
  },
  {
    label: "Practice",
    headline: "Principal Front-end Developer",
    detail:
      "AI, application security, and DevOps-minded delivery — the same person who writes the talk also ships the repo and the integration.",
  },
] as const;

const eur = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurExact = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const grouped = new Intl.NumberFormat("en-GB");

export function formatEur(value: number) {
  return eur.format(value);
}

export function formatEurExact(value: number) {
  return eurExact.format(value);
}

export function formatNumber(value: number) {
  return grouped.format(value);
}

export function mailtoForPlan(id: PlanId) {
  const plan = plans.find((item) => item.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  const quote = quotes[id];
  const subject = `BulgariTech × Bright Data — Plan ${plan.number} ${plan.name} (Nov 2026 – Mar 2027)`;
  const body = [
    "Hello,",
    "",
    `We would like to proceed with Plan ${plan.number} – ${plan.name} (${formatEur(quote.monthly)} per month, November 2026 – March 2027, ${formatEur(quote.term)} for the term).`,
    "",
    "Please send the next steps, including an amendment for any term beyond 31 December 2026.",
    "",
    "Thank you.",
  ].join("\n");
  return `mailto:${identity.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const terminalScript = [
  { kind: "cmd" as const, text: "npx brightdata partner --plan=growth" },
  { kind: "out" as const, text: "resolving BulgariTech partnership…" },
  {
    kind: "out" as const,
    text: `plan 2 · growth · ${formatEur(quotes.growth.monthly)}/month`,
  },
  {
    kind: "out" as const,
    text: `list ${formatEur(quotes.growth.list)} · term ${formatEur(quotes.growth.term)} · save ${quotes.growth.savingPct}%`,
  },
  {
    kind: "out" as const,
    text: `value per €1 · ${quotes.growth.valuePerEuro.toFixed(2)} · best of four plans`,
  },
  { kind: "out" as const, text: "bonus window open until 15 Nov 2026" },
  { kind: "ok" as const, text: "ready." },
];

export function projectCity(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  };
}

/** Equirectangular viewBox `0 0 360 180` — matches `public/world-equirectangular.jpg`. */
export function projectCityViewBox(lat: number, lon: number) {
  return { x: lon + 180, y: 90 - lat };
}

export function monthCells(year: number, monthIndex: number) {
  const first = new Date(Date.UTC(year, monthIndex, 1));
  const lead = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: days }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function isoDate(year: number, monthIndex: number, day: number) {
  const month = String(monthIndex + 1).padStart(2, "0");
  const date = String(day).padStart(2, "0");
  return `${year}-${month}-${date}`;
}
