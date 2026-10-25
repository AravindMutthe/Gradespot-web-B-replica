# DECISIONS.md — content conflicts & judgement calls for Aravind

Everything below was found while migrating content from the live
gsitssolutions.com (crawl 2026-10-23) into this rebuild. **No conflict was
silently resolved by guessing.** Where the site must display something, the
most widely published variant is used and the conflict is recorded here for
a final decision.

---

## 1. Three different phone numbers are published — which is primary?

Published on the live site:

- Header top bar + footer of **every** page: `+91 88866 60597` and `+91 91826 54056`
- "Call Us" block on the Contact page: `Call Us +91 91826 54056 | +91 76600 43217`
- "Call Us" block on the Services page: `Call Us +91 9182654056 | +91 76600 43217`
- "Call Us" blocks on Testimonials / Why Choose Us / Student Certifications
  pages: `Call Us +91 91826 54056 | +91 76600 43217`
- FAQ answer: "You may reach us by phone at +91 91826 54056"

**Rebuild behaviour:** header/footer use the sitewide pair
(+91 88866 60597, +91 91826 54056); the Contact page lists all three numbers
with working `tel:` links. **Decision needed:** confirm which numbers are
current (is +91 76600 43217 live? is +91 88866 60597?) and whether one should
be labelled (e.g. admissions vs office).

**RESOLVED 2026-10-23 (Aravind):** "use only any one phn number." The single
number used sitewide is **+91 91826 54056** — the most widely published of
the three (header/footer pair, the FAQ answer, and most Call Us blocks).
+91 88866 60597 and +91 76600 43217 no longer appear anywhere on the
rebuild. Applied in `src/data/site.ts` + `src/data/pages.ts`, deployed and
verified live the same morning.

## 2. "Certified Learners" is published as both 1200 and 1500

Quoted from the live site's counter strips:

- Homepage: `1200 Certified Learners` (shown twice) alongside
  `1500 Students Enrolled`, `250 Interns`, `12 Web Projects`
- About page counter strip: `1200 Certified Learners` **and**
  `1500 Certified Learners` on the same page
- Trainings page: `1500 Certified Learners`
- Most course pages (AZ-900, AZ-104, SOC ×4, Network+, PenTest+, Security+,
  Hardware & Networking, Digital Marketing): `1200 Certified Learners`
- CCNA, CCNP and CEH course pages: `1500 Certified Learners`

Other figures are consistent everywhere: `1,500+ Happy Learners`,
`1500 Students Enrolled`, `250 Interns`, `12 Web Projects`.

**Rebuild behaviour:** the stats ribbon shows the four consistent figures
and omits "Certified Learners" entirely. **Decision needed:** the correct
certified-learners total; then it can be added back in one place (the data
file) and will be consistent sitewide.

