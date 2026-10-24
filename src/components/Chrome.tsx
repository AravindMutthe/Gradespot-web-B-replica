"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

// Site chrome switch (v2, ported from Leo's structure): the global
// header/footer/floating actions render everywhere EXCEPT the /lp/*
// landing pages, which are nav-free by design (one ad group → one page,
// no navigation; the LP renders its own minimal logo+phone chrome and
// sticky action bar). v2 difference: NO theme toggle — replica has no
// dark theme, so there is nothing to toggle.
export default function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLp = pathname?.startsWith("/lp/") ?? false;
  if (isLp) {
    return <main id="main">{children}</main>;
  }
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
