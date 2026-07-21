import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPostById } from "@/lib/posts-data";
import { PostForm } from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Editar post | Painel Dermaflora",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const post = await getPostById(supabase, id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-df-ink-900">
        Editar post
      </h1>
      <PostForm post={post} />
    </div>
  );
}
