import type { Metadata } from "next";
import { PostForm } from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "Novo post | Painel Dermaflora",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-df-ink-900">Novo post</h1>
      <PostForm />
    </div>
  );
}
