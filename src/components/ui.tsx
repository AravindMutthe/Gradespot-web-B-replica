import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/data/courses";
import type { Service } from "@/data/services";
import { stats } from "@/data/site";
import { servicesFaqAnswers } from "@/data/pages";
import { employers } from "@/data/employers";
import { blogPosts } from "@/data/blog";
import { testimonials } from "@/data/testimonials";

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-heading py-14 text-white md:py-20">
      <div className="wrap">
        <h1 className="text-4xl font-semibold md:text-[60px] md:leading-[72px]">{title}</h1>
        {subtitle && <p className="mt-3 max-w-3xl text-base text-white/80">{subtitle}</p>}
      </div>
    </section>
  );
}

export function SectionTitle({
  label,
  title,
  center,
}: {
  label?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {label && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{label}</p>
      )}
      <h2 className="mt-2 text-[32px] font-semibold leading-[38px] text-heading">{title}</h2>
    </div>
  );
}

export function StatsRibbon() {
  return (
    <section className="bg-brand py-10 text-white">
      <div className="wrap grid grid-cols-2 gap-6 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-4xl font-extrabold">{s.value}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// v2: layered course card (structure ported from Leo's CourseCardBody) —
// image with Free Demo badge + duration chip, category, title, summary,
// Read More + Free Demo links. Styled in replica tokens only: white card,
// replica shadow, brand links. Leo's sepia image treatment, gradient
// overlay and hover lift are NOT ported (visual treatments).
export function CourseCardBody({
  slug,
  title,
  category,
  summary,
  image,
  duration,
}: {
  slug: string;
  title: string;
  category: string;
  summary?: string;
  image?: string | null;
  duration?: string;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_5px_30px_rgba(214,215,216,0.57)]">
      {image ? (
        <Link href={`/trainings/${slug}`} className="relative block" aria-label={title}>
          <Image
            src={image}
            alt={title}
            width={600}
            height={340}
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            className="h-44 w-full object-cover"
          />
          <span className="absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
            Free Demo
          </span>
          {duration && (
            <span className="absolute bottom-3 left-3 rounded-md bg-heading/85 px-2.5 py-1 text-[11.5px] font-semibold text-white">
              {duration}
            </span>
          )}
        </Link>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-heading px-6 text-center">
          <span className="text-lg font-semibold text-white">{category}</span>
        </div>
      )}
      <div className="flex grow flex-col p-6">
        <p>
          <span className="inline-block rounded-md bg-surface-light px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            {category}
          </span>
        </p>
        <h3 className="mt-3 text-lg font-bold leading-snug text-heading">
          <Link href={`/trainings/${slug}`} className="hover:text-brand">
            {title}
          </Link>
        </h3>
        {duration && !image && (
          <p className="mt-2 text-xs font-semibold text-brand">Duration — {duration}</p>
        )}
        {summary && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{summary}</p>
        )}
        <div className="mt-auto flex items-center gap-4 pt-4">
          <Link
            href={`/trainings/${slug}`}
            className="text-sm font-semibold text-brand hover:underline"
          >
            Read More →
          </Link>
          <Link
            href={`/register?course=${slug}`}
            className="text-sm font-semibold text-brand hover:underline"
          >
            Free Demo →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <CourseCardBody
      slug={course.slug}
      title={course.title}
      category={course.category}
      summary={course.summary}
      image={course.image}
      duration={course.duration}
    />
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="flex flex-col bg-white px-[30px] py-[50px] shadow-[0_5px_30px_rgba(214,215,216,0.57)]">
      <h3 className="text-xl font-bold text-heading">{service.title}</h3>
      <Link
        href={`/services/${service.slug}`}
        className="mt-auto inline-block pt-5 text-sm font-semibold text-brand hover:underline"
      >
        Read More →
      </Link>
    </article>
  );
}

