"use client";

import { Buildings, Sparkle, HeartStraight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const MILESTONE_ICONS = [Buildings, Sparkle, HeartStraight];

export function About() {
  const { dict } = useLanguage();

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-df-warm-100 pb-20 pt-10 md:pb-28 md:pt-14"
    >
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -right-24 top-10 h-64 w-64 bg-df-secondary-300/35"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.about.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-df-ink-700">{dict.about.subtitle}</p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-df-line md:block"
          />
          {dict.about.milestones.map((m, i) => {
            const Icon = MILESTONE_ICONS[i];
            return (
              <Reveal key={m.title} delay={i * 0.1} className="relative">
                <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-df-primary-700 text-white shadow-df-sm">
                  <Icon size={22} weight="regular" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-df-ink-900">
                  {m.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-df-ink-700">{m.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
