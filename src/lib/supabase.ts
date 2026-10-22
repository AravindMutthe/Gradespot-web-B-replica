import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase access. The data layer uses the public (anon) client
// for reads allowed by RLS and the service-role client for lead inserts.
// Both are optional: when env vars are absent the data layer falls back to
// the local migrated content in src/data/.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function getAnonClient(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}

export function getServiceClient(): SupabaseClient | null {
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } });
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
