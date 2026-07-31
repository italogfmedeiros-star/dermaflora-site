"use client";

import { useMemo } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function CursoDate({ eventDate }: { eventDate: string }) {
  const { lang } = useLanguage();
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
      <span>{dateFormatter.format(new Date(eventDate))}</span>
    </div>
  );
}
