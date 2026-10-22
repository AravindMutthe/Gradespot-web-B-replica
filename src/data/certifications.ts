// Student certification gallery as published on the live
// "Our Students 100+ Certifications" page (crawl 2026-10-23).
// Captions come from the images' published alt text.

export interface CertificationImage {
  image: string;
  caption: string;
}

export const certificationGallery: CertificationImage[] = [
  { image: "/images/certifications/cert-1.jpg", caption: "Madhav Sai — eJPT" },
  { image: "/images/certifications/cert-2.jpg", caption: "Rakesh Reddy — CompTIA Security" },
  { image: "/images/certifications/cert-3.jpg", caption: "Pradyumna — eJPT" },
  { image: "/images/certifications/cert-4.jpg", caption: "Nikhil Sai Sriramula" },
  { image: "/images/certifications/cert-5.jpg", caption: "AVN Raju" },
  { image: "/images/certifications/cert-6.jpg", caption: "Nani T" },
  { image: "/images/certifications/cert-7.jpg", caption: "Pavan Kumar Vadde" },
  { image: "/images/certifications/cert-8.jpg", caption: "Durga Prasad" },
  { image: "/images/certifications/cert-9.jpg", caption: "Nikhil A" },
  { image: "/images/certifications/cert-10.jpg", caption: "Sathvik Yedla" },
  { image: "/images/certifications/cert-11.jpg", caption: "Sai Gopi" },
  { image: "/images/certifications/cert-12.jpg", caption: "Pranil Prakash" },
];
