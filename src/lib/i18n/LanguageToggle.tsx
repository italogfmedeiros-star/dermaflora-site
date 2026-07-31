"use client";

import { Translate } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageContext";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, dict, toggleLang } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={dict.header.langToggleAria}
      className={`inline-flex items-center gap-1.5 rounded-df-full border border-df-line px-3.5 text-xs font-bold text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700 ${className}`}
    >
      <Translate size={16} weight="regular" />
      <span className={lang === "pt" ? "text-df-primary-700" : "text-df-ink-400"}>PT</span>
      <span className="text-df-line">/</span>
      <span className={lang === "en" ? "text-df-primary-700" : "text-df-ink-400"}>EN</span>
    </button>
  );
}
