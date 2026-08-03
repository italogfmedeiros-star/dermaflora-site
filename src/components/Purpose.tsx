"use client";

import { CheckCircle } from "@phosphor-icons/react";
import { LabTexture } from "./LabTexture";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Purpose() {
  const { dict } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-df-warm-100 py-16 md:py-20">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <LabTexture />
      <div
        aria-hidden="true"
        className="ambient-glow -left-16 bottom-0 h-72 w-72 bg-df-primary-300/35"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <span className="inline-flex items-center rounded-df-full bg-df-warm-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-df-ink-700">
            {dict.purpose.badge}
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.purpose.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="flex flex-col gap-6">
            {dict.purpose.pillars.map((pillar) => (
              <div key={pillar.label} className="border-l-2 border-df-primary-300 pl-4">
                <h3 className="text-xs font-bold uppercase tracking-wide text-df-primary-700">
                  {pillar.label}
                </h3>
                <p className="mt-1.5 max-w-lg leading-relaxed text-df-ink-700">{pillar.text}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.15}>
            <div className="glass-strong rounded-df-lg p-6 md:p-7">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-df-ink-900">
                {dict.purpose.valuesTitle}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {dict.purpose.values.map((value) => (
                  <li key={value.label} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-df-primary-700"
                    />
                    <span className="text-[15px] leading-relaxed text-df-ink-700">
                      <strong className="font-semibold text-df-ink-900">{value.label}</strong>{" "}
                      — {value.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <a
            href="#contato"
            className="mt-10 inline-flex items-center rounded-df-full bg-df-primary-700 px-6 py-3.5 text-base font-semibold text-white shadow-df-sm transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {dict.purpose.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
