"use client";

import { WHATSAPP_URL } from "@/lib/seo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function WhatsAppCta({
  variant = "default",
}: {
  variant?: "default" | "blog" | "cursos";
}) {
  const { dict } = useLanguage();

  const title =
    variant === "blog"
      ? dict.whatsAppCta.blogTitle
      : variant === "cursos"
        ? dict.whatsAppCta.cursosTitle
        : dict.whatsAppCta.defaultTitle;
  const subtitle =
    variant === "blog"
      ? dict.whatsAppCta.blogSubtitle
      : variant === "cursos"
        ? dict.whatsAppCta.cursosSubtitle
        : dict.whatsAppCta.defaultSubtitle;

  return (
    <div className="flex flex-col items-start gap-4 rounded-df-lg border border-df-primary-300 bg-df-primary-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-base font-bold text-df-ink-900">{title}</p>
        <p className="mt-1 text-sm text-df-ink-700">{subtitle}</p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-df-full bg-df-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-95"
      >
        {dict.whatsAppCta.cta}
      </a>
    </div>
  );
}
