import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getServices } from "@/lib/data";
import { homeParagraphs } from "@/data/pages";
import { team } from "@/data/team";
import { CourseCard, CredentialCard, CtaBand, ExperienceBadge, FaqList, FeatureTrio, ForInstitutesBand, SectionTitle, ServiceCard, SignatureBlock, StatsRibbon, TestimonialSpotlight, siteFaqs, AnswerLead } from "@/components/ui";
import JsonLd from "@/components/JsonLd";
import Ticker from "@/components/Ticker";
import PromoBanner from "@/components/PromoBanner";
import OfferCards from "@/components/OfferCards";
import { faqSchema, webPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: {
    absolute: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
  alternates: { canonical: "/", languages: { en: "/" } },
  openGraph: {
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: [{ url: "/images/og/home.jpg" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Training Institute in Hyderabad, Dilsukhnagar | GradeSpot IT Solutions",
    description:
      "GradeSpot IT Solutions is an IT training institute in Dilsukhnagar, Hyderabad offering cybersecurity, cloud, networking, digital marketing and more — online & offline classes, corporate training, internships and IT services.",
    images: ["/images/og/home.jpg"],
  },
};

export default async function HomePage() {
  const [courses, services] = await Promise.all([getCourses(), getServices()]);
  const featuredCourses = courses.filter((c) => !c.catalogOnly).slice(0, 6);

  return (
    <>
      <JsonLd data={faqSchema(siteFaqs)} />
      <JsonLd data={webPageSchema("/", "GradeSpot IT Solutions", "#answer-summary")} />
      {/* Hero — headline and copy as published on the live homepage.
          Background: hero-students photo at 40% opacity under the 50%
          black overlay (net ~20% presence) — visible but clearly behind
          the text, students anchored bottom-right. */}
      <section className="relative bg-heading text-white">
        {/* Desktop/tablet: photo as a faded background. Mobile: the
            cover crop cut students off, so the background is hidden
            below md and the students band below renders instead. */}
        <Image
          src="/images/hero-students.jpg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-right-bottom opacity-40 md:block"
        />
        <div className="absolute inset-0 hidden bg-black/60 md:block" aria-hidden />
        <div className="wrap relative py-20 pb-10 md:py-28">
          <h1 className="max-w-3xl text-5xl font-normal leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.65)] md:text-[80px] md:leading-[96px]">
            We Create Better <span className="font-extrabold">IT Solutions</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/85">{homeParagraphs[1]}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/trainings" className="btn-primary">
              Explore Trainings
            </Link>
            <Link href="/services" className="btn-outline-light">
              Our Services
            </Link>
          </div>
        </div>
        {/* Mobile: full students band, no crop — all five students fit. */}
        <div className="relative md:hidden">
          <Image
            src="/images/hero-students-mobile.jpg"
            alt=""
            aria-hidden
            width={968}
            height={553}
            className="block h-auto w-full"
          />
        </div>
      </section>
      <section>
        {/* Audience doors — the split-audience routing the nav research
            prescribes (SANS/OffSec pattern, §22): a student, an
            institute owner and a college/partner each get their door
            inside the first screen, not after a scroll hunt. */}
        <div className="wrap pb-14">
          <div className="grid gap-3.5 md:grid-cols-3">
            {[
              {
                audience: "Students & Learners",
                title: "Trainings & Free Demo Classes",
                href: "/trainings",
              },
              {
                audience: "Institute Owners",
                title: "Automate Your Admissions",
                href: "/for-institutes",
              },
              {
                audience: "Colleges & Partners",
                title: "Workshops, Internships & Collaboration",
                href: "/for-colleges",
              },
            ].map((d, i) => (
              <Link
                key={d.audience}
                href={d.href}
               
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="group flex items-center justify-between gap-4 rounded-none border border-line bg-parchment px-6 py-5 transition duration-300 hover:-translate-y-0.5"
              >
                <span>
                  <span className="eyebrow block text-[10.5px] text-signal-strong">{d.audience}</span>
                  <span className="mt-1.5 block text-[17.5px] font-semibold leading-snug text-heading">
                    {d.title}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="text-xl text-signal transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AEO answer-first summary (§25.22): the direct answer to "what
          is GradeSpot", drawn only from published copy, before detail. */}
      <div className="wrap pt-8">
        <AnswerLead id="answer-summary">
          GradeSpot IT Solutions is an IT training institute and services company in
          Dilsukhnagar, Hyderabad. It offers {courses.length} trainings in cybersecurity,
          cloud, networking, programming, data and digital marketing, with online and
          offline classes, plus corporate training, internships and IT services. Learners
          can start with a free demo class.
        </AnswerLead>
      </div>

      <Ticker />

      {/* What we do — the four published homepage blurbs */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="What We Do" title="Transform every Digital Process" center />
          <div className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Top Class Trainings", d: homeParagraphs[2], img: "/images/courses/ceh.jpg" },
              { t: "Web Design & Development", d: homeParagraphs[3], img: "/images/courses/java-full-stack.jpg" },
              { t: "Cyber Security", d: homeParagraphs[4], img: "/images/blog/Golden-Ticket-Attack.jpg" },
              { t: "Digital Marketing", d: homeParagraphs[5], img: "/images/courses/digital-marketing.jpg" },
            ].map((x, i) => (
              <article
                key={x.t}
               
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
                className="group overflow-hidden rounded-none border border-line bg-parchment transition duration-300 hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={x.img}
                    alt={x.t}
                    width={600}
                    height={340}
                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                    className="h-36 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="eyebrow absolute left-3 top-3 rounded-md bg-ink/85 px-2.5 py-1.5 text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="px-7 py-7">
                  <h3 className="text-xl font-bold">{x.t}</h3>
                  <p className="mt-2 text-sm leading-6">{x.d}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-4">
        <PromoBanner />
      </div>

      {/* Intro + credentials, as published */}
      <section className="bg-surface-light section-pad">
        <div className="wrap grid items-start gap-[30px] lg:grid-cols-2">
          <div>
            <SectionTitle
              label="About GradeSpot"
              title="We assist companies in enhancing their digital presence and fortifying their Security"
            />
            <p className="mt-4">{homeParagraphs[6]}</p>
            <div className="mt-6">
              <ExperienceBadge />
            </div>
            <Link href="/about-us" className="btn-primary mt-6">
              About Us
            </Link>
            <div className="mt-8">
              <SignatureBlock />
            </div>
          </div>
          <div className="space-y-6">
            <CredentialCard
              title="An ISO Certified Company"
              body={homeParagraphs[8]}
              seal="iso"
            />
            <CredentialCard
              title="AICTE Internships Approved"
              body={homeParagraphs[10]}
              seal="aicte"
            />
          </div>
        </div>
      </section>

      <StatsRibbon />

      {/* Trainings preview */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="Trainings" title="Top Class Trainings" center />
          <div className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/trainings" className="btn-primary">
              View All Trainings
            </Link>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-surface-light section-pad">
        <div className="wrap">
          <SectionTitle label="Services" title="Elevating Minds — Unleashing Creativity" center />
          <div className="mt-10 grid gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn-primary">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Offer board — the free first steps (promotions data layer, §19) */}
      <section className="section-pad">
        <div className="wrap">
          <SectionTitle label="No-Cost First Steps" title="Start Free" center />
          <div className="mt-10">
            <OfferCards excludeSlug="free-demo-card" />
          </div>
        </div>
      </section>

      <ForInstitutesBand />

      {/* Trusted by + leadership */}
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-3xl text-center">
            <SectionTitle title="Trusted by 1,500+ Happy Learners" center />
            <p className="mt-4">{homeParagraphs[11]}</p>
          </div>
          <h3 className="mt-14 text-center text-[32px] font-semibold leading-[44.8px] tracking-[1px] text-heading">
            Meet Our Leadership
          </h3>
          <div className="mx-auto mt-8 grid max-w-4xl gap-[30px] sm:grid-cols-3">
            {team.map((m) => (
              <article key={m.name} className="text-center">
                <Image
                  src={m.image}
                  alt={m.name}
                  width={350}
                  height={350}
                  sizes="(min-width:640px) 33vw, 100vw"
                  className="mx-auto h-56 w-full rounded-none object-cover"
                />
                <h4 className="mt-3 text-lg font-semibold leading-[21.6px]">{m.name}</h4>
                <p className="text-sm text-signal">{m.role}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/team-members" className="text-sm font-semibold text-signal hover:underline">
              Meet Our Team →
            </Link>
          </div>
        </div>
      </section>

      <FeatureTrio />

      {/* FAQ */}
      <section className="bg-surface-light section-pad">
        <div className="wrap grid gap-[30px] lg:grid-cols-[1fr_1.4fr]">
          <SectionTitle label="FAQ" title="Most common question about our services" />
          <FaqList items={siteFaqs} />
        </div>
      </section>

      {/* Learner proof beside the final ask (§22) */}
      <TestimonialSpotlight />

      <CtaBand />
    </>
  );
}
