import Image from "next/image";
import Link from "next/link";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

// v2: footer link structure ported from Leo — new v2 routes added to the
// existing columns (Company += Career Support, For Colleges, Partner With
// Us; Quick += Contact Us, Accessibility). The 4-column layout itself is
// kept faithful: Leo's extra Popular Trainings column is NOT added (the
// popular courses are already linked from the header mega menu, home and
// trainings pages).
const companyLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Career Support", href: "/career-support" },
  { label: "For Colleges", href: "/for-colleges" },
  { label: "Partner With Us", href: "/partner-with-us" },
  { label: "Help & FAQs", href: "/faq" },
];

const quickLinks = [
  { label: "Trainings", href: "/trainings" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Student Certifications", href: "/student-certifications" },
  { label: "Certificate Verification", href: "/certificate-verification" },
  { label: "Terms and Conditions", href: "/terms-and-conditions" },
  { label: "Accessibility", href: "/accessibility" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-footer-text">
      <div className="wrap grid gap-[30px] py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo-light.png"
            alt="GradeSpot IT Solutions"
            width={193}
            height={60}
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm leading-6">
            At GradeSpot IT Solutions, our commitment is to craft superior IT solutions that
            redefine industry standards — training, services and cybersecurity from
            Dilsukhnagar, Hyderabad.
          </p>
          <p className="mt-5 text-sm font-semibold text-white">Connect With Us</p>
          <p className="mt-2 flex items-center gap-4">
            <SocialLinks className="h-5 w-5" />
          </p>
        </div>

        <nav aria-label="Company">
          <h3 className="mb-4 text-[24px] font-semibold leading-[28.8px] text-white">Company</h3>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-brand" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Quick links">
          <h3 className="mb-4 text-[24px] font-semibold leading-[28.8px] text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link className="hover:text-brand" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-[24px] font-semibold leading-[28.8px] text-white">Contact Info</h3>
          <address className="space-y-3 text-sm not-italic leading-6">
            <p>{business.address}</p>
            <p>
              {business.emails.map((e) => (
                <span key={e} className="block">
                  <a className="hover:text-brand" href={`mailto:${e}`}>
                    {e}
                  </a>
                </span>
              ))}
            </p>
            <p>
              {business.phones.map((p) => (
                <span key={p} className="block">
                  <a className="hover:text-brand" href={telHref(p)}>
                    {p}
                  </a>
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-wrap items-center justify-between gap-2 py-4 text-[13px] text-[#CCCCCC]">
          <p>© Copyright {new Date().getFullYear()}. {business.legalName}</p>
          <p>
            <Link className="hover:text-brand" href="/">
              Home
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/testimonials">
              Testimonials
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/services">
              Our Services
            </Link>
            {" · "}
            <Link className="hover:text-brand" href="/terms-and-conditions">
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
