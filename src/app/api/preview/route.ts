import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/posts-data";

// Abre o preview de um post (inclusive rascunho) no template real do site.
// O `proxy.ts` só protege /admin, então a autenticação é verificada aqui.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Informe o id do post.", { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Não autenticado.", { status: 401 });
  }

  const post = await getPostById(supabase, id);

  if (!post) {
    return new Response("Post não encontrado.", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  // O destino vem do slug gravado no banco, nunca de um parâmetro da URL:
  // redirecionar para um valor controlado pelo cliente abriria open redirect.
  redirect(`/blog/${post.slug}`);
}
