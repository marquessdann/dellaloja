import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only Supabase client using the SERVICE ROLE key. This file must
// never be imported from a "use client" component — the `server-only`
// import above makes that a build-time error instead of a leaked secret.
//
// We deliberately do not use NEXT_PUBLIC_SUPABASE_* variables anywhere:
// the browser never talks to Supabase directly, only through
// /api/ai/chat, so there is no reason to ship a Supabase URL or anon key
// to the client at all.

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas. Veja docs/ai-agent.md."
    );
  }

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
