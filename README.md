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

## Design

**Design:** a faithful copy of the official WordPress site's look —
corporate and clean, not a redesign. The replica's job is for a
visitor to see the same site they saw on WordPress.

**Layout (home page, top to bottom):** header with navigation → hero
"We Create Better IT Solutions" → What We Do (Top Class Trainings,
Web Design & Development, Cyber Security, Digital Marketing) → About
(9 Years of Experience, Nikhil signature block, Founder & MD) → ISO
9001:2015 + AICTE Internships cards → counters strip (Happy Learners,
Certified Learners, Students Enrolled, Interns, Web Projects) → Top
Class Trainings cards → Trusted by learners → Meet Our Leadership
(Nikhil, Aravindh, Prudhvi) → satisfaction/features strip → FAQ →
Need Help + footer (address, emails, phones, hours 8:00 AM – 9:00 PM).

**Structure:** shared Header/Footer and `ui.tsx` primitives; every
section sits in a centred `wrap` container (max 1140px) with
`section-pad` rhythm (80px mobile, 120px desktop); cards carry image
+ category + title + excerpt + Read More; pale `surface-light`
sections alternate with white.

**Theme** (`src/app/globals.css`, Tailwind v4 `@theme`): brand orange
`#f7631b` (buttons, accents) with brand-dark `#d9520f` on hover;
headings deep navy `#0e2b3d`; body `#666666`; nav `#333333`;
surface-light `#f3f7fd`; footer text `#c2d1e2`; type Inter, body
14px/26px. Buttons: primary = brand-filled, 5px radius; outline-light
= white pill (40px radius) for dark sections.

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

## How to work with it

### Prerequisites

- Node.js 20 LTS + npm, and Git.
- No accounts needed to start: without `.env.local`, the site runs
  entirely on the local files in `src/data/`. A Supabase project is
  only needed for live-data work (keys via the Secure Vault / Vercel,
  never committed).
- Stack: Next.js 15, React 19, Tailwind CSS v4, TypeScript, zod
  (form/API validation), `@supabase/supabase-js`.

### Build and test locally

```
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — must pass before any PR
npm start        # preview the production build locally
npm run lint
```

There is no automated test suite in this repo — verification is the
production build + lint + manual checks: home, one training page,
one service page, the lead form, and certificate verification.

### Feature development → PR for review

1. Start from latest `main`: `git checkout main && git pull`.
2. Branch, never commit to `main` directly:
   `git checkout -b feature/<short-name>`.
3. Build the feature following the Design and Rules sections above —
   content from the official record only, assets downloaded into the
   repo, nothing hotlinked, no invented data.
4. Content edits go in `src/data/` first. A database schema change
   needs a new file in `supabase/migrations/` and Aravind's approval
   (migrations are applied to the live Supabase project separately).
5. Run `npm run build` + `npm run lint` + the manual checks above.
   Fix everything before pushing.
6. Push the branch and open a pull request into `main`, describing
   what changed and how you verified it.
7. Review: Aravind reviews every PR; merge happens only on his word.
   Merging does NOT deploy — production is API-uploaded from the
   local working copy (Vercel project `gradespot-app`) only when he
   commissions it.

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
