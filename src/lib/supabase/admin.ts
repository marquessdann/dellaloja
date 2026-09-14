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

/**
 * @supabase/supabase-js expects the bare project URL (e.g.
 * "https://xxxxx.supabase.co") and appends "/rest/v1/..." itself. A common
 * copy-paste mistake is grabbing a URL that already has "/rest/v1" (or a
 * trailing slash) from the Supabase dashboard, which then gets doubled up
 * and PostgREST rejects with "PGRST125 — Invalid path specified in
 * request URL". Strip that defensively so either form works.
 */
function normalizeSupabaseUrl(url: string): string {
  return url.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
}

export function getSupabaseAdmin(): SupabaseClient {
  if (cached) return cached;

  const rawUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawUrl || !serviceRoleKey) {
    throw new Error(
      "SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY não configuradas. Veja docs/ai-agent.md."
    );
  }

  const url = normalizeSupabaseUrl(rawUrl);

  cached = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cached;
}
