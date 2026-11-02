import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_PAGE_SIZE, getAdminPostsPage } from "@/lib/posts-data";
import { PostList } from "@/components/admin/PostList";

export const metadata: Metadata = {
  title: "Posts | Painel Dermaflora",
  robots: { index: false, follow: false },
};

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { pagina } = await searchParams;
  const page = Math.max(1, Number(pagina) || 1);

  const supabase = await createClient();
  const { posts, total, pageCount } = await getAdminPostsPage(supabase, page);

  // Excluir os últimos posts de uma página deixa o endereço apontando para o
  // vazio: volta para a última página que ainda existe.
  if (page > pageCount) {
    redirect(pageCount === 1 ? "/admin" : `/admin?pagina=${pageCount}`);
  }

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

      {total === 0 ? (
        <p className="mt-10 text-sm text-df-ink-400">
          Nenhum post ainda. Clique em &quot;Novo post&quot; para começar.
        </p>
      ) : (
        <PostList
          key={page}
          posts={posts.map((post) => ({
            id: post.id,
            title: post.title,
            categories: post.categories,
            status: post.status,
            dateLabel: DATE_FORMATTER.format(new Date(post.updated_at)),
          }))}
          page={page}
          pageCount={pageCount}
          total={total}
          pageSize={ADMIN_PAGE_SIZE}
        />
      )}
    </div>
  );
}
