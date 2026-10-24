# gradespot-rebuild-replica-app — GradeSpot website rebuild (faithful replica)

Faithful rebuild of gsitssolutions.com (GradeSpot IT Solutions, Dilsukhnagar,
Hyderabad) — Phase 1 + Phase 2, built 2026-10-23 from a full crawl of the
live WordPress site and the 2026-10-21 site audit.

**Live:** https://gradespot-app.vercel.app (Vercel project `gradespot-app`,
Mumbai region)

**Status:** v1 complete (Phases 1 + 2). Since 2026-10-24 this repo has a
single branch: `main`. The old `main` snapshot and `phase-1-2-build` were
unified into `main` by merge (commit `8733591`); both histories are
preserved in that merge.

**Stack:** Next.js 15 (App Router) + React + TypeScript + Tailwind CSS v4.
Dependencies: `next`, `react`, `react-dom`, `zod`, `@supabase/supabase-js`.

## New here? Understand this repo in 10 minutes

Read in this order:

1. This README — the map.
2. `DECISIONS.md` — every content conflict found on the live site (phone
   numbers, certified-learner totals, unverified claims, missing
   course/service content) with the exact published wording and how each
   was resolved.
3. `src/data/site.ts` — the business facts in one place: phones, counters,
   address, hours.
4. `src/app/page.tsx` — how the home page is composed.
5. `src/lib/data.ts` — how data flows (Supabase first, local fallback).
6. `src/data/courses.ts` — the course model: 36 courses (11 with full
   detail pages, 25 catalogue entries).
7. `next.config.ts` — the legacy redirect map.

## Structure

- `src/app/` — routes. Pages: Home, About Us, Trainings (+ 36 course
  pages under `trainings/[slug]`), Services (+ 12 service pages under
  `services/[slug]`), Resources, Team Members (including
  `team-members/nikhil-duth-d`), Why Choose Us, Testimonials, Student
  Certifications, Certificate Verification, Contact Us (lead form), Help
  & FAQs (`faq`), Terms and Conditions. APIs: `api/leads` (POST enquiry,
  Zod-validated, stored via the data layer) and `api/verify` (POST
  certificate-code verification, honest-empty when no record matches).
- `src/components/` — shared UI: Header, Footer, `ui.tsx`.
- `src/data/` — content migrated from the live site; also the local
  fallback when Supabase is not configured. `site.ts` (business facts),
  `courses.ts` (36 courses), `services.ts` (12 services), `team.ts`,
  `testimonials.ts` (verbatim Google testimonials), `certifications.ts`
  (student certification photos), `employers.ts` (identified employer
  logos), `blog.ts`, `pages.ts`.
- `src/lib/` — `data.ts` (the Supabase-or-local data layer every page
  reads through) and `supabase.ts` (the Supabase client).
- `public/images/` — every image, downloaded into the repo, never
  hotlinked. `blog/`, `certifications/`, `courses/`, `employers/`,
  `team/`, plus `logo.png`, `logo-light.png`, `signature.png`.
- `supabase/migrations/` — `0001_init.sql` (courses, services, leads,
  certificates tables + RLS + seed generated from the migrated content),
  `0002_gap_additions.sql`, `0003_course_images.sql`.
- `next.config.ts` — redirect map for the legacy WordPress URLs: the 49
  live-sitemap URLs plus the 10 dead catalogue destinations, each with
  and without trailing slash and with and without the `/index.php/`
  prefix. Rationale per group is documented in `DECISIONS.md`.
- `DECISIONS.md` — **read this before changing any content**: the
  conflict log and the open content calls.
- `package.json` — scripts: `dev`, `build`, `start`, `lint`.

## How data flows

Page or component → `src/lib/data.ts` → Supabase when `.env.local` is
present, otherwise the local files in `src/data/`. Supabase project:
`gradespot-app` (ref yrbpolqhipwfmvwdgtvc, ap-south-1).

- Leads: form → `POST /api/leads` (Zod-validated) → stored via the data
  layer.
- Verification: `POST /api/verify` → certificate-code lookup.
- Without environment variables the site runs entirely on the local
  migrated content — same pages, same copy.

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

Node.js 18.18 or newer. Copy `.env.local` values from the Supabase
project `gradespot-app`: `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
`.env.local` is never committed. Apply any not-yet-applied migration in
`supabase/migrations/` via the Supabase dashboard SQL editor (direct
Postgres access from the build sandbox is blocked).

## Deploying

This repo is NOT git-connected to Vercel. Production is deployed by API
upload from the local working copy. Pushing to GitHub deploys nothing.
Vercel project `gradespot-app`, Mumbai region (Supabase is ap-south-1);
environment variables are set in Vercel for production, preview and
development.

## Rules for contributors

- **Content truth, always.** Never invent fees, dates, trainers, stats,
  reviews, certificates or placement claims. A conflict goes in
  `DECISIONS.md` with the exact published wording — it does not get
  silently resolved.
- **Settled decisions (2026-10-23):** one phone sitewide,
  +91 91826 54056; Certified Learners 1250.
- **Branches:** `main` is the single line since 2026-10-24. Features on
  branches; merges only on Aravind's review.
- **Free tier only.** All assets downloaded into the repo — nothing
  hotlinked, no remote code fetched.
- **`.env.local` is never committed.** Secrets live in the Secure Vault
  and in Vercel's server settings, never in chat or git.
