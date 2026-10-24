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
Data layer reads Supabase when configured, otherwise serves the migrated
content in `src/data/`.

**Deploying:** this repo is NOT git-connected to Vercel. Production is
deployed by API upload from the local working copy. Pushing to GitHub does
not deploy anything.

**Content decisions (settled 2026-10-23):** one phone sitewide,
+91 91826 54056; Certified Learners 1250.

## Layout

- `src/app/` — pages: Home, About Us, Trainings (+ 36 course pages),
  Services (+ 12 service pages), Resources, Team Members, Why Choose Us,
  Testimonials, Student Certifications, Certificate Verification,
  Contact Us (lead form), Help & FAQs, Terms and Conditions
- `src/app/api/leads` — POST enquiry endpoint (Zod-validated, stored via
  the data layer)
- `src/app/api/verify` — POST certificate-code verification
- `src/data/` — content migrated from the live site (courses, services,
  team, testimonials, certifications, page copy, business facts)
- `src/lib/data.ts` — Supabase-or-local data layer
- `supabase/migrations/` — schema + seeds (0001 init, 0002 gap additions,
  0003 course images)
- `next.config.ts` — redirect map for the legacy WordPress URLs (every
  live-sitemap URL, the dead catalogue destinations and their variants;
  rationale per group is documented in DECISIONS.md)
- `DECISIONS.md` — **read this**: every content conflict found on the live
  site (phone numbers, certified-learner totals, unverified claims,
  missing course/service content) with the exact published wording

## Develop

```bash
npm install
npm run dev
```

Copy `.env.local` values from the Supabase project `gradespot-app`
(ref yrbpolqhipwfmvwdgtvc): `NEXT_PUBLIC_SUPABASE_URL`,
`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
Without them the site runs entirely on the local migrated content.
`.env.local` is never committed.

Apply any not-yet-applied migration in `supabase/migrations/` via the
Supabase dashboard SQL editor (direct Postgres access from the build
sandbox is blocked).
