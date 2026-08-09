import { supabase } from "./supabaseClient";

/* Generic Supabase table helpers used by the admin panel and the public
 * data hook. Every function assumes `supabase` is configured — callers
 * should check `isSupabaseConfigured` first. */

export async function fetchAll(table, orderBy = "order_index") {
  let query = supabase.from(table).select("*");
  if (orderBy) query = query.order(orderBy, { ascending: true });
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchSingleton(table) {
  const { data, error } = await supabase.from(table).select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertSingleton(table, values) {
  const { data, error } = await supabase
    .from(table)
    .upsert({ id: 1, ...values })
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertRow(table, values) {
  const { data, error } = await supabase.from(table).insert(values).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function updateRow(table, id, values) {
  const { data, error } = await supabase.from(table).update(values).eq("id", id).select().maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteRow(table, id) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

export async function fetchMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function uploadResume(file) {
  const filePath = `resume-${Date.now()}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from("resume")
    .upload(filePath, file, { upsert: true, contentType: "application/pdf" });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from("resume").getPublicUrl(filePath);
  return data.publicUrl;
}
