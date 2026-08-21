import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LabTexture } from "@/components/LabTexture";
import { PostCard } from "@/components/blog/PostCard";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/posts-data";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/categories";
import { T } from "@/lib/i18n/T";

export const metadata: Metadata = {
  title: "Blog | Dermaflora Farmácia de Manipulação",
  description:
    "Conteúdo sobre pele, fotoproteção, suplementação e cuidados personalizados, direto da equipe da Dermaflora.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { pagina } = await searchParams;
  const page = Math.max(1, Number(pagina) || 1);

  const supabase = await createClient();
  const { posts, pageCount } = await getPublishedPosts(supabase, { page });

  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden">
        <LabTexture className="-z-10" />
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <T
              path="blog.pageTitle"
              as="h1"
              className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl"
            />
            <T
              path="blog.pageSubtitle"
              as="p"
              className="mt-4 text-lg leading-relaxed text-df-ink-700"
            />
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={`/blog/categoria/${slugifyCategory(category)}`}
                className="glass rounded-df-full px-3.5 py-1.5 text-xs font-semibold text-df-ink-700 transition-colors hover:text-df-primary-700"
              >
                {category}
              </Link>
            ))}
          </div>

          {posts.length === 0 ? (
            <T path="blog.emptyState" as="p" className="mt-16 text-df-ink-400" />
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {pageCount > 1 && (
            <nav
              aria-label="Paginação"
              className="mt-12 flex items-center justify-center gap-2"
            >
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={n === 1 ? "/blog" : `/blog?pagina=${n}`}
                  className={`grid h-9 w-9 place-items-center rounded-df-full text-sm font-semibold transition-colors ${
                    n === page
                      ? "bg-df-primary-700 text-white"
                      : "text-df-ink-700 hover:bg-df-primary-100"
                  }`}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