// v2: FAQ expansion 3 → 9 (ported from Leo). The 6 added answers come only
// from real published content: both class formats, enquiry-confirmed batch
// schedules, the free-demo offer, published per-course fees (CCNA/CCNP)
// with "confirmed on enquiry" elsewhere, named certifications, and the
// no-placement-guarantee rule. No invented figures anywhere.
export const siteFaqs = [
  { q: "What training programs do you offer?", a: servicesFaqAnswers.trainings },
  { q: "What services do you offer?", a: servicesFaqAnswers.services },
  { q: "What's the best way to get in touch with your team?", a: servicesFaqAnswers.contact },
  {
    q: "Are classes online or offline?",
    a: "Both. Classes run from our Dilsukhnagar institute in Hyderabad, with live online classes and recorded lessons plus hands-on labs for practical skills. Ask about the format for your training when you enquire.",
  },
  {
    q: "When do batches start, and how do I find the schedule?",
    a: "Batch schedules are confirmed on enquiry — call +91 91826 54056 or send an enquiry and the team will confirm the next batch for your training.",
  },
  {
    q: "Can I try a class before joining?",
    a: "Yes. Book a free demo class for any training — register on the site and the team will confirm your seat by phone.",
  },
  {
    q: "What do the trainings cost?",
    a: "Fees are published on each training page where they are fixed — for example CCNA and CCNP. Where no fee is published, it is confirmed on enquiry and nothing is charged before you confirm.",
  },
  {
    q: "Do I get a certificate after the training?",
    a: "Each training prepares you for the certification named on its page, and GradeSpot certificates can be verified on this site by certificate code.",
  },
  {
    q: "Do you guarantee placement after training?",
    a: "No. We publish the job roles each training prepares you for and the companies our students work with, and we offer hands-on labs, certification guidance and career services — but we do not publish placement percentages and we do not guarantee a job.",
  },
];

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items
        .filter((f) => f.a)
        .map((f) => (
          <details key={f.q} className="rounded bg-surface-light px-5 py-4">
            <summary className="cursor-pointer text-lg font-semibold text-heading">
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-6 text-body">{f.a}</p>
          </details>
        ))}
    </div>
  );
}

export function CtaBand() {
  return (
    <section className="bg-heading py-14 text-white">
      <div className="wrap flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-[32px] font-semibold leading-[38px]">Need Help?</h2>
          <p className="mt-1 text-white/80">
            Reach out to the world&apos;s most reliable IT services. Get a free consultation.
          </p>
        </div>
        <Link href="/contact-us" className="btn-primary">
          Contact Us
        </Link>
      </div>
    </section>
  );
}