**RESOLVED 2026-10-23 (Aravind):** Certified Learners = **1250**. Added to
the stats ribbon in `src/data/site.ts`; deployed and verified live the same
morning. (Distinct from the separate published figures "1,500+ Happy
Learners" and "1500 Students Enrolled", which were consistent and stay.)

## 3. Claims carried as published — not independently verified

The following appear on the live site and are carried verbatim. The
2026-10-21 audit noted these are publisher claims, not verified credentials:

- "An ISO Certified Company — GradeSpot IT Solutions holds the prestigious
  certification of ISO 9001:2015 Quality Management System"
- "AICTE Internships Approved — official approval from AICTE for internships"
- "9 years of experience" (homepage)
- "100% Student Satisfaction" (homepage/trainings banner text)
- "Trusted by 1,500+ Happy Learners"

**Decision needed:** confirm the ISO certificate and AICTE approval
documents exist before launch; if either has lapsed, remove before go-live.

## 4. Copied content inside course pages (audit P2)

- The CCNP 350-401 page body repeatedly says "CCNA 200-301"
  (e.g. "By the conclusion of our CCNA 200-301 course, students will emerge
  equipped…", "well-prepared to tackle the CCNA 200-301 certificat…").
- The Computer Hardware and Networking page also contains CCNA 200-301
  headings and "cybersecurity" copy pasted from other courses.

**Rebuild behaviour:** migrated as published (facts were not rewritten).
**Decision needed:** supply or approve corrected CCNP / Hardware copy.

## 5. 25 catalogue courses have no published detail content

The live Trainings catalogue lists 36 courses, but only 11 have real
detail pages. These 25 are advertised with **no published curriculum,
duration or fees anywhere on the live site**: AZ-500, AZ-400, SC-900,
SC-200, Microsoft Sentinel, AWS Cloud Practitioner, AWS Solutions
Architect – Associate, AWS DevOps Engineer – Professional, CompTIA A+
Core 1, CompTIA A+ Core 2, Program in Cybersecurity Technologies, VA PT,
Core Java, Java Full Stack, Power BI, MySQL, Data Analytics, Data Science,
CPC, HCC, IP-DRG, E&M, Radiology – Medical Coding, Anesthesia – Medical
Coding, AutoCAD.

**Rebuild behaviour:** each gets its own detail page (fixing the live
site's misdirected/# links) carrying its published catalogue title,
category and an enquiry CTA — nothing invented. **Decision needed:**
provide curricula for these, or trim the catalogue to courses actually
delivered.

## 6. The 12 services have no real descriptions on the live site

Every one of the 12 service cards on the live Services page uses the
identical template-filler text: *"Pianoforte solicitude so decisively
particular mention diminution the particular. Real he me fond."*

**Rebuild behaviour:** filler dropped; each service gets a real detail
page presenting the published general services copy (the site's own FAQ
answers about its trainings/services) plus an enquiry CTA. **Decision
needed:** write or approve one real paragraph per service.

## 7. Misdirected links on the live site — how they were fixed

From the audit + crawl evidence (live Trainings catalogue):

- `SC-900` card → pointed to the AWS Solutions Architect URL (which itself
  404s). Now → its own page `/trainings/sc-900`.
- `CompTIA A+ Core 1` card → pointed to the Security+ page. Now → its own page.
- `CompTIA A+ Core 2`, `CompTIA PenTest+`, `VA PT`, `Complete Digital
  Marketing`, `Core Java`, `MySQL`, `Data Analytics`, `CPC`, `HCC`, `E&M`,
  `Radiology`, `AutoCAD` cards → pointed to the SOC Analyst page or `#`.
  Now → each course's own page.
- `CompTIA Network+` card → pointed to `/cyber-security-professioanl-training/`
  (404). Now → the real Network+ page.
- `Power BI`, `Data Science`, `IP-DRG`, `Anesthesia` cards → pointed to the
  (404) Microsoft Sentinel URL. Now → their own pages.
- `CCNP` card → `/ccnp-training/` (404) although a real CCNP page exists.
  Now → the real CCNP page.
- `CEH` card → `/practical-ethical-hacking-training/` (404). Now → the real
  CEH content page (published under the Web Application Penetration Testing
  URL — see §9).
- The 10 dead (404) catalogue URLs themselves redirect to the corresponding
  new course pages (see next.config.ts).

## 8. Legacy junk URLs — deliberate handling

The live sitemap publishes 11 `home-version-*` pages, a `dummy` page,
`services-version-one/two/three`, `case-studies-version-one/three`, and
`elementor-494` ("Case Studies Version Two"). None are migrated. Their
URLs redirect: home versions / dummy / case studies → `/`; services
versions → `/services`. Footer entries for them are gone — the new footer
links only to real pages (fixing the audit's footer mismatch; the old
footer "Home" pointed to `/index.php/home-version-one/`).

## 9. Odd pages — judgement calls to confirm

- `/swapna-reddy/` — shows clothing-brand content under the browser title
  "SOC Analyst Training | Job-Ready in 90 Days". Content NOT migrated;
  URL redirects to the SOC Analyst course (matching its own title).
  **Confirm:** was this page ever intentional?
- The CEH course's real content is published under the slug
  `web-application-penetration-testing-gradespot-it-solutions` while the
  page itself is titled "Certified Ethical Hacking Training". Rebuild
  keeps the content at `/trainings/certified-ethical-hacker-ceh` and
  redirects the old URL there.
- Four near-identical SOC pages exist (`soc-analyst-training`,
  `best-soc-analyst-training`, `soc-analyst-training-in-india`,
  `security-operations-center-analyst-training-online`). One canonical SOC
  course page in the rebuild; the other three URLs redirect to it.
- `/certification-exam-support/` is a real page not present in any menu.
  Its URL redirects to `/student-certifications`. **Confirm** if it should
  instead become its own page/service.
- `/cyber-security/` (the old footer's "Our Services" target) redirects to
  the Cybersecurity Services detail page; `/it-management/` (theme-vendor
  slug also linked from homepage cards to wpriverthemes.com) redirects to
  `/services`. The theme-vendor links themselves are gone.

## 10. Team page duplicates and a name spelling

- The live team page shows **Prudhvi Sai Gariga's card four times** —
  deduplicated to one entry.
- The co-founder's name is published as **"Aravindh Mutthe"** on the team
  page (elsewhere the name appears as "Aravind Mutthe"). Carried as
  published. **Confirm** preferred spelling.

## 11. Certificate verification starts empty — by design

No certificate records (codes, student names) are published anywhere on
the live site, so the `certificates` table seed is empty and verification
honestly reports "not found" until real issued certificates are loaded.
**Decision/process needed:** who loads certificate records, and from what
register, before this feature is promoted.

## 12. Employer logos not reproduced

Course pages carry an "Our Students works with" logo wall (XCube Labs,
Cloud4C, Persistent, Astreya, Movate, etc.). The published text claim is
carried; the logo wall is **not** reproduced, because the audit noted that
displaying logos does not establish a formal partnership. **Confirm**
which companies may be shown as logos, if any.

## 13. Testimonials provenance

The 8 testimonials are Google reviews displayed on the live Testimonials
page via Trustindex, each labelled "Posted on Google". Carried verbatim
with that attribution. Star ratings were not republished (the widget's
per-review stars were not reliably extractable, and no rating is claimed).

## 14. Menu improvements made under the 2026-10-23 scope update

- **Resources** is now a real page (`/resources`) that indexes its six
  children — on the live site it is a `#` placeholder.
- **Help & FAQs** (footer on the live site) is a real page (`/faq`) with
  the site's three real published FAQs. The live `/faq/` page's own
  questions ("Do I need a business plan", "How long should a business plan
  be?", "Where do I start?") are unrelated template filler and were dropped.
- Footer junk removed: Services V1/V2/V3, Case Studies V1/V2, alternate
  homepage link.
- Blog stays external (digidefense.in) and Digital stays external
  (digital.gsitssolutions.com), exactly as the live menu has them.
- Core menu order/labels unchanged: Home, About Us, Trainings, Resources,
  Digital, Services, Contact Us.

## 15. Live-vs-rebuild gap audit closed — 2026-10-23

Aravind asked for an exact comparison with the official site and to add
everything missing. Audit (22 gaps, full register in the goal workspace)
and additions were completed and verified live the same day:

- Student Certifications gallery now shows all **30** photos (18 added).
- "Common Job Roles" card sections added to 9 courses; "Our Pricing"
  cards (₹13,000 / ₹37,500 / ₹28,000, filler bullets dropped) on CCNA +
  CCNP; CEH "Tools Covered" (12) + "Why Choose GradeSpot" (8 points);
  Digital Marketing "Skills Covered" (8, incl. Lead Generation + Digital
  Ads) and its FAQs restructured (8 Q&As as published).
- Blog cards (2FA / Information Warfare / Golden Ticket) on Trainings +
  CCNA/CCNP/SOC/CEH; counters ribbon on Trainings + course pages; course
  images for CCNP, PenTest+, Hardware & Networking, Digital Marketing.
- §12 employer logo wall: ADDED per Aravind's instruction — the 10
  identified logos (XCube Labs, Cloud4C, Persistent, Diligient, Wipro,
  Astreya, Tericsoft, EY, Movate, PurpleTalk) on Trainings, Services,
  About, Why Choose Us, Testimonials, Student Certifications, Certificate
  Verification and course pages. The 2 unidentified sample SVGs
  ("Company112", "client logo 33") were skipped — flag if they are real.
- Also: 9-years badge, founder signature block, feature trio strip,
  LinkedIn/YouTube links, Why-Choose-Us highlight cards, Nikhil profile
  page (/team-members/nikhil-duth-d — no filler bio, no retired phone),
  Video Showcase on Trainings, Services contact strip, "Pay after you
  Pass" line on Student Certifications, Trainings hero copy.
- Contact map: added pointing at the REAL Dilsukhnagar address — the live
  site's embed points at Rajkot, Gujarat (theme demo) and was not copied.

---

## Replica v2 — Leo layout/structure port (2026-10-24, branch v2-leo-layout, NOT merged, NOT deployed)

Order (confirmed 2026-10-24 21:09): recreate Leo's LAYOUT and STRUCTURE
inside replica, INCLUDING Leo's SEO/AEO and Leo's MENUS — but replica's
THEME and DESIGN stay exactly as they are (faithful WordPress: Inter,
#f7631b, #0e2b3d, 1140px wrap, btn-primary/btn-outline-light). Anything
that is design (theme, fonts, colors, visual styling) was EXCLUDED.

NOTE ON SECTION REFERENCES: ported files carry Leo's DECISIONS.md
section references (§17, §18, §19, §22, §25.x). Those refer to LEO's
DECISIONS.md, not this file — they are provenance for harvested data
and rulings, kept so the port's claims stay traceable. This v2 section
is replica's own record of the port.

### What was ported

- 13 new routes (v1: 16 page routes → v2: 29): accessibility, blog,
  blog/[slug], career-support, compare, compare/[pair], for-colleges,
  for-institutes, lp/[slug] (11 city landing pages, non-catalogue
  courses only), partner-with-us, pricing, register,
  training-institute-in-dilsukhnagar-hyderabad.
- 10 recomposed pages (Leo section order/composition, replica styling):
  home, trainings index, trainings/[slug], services index,
  services/[slug], about-us, contact-us, faq, certificate-verification,
  resources. 6 metadata/schema-only pages: testimonials, team-members,
  team-members/nikhil-duth-d, why-choose-us, student-certifications,
  terms-and-conditions. 0 pages untouched; /api/verify untouched.
- Menus: Leo's header structure in replica styling — Trainings mega
  (featured rail + grouped catalogue with code + published duration),
  Services mega (Training & Talent / Technology Services / Consultancy
  & Staffing + B2B doors), Resources mega (Proof & People / Learning &
  Career / More From GradeSpot), order Trainings / Services / Pricing /
  About Us / Resources / For Colleges / For Institutes pill / Register /
  Request a Callback; trims kept (no Home item, no Contact Us in the
  bar, Digital inside Resources). Mobile accordion sheet mirrors it.
  Footer: new-route links added to the existing Company/Quick columns.
- SEO/AEO: metadataBase + all canonicals/OG/Twitter self-referential
  to https://gradespot-app.vercel.app (v1's sitemap/robots pointed at
  gsitssolutions.com — fixed, not preserved); strict schema (one
  Organization @id on the replica domain, WebPage/Course/Service/
  FAQPage/BreadcrumbList/ItemList/Article, NO AggregateRating, NO
  invented priceRange/foundingDate, NO SearchAction); AnswerLead
  "In short" boxes from published fields only; FAQ expansion 3 → 9;
  sitemap with lastmod from branch git history (90 routes, all dated —
  scripts/sitemap-lastmod.py); robots allowing the 10 AI crawlers;
  llms.txt + llms-full.txt (31 KiB, generated from replica data:
  36 courses, 2 priced, 8 with duration, 11 with certification,
  12 services, 3 articles, 9 site FAQs, 55 course FAQs);
  Hyderabad local SEO (areaServed, hours 08:00–21:00 with NO
  published days, locality-level geo only).
- Components (structure, re-skinned): Ticker, PromoBanner, OfferCards
  (4 true offers only), Breadcrumbs, JsonLd, DemoBand, EnquiryRail,
  FloatingActions (desktop WhatsApp button + mobile 3-way bar),
  CatalogueSearch, LpLeadForm, RegisterForm (lead only, NOT accounts),
  upgraded LeadForm (interest/idPrefix/interestOptions/hideMessage/
  submitLabel, client validation, source + WhatsApp opt-in),
  CourseCardBody (image + Free Demo badge + duration chip + Read More
  + Free Demo link), AnswerLead, TestimonialSpotlight (same 3 verbatim
  picks), ForInstitutesBand, CredentialCard/CredentialEmblem.
- Promotions seam: src/data/promotions.ts (Leo seed, unchanged
  content) + getPromotions() in src/lib/data.ts; migration
  supabase/migrations/0004_site_promotions.sql (Leo 0005 content,
  replica numbering) — FILE ONLY, never applied from the sandbox.
- OG cards: 38 replica-generated 1200×630 cards
  (public/images/og/, scripts/generate-og-cards.py) — white cards,
  brand-orange #f7631b rule, heading-navy #0e2b3d sans title (DejaVu
  Sans Bold as the Inter stand-in — no Inter font file was available
  to the script), footer with published phone. NO Leo OG image was
  copied (md5-verified different on sampled cards).

### Gray decisions (replica-theme side chosen, per the build order)

1. LEAD VALIDATION, SERVER SIDE: kept replica's zod route (422 +
   per-field errors, 201 {ok, stored, id} shape intact) and added the
   ported forms' fields to the schema — email made OPTIONAL (LP and
   register forms send "" when skipped; stored as ""), source +
   whatsappOptIn accepted, bare "Registration:"/"Demo:" interests
   rejected (closes the empty-course hole server-side too).
   Client-side, all three forms run the shared lead-validation rules.
   The two validators differ on email (zod requires a valid email
   WHEN present; lead-validation has stricter phone rules) — the
   server stays the permissive backstop, the client the strict gate.
2. LEAD SOURCE/OPT-IN COLUMNS: NOT added as a migration in this
   build (the order named only 0004_site_promotions). createLead
   uses Leo's full-then-core retry, so leads still store on core
   columns until a future lead-source migration (would be 0005)
   adds source/whatsapp_opt_in. Open item, not a silent gap.
3. ISO/AICTE EMBLEMS + LOCAL MAP: copied from Leo (official emblem
   artwork + OSM-tile map image are NOT Leo theme styling). Contact
   now uses the local map image (tap opens Google Maps) instead of
   the Google embed; about uses CredentialCards with emblems. The
   ISO 9001:2015 + AICTE claims themselves stay CONFIRM-OR-REMOVE
   (open since v1) — the cards render Leo's "claimed" copy, not a
   verified claim.
4. WHATSAPP GREEN: kept as a functional platform color (#0B7A43 /
   #0f9d58) for WhatsApp buttons only (FloatingActions, DemoBand,
   EnquiryRail) — it is not a site theme color, and every other
   button uses brand orange / heading navy. If strictness is wanted,
   those three buttons can switch to brand orange in one edit.
5. CSP / SECURITY HEADERS: ported the static OWASP headers
   (nosniff, DENY, Referrer-Policy, Permissions-Policy, HSTS) + AVIF/
   WebP formats into next.config.ts. Did NOT port Leo's CSP middleware
   (default-src 'self', no frame-src): it is a behaviour change with
   prerendered-page risk, and replica loads nothing it would block
   today now that contact uses the local map image.
6. COURSE CARD: extended replica's CourseCard via a new CourseCardBody
   (single component used by both CourseCard and CatalogueSearch),
   not a separate Leo-clone component. Free Demo badge renders on
   every training card (the free demo is a site-wide true offer).
7. SERVICE SUMMARIES/OFFERINGS: ported from Leo's harvest
   (DECISIONS §17 — recovered from the business's own live-site
   scrape, accreditation claims excluded). This REPLACES replica v1's
   "no per-service descriptions exist" note; the summaries stay
   pending Aravind's accuracy confirmation.
8. LP PAGES: structure ported (nav-free chrome via Chrome.tsx /lp/*
   exception, message-matched H1, single repeated CTA, 3-field form,
   per-course WhatsApp, sticky mobile bar, one verbatim testimonial
   per LP). LP chrome uses replica's plain logo (no plate, no
   per-theme variant) and the sticky bar uses replica tokens.
9. DROPPED LEO TREATMENTS (structure kept, styling not carried):
   font-display/font-mono tokens stripped from all ported files
   (everything renders in Inter; the mono utility was Leo's IBM Plex
   Mono voice, not a replica font); sepia image treatments and
   gradient overlays removed; hover-lift card motion dropped from
   CourseCardBody (kept as plain interaction on other ported cards);
   RevealFX scroll-reveal NOT ported (data-reveal attributes
   stripped; the inert --reveal-delay inline styles left on home
   door links are dead without RevealFX and can be deleted);
   ThemeToggle NOT ported (replica has no dark theme); the dark:
   variants still present in some ported files are neutralised by a
   globals.css kill-switch (@custom-variant dark scoped to a class
   that never exists). Token aliases (paper/parchment/cream/ink/
   line/signal/brand-bright/wa/…) are defined in globals.css but
   EVERY one maps to a replica palette value — no Prospectus color
   enters the theme. The 1140px wrap, 14px/26px body, section-pad
   rhythm and btn-primary/btn-outline-light are untouched.
10. FOOTER: new-route links added to the existing 4 columns; Leo's
    fifth Popular Trainings column NOT added (those courses are
    already linked from the header mega menu, home and trainings).
11. CONTACT BOXES + SERVICES COPY: replica v1's 24/7 + Smart Solutions
    boxes were restored on contact-us (Leo's page had dropped them)
    and the general services copy (What We Offer / How We Support
    You) was kept on services/[slug] alongside Leo's summary +
    offerings — no published copy was lost in the port.
12. HOME HERO: replica's navy hero kept verbatim (headline, copy,
    Explore Trainings + Our Services); Leo's split hero with CEH
    image was NOT carried. Leo's audience doors follow it.

### Open gaps (stay blank, never invented)

- Fees for 34 courses, durations for 28/36 courses (only 8 published:
  CCNA/CCNP 45 days, Network+ 30, Security+ 30, PenTest+ 60 hours,
  SOC 90 days, CEH 45 days, Digital Marketing 45 days), batch
  timings, syllabus PDFs, placement details, GBP/YouTube/Instagram
  sameAs, priceRange/dayOfWeek/schedule, office-hours days — all
  render as "confirmed on enquiry" in generated FAQs/AnswerLeads.
- ISO 9001:2015 + AICTE credentials: confirm-or-remove (see §3
  above); emblems render but the claims are unverified.
- Migration 0004_site_promotions.sql: FILE ONLY — needs applying in
  the REPLICA project's Supabase dashboard (or Termux Postgres
  route) before admin-configured promos go live; until then the
  config seam serves identical rows. Future migration 0005 would
  add leads.source + leads.whatsapp_opt_in (see §2).
- Second SEO/AEO blueprint (2026-10-24 ~17:08): still HELD, nothing
  implemented — conflicts need his call (blueprint phone vs ruled
  +91 91826 54056; hasCredential ISO/AICTE unconfirmed; canonical
  back to gsitssolutions.com vs replica self-canonical).
- README.md: NOT updated in v2 (update is a later step, after his
  review). Branch v2-leo-layout is local-only: no push, no deploy,
  no merge until his review.
- Sitemap lastmod values are FILE-TOUCH dates from this branch's
  git history, not content-change claims (the 2026-10-24 v2 commit
  touched many files' metadata at once).
- lp/[slug] top strip + numbered circles use replica navy; the LP
  testimonial mapping (soc-analyst → M Vamsi, az-104 → Arif Syed,
  ceh → Kammarapalli pallavi, default → naresh chepuri) is Leo's
  mapping, kept verbatim.

## v2.1 — Official-values alignment (2026-10-24, branch v2-leo-layout)

Dimensions/tokens only; no routes, content, SEO, menus, or copy changed.
- Buttons: btn-primary + btn-outline-light padding 15/40 (outline padding
  was inferred — never separately specified); btn-navy/btn-outline-navy
  restyled to primary-5px / outline-40px language; WA buttons to 5px shape
  (green kept); header CTAs to 17px/40px at xl.
- Nav: desktop links 13px/600/20px uppercase (nav-bp 12px compaction kept);
  logo 60px; both mega containers 1140px/15px; header bar py-5 (60px logo
  + 40px padding = 100px bar by arithmetic; rendered measure unverified).
- Titles: SectionTitle label 24/600/28.8, titles 38.4 (centered 44.8 + 1px
  tracking); service titles 20/700/24; team/FAQ 18/600/21.6; 14 section-level
  text-2xl headings → 32/600/38.4.
- Grids: content gutters → 30px; footer headings 24/600/28.8.
- Cards/panels: corners → 0, decorative shadows removed; about team photos
  get the 8px + 5px white frame (interpretation: the about page's images
  are the team photos; no standalone framed hero image exists in v2's
  about page).
- Kept deliberately (no official value): badges/chips/pills, avatar/step
  circles, form inputs, status boxes, menu hover rows, mobile sizes,
  micro-eyebrows, counter/price numerals, 24/7 + Smart feature-box titles,
  home team photos, gallery photos, progress bars.
- Still unverified: rendered header total height (needs a visual measure).

## v2.2 — Home hero background photo (2026-10-24, branch v2-leo-layout)

- Home hero ("We Create Better IT Solutions") gets the user-supplied
  students photo as background: public/images/hero-students.jpg
  (2048x768, user's upload, kept local per repo rule), next/image fill,
  object-cover object-right-bottom, opacity-40 under the existing 50%
  black overlay — net ~20% presence, text fully readable.
- The photo's white dashed box (top-right) carries baked-in text
  "Free Demo Class" in bold #0E2B3D, centered, detected box
  1514-1966 x 54-169. Wording is his to swap on one word; the red hat
  and Microsoft mark in the same corner were left as supplied.
- Home hero only; inner-page banners (PageHeader) untouched.

## v2.3 — Hero visibility + responsive fix (2026-10-24, branch v2-leo-layout)

- Headline was unreadable on the photo (brand-orange "IT Solutions"
  over the orange photo; white text over the bright left glow): the
  whole headline is now white ("IT Solutions" keeps extrabold only),
  overlay strengthened 50% -> 60% black, headline gets a soft black
  text-shadow. Mobile text sits on solid navy, no photo behind it.
- White board removed: the photo's top-right corner (white dashed
  box + red hat + MS logo, incl. the baked "Free Demo Class" text)
  was erased by gradient continuation from the left/bottom borders
  (smoothed profiles); the corner now reads as plain orange gradient
  with no seam. Original upload untouched in workspace/user/files/.
- Responsive hero: desktop/tablet keep the full photo as a faded
  cover background (object-right-bottom); below md the background
  is hidden and a dedicated students band
  (public/images/hero-students-mobile.jpg, 968x553 crop of the
  cleaned photo) renders full-width below the text — all five
  students fit on phones, nothing cropped.

## Audit fixes — next 16 + zod 4 (2026-10-25, branch feature/audit-fixes, NOT merged, NOT deployed)

- Base: 31b1fa8 (v2 tip before the unreviewed v3 commits), NOT
  v2-leo-layout tip and NOT the QA branch. Fixes the 2026-10-25
  Termux audit: 3 vulnerabilities, 0 critical (postcss high via
  next, zod high memory-exhaustion, next moderate via its postcss
  dependency). Upgrades, explicit, nothing else touched:
  next 15.5.0 -> 16.4.3, zod 3.25.0 -> 4.6.7.
- ZERO source migration edits needed. Build passes first try under
  Next 16.4.3 (Turbopack, 96/96 static pages); the zod 4 schema in
  /api/leads and /api/verify works unchanged, including the
  z.preprocess empty-email path (proven by localhost 422 tests).
  Lint via the eslint CLI (already the repo's lint script; Next 16
  removed `next lint`, which this repo never used): 0 errors,
  2 pre-existing warnings (postcss.config.mjs default-export,
  layout.tsx no-page-custom-font) — both pre-date the upgrade.
- tsconfig.json changed by Next itself on first build (reformatted,
  jsx preserve -> react-jsx, .next/dev/types added to include).
  No strictness or path change.
- One cosmetic, upgrade-forced output change: zod 4's default
  .max() message reads "Too big: expected string to have <=2000
  characters" (zod 3: "String must contain at most 2000
  character(s)"). Only the message-length field (no custom
  message) is affected; all custom field messages are unchanged.
  Left as the zod 4 default rather than pinning old wording.
- Verified localhost-only: 7 key routes 200, full sitemap 90/90
  with 0 failures, bad-lead 422 per-field errors, /api/verify
  honest-empty. No fake lead was written (only 422-path payloads
  were posted). Production untouched; audit re-verification from
  Termux is the remaining step before any merge/deploy claim.

## Compliance fixes — claims, policies, CSP, a11y (2026-10-25, branch feature/compliance-fixes, NOT merged, NOT deployed)

Base: feature/audit-fixes tip 750f701 (Next 16.4.3 + Zod 4.6.7), so this
branch carries the upgrades too. Scoped compliance-and-claims pass; no
design, theme, dependency, or backend changes.

- Claim sweep: removed/reworded every promissory hit. Digital Marketing
  summary + section: "land a job with a guaranteed success rate" ->
  "prepare for a career in digital marketing" (2 spots). CEH list:
  "100% Practical-Oriented Learning" -> "Practical-Oriented Learning".
  Home FeatureTrio: "100% Student Satisfaction" -> "Student
  Satisfaction". Student-certifications page: "Pay after you Pass
  methodology guarantees the attainment of your desired credentials"
  -> "means you pay only after you have attained your desired
  credentials" (payment terms, not an attainment promise). Remaining
  guarantee/100% hits are all protective disclaimers ("we do not
  guarantee a job", "no placement guarantees", the "Do you guarantee
  placement?" FAQ answered "No") — kept deliberately. Reviewed and
  kept with reasons: SOC "skills needed to land a role" (course
  objectives, not a promise), student testimonials naming employers
  (attributed statements, not institutional promises), CEH "Get
  certified. Get skilled. Get hired." slogan (no guarantee verb).
  No salary/LPA/package claims found anywhere.
- Vendor logos: no changes. Employer wall (XCube Labs, Cloud4C,
  Persistent, Diligient, Wipro, Astreya, Tericsoft, EY, Movate,
  PurpleTalk) is headed "Our Students works with", not "partners" —
  alumni employment framing, no partnership implied. No
  authorized/accredited/official-partner claim exists anywhere;
  vendor names appear only as course titles, certification targets,
  or tools taught. ISO/AICTE emblem cards LEFT untouched — their
  claims stay confirm-or-remove on the user's word (already flagged
  in code as "claimed, unverified"). Soft flag, unchanged: SOC copy's
  unnamed "hiring partners" phrase — a service description, no brand
  endorsed, but worth his confirmation.
- Policy drafts: /privacy-policy and /refund-policy created as real
  routes (terms-page pattern: staticPageMetadata + PageHero +
  sections from src/data/pages.ts), with a visible Draft notice and
  every unconfirmed fact as a visible [TODO] — legal entity name,
  CIN, grievance officer name + email, retention, refund terms,
  processors, timelines. Nothing invented; the only non-placeholder
  statements describe observable site behavior (enquiry forms,
  certificate verification, no analytics scripts) or already-published
  contact details. Footer Quick Links += Privacy Policy, Refund
  Policy; sitemap staticPaths += both routes (NO lastmod — new routes
  have no git history and this repo never invents dates). Sitemap
  count goes 90 -> 92.
- Trackers/cookies: zero analytics or tracking scripts in src (all
  "analytics" hits are course content: Log Analytics, Marketing
  analytics, Data Analytics course). External URLs in src are only:
  canonical/social/contact links, wa.me, Google Maps, OSM
  attribution, schema.org, blog-attribution links, and ONE hotlink
  exception — Inter loaded from fonts.googleapis.com (layout.tsx
  stylesheet + preconnects). That hotlink is reported, not fixed
  here: self-hosting Inter changes font delivery and needs visual
  verification; the v3 tree already self-hosts its fonts, so the fix
  path is known. No cookies set by the app itself (no auth, no
  trackers).
- CSP: NEW src/proxy.ts (Next 16 convention), porting Leo's exact
  policy + CORP, with ONE documented deviation: style-src adds
  https://fonts.googleapis.com and font-src adds
  https://fonts.gstatic.com, because a verbatim Leo policy would
  block the Inter font load above and silently change typography.
  Everything else is identical to Leo's policy. Static analysis of
  breakage vectors before shipping: images all local, forms post to
  /api/* (same-origin), client fetches same-origin only, no iframes,
  no workers, no external scripts. If the user prefers verbatim CSP,
  self-host Inter first, then drop the two allowances.
- Accessibility: skip link already existed and is correct
  (Header.tsx href="#main", Chrome renders <main id="main">) — the
  accessibility page's claim is true, no change needed. ADDED a
  global :focus-visible rule (2px solid currentColor, offset 2px)
  to globals.css: previously there was no focus rule at all and the
  page's "2px outline" promise rested on browser defaults. All
  sampled form fields carry visible <label htmlFor> labels. Body-text
  contrast values were NOT re-measured here (no redesign scope);
  the accessibility page's published token measurements are
  unchanged by this branch.
- Partner page: LeadForm gained an optional showCountry prop
  (default off); /partner-with-us passes it. The Country field is
  label-only and optional (not required, no validation change): its
  value is NOT sent to /api/leads and NOT stored, because the leads
  table has no country column. Wiring persistence needs a migration
  and is not done here.
- NOT done (need his word): course-finder quiz, batch calendar,
  Open Badges, partner portal, self-hosting Inter, country-column
  migration, any backend change (Axon stays), any hosting move,
  archiving anything.

## Compliance finish — SOC reword, Inter self-host, country code, policy facts (2026-10-25, branch feature/compliance-fixes, NOT merged, NOT deployed)
- SOC copy: "Get connected with hiring partners and job placement assistance." → "Get job placement assistance." No partnership implied; no claim invented.
- Inter self-hosted (closes the one hotlink): Google serves Inter as a VARIABLE font (fvar wght 100–900, verified with fontTools), so one file per subset covers all weights — public/fonts/inter-latin-normal.woff2 + inter-latin-ext-normal.woff2 (latin-ext covers the ₹ glyph U+20B9). @font-face rules in globals.css mirror the Leo pattern (font-display: swap, exact Google unicode-ranges). Google Fonts <link> + preconnects removed from layout.tsx; proxy.ts CSP dropped the two Google-Fonts allowances and is now verbatim Leo's policy. Served home HTML verified free of fonts.googleapis.com / fonts.gstatic.com.
- Country storage code (NOT the DB): LeadForm now sends country — the field previously existed but the hand-built payload omitted it. Client validateLead + server zod schema accept optional country (max 100 chars, empty counts as absent); createLead includes country in the full insert with the core-columns fallback. The leads.country column must exist before deploy — until the migration, the value is dropped by the fallback and the lead still stores. NOT tested with a localhost POST carrying country (per task scope).
- Policy facts filled from published/observable facts only: full street address (16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060) in Who-we-are + both Contact-us paragraphs; processors named as Supabase (database) + Vercel (hosting). Still TODO: CIN, legal entity name if different from trading name, grievance officer name/email, refund scope/eligibility/timelines/method/non-refundable items, retention periods, rights-request process + timelines, provider data regions, dedicated privacy/refund contact channels.
- NOT done here: the leads.country DB migration itself (separate), any merge/deploy.
