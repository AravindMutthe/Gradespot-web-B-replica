import { staticPageMetadata } from "@/lib/metadata";
import { corporateSections } from "@/data/pages";
import { PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Corporate & International",
  description: "Corporate trainings and international learners at GradeSpot IT Solutions, Hyderabad — cybersecurity and networking training for organisations and students from the US, UK, France and Germany.",
  path: "/corporate-and-international",
});

export default function CorporateInternationalPage() {
  return (
    <>
      <PageHero
        title="Corporate & International"
        subtitle="Cybersecurity and networking training in Hyderabad — for organisations, colleges, and learners from India and abroad."
      />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-10">
          {corporateSections.map((s, i) => (
            <article key={i}>
              {s.heading && (
                <h2 className="text-[26px] font-semibold leading-[32px]">{s.heading}</h2>
              )}
              <div className="mt-3 space-y-4">
                {s.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
