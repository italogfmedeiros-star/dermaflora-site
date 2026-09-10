"use client";

import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Saltinho ao passar o mouse: sobe com uma mola (spring) meio "boinga" em vez
// de um ease-out linear, e volta com uma mola mais macia ao tirar o mouse.
const HOVER_SPRING = { type: "spring" as const, stiffness: 400, damping: 10 };
const RETURN_SPRING = { type: "spring" as const, stiffness: 300, damping: 18 };

export function TrustBar() {
  const { dict } = useLanguage();
  const reduce = useReducedMotion();

  // Abaixo de lg os cards seguem no fluxo, sobre o fundo da seção Sobre —
  // por isso levam padding vertical próprio aqui, senão colam direto na
  // borda do Hero (acima) e da seção Sobre (abaixo). A partir de lg a faixa
  // perde altura (h-0) e sobe metade da própria altura, ficando a cavalo na
  // divisa entre o banner e a seção Sobre — por isso py-0 nesse breakpoint.
  return (
    <section className="relative z-10 bg-df-primary-50 px-5 py-8 md:px-8 md:py-10 lg:h-0 lg:bg-transparent lg:py-0">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4 lg:-translate-y-1/2">
        {dict.trustBar.items.map((item) => (
          <motion.div
            key={item.label}
            className="glass rounded-df-md px-4 py-5 text-center lg:rounded-df-lg lg:px-6 lg:py-8"
            whileHover={reduce ? undefined : { y: -8, transition: HOVER_SPRING }}
            transition={RETURN_SPRING}
          >
            <p className="font-display text-xl font-extrabold text-df-primary-700 sm:text-2xl md:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-df-ink-700 sm:mt-1.5 sm:text-sm">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