// "Our Students works with" employer logo wall — shown across the live
// site (Trainings, Services, About, Why Choose Us, Testimonials, Student
// Certifications, Certificate Verification and every course page).
export function LogoWall() {
  return (
    <section className="bg-surface-light section-pad">
      <div className="wrap">
        <SectionTitle title="Our Students works with" center />
        <p className="mx-auto mt-3 max-w-2xl text-center">
          Our students have been employed by some of the top companies in the industry.
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {employers.map((e) => (
            <div
              key={e.name}
              className="flex h-24 items-center justify-center rounded bg-white px-4 shadow-sm"
            >
              <Image
                src={e.logo}
                alt={e.name}
                width={211}
                height={96}
                className="max-h-16 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Blog article cards from the external blog (digidefense.in), as shown on
// the live Trainings page and the CCNA/CCNP/SOC/CEH course pages.
export function BlogCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((p) => (
        <article
          key={p.title}
          className="flex flex-col overflow-hidden rounded-md bg-white shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
        >
          <a href={p.url} target="_blank" rel="noreferrer">
            <Image
              src={p.image}
              alt={p.title}
              width={600}
              height={340}
              className="h-44 w-full object-cover"
            />
          </a>
          <div className="flex grow flex-col p-6">
            <h3 className="text-base font-bold leading-snug text-heading">{p.title}</h3>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-block pt-4 text-sm font-semibold text-brand hover:underline"
            >
              Read More →
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

// Feature trio strip from the live Home/About/Trainings/course pages.
export function FeatureTrio() {
  const items = [
    "100% Student Satisfaction",
    "Top Class Trainings",
    "Online & Offline Classes",
  ];
  return (
    <section className="section-pad">
      <div className="wrap">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <article
              key={t}
              className="bg-white px-[30px] py-[40px] text-center shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
            >
              <h3 className="text-xl font-bold text-heading">{t}</h3>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/contact-us" className="btn-primary">
            Talk to a Trainer
          </Link>
        </div>
      </div>
    </section>
  );
}

// "9 years of experience" badge from the live Home/About/Why Choose Us.
export function ExperienceBadge() {
  return (
    <div className="inline-flex items-center gap-3 rounded-lg bg-heading px-5 py-4 text-white">
      <span className="text-4xl font-extrabold text-brand">9 Years</span>
      <span className="text-sm font-medium leading-tight">
        of
        <br />
        Experience
      </span>
    </div>
  );
}

// Founder signature block from the live Home and About pages.
export function SignatureBlock() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <Image
        src="/images/signature.png"
        alt="Signature of Nikhil Duth D"
        width={300}
        height={243}
        className="h-20 w-auto"
      />
      <div>
        <p className="text-lg font-semibold text-heading">Nikhil Duth D</p>
        <p className="text-sm text-body">Founder &amp; MD — Corporate Trainings</p>
      </div>
    </div>
  );
}

// Social links (LinkedIn company page + YouTube) with inline SVG icons.
export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://in.linkedin.com/company/gradespot-it-solutions",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/watch?v=owhuBrGIOsE",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export function SocialLinks({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <>
      {socialLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`GradeSpot IT Solutions on ${s.label}`}
          className="hover:text-brand"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </>
  );
}

// v2: answer-first "In short" box (ported from Leo's AnswerLead). The id
// defaults to "answer-summary" so course-page speakable schema points at
// the visible answer. Replica styling: surface-light box, brand rule.
export function AnswerLead({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p
      id={id ?? "answer-summary"}
      className="rounded-lg border-l-4 border-brand bg-surface-light px-5 py-4 text-[15px] leading-7 text-body"
    >
      <span className="mr-2 font-bold text-heading">In short:</span>
      {children}
    </p>
  );
}

// v2: three-pick testimonial spotlight (ported from Leo). Picks are the
// same three verbatim Google testimonials; nothing is invented here.
export function TestimonialSpotlight() {
  const picks = ["M Vamsi", "Arif Syed", "kruthikrishna dwaraka"]
    .map((name) => testimonials.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  if (picks.length === 0) return null;
  return (
    <section className="section-pad">
      <div className="wrap">
        <SectionTitle label="Learner Voices" title="What our learners say" center />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {picks.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-md bg-white p-7 shadow-[0_5px_30px_rgba(214,215,216,0.57)]"
            >
              <span aria-hidden className="text-[44px] font-bold leading-[0.6] text-brand">
                &ldquo;
              </span>
              <blockquote className="mt-3 grow text-[14.5px] leading-7 text-heading">
                {t.text}
              </blockquote>
              <figcaption className="mt-4 border-t border-neutral-200 pt-3.5">
                <span className="block text-sm font-semibold text-heading">{t.name}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-body">
                  {t.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link href="/register" className="btn-primary">
            Register / Book a Free Demo
          </Link>
          <Link
            href="/testimonials"
            className="text-sm font-bold text-brand hover:underline"
          >
            Read all learner voices →
          </Link>
        </div>
      </div>
    </section>
  );
}

// v2: For Institutes band on the home page (ported from Leo). Factual
// copy only — no prices (tier pricing undecided), no delivery promises,
// no testimonials. Replica styling: navy band, white cards on navy.
export function ForInstitutesBand() {
  const items = [
    {
      t: "WhatsApp Lead Engine",
      d: "Instant replies, lead capture and counsellor alerts on your own number.",
    },
    {
      t: "Secure Learning Hub",
      d: "Watermarked video courses with student logins and progress tracking.",
    },
    {
      t: "Resilient Linux Lab",
      d: "PXE thin-client labs that recover with a reboot, not a repair call.",
    },
  ];
  return (
    <section className="bg-heading section-pad text-white">
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand">
            For Institutes
          </p>
          <h2 className="mt-3.5 text-[32px] font-semibold leading-[1.15] text-white md:text-[38px]">
            Run an Institute? Automate Admissions.
          </h2>
          <p className="mt-3.5 text-white/80">
            GradeSpot builds the products it runs on. Our Axon products for training institutes
            start with our own admissions — and are available to yours.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
          {items.map((x, i) => (
            <article
              key={x.t}
              className="rounded-[18px] bg-white/10 px-7 py-8 ring-1 ring-white/20"
            >
              <p className="text-[12px] font-bold text-brand">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2.5 text-lg font-semibold text-white">{x.t}</h3>
              <p className="mt-2 text-sm leading-6 text-white/80">{x.d}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/for-institutes" className="btn-primary">
            Explore For Institutes
          </Link>
          <Link href="/for-institutes#demo" className="btn-outline-light">
            Book a Demo
          </Link>
          <Link href="/for-colleges" className="btn-outline-light">
            For Colleges
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-white/80">
          Or start a different conversation —{" "}
          <Link
            href="/partner-with-us"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            collaborations &amp; franchise discussions are welcome →
          </Link>
        </p>
      </div>
    </section>
  );
}

// v2: official-emblem credential card (ported from Leo's CredentialCard).
// The emblems are official ISO/AICTE artwork (not Leo styling), shown on a
// white disc in replica card styling. The ISO/AICTE claims themselves
// stay confirm-or-remove (DECISIONS.md v2 section) — the cards render the
// same "claimed, unverified" copy Leo carried, not a verified claim.
export function CredentialEmblem({ kind }: { kind: "iso" | "aicte" }) {
  const src = kind === "iso" ? "/images/iso-logo.svg" : "/images/aicte-logo.png";
  const alt = kind === "iso" ? "ISO 9001:2015 emblem" : "AICTE emblem";
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-2 ring-1 ring-neutral-200">
      <Image src={src} alt={alt} width={96} height={96} className="max-h-full w-auto object-contain" />
    </div>
  );
}

export function CredentialCard({
  title,
  body,
  seal,
}: {
  title: string;
  body: string;
  seal: "iso" | "aicte";
}) {
  return (
    <article className="flex items-center gap-5 rounded-md bg-white p-5 shadow-[0_5px_30px_rgba(214,215,216,0.57)] sm:gap-6 sm:p-6">
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-heading">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-body">{body}</p>
      </div>
      <CredentialEmblem kind={seal} />
    </article>
  );
}
