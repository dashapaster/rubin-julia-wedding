import { createClient } from "@supabase/supabase-js";
import { getOptionalEnv, requireEnv } from "@/lib/env";
import type { RsvpInput, RsvpRow } from "@/lib/types";

function getRsvpTableName() {
  return getOptionalEnv("SUPABASE_RSVP_TABLE") || "wedding_rsvps";
}

export function hasSupabaseConfig() {
  return Boolean(
    getOptionalEnv("NEXT_PUBLIC_SUPABASE_URL") &&
      getOptionalEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") &&
      getOptionalEnv("SUPABASE_SERVICE_ROLE_KEY")
  );
}

function createAdminClient() {
  return createClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export async function saveRsvp(input: RsvpInput) {
  const supabase = createAdminClient();
  const tableName = getRsvpTableName();

  const { error } = await supabase.from(tableName).insert({
    full_name: input.fullName.trim(),
    attendance: input.attendance,
    country: input.country.trim(),
    guests: input.guests,
    message: input.message?.trim() || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function fetchRsvps() {
  const supabase = createAdminClient();
  const tableName = getRsvpTableName();

  const { data, error } = await supabase
    .from(tableName)
    .select("id, full_name, attendance, country, guests, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as RsvpRow[];
}

export async function deleteRsvp(id: string) {
  const supabase = createAdminClient();
  const tableName = getRsvpTableName();

  const { error } = await supabase.from(tableName).delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
