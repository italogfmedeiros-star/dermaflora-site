"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const CursoInputSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(3, "Título muito curto."),
  slug: z.string().min(3, "Slug muito curto."),
  excerpt: z.string().min(10, "Escreva um resumo com pelo menos 10 caracteres."),
  content: z.string().min(10, "O conteúdo está vazio."),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  eventDate: z.string().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
});

export type CursoFormState = { error?: string } | undefined;

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

export async function saveCurso(
  _prevState: CursoFormState,
  formData: FormData
): Promise<CursoFormState> {
  const { supabase } = await requireUser();

  const parsed = CursoInputSchema.safeParse({
    id: formData.get("id") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverImageUrl: formData.get("coverImageUrl") || "",
    eventDate: formData.get("eventDate") || "",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Dados inválidos." };
  }

  const { id, coverImageUrl, eventDate, ...rest } = parsed.data;

  const isNew = !id;

  const payload = {
    ...rest,
    cover_image_url: coverImageUrl || null,
    event_date: eventDate || null,
  };

  const { error, data } = isNew
    ? await supabase.from("cursos_eventos").insert(payload).select("id").single()
    : await supabase
        .from("cursos_eventos")
        .update(payload)
        .eq("id", id)
        .select("id")
        .single();

  if (error) {
    if (error.code === "23505") {
      return { error: "Já existe um evento com essa slug." };
    }
    return { error: "Não foi possível salvar o evento." };
  }

  redirect(`/admin/cursos/${data.id}/editar?saved=1`);
}

export async function deleteCurso(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("cursos_eventos").delete().eq("id", id);
  if (error) throw error;
  redirect("/admin/cursos");
}

export async function uploadCursoImage(formData: FormData) {
  const { supabase } = await requireUser();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return { error: "Nenhum arquivo enviado." };
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("cursos-images")
    .upload(path, file, { contentType: file.type });

  if (error) {
    return { error: "Falha no upload da imagem." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("cursos-images").getPublicUrl(path);

  return { url: publicUrl };
}
