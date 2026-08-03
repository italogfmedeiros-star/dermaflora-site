import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LabTexture } from "@/components/LabTexture";
import { WhatsAppCta } from "@/components/blog/WhatsAppCta";
import { CursoDate } from "@/components/cursos/CursoDate";
import { JsonLd } from "@/components/seo/JsonLd";
import { createClient } from "@/lib/supabase/server";
import { getCursoBySlug } from "@/lib/cursos-data";
import { SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { T } from "@/lib/i18n/T";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const curso = await getCursoBySlug(supabase, slug);
  if (!curso) return {};

  const url = `${SITE_URL}/cursos-e-eventos/${curso.slug}`;

  return {
    title: `${curso.title} | Cursos e Eventos Dermaflora`,
    description: curso.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: curso.title,
      description: curso.excerpt,
      url,
      images: curso.cover_image_url ? [curso.cover_image_url] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: curso.title,
      description: curso.excerpt,
      images: curso.cover_image_url ? [curso.cover_image_url] : undefined,
    },
  };
}

export default async function CursoEventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const curso = await getCursoBySlug(supabase, slug);
  if (!curso) notFound();

  const url = `${SITE_URL}/cursos-e-eventos/${curso.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: curso.title,
    description: curso.excerpt,
    image: curso.cover_image_url ? [curso.cover_image_url] : undefined,
    datePublished: curso.event_date ?? curso.created_at,
    dateModified: curso.updated_at,
    author: { "@type": "Organization", name: "Dermaflora" },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "pt-BR",
  };

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd([
            { name: "Início", url: SITE_URL },
            { name: "Cursos e Eventos", url: `${SITE_URL}/cursos-e-eventos` },
            { name: curso.title, url },
          ]),
        ]}
      />
      <Header />
      <main className="relative isolate overflow-hidden">
        <LabTexture className="-z-10" />
        <article className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold text-df-primary-700">
            <Link href="/cursos-e-eventos" className="hover:underline">
              <T path="nav.cursosEEventos" />
            </Link>
          </p>

          <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {curso.title}
          </h1>

          {curso.event_date && <CursoDate eventDate={curso.event_date} />}

          {curso.cover_image_url && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-df-lg">
              <Image
                src={curso.cover_image_url}
                alt={curso.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          <div
            className="post-content mt-10"
            dangerouslySetInnerHTML={{ __html: curso.content }}
          />

          <div className="mt-12">
            <WhatsAppCta variant="cursos" />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
