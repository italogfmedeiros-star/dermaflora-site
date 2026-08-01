import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Post } from "./supabase/types";

const PAGE_SIZE = 9;

type Client = SupabaseClient<Database>;

/**
 * Um post só é público quando está marcado como publicado E a data de
 * publicação já chegou. `published_at` nulo conta como "publicado agora" para
 * não esconder posts criados antes do agendamento existir.
 */
export function liveFilter() {
  return `published_at.is.null,published_at.lte.${new Date().toISOString()}`;
}

/**
 * Mesma regra do `liveFilter`, aplicada a um post já carregado. Um post
 * agendado tem status "published" mas ainda não está no ar — checar só o status
 * o trataria como público antes da hora.
 */
export function isPostLive(post: Pick<Post, "status" | "published_at">) {
  if (post.status !== "published") return false;
  if (!post.published_at) return true;
  return new Date(post.published_at) <= new Date();
}

export async function getPublishedPosts(
  supabase: Client,
  { category, page = 1 }: { category?: string; page?: number } = {}
) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("status", "published")
    .or(liveFilter())
    .order("published_at", { ascending: false })
    .range(from, to);

  if (category) {
    query = query.contains("categories", [category]);
  }

  const { data, count, error } = await query;
  if (error) throw error;

  return {
    posts: (data ?? []) as Post[],
    total: count ?? 0,
    pageCount: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
  };
}

// `includeUnpublished` cobre rascunho e post agendado, e só é usado no preview
// do painel. A segurança não depende dessa flag: o RLS só devolve rascunhos
// para usuários autenticados, então um visitante anônimo continua sem enxergar
// nada mesmo com ela ligada.
export async function getPostBySlug(
  supabase: Client,
  slug: string,
  { includeUnpublished = false }: { includeUnpublished?: boolean } = {}
) {
  let query = supabase.from("posts").select("*").eq("slug", slug);

  if (!includeUnpublished) {
    query = query.eq("status", "published").or(liveFilter());
  }

  const { data, error } = await query.maybeSingle();

  if (error) throw error;
  return data as Post | null;
}

export async function getRelatedPosts(
  supabase: Client,
  post: Post,
  limit = 3
) {
  if (post.categories.length === 0) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .or(liveFilter())
    .neq("id", post.id)
    .overlaps("categories", post.categories)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getAllPostsForAdmin(supabase: Client) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function getPostById(supabase: Client, id: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data as Post | null;
}

export function estimateReadingMinutes(html: string) {
  const words = html
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
