"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const PostInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Título muito curto."),
  slug: z.string().min(3, "Slug muito curto."),
  excerpt: z.string().min(10, "Escreva um resumo com pelo menos 10 caracteres."),
  content: z.string().min(20, "O conteúdo está vazio."),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  categories: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]),
  // Enviado já em ISO/UTC pelo formulário. A conversão acontece no cliente
  // porque só lá se conhece o fuso do autor — o servidor roda em UTC.
  publishedAt: z.iso.datetime().optional().or(z.literal("")),
});

export type PostFormState = { error?: string } | undefined;

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Não autenticado.");
  }

  return { supabase, user };
}

export async function savePost(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const { supabase } = await requireUser();

  const parsed = PostInputSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImageUrl: formData.get("coverImageUrl") || "",
    categories: formData.getAll("categories"),
    status: formData.get("status"),
    publishedAt: formData.get("publishedAt") || "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { id, coverImageUrl, publishedAt: publishedAtInput, ...rest } = parsed.data;

  const isNew = !id;
  const { data: existing } = id
    ? await supabase.from("posts").select("published_at").eq("id", id).maybeSingle()
    : { data: null };

  // Data informada manda (permite agendar); sem ela, mantém a que já existia e,
  // na primeira publicação, assume agora.
  const publishedAt =
    rest.status === "published"
      ? publishedAtInput || existing?.published_at || new Date().toISOString()
      : existing?.published_at ?? null;

  const payload = {
    ...rest,
    cover_image_url: coverImageUrl || null,
    published_at: publishedAt,
  };

  const { error, data } = isNew
    ? await supabase.from("posts").insert(payload).select("id").single()
    : await supabase.from("posts").update(payload).eq("id", id).select("id").single();

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe um post com essa slug." };
    }
    return { error: "Não foi possível salvar o post." };
  }

  redirect(`/admin/posts/${data.id}/editar?saved=1`);
}

export async function deletePost(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw error;
  redirect("/admin");
}

const BulkIdsSchema = z
  .array(z.string().uuid())
  .min(1, "Selecione pelo menos um post.")
  .max(100, "Selecione no máximo 100 posts por vez.");

export type BulkPostResult = { error: string } | { count: number };

export async function deletePosts(ids: string[]): Promise<BulkPostResult> {
  const { supabase } = await requireUser();

  const parsed = BulkIdsSchema.safeParse(ids);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Seleção inválida." };
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .in("id", parsed.data)
    .select("id");

  if (error) return { error: "Não foi possível excluir os posts." };

  revalidatePath("/admin");
  revalidatePath("/blog");
  return { count: data?.length ?? 0 };
}

// Publica só rascunhos. Mesma regra do savePost: mantém a data que o post já
// tinha (inclusive agendada) e, na primeira publicação, assume agora.
export async function publishPosts(ids: string[]): Promise<BulkPostResult> {
  const { supabase } = await requireUser();

  const parsed = BulkIdsSchema.safeParse(ids);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Seleção inválida." };
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ status: "published" })
    .in("id", parsed.data)
    .eq("status", "draft")
    .select("id");

  if (error) return { error: "Não foi possível publicar os posts." };

  const publishedIds = (data ?? []).map((post) => post.id);
  if (publishedIds.length > 0) {
    const { error: dateError } = await supabase
      .from("posts")
      .update({ published_at: new Date().toISOString() })
      .in("id", publishedIds)
      .is("published_at", null);

    if (dateError) {
      return { error: "Os posts foram publicados, mas sem data de publicação." };
    }
  }

  revalidatePath("/admin");
  revalidatePath("/blog");
  return { count: publishedIds.length };
}

export async function uploadPostImage(formData: FormData) {
  const { supabase } = await requireUser();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { error: "Nenhum arquivo enviado." };
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return { error: "Falha no upload da imagem." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("post-images").getPublicUrl(path);

  return { url: publicUrl };
}
