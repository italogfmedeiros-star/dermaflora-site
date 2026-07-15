"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

const FAQS = [
  {
    q: "Preciso de receita médica para manipular uma fórmula?",
    a: "Depende do produto. Algumas fórmulas exigem prescrição, outras não. Nossa equipe orienta você em cada caso durante o atendimento.",
  },
  {
    q: "Uma fórmula manipulada é mais cara que um produto de prateleira?",
    a: "Nem sempre. Como é feita sob medida, você paga pelo que realmente precisa, sem excesso de componentes que não usaria.",
  },
  {
    q: "Quanto tempo leva para minha fórmula ficar pronta?",
    a: "O prazo varia conforme o tipo de fórmula. Buscamos sempre o menor tempo possível sem abrir mão da qualidade e da segurança.",
  },
  {
    q: "Vocês entregam em casa?",
    a: "Sim. Além da retirada na farmácia, oferecemos entrega para a sua comodidade, dentro da área de atendimento.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-df-surface py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="mt-10 divide-y divide-df-line border-t border-df-line">
          {FAQS.map((item, i) => {
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
