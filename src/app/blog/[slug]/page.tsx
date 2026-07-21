import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PostCard } from "@/components/blog/PostCard";
import { WhatsAppCta } from "@/components/blog/WhatsAppCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { getPostBySlug, getRelatedPosts, estimateReadingMinutes } from "@/lib/posts-data";
import { articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { splitContentInHalf } from "@/lib/split-content";
import { slugifyCategory } from "@/lib/categories";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | Blog Dermaflora`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug);
  if (!post) notFound();

  const related = await getRelatedPosts(supabase, post);
  const readingMinutes = estimateReadingMinutes(post.content);
  const { before, after } = splitContentInHalf(post.content);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Início", url: SITE_URL },
            { name: "Blog", url: `${SITE_URL}/blog` },
            { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
          ]),
        ]}
      />
      <Header />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold text-df-primary-700">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            {post.categories[0] && (
              <>
                {" / "}
                <Link
                  href={`/blog/categoria/${slugifyCategory(post.categories[0])}`}
                  className="hover:underline"
                >
                  {post.categories[0]}
                </Link>
              </>
            )}
          </p>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-df-ink-400">
            {post.published_at && (
              <span>{DATE_FORMATTER.format(new Date(post.published_at))}</span>
            )}
            <span aria-hidden="true">·</span>
            <span>{readingMinutes} min de leitura</span>
            <span aria-hidden="true">·</span>
            <span>Por {post.author_name}</span>
          </div>

          {post.cover_image_url && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-df-lg">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div
            className="post-content mt-10"
            dangerouslySetInnerHTML={{ __html: before }}
          />

          {after && (
            <>
              <div className="my-10">
                <WhatsAppCta />
              </div>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: after }}
              />
            </>
          )}

          <div className="mt-12">
            <WhatsAppCta
              title="Quer uma indicação personalizada?"
              subtitle="Nossa equipe farmacêutica pode te ajudar a encontrar a fórmula certa pra você."
            />
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-df-line bg-df-warm-100/40 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <h2 className="font-display text-2xl font-bold text-df-ink-900">
                Posts relacionados
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
