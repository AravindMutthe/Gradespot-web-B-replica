import type { Metadata } from "next";
import { whyChooseParagraphs } from "@/data/pages";
import { CtaBand, FaqList, PageHero, SectionTitle, siteFaqs } from "@/components/ui";

export const metadata: Metadata = { title: "Why Choose Us" };

export default function WhyChoosePage() {
  // whyChooseParagraphs: [intro, vision, mission, students-work-with(shared,
  // filtered), ...] — the first three are the page's own copy as published.
  const [intro, vision, mission] = whyChooseParagraphs;
  return (
    <>
      <PageHero title="Why Choose Us" />
      <section className="section-pad">
        <div className="wrap">
          <div className="mx-auto max-w-4xl">
            <SectionTitle title="We Offer The Best IT Solutions & Trainings To Our Customers at GradeSpot IT Solutions" />
            <p className="mt-4">{intro}</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-lg bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Vision</h2>
              <p className="mt-3">{vision}</p>
            </article>
            <article className="rounded-lg bg-surface-light p-8">
              <h2 className="text-2xl font-semibold">Mission</h2>
              <p className="mt-3">{mission}</p>
            </article>
          </div>
          <div className="mx-auto mt-14 max-w-3xl">
            <SectionTitle label="FAQ" title="Most common question about our services" />
            <div className="mt-6">
              <FaqList items={siteFaqs} />
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
