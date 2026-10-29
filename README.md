# gradespot-rebuild-website

Formerly Gradespot-web-B-replica.

## Purpose

A faithful rebuild of the official GradeSpot website — replicating the
original WordPress site's look and behaviour in the owner's own code, so
GradeSpot owns its website outright instead of being bound to WordPress
templates and plugins. The aim, per the current README, is for a
visitor to get the same site as on WordPress, with a dynamic engine
behind it in a later phase.

## Current status: TEMPORARY EXPERIMENT — not canonical

- **Experiment, not canonical.** Per the owner's 2026-10-29 decision,
  the Replica is the temporary experiment. Leo
  (`gradespot-leo-website`) is the canonical candidate and future
  production replacement for `gsitssolutions.com`. Do not describe the
  Replica as the canonical or production website.
- **GitHub `main` is behind local work — read this before using it.**
  Latest GitHub `main` commit fetched at scan time: `44c21d4`
  (2026-10-25T02:39:24Z, international/partner and GDPR sections).
  The merged V3 build (`b4433cd`, local main `9edc808`) has **not**
  been pushed to GitHub `main`. Anything that exists only locally
  (including the later canonicals change) is not in the GitHub repo
  until it is pushed.
- **v1 (faithful replica) is stated complete** in the current README
  (Phases 1–2: foundation/rebuild and content cleanup).

## What this repo is NOT

- Not a redesign. This repo replicates; it does not redesign. (Leo is
  the from-scratch design.)
- Not the production website. It is an experiment, and the WordPress
  site remains live until a separate cutover approval for Leo.
- Not the backend or the admin. Admin code never lands in this repo;
  admin is a separate, not-yet-live phase via `gradespot-api`.
- Not a source of new claims. Courses, services, prices, and claims
  come only from the official record; conflicts go in `DECISIONS.md`
  and are never silently resolved (per the current README's own rule).

## Design (as stated in the current README)

Faithful copy of the official WordPress look: brand orange `#f7631b`
(hover `#d9520f`), headings deep navy `#0e2b3d`, body `#666666`,
Inter type, centred container (max 1140px), primary buttons with 5px
radius. Home order per README: header/nav → hero ("We Create Better
IT Solutions") → What We Do → About (9 Years, Nikhil signature) →
ISO 9001:2015 + AICTE Internships cards → counters → Top Class
Trainings → Trusted by learners → Leadership → FAQ → Need Help +
footer.

Note: the ISO/AICTE cards are described here as they appear on the
site. This draft does **not** verify any ISO or AICTE certification,
certificate number, scope, or validity date, and none is asserted.

## Tech stack (only as evidenced in the current README)

- Next.js 15, React 19, Tailwind CSS v4, TypeScript, zod
  (form/API validation), `@supabase/supabase-js`
- Data flow (per README): page → `src/lib/data.ts` → Supabase when
  `.env.local` is present, otherwise local files in `src/data/`
- Content stated in the README: 36 trainings, 12 services, team,
  testimonials, certifications, lead form, certificate verification.
  Those counts were **not re-counted in this task**.
- Settled facts stated in the current README: one phone sitewide,
  +91 91826 54056; Certified Learners 1250. The 1250 figure is cited
  here only as a README-stated site figure; it was **not**
  independently verified in this task, and no other learner count is
  asserted in this draft.

## How to run / test (as evidenced in the current README)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — must pass before any PR
npm start        # preview the production build locally
npm run lint
```

Prerequisites stated in the README: Node.js 20 LTS + npm, and Git.
No accounts are needed to start (the site runs on local data without
`.env.local`); Supabase keys are needed only for live-data work and
must never be committed.

The current README states there is **no automated test suite** in this
repo — verification is the production build + lint + manual checks.
Do not claim a test suite exists.

## Deploy status — flagged, do not treat as settled

- The current README states: live at `https://gradespot-app.vercel.app`,
  Vercel project `gradespot-app`, API-upload deploys, **not
  git-connected**, Mumbai region.
- Conversation records since then state the Vercel project was renamed
  `gradespot-app` → `replica-web-b`, a redeploy under the new name made
  `replica-web-b.vercel.app` live, and later deployments were purged
  to production-only, leaving **no rollback deployment**. The
  canonicals/sitemap in the site code are also recorded as still
  saying `gradespot-app.vercel.app` in that later record.
- This draft therefore does **not** present `gradespot-app.vercel.app`
  or the `gradespot-app` project name as current. Verify the current
  Vercel project, alias, and deployment in Vercel before stating any
  live URL, and do not use a purged deployment as a rollback target.
- Vercel's files-API daily deploy cap has also been recorded as
  rate-limiting a later deploy attempt; do not assume a redeploy will
  succeed immediately.

## Still open

- Organisation: `gradespot-official` has **not** been created. This repo
  remains under the personal account `AravindMutthe`. Organisation
  creation is deferred to a later, separate decision.
- Admin / dynamic engine (Phase 3): **not live** in this repo. It is
  planned via the separate Axon backend repo (`gradespot-api`), which
  is still scaffold-only.
- Contracts / infrastructure: no separate `gradespot-contracts` or
  `gradespot-infrastructure` repo has been split out yet.
- Experiment retirement: no selection/retirement date for the Replica
  experiment is stated in this draft. That decision still needs an
  explicit owner call; the experiment must not become a second
  permanent production site by default.
