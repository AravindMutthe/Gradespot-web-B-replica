import { courses as localCourses, type Course } from "@/data/courses";
import { services as localServices, type Service } from "@/data/services";
import { getAnonClient, getServiceClient } from "./supabase";

// Data layer (Royal Salon pattern): read from Supabase when configured and
// the tables exist; otherwise serve the local migrated content. Applying
// supabase/migrations/0001_init.sql switches reads to the database without
// code changes.

// If Supabase is unreachable or the tables are not there yet, latch to the
// local data for the rest of the process instead of timing out per page.
let supabaseDown = false;

async function queryCourses(): Promise<Course[] | null> {
  if (supabaseDown) return null;
  const supabase = getAnonClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("courses")
      .select("slug,title,category,image,summary,sections,catalog_only")
      .order("title");
    if (error || !data || data.length === 0) {
      supabaseDown = true;
      return null;
    }
    return data.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category,
      image: row.image ?? null,
      summary: row.summary ?? "",
      sections: Array.isArray(row.sections) ? row.sections : [],
      catalogOnly: Boolean(row.catalog_only),
    }));
  } catch {
    supabaseDown = true;
    return null;
  }
}

export async function getCourses(): Promise<Course[]> {
  return (await queryCourses()) ?? localCourses;
}

export async function getCourse(slug: string): Promise<Course | null> {
  const all = await getCourses();
  return all.find((c) => c.slug === slug) ?? null;
}

async function queryServices(): Promise<Service[] | null> {
  if (supabaseDown) return null;
  const supabase = getAnonClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from("services").select("slug,title").order("title");
    if (error || !data || data.length === 0) {
      supabaseDown = true;
      return null;
    }
    return data.map((row) => ({ slug: row.slug, title: row.title }));
  } catch {
    supabaseDown = true;
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  return (await queryServices()) ?? localServices;
}

export async function getService(slug: string): Promise<Service | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message?: string;
}

export interface LeadResult {
  stored: "supabase" | "log";
  id?: string;
}

// Leads are stored in Supabase when the service-role key is configured.
// Until the migration is applied / keys are present, the lead is logged
// server-side so an enquiry is never silently dropped during development.
export async function createLead(lead: LeadInput): Promise<LeadResult> {
  const supabase = getServiceClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        interest: lead.interest,
        message: lead.message ?? null,
      })
      .select("id")
      .single();
    if (!error && data) {
      return { stored: "supabase", id: String(data.id) };
    }
    console.error("[leads] Supabase insert failed, logging lead instead:", error?.message);
  }
  console.log("[leads] New enquiry (not stored in DB):", JSON.stringify(lead));
  return { stored: "log" };
}

export interface CertificateRecord {
  code: string;
  studentName: string;
  course: string;
  issuedOn: string | null;
}

// Certificate verification reads ONLY from the certificates table — no
// record exists until GradeSpot loads real issued certificates, so an
// unknown code honestly returns null.
export async function verifyCertificate(code: string): Promise<CertificateRecord | null> {
  const supabase = getAnonClient() ?? getServiceClient();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("code,student_name,course,issued_on")
      .eq("code", code.trim())
      .maybeSingle();
    if (error || !data) return null;
    return {
      code: data.code,
      studentName: data.student_name,
      course: data.course,
      issuedOn: data.issued_on ?? null,
    };
  } catch {
    return null;
  }
}
