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

export const profiles = [
  { label: "X", href: "https://x.com/krisvelkov" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/kristiyan-velkov-763130b3/",
  },
  { label: "Medium", href: "https://medium.com/@kristiyanvelkov" },
  { label: "Website", href: "https://kristiyanvelkov.com/" },
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

export const meta = {
  title:
    "BulgariTech × Bright Data — DevRel Partnership Proposal (Nov 2026 – Mar 2027)",
  shortTitle: "BulgariTech × Bright Data — DevRel Proposal",
  description:
    "Proposal from Kristiyan Velkov and BulgariTech EOOD to put Bright Data in front of 100,000+ developers from November 2026 to March 2027. Four cumulative plans from €5,000 to €20,000 a month. Plan 2, Growth, is the best value.",
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
    blurb: "YouTube walkthroughs, native LinkedIn video and short clips.",
  },
  {
    id: "Social & website",
    blurb: "Distribution beyond the article itself.",
  },
  {
    id: "Live sessions & events",
    blurb: "Webinars, workshops, talks, meetups and AMAs. Conference fees are fee-only.",
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
    price: 1500,
    category: "Content",
  },
  {
    id: "recipe",
    name: "Recipe",
    description: "Practical guide: a real problem and how to solve it with Bright Data.",
    unit: "per recipe",
    price: 1200,
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
    description: "Update of a published article to keep it current and ranking.",
    unit: "per article",
    price: 600,
    category: "Content",
  },
  {
    id: "bulgarian",
    name: "Bulgarian translation",
    description: "Bulgarian adaptation of an article for the local audience.",
    unit: "per article",
    price: 700,
    category: "Content",
  },
  {
    id: "youtube",
    name: "YouTube video",
    description: "Dedicated 10–20 min tutorial / walkthrough.",
    unit: "per video",
    price: 3000,
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
    id: "clips",
    name: "Short clips pack",
    description: "3 short vertical clips (LinkedIn / X / Shorts).",
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
    price: 750,
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
    price: 4000,
    category: "Partnership & community",
  },
  {
    id: "brand-activation",
    name: "Conference brand activation",
    description:
      "Bright Data T-shirt, mentions, on-site networking and social posts at an event where Kristiyan speaks.",
    unit: "per event",
    price: 2000,
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
    price: 1000,
    category: "Partnership & community",
  },
  {
    id: "pakli",
    name: "Pakli.bg case study",
    description: "Integration of 3 Bright Data scrapers into Pakli.bg + case study.",
    unit: "per project",
    price: 7500,
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
      "The signed pilot rate, scaled across the five-month term: more articles, demos, live sessions and a second feedback report.",
    includes: "The baseline. Everything above this is added on top.",
    adds: [
      "7 sponsored articles / tutorials on Medium",
      "5 supporting GitHub demos",
      "3 live online sessions",
      "2 product feedback reports, sent privately",
      "Promotion on X and Medium",
      "Up to 2 revision rounds per deliverable",
    ],
  },
  {
    id: "growth",
    number: 2,
    name: "Growth",
    kicker: "Recommended",
    monthly: 10000,
    recommended: true,
    summary:
      "The best list-value per euro. Core, plus distribution, video, recipes, a month on the homepage, and Bengaluru.",
    includes: "Everything in Core, plus:",
    adds: [
      "12 articles in total (5 more than Core)",
      "LinkedIn publishing of every article",
      "Front-end World publication of every article",
      "3 YouTube videos",
      "2 Recipes — how to use Bright Data well",
      "1 month banner on kristiyanvelkov.com",
      "WeAreDevelopers India brand activation, 25–26 Nov 2026",
    ],
  },
  {
    id: "pro",
    number: 3,
    name: "Pro",
    kicker: "Stage & workshops",
    monthly: 15000,
    recommended: false,
    summary:
      "Growth, plus hands-on workshops, three conference talks and two hackathons. The banner runs for three months in total.",
    includes: "Everything in Growth, plus:",
    adds: [
      "3 hands-on workshops",
      "3 conference talks (React Day Berlin 2026 + 2 in 2027, TBD)",
      "2 hackathons — prize pools provided by Bright Data",
      "Website banner for 3 months in total",
    ],
  },
  {
    id: "elite",
    number: 4,
    name: "Elite",
    kicker: "Strategic partner",
    monthly: 20000,
    recommended: false,
    summary:
      "Pro, with Bright Data present for the whole term: every article, every stage he is already on, and a third hackathon.",
    includes: "Everything in Pro, plus:",
    adds: [
      "Banner on kristiyanvelkov.com for the whole 5-month term",
      "Bright Data link on every article for 6 months",
      "Brand promotion at all other events where he speaks (est. 5)",
      "3 collaboration campaigns with other DevRels",
      "3 hackathons in total — prizes provided by Bright Data",
    ],
  },
];

