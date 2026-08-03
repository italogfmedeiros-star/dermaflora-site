"use client";

import { WhatsappLogo, Headset, Flask, Package } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STEP_ICONS = [WhatsappLogo, Headset, Flask, Package];

export function HowItWorks() {
  const { dict } = useLanguage();

  return (
    <section
      id="atendimento"
      className="relative overflow-hidden bg-df-secondary-300/10 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -right-24 top-0 h-72 w-72 bg-df-secondary-300/40"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.howItWorks.title}
          </h2>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-df-line lg:block"
          />
          {dict.howItWorks.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <Reveal key={step.title} delay={i * 0.08} className="relative">
                <div className="glass relative z-10 grid h-14 w-14 place-items-center rounded-full text-df-primary-700">
                  <Icon size={24} weight="regular" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-df-ink-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-df-ink-700">{step.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
