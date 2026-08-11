import { notFound, permanentRedirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostBySlug } from "@/lib/posts-data";

// O blog antigo (WordPress) publicava os posts direto na raiz do domínio
// (dermaflora.com.br/<slug>, sem prefixo), e é essa URL "achatada" que o
// Google tem indexado há anos. O site novo serve os posts em /blog/<slug>,
// então qualquer link de busca pra um post antigo caía em 404 — essa rota
// existe só pra pegar esses casos e mandar (redirect 308, permanente) pro
// caminho novo. Rotas estáticas (blog, cursos-e-eventos, admin, api, etc.)
// têm prioridade sobre esse catch-all, então não tem conflito com elas.
export default async function LegacyPostSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug);

  if (!post) notFound();

  permanentRedirect(`/blog/${post.slug}`);
}
