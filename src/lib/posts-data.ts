import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Post } from "./supabase/types";

const PAGE_SIZE = 9;

type Client = SupabaseClient<Database>;

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

export async function getPostBySlug(supabase: Client, slug: string) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

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
