import type { Metadata } from "next";
import "./globals.css";
import Chrome from "@/components/Chrome";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

// v2: canonical/OG base — the REPLICA build itself is the ranking entity:
// self-referential to the replica domain (never Leo's domain, never the
// official site). Home OG card is a replica-generated image (see
// scripts/generate-og-cards.py); it replaces the old no-OG default.
export const metadata: Metadata = {
  metadataBase: new URL("https://gradespot-app.vercel.app"),
  title: {
    default: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    template: "%s - GradeSpot IT Solutions",
  },
  description:
    "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
  openGraph: {
    type: "website",
    siteName: "GradeSpot IT Solutions",
    locale: "en_IN",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
    images: [{ url: "/images/og/home.jpg", alt: "GradeSpot IT Solutions — IT training institute in Hyderabad, Dilsukhnagar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GradeSpot IT Solutions - Empower Your Business with Top-Notch IT Solutions",
    description:
      "GradeSpot IT Solutions, Dilsukhnagar, Hyderabad — IT training institute and services company: cybersecurity, cloud, networking and digital marketing trainings, corporate training, internships and IT services.",
    images: ["/images/og/home.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
