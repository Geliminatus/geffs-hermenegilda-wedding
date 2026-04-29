import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RSVPInsert = {
  name: string;
  contact: string;
  attending: boolean;
  guests: number;
  message?: string;
};

export async function submitRSVP(data: RSVPInsert) {
  const { error } = await supabase.from("rsvps").insert([data]);
  if (error) throw error;
}
