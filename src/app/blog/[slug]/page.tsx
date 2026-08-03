import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LabTexture } from "@/components/LabTexture";
import { PostCard } from "@/components/blog/PostCard";
import { WhatsAppCta } from "@/components/blog/WhatsAppCta";
import { PostMeta } from "@/components/blog/PostMeta";
import { PreviewBanner } from "@/components/blog/PreviewBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import {
  getPostBySlug,
  getRelatedPosts,
  estimateReadingMinutes,
  isPostLive,
} from "@/lib/posts-data";
import { articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { splitContentInHalf } from "@/lib/split-content";
import { slugifyCategory } from "@/lib/categories";
import { T } from "@/lib/i18n/T";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug, { includeUnpublished: isPreview });
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  // Rascunho ou agendado aberto no preview nunca pode ser indexado.
  if (!isPostLive(post)) {
    return {
      title: `[${post.status === "draft" ? "Rascunho" : "Agendado"}] ${post.title} | Blog Dermaflora`,
      robots: { index: false, follow: false },
    };
  }

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
  const { isEnabled: isPreview } = await draftMode();
  const supabase = await createClient();
  const post = await getPostBySlug(supabase, slug, { includeUnpublished: isPreview });
  if (!post) notFound();

  const related = await getRelatedPosts(supabase, post);
  const readingMinutes = estimateReadingMinutes(post.content);
  const { before, after } = splitContentInHalf(post.content);

  return (
    <>
      {/* Só conteúdo já no ar gera dados estruturados: eles descrevem o que é
          público. Rascunho e agendado ficam de fora. */}
      {isPostLive(post) && (
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
      )}
      {isPreview && (
        <PreviewBanner
          postId={post.id}
          status={post.status}
          publishedAt={post.published_at}
        />
      )}
      <Header />
      <main className="relative isolate overflow-hidden">
        <LabTexture className="-z-10" />
        <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold text-df-primary-700">
            <Link href="/blog" className="hover:underline">
              <T path="nav.blog" />
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

          <PostMeta
            publishedAt={post.published_at}
            readingMinutes={readingMinutes}
            authorName={post.author_name}
          />

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
            <WhatsAppCta variant="blog" />
          </div>
        </article>

        {related.length > 0 && (
          <section className="border-t border-df-line bg-df-warm-100/40 py-16 md:py-20">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <T
                path="blog.relatedPosts"
                as="h2"
                className="font-display text-2xl font-bold text-df-ink-900"
              />
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
