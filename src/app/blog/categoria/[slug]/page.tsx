import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { getPublishedPosts } from "@/lib/posts-data";
import { BLOG_CATEGORIES, slugifyCategory } from "@/lib/categories";
import { breadcrumbJsonLd, SITE_URL } from "@/lib/seo";

function findCategory(slug: string) {
  return BLOG_CATEGORIES.find((category) => slugifyCategory(category) === slug);
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: slugifyCategory(category),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return {};

  return {
    title: `${category} | Blog Dermaflora`,
    description: `Posts sobre ${category.toLowerCase()} publicados pela Dermaflora Farmácia de Manipulação.`,
    alternates: { canonical: `/blog/categoria/${slug}` },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ pagina?: string }>;
}) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const { pagina } = await searchParams;
  const page = Math.max(1, Number(pagina) || 1);

  const supabase = await createClient();
  const { posts, pageCount } = await getPublishedPosts(supabase, {
    category,
    page,
  });

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: category, url: `${SITE_URL}/blog/categoria/${slug}` },
        ])}
      />
      <Header />
      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold text-df-primary-700">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>{" "}
            / {category}
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {category}
          </h1>

          {posts.length === 0 ? (
            <p className="mt-16 text-df-ink-400">
              Ainda não há posts nessa categoria.
            </p>
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
                  href={
                    n === 1
                      ? `/blog/categoria/${slug}`
                      : `/blog/categoria/${slug}?pagina=${n}`
                  }
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
