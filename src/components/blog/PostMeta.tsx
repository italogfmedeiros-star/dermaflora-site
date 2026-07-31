"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PostMeta({
  publishedAt,
  readingMinutes,
  authorName,
}: {
  publishedAt: string | null;
  readingMinutes: number;
  authorName: string;
}) {
  const { dict, lang } = useLanguage();
  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    [lang]
  );

  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-df-ink-400">
      {publishedAt && <span>{dateFormatter.format(new Date(publishedAt))}</span>}
      <span aria-hidden="true">·</span>
      <span>
        {readingMinutes} {dict.blog.readingMinutesSuffix}
      </span>
      <span aria-hidden="true">·</span>
      <span>
        {dict.blog.byAuthorPrefix}
        {authorName}
      </span>
    </div>
  );
}
