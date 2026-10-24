# gradespot-rebuild-replica-app

Our own rebuild of the official GradeSpot website — replicating the
original WordPress design, working as the original site, going dynamic
with admin-configured frontend.

## Why this repo

GradeSpot's official website runs on WordPress. A WordPress site can only
change through its templates and plugins — the frontend cannot be
configured from our own admin, and every dynamic behaviour has to bend
to the template. This repo exists so GradeSpot owns its website
outright: same website, our code, our control, free to grow dynamic.

## What it is building

Our own website, built by replicating the original website's design —
the design that came from WordPress. Every page, section, course and
service of the official site, rebuilt in Next.js + Supabase: 36
trainings, 12 services, team, testimonials, certifications, lead form,
certificate verification.

## Why it is building it

The aim is to work and function exactly as the original website — a
visitor should get the same site — but going dynamic: like Royal Salon,
the frontend will be configurable from an admin (content, services,
banners, timings) instead of frozen in templates. Same site on the
outside, own dynamic engine on the inside.

Status: v1 (the faithful replica) is complete and live at
https://gradespot-app.vercel.app. The admin-configured frontend is the
next phase and lives in `gradespot-axon` — not in this repo.

New here? Read in this order: this README → `DECISIONS.md` →
`src/data/site.ts` → `src/app/page.tsx` → `src/lib/data.ts`.

## Complete folder / directory structure

```
.
├── .gitignore
├── DECISIONS.md            # content conflicts + resolutions, open calls
├── README.md
├── eslint.config.mjs
├── next.config.ts          # legacy redirect map (see below)
├── package.json            # scripts: dev, build, start, lint
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── public/
│   └── images/             # all images, local, never hotlinked
│       ├── blog/
│       ├── certifications/
│       ├── courses/
│       ├── employers/
│       ├── team/
│       ├── logo.png
│       ├── logo-light.png
│       └── signature.png
├── src/
│   ├── app/                # routes (each dir holds its page)
│   │   ├── about-us/
│   │   ├── api/
│   │   │   ├── leads/      # POST enquiry endpoint
│   │   │   └── verify/     # POST certificate-code verification
│   │   ├── certificate-verification/
│   │   ├── contact-us/
│   │   ├── faq/
│   │   ├── resources/
│   │   ├── services/
│   │   │   └── [slug]/     # 12 service pages
│   │   ├── student-certifications/
│   │   ├── team-members/
│   │   │   └── nikhil-duth-d/
│   │   ├── terms-and-conditions/
│   │   ├── testimonials/
│   │   ├── trainings/
│   │   │   └── [slug]/     # 36 course pages
│   │   └── why-choose-us/
│   ├── components/         # Header, Footer, shared ui.tsx
│   ├── data/               # migrated content; local fallback
│   │   ├── blog.ts
│   │   ├── certifications.ts
│   │   ├── courses.ts      # 36 courses
│   │   ├── employers.ts
│   │   ├── pages.ts
│   │   ├── services.ts     # 12 services
│   │   ├── site.ts         # business facts (phones, counters, address)
│   │   ├── team.ts
│   │   └── testimonials.ts
│   └── lib/
│       ├── data.ts         # Supabase-or-local data layer
│       └── supabase.ts     # Supabase client
└── supabase/
    └── migrations/
        ├── 0001_init.sql         # courses, services, leads, certificates + RLS + seed
        ├── 0002_gap_additions.sql
        └── 0003_course_images.sql
```

Data flow: page → `src/lib/data.ts` → Supabase when `.env.local` is
present, otherwise the local files in `src/data/`. Supabase project:
`gradespot-app` (ap-south-1). Without environment variables the site
runs entirely on the local migrated content.

## Rules

- **Same real content, always.** Courses, services, prices and claims
  only from the official record. Never invent fees, dates, trainers,
  stats, reviews, certificates or placement claims. A conflict goes in
  `DECISIONS.md` with the exact published wording — it does not get
  silently resolved.
- **Design stays faithful to the original WordPress design.** This
  repo replicates; it does not redesign.
- **Dynamic direction: frontend configurable from admin, Royal Salon
  pattern.** The admin itself lives in `gradespot-axon`, never in this
  repo.
- **Settled facts:** one phone sitewide, +91 91826 54056; Certified
  Learners 1250.
- **Branches:** `main` is the single line since 2026-10-24 (the old
  `main` snapshot and `phase-1-2-build` were unified by merge
  `8733591`). Features on branches; merges only on Aravind's review.
- **Deploying:** NOT git-connected. Production is API-uploaded from
  the local working copy (Vercel project `gradespot-app`, Mumbai
  region). Pushing to GitHub deploys nothing.
- **Free tier only.** All assets downloaded into the repo — nothing
  hotlinked, no remote code fetched.
- **`.env.local` is never committed.** Supabase keys live in the
  Secure Vault and in Vercel's server settings, never in chat or git.
