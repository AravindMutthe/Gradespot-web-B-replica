// Business facts exactly as published on the live gsitssolutions.com
// (crawl 2026-10-23). Conflicts between pages are logged in DECISIONS.md —
// the header/footer pair below is the sitewide-published one; the Contact
// page additionally lists every number the live site publishes.

export const business = {
  name: "GradeSpot IT Solutions",
  legalName: "GradeSpot IT Solutions Pvt. Ltd.",
  locationLabel: "Dilsukhnagar, Hyderabad",
  address:
    "16-126, 2nd Floor, Near Sai Baba Temple, Road No.1, Sri Krishna Nagar, Dilsukhnagar, Hyderabad, Telangana - 500060",
  // Published in the header and footer of every live page.
  phones: ["+91 88866 60597", "+91 91826 54056"],
  // Additionally published in "Call Us" blocks on the live Contact,
  // Testimonials, Why Choose Us and Services pages. See DECISIONS.md.
  extraPhones: ["+91 76600 43217"],
  emails: ["info@gsitssolutions.com", "hr@gsitssolutions.com"],
  officeHours: "8:00 AM – 9:00 PM",
  digitalUrl: "https://digital.gsitssolutions.com",
  blogUrl: "https://digidefense.in",
};

export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^+\d]/g, "");
}

// Counters as published on the live site. "Certified Learners" is NOT shown:
// the live site publishes it as both 1200 and 1500 on different pages
// (see DECISIONS.md). These four figures are consistent across pages.
export const stats = [
  { value: "1,500+", label: "Happy Learners" },
  { value: "1500", label: "Students Enrolled" },
  { value: "250", label: "Interns" },
  { value: "12", label: "Web Projects" },
];
