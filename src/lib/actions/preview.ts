"use server";

import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Sai do preview e volta para o editor do post. Server Action (POST) em vez de
// link: o Next faz prefetch de <Link>, o que apagaria o cookie antes do clique.
export async function exitPreview(formData: FormData) {
  const draft = await draftMode();
  draft.disable();

  const postId = formData.get("postId");
  redirect(typeof postId === "string" && postId ? `/admin/posts/${postId}/editar` : "/admin");
}
