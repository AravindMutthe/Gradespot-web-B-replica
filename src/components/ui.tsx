import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/data/courses";
import type { Service } from "@/data/services";
import { stats } from "@/data/site";
import { servicesFaqAnswers } from "@/data/pages";
import { employers } from "@/data/employers";
import { blogPosts } from "@/data/blog";

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

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md bg-white shadow-[0_5px_30px_rgba(214,215,216,0.57)]">
      {course.image ? (
        <Image
          src={course.image}
          alt={course.title}
          width={600}
          height={340}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-heading px-6 text-center">
          <span className="text-lg font-semibold text-white">{course.category}</span>
        </div>
      )}
      <div className="flex grow flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand">
          {course.category}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug text-heading">{course.title}</h3>
        {course.summary && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-body">{course.summary}</p>
        )}
        <Link
          href={`/trainings/${course.slug}`}
          className="mt-auto inline-block pt-4 text-sm font-semibold text-brand hover:underline"
        >
          Read More →
        </Link>
      </div>
    </article>
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

export const siteFaqs = [
  { q: "What training programs do you offer?", a: servicesFaqAnswers.trainings },
  { q: "What services do you offer?", a: servicesFaqAnswers.services },
  { q: "What's the best way to get in touch with your team?", a: servicesFaqAnswers.contact },
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
