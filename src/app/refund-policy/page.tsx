import { staticPageMetadata } from "@/lib/metadata";
import { refundSections } from "@/data/pages";
import { PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Refund Policy",
  description: "Refund eligibility, timelines, and process for GradeSpot IT Solutions training courses and services, Dilsukhnagar, Hyderabad.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <>
      <PageHero title="Refund Policy" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-10">
          <p className="rounded-[14px] border border-line bg-cream px-5 py-4 text-sm leading-6 text-body">
            <strong className="text-heading">Draft notice:</strong> this policy is not final.
            Every item marked [TODO] is awaiting confirmation from GradeSpot IT Solutions.
            Do not treat placeholder text as a commitment.
          </p>
          {refundSections.map((s, i) => (
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
