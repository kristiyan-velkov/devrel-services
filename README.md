# BulgariTech × Bright Data — DevRel proposal

A single-page proposal from **Kristiyan Velkov / BulgariTech EOOD** to Bright Data Ltd. for a developer-relations partnership, **November 2026 – March 2027**.

It is a commercial proposal. It is not an official Bright Data website, and it does not use Bright Data’s logo.

## Edit the numbers

All copy, prices, plan quantities, the speaking record and the publishing calendar live in [`data/proposal.ts`](data/proposal.ts).

- Change a unit price in `services` and the plan list value, saving and “per euro” figures update themselves.
- Change a quantity in `planLines` the same way. Quantities are **totals for the five-month term**, and each plan includes the previous one.
- Do not add withholding-tax or VAT calculations. Prices stay the gross EUR figures from the workbook.
- Do not add testimonials, client logos or metrics that are not already in that file.

`data/proposal.test.ts` checks the formulas and the figures from the November 2026 workbook. If you change a price on purpose, update the expected totals in that test.

```bash
npm test
```

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
```

## Download PDF

The **Download PDF** button opens the browser print dialog. The print stylesheet switches the page to a light A4 layout, expands the calendar months and prints the full à la carte catalogue. Choose “Save as PDF”.

## Deploy on Vercel

The app is a static Next.js site (App Router). No database, no server actions.

1. Push this repository to GitHub.
2. In Vercel, **Add New Project** and import the repo. Framework preset: **Next.js**. Install and build commands can stay on the defaults (`npm install`, `npm run build`).
3. Optional environment variable: `NEXT_PUBLIC_SITE_URL` = the production origin, with no trailing slash (for canonical and Open Graph URLs). If you skip it, Vercel’s own URL is used.
4. Deploy. `main` deploys to production; other branches get preview URLs.

No secrets are required.

## What’s on the page

Hero, why Kristiyan, speaking record, the signed pilot, four cumulative plans (Plan 2 recommended), à la carte prices, the Nov 2026 – Mar 2027 calendar, the 15 November bonus, terms, and a mailto to `info.bulgaritech@gmail.com` with Plan 2 prefilled.
