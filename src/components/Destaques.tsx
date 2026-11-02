"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretDown, CaretUp, Plus, X } from "@phosphor-icons/react";
import { LabTexture } from "./LabTexture";
import { Reveal } from "./Reveal";
import { DESTAQUES } from "@/data/destaques";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Menu de produtos inspirado no "Apple Feature Block" do Skiper UI (skiper76):
// pílulas de vidro à esquerda, arte do produto à direita. Clicar numa pílula
// abre o cartão com a descrição e a arte vira o fundo inteiro do palco.
export function Destaques() {
  const { dict, lang } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  // `open` é o produto com a legenda visível (null = legenda oculta); `current`
  // é o produto cuja arte está no palco, que segue em exibição ao fechar a legenda.
  const [current, setCurrent] = useState(0);

  const isOpen = open !== null;
  const count = DESTAQUES.length;

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  function select(index: number) {
    setOpen(index);
    setCurrent(index);
  }

  function step(direction: 1 | -1) {
    select(((current + direction) % count + count) % count);
  }

  const layoutTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 36 };

  return (
    <section
      id="destaques"
      className="relative overflow-hidden bg-df-warm-100 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <LabTexture />
      <div
        aria-hidden="true"
        className="ambient-glow -right-20 top-10 h-72 w-72 bg-df-primary-300/40"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -left-24 bottom-0 h-64 w-64 bg-df-warm-500/45"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            {dict.destaques.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-df-ink-700">
            {dict.destaques.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative flex flex-col overflow-hidden rounded-[1.75rem] border border-df-line bg-df-primary-50 shadow-[var(--df-shadow-lg)] lg:block lg:h-[42rem]">
            {/* Arte do produto: no desktop já ocupa o palco todo; a legenda só
                aparece ao clicar numa pílula. No mobile é um bloco no topo, com
                o menu embaixo. */}
            <div className="relative h-80 w-full overflow-hidden sm:h-96 lg:absolute lg:inset-0 lg:h-auto">
              {DESTAQUES.map((item, i) => {
                const contain = item.fit === "contain";
                const card = item.fit === "card";
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-[opacity,scale] duration-700 ease-out motion-reduce:transition-none ${
                      i === current ? "scale-100 opacity-100" : "scale-105 opacity-0"
                    }`}
                  >
                    {(contain || card) && (
                      <Image
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="25vw"
                        className="scale-125 object-cover opacity-60 blur-3xl"
                      />
                    )}
                    {/* "card": no desktop a arte vira um cartão 16:9 à direita, fora da
                        área das pílulas; no mobile aparece inteira (contain). */}
                    <div
                      className={
                        card
                          ? "absolute inset-0 lg:inset-auto lg:right-[3%] lg:top-1/2 lg:aspect-video lg:w-[62%] lg:-translate-y-1/2 lg:overflow-hidden lg:rounded-[1.5rem] lg:shadow-[var(--df-shadow-lg)]"
                          : "absolute inset-0"
                      }
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 70vw, 100vw"
                        style={contain || card ? undefined : { objectPosition: item.objectPosition }}
                        className={
                          card
                            ? "object-contain lg:object-cover"
                            : contain
                              ? "object-contain lg:object-[85%_50%]"
                              : item.shiftRight
                                ? "object-cover lg:origin-[0%_45%] lg:scale-[1.2]"
                                : "object-cover"
                        }
                      />
                    </div>
                  </div>
                );
              })}
              {/* Véu à esquerda: garante leitura das pílulas sobre a arte (some nas
                  artes em cartão, que já ficam longe das pílulas) */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-df-primary-50/90 via-df-primary-50/35 to-transparent transition-opacity duration-700 lg:block ${
                  DESTAQUES[current].fit === "card" || DESTAQUES[current].shiftRight
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />
            </div>

            {/* Wrapper só pro posicionamento absoluto: .glass já define
                position: relative, então não pode carregar a classe "absolute". */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute right-4 top-4 z-20 rounded-df-full bg-white/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpen(null)}
                    aria-label={dict.destaques.closeAria}
                    className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900"
                  >
                    <X size={18} weight="bold" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10 flex flex-col gap-4 p-5 sm:p-6 lg:absolute lg:left-10 lg:top-1/2 lg:w-[23rem] lg:-translate-y-1/2 lg:p-0">
              <ul className="flex flex-col items-start gap-3">
                {DESTAQUES.map((item, i) => {
                  const copy = item[lang];
                  const selected = open === i;
                  const isCurrent = !isOpen && current === i;

                  return (
                    <motion.li
                      key={item.id}
                      layout="position"
                      transition={layoutTransition}
                      className={`max-w-full origin-left ${
                        selected
                          ? "w-full"
                          : "transition-[scale] duration-200 hover:scale-[1.04]"
                      }`}
                    >
                      {selected ? (
                        <div
                          id={`destaque-${item.id}`}
                          className="glass rounded-df-lg p-5"
                        >
                          <p className="text-[0.95rem] leading-relaxed text-df-ink-700">
                            <strong className="font-bold text-df-ink-900">{copy.name}.</strong>{" "}
                            {copy.description}
                          </p>
                          {item.moreHref && (
                            <Link
                              href={item.moreHref}
                              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-df-full bg-df-primary-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-df-primary-700"
                            >
                              {dict.destaques.readMore}
                              <ArrowRight size={16} weight="bold" />
                            </Link>
                          )}
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => select(i)}
                          aria-expanded={false}
                          className="glass inline-flex min-h-12 max-w-full items-center gap-3 rounded-df-full py-2 pl-3 pr-6 text-left text-base font-semibold text-df-ink-900"
                        >
                          {isCurrent ? (
                            <span
                              aria-hidden="true"
                              className="h-7 w-7 shrink-0 rounded-df-full bg-df-primary-700"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="grid h-7 w-7 shrink-0 place-items-center rounded-df-full border border-df-ink-900/60"
                            >
                              <Plus size={14} weight="bold" />
                            </span>
                          )}
                          {copy.name}
                        </button>
                      )}
                    </motion.li>
                  );
                })}
              </ul>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label={dict.destaques.prevAria}
                      className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900"
                    >
                      <CaretUp size={16} weight="bold" />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label={dict.destaques.nextAria}
                      className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900"
                    >
                      <CaretDown size={16} weight="bold" />
                    </button>
                    <span
                      aria-hidden="true"
                      className="ml-1 rounded-df-full bg-white/60 px-3 py-1 text-sm font-semibold tabular-nums text-df-ink-900"
                    >
                      {current + 1} / {count}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
