# GradeSpot App

Rebuild of gsitssolutions.com (GradeSpot IT Solutions, Dilsukhnagar,
Hyderabad) — Phase 1 + Phase 2, built 2026-10-23 from a full crawl of the
live WordPress site and the 2026-10-21 site audit.

**Stack:** Next.js 15 (App Router) + React + TypeScript + Tailwind CSS v4.
Data layer reads Supabase when configured, otherwise serves the migrated
content in `src/data/` (Royal Salon pattern). No deployment is wired up —
this repo is intentionally not connected to any hosting.

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
- `supabase/migrations/0001_init.sql` — schema (courses, services, leads,
  certificates) + RLS + seed generated from the migrated content
- `next.config.ts` — redirect map for all 49 legacy sitemap URLs, the 10
  dead catalogue URLs and their variants (see DECISIONS.md)
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

## Pending manual step

Apply `supabase/migrations/0001_init.sql` in the Supabase dashboard SQL
editor (direct Postgres access from the build sandbox is blocked). Until
then the data layer serves local content and lead submissions are logged
server-side rather than stored.
