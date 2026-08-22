"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CreditCard, Truck, Vault, FileText } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const PERK_ICONS = [CreditCard, Truck, Vault, FileText];

// Só considera "no topo" até uns poucos pixels de rolagem — dá uma folga
// contra o bounce/rubber-band do scroll no iOS, que oscila o scrollY em
// torno de 0 mesmo sem o usuário ter rolado de fato.
const TOP_THRESHOLD = 6;

// Faixa de benefícios logo abaixo do header, inspirada num padrão comum de
// e-commerce (parcelamento / entrega / segurança / receita). Duas versões
// responsivas em vez de uma única faixa estática:
// - sm+: linha fixa com separadores, badge do ícone "respirando" (float
//   sutil e defasado por item) e hover que levanta o item — viva sem ser
//   barulhenta.
// - abaixo de sm: os 4 itens não cabem numa linha só, então em vez de
//   quebrar em 2 linhas ou cortar texto, vira um trilho em marquee contínuo
//   (lista duplicada, loop sem costura) — resolve o espaço e já é "menos
//   estático" por natureza.
//
// Além disso, a faixa só existe visualmente enquanto a página está no topo:
// assim que a rolagem começa, ela recolhe (altura + opacidade) e "sobe pra
// trás" do header sticky; só volta a abrir quando o scroll retorna pra perto
// do topo de novo. O conteúdo abaixo (Hero) ocupa o espaço liberado — não é
// overlay, é o mesmo recolhimento tipo acordeão.
export function PerksBar() {
  const { dict } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [atTop, setAtTop] = useState(true);
  const items = dict.perks.items;
  const marqueeItems = [...items, ...items];

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY <= TOP_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative z-10">
      {/* Conteúdo real pra leitor de tela: os dois blocos abaixo são só a
          representação visual (marquee/ícone flutuante são decorativos) e
          ficam aria-hidden, então essa lista garante que a informação
          existe pra acessibilidade independente do estado recolhido/aberto. */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.strong}>
            {item.strong} {item.text}
          </li>
        ))}
      </ul>

      <motion.div
        initial={false}
        animate={{ height: atTop ? "auto" : 0, opacity: atTop ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden border-df-line bg-df-primary-50/80"
        style={{ borderBottomWidth: atTop ? 1 : 0 }}
      >
        {/* lg e acima: até esse ponto o texto mais longo ("Envie sua receita
            e receba o orçamento em até 1 hora") não cabe numa linha só nos 4
            itens sem estourar a largura — por isso o corte é em lg, não sm,
            e cada texto quebra em até 2 linhas dentro de um max-width em vez
            de forçar nowrap. */}
        <div
          aria-hidden="true"
          className="mx-auto hidden max-w-7xl items-start justify-center gap-x-6 px-8 py-4 lg:flex xl:gap-x-10"
        >
          {items.map((item, i) => {
            const Icon = PERK_ICONS[i];
            return (
              <div key={item.strong} className="flex items-start gap-x-6 xl:gap-x-10">
                <Reveal delay={i * 0.06} className="group flex items-start gap-2.5">
                  <span
                    className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full text-df-primary-700 transition-transform duration-300 [animation:df-icon-float_4.5s_ease-in-out_infinite] group-hover:-translate-y-1"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  >
                    <Icon size={16} weight="bold" />
                  </span>
                  <p className="max-w-[168px] text-[13px] leading-snug text-df-ink-700">
                    <span className="font-semibold text-df-ink-900">{item.strong}</span>{" "}
                    {item.text}
                  </p>
                </Reveal>
                {i < items.length - 1 && (
                  <span aria-hidden="true" className="mt-1 h-8 w-px shrink-0 bg-df-line" />
                )}
              </div>
            );
          })}
        </div>

        {/* abaixo de lg: trilho em marquee */}
        <div className="overflow-hidden py-3.5 lg:hidden" aria-hidden="true">
          <div className="flex w-max gap-8 [animation:df-marquee_24s_linear_infinite]">
            {marqueeItems.map((item, i) => {
              const Icon = PERK_ICONS[i % items.length];
              return (
                <div key={i} className="flex shrink-0 items-center gap-3 pl-5 first:pl-5">
                  <span className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full text-df-primary-700">
                    <Icon size={16} weight="bold" />
                  </span>
                  <p className="whitespace-nowrap text-sm text-df-ink-700">
                    <span className="font-semibold text-df-ink-900">{item.strong}</span>{" "}
                    {item.text}
                  </p>
                  <span aria-hidden="true" className="ml-3 h-6 w-px shrink-0 bg-df-line" />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
