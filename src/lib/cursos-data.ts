import type { SupabaseClient } from "@supabase/supabase-js";
import type { CursoEvento, Database } from "./supabase/types";

type Client = SupabaseClient<Database>;

export async function getPublishedCursos(supabase: Client) {
  const { data, error } = await supabase
    .from("cursos_eventos")
    .select("*")
    .eq("status", "published")
    .order("event_date", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CursoEvento[];
}

export async function getCursoBySlug(supabase: Client, slug: string) {
  const { data, error } = await supabase
    .from("cursos_eventos")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data as CursoEvento | null;
}

export async function getAllCursosForAdmin(supabase: Client) {
  const { data, error } = await supabase
    .from("cursos_eventos")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as CursoEvento[];
}

export async function getCursoById(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("cursos_eventos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as CursoEvento | null;
}

export function groupCursosByYear(cursos: CursoEvento[]) {
  const groups = new Map<string, CursoEvento[]>();

  for (const curso of cursos) {
    const year = curso.event_date
      ? new Date(curso.event_date).getUTCFullYear().toString()
      : "Sem data";
    const bucket = groups.get(year) ?? [];
    bucket.push(curso);
    groups.set(year, bucket);
  }

  return Array.from(groups.entries()).sort(([a], [b]) =>
    b.localeCompare(a, undefined, { numeric: true })
  );
}
