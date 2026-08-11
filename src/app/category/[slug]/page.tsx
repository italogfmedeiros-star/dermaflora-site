import { notFound, permanentRedirect } from "next/navigation";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/categories";

// Mesmo caso do post individual (ver src/app/[slug]/page.tsx): o WordPress
// antigo servia o arquivo de categoria em dermaflora.com.br/category/<slug>,
// URL que o Google já tem indexada. O site novo usa /blog/categoria/<slug>,
// então essas páginas estavam 404 pra quem chegava pela busca.
export default async function LegacyCategoryRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = BLOG_CATEGORIES.find((c) => slugifyCategory(c) === slug);

  if (!category) notFound();

  permanentRedirect(`/blog/categoria/${slug}`);
}
