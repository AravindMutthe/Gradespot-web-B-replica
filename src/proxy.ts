import { NextResponse } from "next/server";

// Content Security Policy for the replica build, ported from the Leo
// build's src/proxy.ts (same policy, same rationale: a nonce CSP would
// block Next's prerendered inline RSC payload, so script/style
// 'unsafe-inline' are required by the prerendered pages themselves).
// The proxy file convention is Next 16's (this repo has no middleware);
// the policy applies per request via this proxy, while next.config.ts
// keeps carrying the static headers (HSTS, nosniff, DENY,
// Permissions-Policy).
//
// ONE DEVIATION from Leo's policy, and why: this replica build loads
// the Inter font from Google Fonts (layout.tsx), while Leo self-hosts
// its fonts. A verbatim Leo policy would block that font load
// (style-src 'self' rejects the googleapis stylesheet, font-src 'self'
// rejects the gstatic woff2 files) and silently change the site's
// typography. So style-src and font-src each carry their Google Fonts
// origin below. Everything else is identical to Leo's policy. The
// follow-up that would let this deviation go away is self-hosting
// Inter (the v3 tree already self-hosts its fonts) — not done here,
// because it changes font delivery and needs visual verification.
export default function proxy() {
  const res = NextResponse.next();
  res.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; worker-src 'none'; manifest-src 'self'",
  );
  res.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
