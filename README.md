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

## Website / repo development

### Where it started

The official GradeSpot website runs on WordPress
(gsitssolutions.com). On 2026-10-21 a full audit of that live site
became the governing checklist. On 2026-10-23 Aravind ordered the
rebuild into COMPLETELY NEW repos and projects — fully isolated,
"don't mix with anything": the old `gradespot-frontend-website` /
`gradespot-backend-axon-api` repos, the old Supabase projects and the
existing Vercel projects are reference-only, untouched. That night,
while he slept, Phases 1+2 were built in a fresh repo
(`gradespot-app`, later renamed to this repo).

His standing terminology: Phases 1+2 are "frontend" — every public
page, design, content and routing, with a thin Supabase data layer
underneath (courses/services, the enquiry form, certificate-check
endpoints). Phase 3+ is admin/backend. This repo is frontend;
admin and sellable products live in the separate `gradespot-axon`
repo, built standalone first and integrated later via API/webhooks.
Two brands only: GradeSpot is the business face, Axon is the
front-desk engine.

### Phases done

1. **Phase 1 — foundation + rebuild (2026-10-23, overnight).** New
   Next.js 15 + Supabase project, all public pages rebuilt from the
   live site, database seeded and verified.
2. **Phase 2 — content cleanup + correctness (2026-10-23).** The
   full live-vs-rebuild gap audit: all 22 gaps closed (one phone
   sitewide, Certified Learners figure, Nikhil page, blog cards,
   employers, migrations 0002–0003).
3. **Leo v1 (2026-10-23–24, sibling repo).** The from-scratch
   "Prospectus" build — same real content, own design, 90 routes —
   approved by Aravind on 2026-10-24.
4. **Leo fix rounds + pre-v2 hardening gate (2026-10-24).** Phone
   nav breakpoint, dark theme, floating toggle, all-local assets,
   official ISO/AICTE emblems, logo plate reverted to the approved
   original; then the three conditions he set before any v2 work
   (tighter form validation, dynamic metadata, CTA hierarchy).
5. **SEO/AEO pass + audit quick-wins (2026-10-24, deployed and
   live-verified).** Self-canonicals, strict schema, answer-first
   content, local Hyderabad SEO, per-page social cards,
   llms-full.txt, security headers, the Network+/Hardware copy fix.
6. **Axon foundation (2026-10-23).** The separate admin/products
   repo scaffold: FOUNDATION, PRODUCTS, INTEGRATION-CONTRACT and
   DECISIONS-NEEDED docs, seeded by his original 2026-10-02
   WhatsApp lead-engine flow.

### Phases planned (not started, or parked)

- **Phase 3 — dynamic engine.** Admin panel for courses/services
  (in `gradespot-axon`), enquiries saved to the database with
  WhatsApp/n8n alerts, certificate verification on real records.
  This is what makes this repo dynamic like Royal Salon.
- **Phase 4 — growth pages.** For Institutes page, Pricing page,
  PWA, city × course pages. (Several of these already landed inside
  Leo v1's expansion pack; PWA is still open.)
- **Phase 5 — SaaS.** Student/trainer dashboards, enrollments,
  payments.
- **Leo v2 wave (parked).** AI chat, admin promo config going live,
  LMS student accounts, batch system, lead status pipeline.
- **Launch / migration (his call).** 301 map execution, domain
  pointing, noindex flips, GBP/directory submissions, blog move off
  digidefense.in, paid hosting decision.
- **Master-plan repo (his call awaited).**
  `gradespot-axon-website-project` — README as the platform spec,
  with the messy GradeSpot repos preserved as its branches. Not
  created yet.

### Where this repo stands now

`main` is v1 (merge `8733591`, single branch since 2026-10-24
evening). Live at https://gradespot-app.vercel.app (Vercel project
`gradespot-app`, API-upload deploys, not git-connected). Next for
this repo: Phase 3 (dynamic engine via the Axon admin), then
launch/migration.

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
