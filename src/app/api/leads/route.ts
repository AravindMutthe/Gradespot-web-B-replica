import { NextResponse } from "next/server";
import { z } from "zod";
import { createLead } from "@/lib/data";
import { PARTNERSHIP_TYPES } from "@/lib/lead-validation";

// v2: server validation stays zod (422 + per-field errors, 201 shape
// unchanged) but accepts what the ported forms send: email optional (LP
// and register forms send "" when the visitor skips it — stored as ""),
// source attribution + WhatsApp opt-in + country (persisted once the future
// lead-source/country migrations add those columns; until then createLead's
// full-then-core retry stores the core columns), and a bare-prefix
// rejection that closes the old empty-course hole server-side too.
// `course` is intentionally NOT in the schema: clients send it, but it
// rides inside `interest` ("Registration: <course>") and zod strips it.
// Partner submissions (organisation and/or partnershipType present) must
// carry BOTH partner fields (superRefine below); ordinary forms are
// unaffected because they send neither.
const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().trim().email("Please enter a valid email address").max(160).optional(),
  ),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(20)
    .regex(/^[+\d][\d\s\-()]*$/, "Please enter a valid phone number"),
  interest: z
    .string()
    .trim()
    .min(2, "Tell us what you are interested in")
    .max(200)
    .refine((v) => v !== "Registration:" && v !== "Demo:", {
      message: "Please choose a training first",
    }),
  message: z.string().trim().max(2000).optional(),
  source: z.string().trim().max(200).optional(),
  whatsappOptIn: z.boolean().optional(),
  country: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().trim().max(100, "Country name is too long (max 100 characters)").optional(),
  ),
  organisation: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.string().trim().min(2, "Please enter your organisation").max(200, "Organisation name is too long (max 200 characters)").optional(),
  ),
  partnershipType: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.enum(PARTNERSHIP_TYPES).optional(),
  ),
}).superRefine((v, ctx) => {
  const partner = v.organisation !== undefined || v.partnershipType !== undefined;
  if (!partner) return;
  if (v.organisation === undefined) {
    ctx.addIssue({ code: "custom", path: ["organisation"], message: "Please enter your organisation" });
  }
  if (v.partnershipType === undefined) {
    ctx.addIssue({ code: "custom", path: ["partnershipType"], message: "Please select a partnership type" });
  }
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ error: "Validation failed", errors }, { status: 422 });
  }

  const result = await createLead({ ...parsed.data, email: parsed.data.email ?? "" });
  return NextResponse.json({ ok: true, stored: result.stored, id: result.id ?? null }, { status: 201 });
}