export type PlanLine = {
  id: string;
  serviceId: string;
  label: string;
  quantities: Record<PlanId, number>;
};

/** Absolute quantities over the 5-month term. Each plan includes the previous one. */
export const planLines: PlanLine[] = [
  {
    id: "articles",
    serviceId: "article",
    label: "Sponsored articles / tutorials (Medium)",
    quantities: { core: 7, growth: 12, pro: 12, elite: 12 },
  },
  {
    id: "demos",
    serviceId: "github-demo",
    label: "Supporting GitHub demos",
    quantities: { core: 5, growth: 5, pro: 5, elite: 5 },
  },
  {
    id: "sessions",
    serviceId: "webinar",
    label: "Live online sessions",
    quantities: { core: 3, growth: 3, pro: 3, elite: 3 },
  },
  {
    id: "reports",
    serviceId: "feedback-report",
    label: "Product feedback reports",
    quantities: { core: 2, growth: 2, pro: 2, elite: 2 },
  },
  {
    id: "linkedin",
    serviceId: "linkedin-post",
    label: "LinkedIn publishing / promotion of each article",
    quantities: { core: 0, growth: 12, pro: 12, elite: 12 },
  },
  {
    id: "few",
    serviceId: "frontend-world",
    label: "Front-end World publication of each article",
    quantities: { core: 0, growth: 12, pro: 12, elite: 12 },
  },
  {
    id: "youtube",
    serviceId: "youtube",
    label: "YouTube videos",
    quantities: { core: 0, growth: 3, pro: 3, elite: 3 },
  },
  {
    id: "recipes",
    serviceId: "recipe",
    label: "Recipes – how to use Bright Data in the best way",
    quantities: { core: 0, growth: 2, pro: 2, elite: 2 },
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
    label: "WeAreDevelopers India – brand activation (talk, T-shirt, attendees & brands)",
    quantities: { core: 0, growth: 1, pro: 1, elite: 1 },
  },
  {
    id: "workshops",
    serviceId: "workshop",
    label: "Hands-on workshops",
    quantities: { core: 0, growth: 0, pro: 3, elite: 3 },
  },
  {
    id: "talks",
    serviceId: "talk-europe",
    label: "Conference talks (e.g. React Day Berlin 2026 + 2 TBD)",
    quantities: { core: 0, growth: 0, pro: 3, elite: 3 },
  },
  {
    id: "hackathons",
    serviceId: "hackathon",
    label: "Hackathons (prize pool provided by Bright Data)",
    quantities: { core: 0, growth: 0, pro: 2, elite: 3 },
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
  { label: "Promotion on X and Medium", value: "Included" },
  { label: "Revision rounds per deliverable", value: "Up to 2" },
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

export const planNotes = [
  "Plan 1 – Core is the existing agreement scope and rate (€5,000/month) scaled to 5 months: the pilot rate of 4 articles, 3 demos, 2 sessions and 1 report per 3 months becomes 7 articles, 5 demos, 3 sessions and 2 reports (rounded). November–December 2026 is covered by the signed agreement; the term beyond 31 December 2026 requires an amendment or renewal.",
  "Plan 2 – Growth adds 5 more articles (12 in total), LinkedIn publishing and Front-end World publication of every article, 3 YouTube videos, 2 Recipes, 1 month of website banner and the WeAreDevelopers India brand activation (25–26 Nov 2026).",
  "Plan 3 – Pro adds 3 workshops, 3 conference talks (e.g. React Day Berlin 2026 + 2 in 2027, TBD), 2 hackathons and 3 months of website banner in total.",
  "Plan 4 – Elite adds the banner for the whole term, a Bright Data ad/link on every article for 6 months, Bright Data brand promotion at all other events where Kristiyan speaks (estimated 5 in the term), collaboration campaigns with other DevRels and a 3rd hackathon.",
  "Hackathon prize pools are provided by Bright Data and are not included in the plan prices. Conference fees are fee-only (travel and accommodation covered by the speaker). Third-party DevRel fees, if any, are agreed separately.",
] as const;

export const agreement = {
  name: "Influencer Agreement",
  pilot: "1 October – 31 December 2026",
  monthly: 5000,
  months: 3,
  deliverables: [
    {
      name: "Sponsored articles / tutorials",
      where: "Medium (proposed) + promotion on X and Medium",
      quantity: "4",
      basis: "Agreement + proposed",
    },
    {
      name: "Supporting GitHub demos",
      where: "GitHub — Kristiyan Velkov / BulgariTech public repositories (proposed)",
      quantity: "3",
      basis: "Agreement + proposed",
    },
    {
      name: "Promotion of the materials",
      where: "X and Medium",
      quantity: "Included",
      basis: "Agreement",
    },
    {
      name: "Live online sessions",
      where: "Online — platform TBD, e.g. YouTube Live / LinkedIn Live (proposed)",
      quantity: "2",
      basis: "Agreement + proposed",
    },
    {
      name: "Product feedback report",
      where: "Not published — sent privately to Bright Data by email (proposed)",
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
  | "sanjose"
  | "newyork"
  | "bengaluru";

export const cities: { id: CityId; name: string; lat: number; lon: number }[] = [
  { id: "london", name: "London", lat: 51.51, lon: -0.13 },
  { id: "vilnius", name: "Vilnius", lat: 54.69, lon: 25.28 },
  { id: "gdansk", name: "Gdańsk", lat: 54.35, lon: 18.65 },
  { id: "amsterdam", name: "Amsterdam", lat: 52.37, lon: 4.9 },
  { id: "berlin", name: "Berlin", lat: 52.52, lon: 13.41 },
  { id: "sanjose", name: "San José", lat: 37.34, lon: -121.89 },
  { id: "newyork", name: "New York", lat: 40.71, lon: -74.01 },
  { id: "bengaluru", name: "Bengaluru", lat: 12.97, lon: 77.59 },
];

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
  status: "past" | "upcoming";
  cityId?: CityId;
  onlineOnly?: boolean;
  note?: string;
};

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
    session: "Talk: Docker MCP – Packaging & Deploying AI Tools with Model Context Protocol",
    inPerson: onlineOnly,
    online: num(5000),
    source: "GitNation badge (via LinkedIn)",
    status: "past",
    onlineOnly: true,
    note: "About 5,000 registered participants, per GitNation's registration badge.",
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
    session: "Workshop: DevOps for JavaScript Developers – From Code to Production",
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
    session: "Workshop: DevOps for Front-end Developers – From Local Code to Production",
    inPerson: num(1500),
    online: num(10000),
    source: "gitnation.com/sponsors",
    sourceHref: "https://gitnation.com/sponsors",
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
    session: "Talk: Training Engineers for AI Without Turning Them into Prompt Monkeys",
    inPerson: { display: "1,500 ⁴", counted: null },
    online: { display: "– ⁴", counted: null },
    source: "gitnation.com/sponsors",
    sourceHref: "https://gitnation.com/sponsors",
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
    session: "Workshop: DevOps for Front-end Developers – From Local Code to Production",
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
    session: "Workshop: DevOps for Front-end Developers – From Local Code to Production",
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
    id: "react-advanced-2026",
    name: "React Advanced London 2026",
    year: 2026,
    when: "23 & 26 Oct 2026",
    place: "London & Online",
    session: "Workshop (remote): DevOps for React Developers – From Code to Production",
    inPerson: num(800),
    online: num(5000),
    source: "reactadvanced.com",
    sourceHref: "https://reactadvanced.com",
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
    session: "Talk: React Won't Save You – Front-End Security Mistakes We Keep Shipping",
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
    session: "Talk: Beyond the Prompt – Production-Ready AI Features in Full-Stack React",
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
    session: "Workshop: Building Production-Ready React Applications with Cursor AI",
    inPerson: num(500),
    online: num(5000),
    source: "aicodingsummit.com/berlin",
    sourceHref: "https://aicodingsummit.com/berlin",
    status: "upcoming",
    cityId: "berlin",
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

function sumCounted(status: "past" | "upcoming" | "all", field: "inPerson" | "online") {
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
  upcomingEvents: speakingEvents.filter((event) => event.status === "upcoming").length,
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
  promotion: "X + Medium",
  tier: "pilot",
  status: "Delivered (assumed – confirm)",
};

export const publishingItems: PublishItem[] = [
  {
    date: "2026-11-10",
    deliverable: "Article / tutorial 1 of 12 (Core)",
    topic: "Scraping JavaScript-heavy sites with Bright Data Scraping Browser + Playwright",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Planned · draft to Bright Data by Thu 5 Nov",
  },
  {
    date: "2026-11-10",
    deliverable: "GitHub demo 1 of 5",
    topic: "scraping-browser-playwright-starter (TypeScript)",
    channels: "GitHub",
    promotion: "X",
    tier: "core",
    status: "Planned · shared with the article draft",
  },
  {
    date: "2026-11-16",
    deliverable: "Live session 1 of 3 – announcement",
    topic: "Announcement post",
    channels: "X, Medium",
    promotion: "X + Medium",
    tier: "core",
    status: "Planned",
  },
  {
    date: "2026-11-17",
    deliverable: "WeAreDevelopers India – pre-event post 1",
    topic: "Speaking at WeAreDevelopers India – what I'll show with Bright Data",
    channels: "X, LinkedIn",
    promotion: "X + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-18",
    deliverable: "Article / tutorial 2 of 12 (Plan 2 extra)",
    topic: "Web Scraper API: structured data from popular sites in minutes",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Fri 13 Nov",
  },
  {
    date: "2026-11-19",
    deliverable: "Live online session 1 of 3",
    topic: "Give your AI agent the web: Bright Data MCP Server + LLM, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X + Medium",
    tier: "core",
    status: "Planned · agenda to Bright Data by Mon 16 Nov",
  },
  {
    date: "2026-11-23",
    deliverable: "WeAreDevelopers India – pre-event post 2",
    topic: "“See you in Bengaluru” – session time, Bright Data mention",
    channels: "X, LinkedIn",
    promotion: "X + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-25",
    deliverable: "WeAreDevelopers India – brand activation, day 1",
    topic: "Talk + Bright Data T-shirt + conversations with attendees and brands; live posts",
    channels: "On site – BIEC, Bengaluru",
    promotion: "X + LinkedIn (live)",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-26",
    deliverable: "WeAreDevelopers India – brand activation, day 2",
    topic: "On-site networking with attendees and brands; live posts",
    channels: "On site – BIEC, Bengaluru",
    promotion: "X + LinkedIn (live)",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-11-30",
    deliverable: "WeAreDevelopers India – post-event recap",
    topic: "Recap: talk highlights, slides, Bright Data links",
    channels: "X, LinkedIn, Medium",
    promotion: "X + LinkedIn + Medium",
    tier: "growth",
    status: "Proposed – Plan 2 (otherwise €5,000 add-on)",
  },
  {
    date: "2026-12-01",
    deliverable: "Article / tutorial 3 of 12 (Core)",
    topic: "Web Unlocker in practice: reliable data from protected e-commerce sites",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Planned · draft to Bright Data by Fri 20 Nov (early – conference travel)",
  },
  {
    date: "2026-12-01",
    deliverable: "React Day Berlin – pre-event post 1",
    topic: "Speaking at React Day Berlin – production-ready AI features in React",
    channels: "X, LinkedIn",
    promotion: "X + LinkedIn",
    tier: "addon",
    status: "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-03",
    deliverable: "React Day Berlin – pre-event post 2",
    topic: "“See you in Berlin” – session time, Bright Data mention",
    channels: "X, LinkedIn",
    promotion: "X + LinkedIn",
    tier: "addon",
    status: "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-04",
    deliverable: "React Day Berlin 2026 – conference",
    topic: "Talk “Beyond the Prompt…” + Bright Data T-shirt + on-site promotion (talk slot TBC)",
    channels: "Berlin & Online",
    promotion: "X + LinkedIn (live)",
    tier: "addon",
    status: "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-07",
    deliverable: "React Day Berlin 2026 – final day",
    topic: "On-site / online promotion; live posts",
    channels: "Berlin & Online",
    promotion: "X + LinkedIn (live)",
    tier: "addon",
    status: "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-09",
    deliverable: "React Day Berlin – post-event recap",
    topic: "Recap: talk highlights, slides, Bright Data links",
    channels: "X, LinkedIn, Medium",
    promotion: "X + LinkedIn + Medium",
    tier: "addon",
    status: "Proposed – €3,500 add-on, or included in Plan 3+ (1 of 3 conferences)",
  },
  {
    date: "2026-12-10",
    deliverable: "Article / tutorial 4 of 12 (Core)",
    topic: "Real-time search data for apps and agents with Bright Data SERP API",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Planned · draft to Bright Data by Thu 3 Dec (early – conference travel)",
  },
  {
    date: "2026-12-10",
    deliverable: "GitHub demo 2 of 5",
    topic: "serp-api-nextjs-demo",
    channels: "GitHub",
    promotion: "X",
    tier: "core",
    status: "Planned · shared with the article draft",
  },
  {
    date: "2026-12-10",
    deliverable: "Live session 2 of 3 – announcement",
    topic: "Announcement post",
    channels: "X, Medium",
    promotion: "X + Medium",
    tier: "core",
    status: "Planned",
  },
  {
    date: "2026-12-15",
    deliverable: "Live online session 2 of 3",
    topic: "From raw web to insights: Web Scraper API + Datasets, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X + Medium",
    tier: "core",
    status: "Planned · agenda to Bright Data by Thu 10 Dec",
  },
  {
    date: "2026-12-17",
    deliverable: "Article / tutorial 5 of 12 (Plan 2 extra)",
    topic: "Choosing the right Bright Data proxy: residential vs datacenter vs ISP",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 14 Dec",
  },
  {
    date: "2026-12-18",
    deliverable: "Product feedback report 1 of 2",
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
    deliverable: "Article / tutorial 6 of 12 (Core)",
    topic: "Getting started with the Bright Data MCP Server for AI agents",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Proposed – draft to Bright Data by Thu 7 Jan · requires amendment/renewal",
  },
  {
    date: "2027-01-12",
    deliverable: "GitHub demo 3 of 5",
    topic: "bright-data-mcp-agent-starter (Next.js + MCP)",
    channels: "GitHub",
    promotion: "X",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
  {
    date: "2027-01-14",
    deliverable: "Recipe 1 of 2 – best way to use Bright Data",
    topic: "Turn any page into LLM-ready Markdown with Web Unlocker",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 11 Jan",
  },
  {
    date: "2027-01-21",
    deliverable: "YouTube video 1 of 3",
    topic: "Build a web-browsing AI agent in 20 minutes with Bright Data MCP",
    channels: "YouTube",
    promotion: "X + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 18 Jan",
  },
  {
    date: "2027-01-26",
    deliverable: "Article / tutorial 7 of 12 (Plan 2 extra)",
    topic: "RAG with fresh web data: Web Unlocker → Markdown → vector DB",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 21 Jan",
  },
  {
    date: "2027-02-09",
    deliverable: "Article / tutorial 8 of 12 (Core)",
    topic: "Price monitoring with Web Scraper API – no scraper maintenance",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Proposed – draft to Bright Data by Thu 4 Feb · requires amendment/renewal",
  },
  {
    date: "2027-02-09",
    deliverable: "GitHub demo 4 of 5",
    topic: "price-tracker-nextjs (Web Scraper API + cron)",
    channels: "GitHub",
    promotion: "X",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
  {
    date: "2027-02-15",
    deliverable: "Live session 3 of 3 – announcement",
    topic: "Announcement post",
    channels: "X, Medium",
    promotion: "X + Medium",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
  {
    date: "2027-02-18",
    deliverable: "Live online session 3 of 3",
    topic: "E-commerce data pipelines end-to-end, live demo + Q&A",
    channels: "Online – YouTube Live / LinkedIn Live (TBD)",
    promotion: "X + Medium",
    tier: "core",
    status: "Proposed – agenda to Bright Data by Mon 15 Feb · requires amendment/renewal",
  },
  {
    date: "2027-02-23",
    deliverable: "Article / tutorial 9 of 12 (Plan 2 extra)",
    topic: "Datasets vs scraping: when to use ready-made Bright Data datasets",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 18 Feb",
  },
  {
    date: "2027-02-25",
    deliverable: "YouTube video 2 of 3",
    topic: "Build a price tracker with Web Scraper API + Next.js",
    channels: "YouTube",
    promotion: "X + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 22 Feb",
  },
  {
    date: "2027-03-02",
    deliverable: "Article / tutorial 10 of 12 (Core)",
    topic: "SERP API for developers: rank tracking in TypeScript",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Proposed – draft to Bright Data by Thu 25 Feb · requires amendment/renewal",
  },
  {
    date: "2027-03-11",
    deliverable: "Recipe 2 of 2 – best way to use Bright Data",
    topic: "Geo-targeted SERP results for 10 countries with SERP API + proxies",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 8 Mar",
  },
  {
    date: "2027-03-16",
    deliverable: "Article / tutorial 11 of 12 (Plan 2 extra)",
    topic: "Scaling scrapers responsibly: rate limits, retries and compliance",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Thu 11 Mar",
  },
  {
    date: "2027-03-23",
    deliverable: "Article / tutorial 12 of 12 (Core)",
    topic: "From prototype to production: monitoring Bright Data jobs",
    channels: "Medium + Front-end World + LinkedIn",
    promotion: "X + Medium (Core) · LinkedIn (Plan 2)",
    tier: "core",
    status: "Proposed – draft to Bright Data by Thu 18 Mar · requires amendment/renewal",
  },
  {
    date: "2027-03-23",
    deliverable: "GitHub demo 5 of 5",
    topic: "serp-rank-tracker (SERP API + Postgres)",
    channels: "GitHub",
    promotion: "X",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
  {
    date: "2027-03-25",
    deliverable: "YouTube video 3 of 3",
    topic: "SERP API: build an SEO rank tracker live",
    channels: "YouTube",
    promotion: "X + Medium + LinkedIn",
    tier: "growth",
    status: "Proposed – Plan 2 · draft to Bright Data by Mon 22 Mar",
  },
  {
    date: "2027-03-29",
    deliverable: "Product feedback report 2 of 2",
    topic: "Term findings + recommendations",
    channels: "Private – email to Bright Data",
    promotion: "—",
    tier: "core",
    status: "Proposed – requires amendment/renewal",
  },
];

export const publishingMonths = [
  { id: "2026-11", label: "November", yearLabel: "2026", year: 2026, month: 10 },
  { id: "2026-12", label: "December", yearLabel: "2026", year: 2026, month: 11 },
  { id: "2027-01", label: "January", yearLabel: "2027", year: 2027, month: 0 },
  { id: "2027-02", label: "February", yearLabel: "2027", year: 2027, month: 1 },
  { id: "2027-03", label: "March", yearLabel: "2027", year: 2027, month: 2 },
] as const;

export const tierMeta: Record<
  PublishTier,
  { label: string; hint: string }
> = {
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
  body: "Shows the Plan 1 (Core) baseline plus Plan 2 extras. Drafts are emailed to Bright Data about 3 business days before publishing for acceptance. Topics are proposed working titles. Weekdays only; no publishing 24 Dec – 1 Jan. Under Plan 2 every article is also published in Front-end World and on LinkedIn.",
} as const;

export const bonus = {
  deadlineLabel: "15 November 2026",
  deadlineIso: "2026-11-15",
  recipeValue: 1200,
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

export const terms = [
  "All prices are in EUR.",
  "Prices are exclusive of withholding tax (grossed up per the agreement) and VAT (B2B reverse charge).",
  "Payment is due within 14 days of the invoice date.",
  "Additional services need separate written approval before work starts.",
  "Conference fees are fee-only. Travel and accommodation are covered by the speaker.",
  "Hackathon prize pools are provided by Bright Data and are not included in the plan prices. Third-party DevRel fees, if any, are agreed separately.",
  "November and December 2026 are covered by the signed agreement. Any work beyond 31 December 2026 needs an amendment or renewal.",
  "“Proposed” marks a detail that is not specified in the agreement and is to be confirmed by Bright Data.",
] as const;

export const reach = [
  { figure: "30K+", label: "LinkedIn connections" },
  { figure: "7K", label: "Medium followers" },
  { figure: "100K+", label: "monthly readers" },
] as const;

export const credentials = [
  { label: "Practice", value: "Principal Front-end Developer" },
  { label: "Community", value: "Docker Captain" },
  {
    label: "Books",
    value:
      "Author of 4 technical books, including Mastering React.js Interviews and Mastering TypeScript Core Utility Types",
  },
  {
    label: "Docs",
    value: "Contributor to the official Docker documentation — the React.js sample",
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
    text: `plan 2 · growth · ${formatEur(quotes.growth.monthly)} / month`,
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
