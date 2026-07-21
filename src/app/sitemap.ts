import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/categories";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("status", "published")
    .returns<{ slug: string; updated_at: string }[]>();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    ...BLOG_CATEGORIES.map((category) => ({
      url: `${SITE_URL}/blog/categoria/${slugifyCategory(category)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];

  const postRoutes: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
