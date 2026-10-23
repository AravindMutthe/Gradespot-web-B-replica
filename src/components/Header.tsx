"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { business, telHref } from "@/data/site";
import { SocialLinks } from "@/components/ui";

const resourceLinks = [
  { label: "Team Members", href: "/team-members" },
  { label: "Why Choose Us", href: "/why-choose-us" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: business.blogUrl, external: true },
  { label: "Student Certifications", href: "/student-certifications" },
  { label: "Certificate Verification", href: "/certificate-verification" },
];

const navLink =
  "block px-3 py-2 text-[13px] font-semibold uppercase tracking-wide text-nav hover:text-brand";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      {/* Top bar — as published on the live site */}
      <div className="bg-heading text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 text-[12.5px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{business.locationLabel}</span>
            <a className="hover:text-brand" href={`mailto:${business.emails[0]}`}>
              {business.emails[0]}
            </a>
            <span>Office Hours: {business.officeHours}</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-3">
              <SocialLinks />
            </span>
            {business.phones.map((p) => (
              <a key={p} className="font-semibold hover:text-brand" href={telHref(p)}>
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="wrap flex items-center justify-between py-3">
        <Link href="/" aria-label="GradeSpot IT Solutions — Home" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="GradeSpot IT Solutions"
            width={193}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <Link className={navLink} href="/">
            Home
          </Link>
          <Link className={navLink} href="/about-us">
            About Us
          </Link>
          <Link className={navLink} href="/trainings">
            Trainings
          </Link>
          <div className="group relative">
            <Link className={navLink} href="/resources" aria-haspopup="true">
              Resources <span aria-hidden>▾</span>
            </Link>
            <div className="invisible absolute left-0 top-full z-50 w-64 border-t-2 border-brand bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {resourceLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-2.5 text-[13px] font-semibold text-nav hover:bg-surface-light hover:text-brand"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block px-4 py-2.5 text-[13px] font-semibold text-nav hover:bg-surface-light hover:text-brand"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>
          </div>
          <a className={navLink} href={business.digitalUrl} target="_blank" rel="noreferrer">
            Digital ↗
          </a>
          <Link className={navLink} href="/services">
            Services
          </Link>
          <Link className={navLink} href="/contact-us">
            Contact Us
          </Link>
          <Link href="/contact-us" className="btn-primary ml-3">
            Get Started
          </Link>
        </nav>

        <button
          className="rounded border border-neutral-300 px-3 py-2 text-sm font-semibold text-heading lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          ☰ Menu
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-neutral-100 bg-white lg:hidden" aria-label="Mobile">
          <div className="wrap flex flex-col py-2">
            <Link className={navLink} href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link className={navLink} href="/about-us" onClick={() => setOpen(false)}>
              About Us
            </Link>
            <Link className={navLink} href="/trainings" onClick={() => setOpen(false)}>
              Trainings
            </Link>
            <button
              className={`${navLink} flex items-center justify-between text-left`}
              onClick={() => setResourcesOpen(!resourcesOpen)}
              aria-expanded={resourcesOpen}
            >
              Resources <span aria-hidden>{resourcesOpen ? "▴" : "▾"}</span>
            </button>
            {resourcesOpen &&
              resourceLinks.map((l) =>
                l.external ? (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block py-2 pl-6 pr-3 text-[13px] font-medium text-nav"
                  >
                    {l.label} ↗
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="block py-2 pl-6 pr-3 text-[13px] font-medium text-nav"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ),
              )}
            <a className={navLink} href={business.digitalUrl} target="_blank" rel="noreferrer">
              Digital ↗
            </a>
            <Link className={navLink} href="/services" onClick={() => setOpen(false)}>
              Services
            </Link>
            <Link className={navLink} href="/contact-us" onClick={() => setOpen(false)}>
              Contact Us
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
