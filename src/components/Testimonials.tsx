"use client";

import { Quotes } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const HIGHLIGHT_FLAGS = [true, false, false];

export function Testimonials() {
  const { dict } = useLanguage();

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-df-surface py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -left-20 bottom-0 h-72 w-72 bg-df-primary-300/40"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.testimonials.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {dict.testimonials.items.map((t, i) => {
            const highlight = HIGHLIGHT_FLAGS[i];
            return (
              <Reveal
                key={t.name}
                delay={i * 0.1}
                className={
                  highlight
                    ? "flex flex-col justify-between rounded-df-lg bg-gradient-to-br from-df-primary-600 to-df-primary-900 p-7 text-white shadow-df-lg"
                    : "glass flex flex-col justify-between rounded-df-lg p-7"
                }
              >
                <Quotes
                  size={28}
                  weight="fill"
                  className={highlight ? "text-white/40" : "text-df-primary-300"}
                />
                <p
                  className={
                    highlight
                      ? "mt-4 text-lg font-medium leading-snug"
                      : "mt-4 text-lg font-medium leading-snug text-df-ink-900"
                  }
                >
                  {t.quote}
                </p>
                <div className="mt-6">
                  <p className={highlight ? "font-semibold" : "font-semibold text-df-ink-900"}>
                    {t.name}
                  </p>
                  <p
                    className={
                      highlight ? "text-sm text-white/70" : "text-sm text-df-ink-400"
                    }
                  >
                    {t.context}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
