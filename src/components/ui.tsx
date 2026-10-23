import Image from "next/image";
import Link from "next/link";
import type { Course } from "@/data/courses";
import type { Service } from "@/data/services";
import { stats } from "@/data/site";
import { servicesFaqAnswers } from "@/data/pages";

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
