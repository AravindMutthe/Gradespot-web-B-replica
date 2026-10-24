import { staticPageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { team } from "@/data/team";
import { CtaBand, PageHero } from "@/components/ui";

export const metadata = staticPageMetadata({
  title: "Team Members",
  description: "Expert team — meet the leadership behind GradeSpot IT Solutions, Dilsukhnagar, Hyderabad, including Founder & MD Nikhil Duth D.",
  path: "/team-members",
  image: "/images/team/nikhil-duth-d.jpg",
});

export default function TeamPage() {
  return (
    <>
      <PageHero title="Team Members" subtitle="Expert Team — Meet Our Leadership" />
      <section className="section-pad">
        <div className="wrap grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article
              key={m.name}
              className="overflow-hidden rounded-none bg-white text-center"
            >
              <Image
                src={m.image}
                alt={m.name}
                width={350}
                height={350}
                className="h-80 w-full object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-semibold leading-[21.6px]">{m.name}</h2>
                <p className="mt-1 text-sm font-medium text-brand">{m.role}</p>
                {m.email && (
                  <p className="mt-2 text-sm">
                    <a className="text-brand hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                  </p>
                )}
                {m.profileHref && (
                  <p className="mt-3">
                    <Link
                      href={m.profileHref}
                      className="text-sm font-semibold text-brand hover:underline"
                    >
                      View Profile →
                    </Link>
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
