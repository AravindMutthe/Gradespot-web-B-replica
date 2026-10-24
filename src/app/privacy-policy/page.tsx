import { staticPageMetadata } from "@/lib/metadata";
import { privacySections } from "@/data/pages";
import { PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Privacy Policy",
  description: "How GradeSpot IT Solutions collects, uses, and protects the personal information you submit on this website, Dilsukhnagar, Hyderabad.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="section-pad">
        <div className="wrap mx-auto max-w-4xl space-y-10">
          <p className="rounded-[14px] border border-line bg-cream px-5 py-4 text-sm leading-6 text-body">
            <strong className="text-heading">Draft notice:</strong> this policy is not final.
            Every item marked [TODO] is awaiting confirmation from GradeSpot IT Solutions.
            Do not treat placeholder text as a commitment.
          </p>
          {privacySections.map((s, i) => (
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
