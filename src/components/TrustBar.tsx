"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function TrustBar() {
  const { dict } = useLanguage();

  // Abaixo de lg os cards seguem no fluxo, sobre o fundo da seção Sobre. A
  // partir de lg a faixa perde altura (h-0) e sobe metade da própria altura,
  // ficando a cavalo na divisa entre o banner e a seção Sobre.
  return (
    <section className="relative z-10 bg-df-primary-50 px-5 md:px-8 lg:h-0 lg:bg-transparent">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4 lg:-translate-y-1/2">
        {dict.trustBar.items.map((item) => (
          <div
            key={item.label}
            className="glass rounded-df-lg px-4 py-8 text-center lg:px-6"
          >
            <p className="font-display text-2xl font-extrabold text-df-primary-700 md:text-3xl">
              {item.value}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-df-ink-700">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
