import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getAllPostsForAdmin } from "@/lib/posts-data";

export const metadata: Metadata = {
  title: "Posts | Painel Dermaflora",
  robots: { index: false, follow: false },
};

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const posts = await getAllPostsForAdmin(supabase);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-df-ink-900">Posts do blog</h1>
        <Link
          href="/admin/posts/novo"
          className="inline-flex items-center rounded-df-full bg-df-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm"
        >
          Novo post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-sm text-df-ink-400">
          Nenhum post ainda. Clique em &quot;Novo post&quot; para começar.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-df-line overflow-hidden rounded-df-md border border-df-line bg-white">
          {posts.map((post) => (
            <li key={post.id}>
              <Link
                href={`/admin/posts/${post.id}/editar`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-df-primary-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-df-ink-900">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-df-ink-400">
                    {post.categories.join(", ") || "Sem categoria"} ·{" "}
                    {DATE_FORMATTER.format(new Date(post.updated_at))}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-df-full px-3 py-1 text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-df-primary-100 text-df-primary-700"
                      : "bg-df-warm-300 text-df-ink-700"
                  }`}
                >
                  {post.status === "published" ? "Publicado" : "Rascunho"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
