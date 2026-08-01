"use client";

import { SITE_URL } from "@/lib/seo";

// Limites aproximados do que o Google exibe antes de cortar com reticências.
// Não são regras rígidas — servem para o autor perceber quando vai truncar.
const TITLE_LIMIT = 60;
const EXCERPT_MIN = 110;
const EXCERPT_LIMIT = 160;

// Precisa acompanhar o formato montado em generateMetadata de
// src/app/blog/[slug]/page.tsx, senão a prévia mente sobre o título real.
const TITLE_SUFFIX = " | Blog Dermaflora";

function truncate(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit).trimEnd()}…` : value;
}

export function CharacterCount({
  value,
  limit,
  min,
}: {
  value: string;
  limit: number;
  min?: number;
}) {
  const { length } = value;
  const tooLong = length > limit;
  const tooShort = min !== undefined && length > 0 && length < min;

  return (
    <span
      className={`text-xs font-medium tabular-nums ${
        tooLong
          ? "text-df-error"
          : tooShort
            ? "text-df-ink-400"
            : "text-df-primary-700"
      }`}
    >
      {length}/{limit}
      {tooLong && " · vai cortar no Google"}
      {tooShort && ` · ideal a partir de ${min}`}
    </span>
  );
}

export function SeoPreview({
  title,
  slug,
  excerpt,
}: {
  title: string;
  slug: string;
  excerpt: string;
}) {
  const fullTitle = `${title || "Título do post"}${TITLE_SUFFIX}`;
  const displayUrl = `${SITE_URL.replace(/^https?:\/\//, "")}/blog/${slug || "slug-do-post"}`;

  return (
    <div className="rounded-df-sm border border-df-line bg-white p-4">
      <p className="text-xs font-medium text-df-ink-400">
        Prévia do resultado no Google
      </p>
      <div className="mt-3">
        <p className="truncate text-xs text-df-ink-700">{displayUrl}</p>
        <p className="mt-0.5 text-lg leading-snug text-[#1a0dab]">
          {truncate(fullTitle, TITLE_LIMIT)}
        </p>
        <p className="mt-1 text-sm leading-snug text-df-ink-700">
          {excerpt
            ? truncate(excerpt, EXCERPT_LIMIT)
            : "O resumo do post aparece aqui."}
        </p>
      </div>
    </div>
  );
}

export { TITLE_LIMIT, EXCERPT_LIMIT, EXCERPT_MIN };
