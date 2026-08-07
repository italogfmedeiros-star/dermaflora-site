import type { Post } from "@/lib/supabase/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "Dermaflora Farmácia de Manipulação";
export const WHATSAPP_URL = "https://wa.me/5511988296867";

// Avaliações do Google (unidade Chácara Santo Antônio). Conferido manualmente
// em ago/2026 — atualizar esses três valores de tempos em tempos, não há
// integração automática com a API do Google.
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/Dermaflora+Farm%C3%A1cia+de+Manipula%C3%A7%C3%A3o+Ch%C3%A1cara+Santo+Ant%C3%B4nio";
export const GOOGLE_RATING_VALUE = "4.9";
export const GOOGLE_REVIEWS_COUNT = 970;

export const LOCATIONS = [
  {
    name: `${SITE_NAME} - Unidade Chácara Santo Antônio`,
    streetAddress: "Rua Américo Brasiliense, 1290",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "04715-002",
  },
  {
    name: `${SITE_NAME} - Unidade Moema`,
    streetAddress: "Alameda dos Nhambiquaras, 911",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: undefined,
  },
] as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-dermaflora.png`,
    sameAs: ["https://www.instagram.com/dermaflora"],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "pt-BR",
  };
}

export function pharmacyJsonLd() {
  return LOCATIONS.map((location, index) => ({
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "@id": `${SITE_URL}/#pharmacy-${index}`,
    name: location.name,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: "BR",
    },
    telephone: "+5511988296867",
    url: SITE_URL,
    // Só a unidade Chácara Santo Antônio (index 0) tem o Google Business
    // conferido — ver GOOGLE_RATING_VALUE acima.
    ...(index === 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_RATING_VALUE,
        reviewCount: GOOGLE_REVIEWS_COUNT,
      },
    }),
  }));
}

export function articleJsonLd(post: Post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url ? [post.cover_image_url] : undefined,
    datePublished: post.published_at ?? post.created_at,
    dateModified: post.updated_at,
    author: { "@type": "Organization", name: post.author_name },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", ") || undefined,
    articleSection: post.categories,
    inLanguage: "pt-BR",
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
