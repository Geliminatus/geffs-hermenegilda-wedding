import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — only instantiated when submitRSVP is called (client-side).
// This prevents the build from crashing when env vars are not yet set.
let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  if (!url.startsWith("http")) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL is not configured. Add it to your environment variables.");
  }
  _client = createClient(url, key);
  return _client;
}

export type RSVPInsert = {
  name: string;
  contact: string;
  attending: boolean;
  guests: number;
  message?: string;
};

export async function submitRSVP(data: RSVPInsert) {
  const { error } = await getClient().from("rsvps").insert([data]);
  if (error) throw error;
}
