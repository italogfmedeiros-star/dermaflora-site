"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CursoEvento } from "@/lib/supabase/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CursoCard({ curso }: { curso: CursoEvento }) {
  const { dict, lang } = useLanguage();
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }),
    [lang]
  );

  return (
    <Link
      href={`/cursos-e-eventos/${curso.slug}`}
      className="glass group flex flex-col overflow-hidden rounded-df-lg transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-df-primary-100 to-df-secondary-300/50">
        {curso.cover_image_url && (
          <Image
            src={curso.cover_image_url}
            alt={curso.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-df-full bg-df-primary-100 px-2.5 py-1 text-df-primary-700">
            {dict.cursos.categoryLabel}
          </span>
          {curso.event_date && (
            <span className="text-df-ink-400">
              {dateFormatter.format(new Date(curso.event_date))}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-df-ink-900">
          {curso.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-df-ink-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
          {curso.excerpt}
        </p>
        <span className="mt-auto pt-4 text-sm font-semibold text-df-primary-700">
          {dict.cursos.detailsLink}
        </span>
      </div>
    </Link>
  );
}
