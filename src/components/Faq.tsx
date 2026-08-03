"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { LabTexture } from "./LabTexture";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Faq() {
  const { dict } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-df-warm-100 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <LabTexture />
      <div className="relative mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.faq.title}
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-df-line border-t border-df-line">
          {dict.faq.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-df-ink-900 md:text-lg">
                    {item.q}
                  </span>
                  <CaretDown
                    size={18}
                    weight="bold"
                    className={`shrink-0 text-df-primary-700 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl text-[15px] leading-relaxed text-df-ink-700">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
