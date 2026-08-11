"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { HeroVideo } from "./HeroVideo";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Rede de segurança: se por algum motivo o vídeo ativo não disparar "ended"
// (ex.: autoplay bloqueado), avança mesmo assim depois desse tempo. Maior que
// a duração de qualquer vídeo do carrossel.
const FALLBACK_MS = 12000;

const SLIDE_VIDEOS = [
  {
    src: "/videos/hero-video-1.mp4",
    poster: "/images/hero-banner.png",
    label:
      "Mulher aplicando um creme hidratante Dermaflora no rosto, em ambiente claro e natural",
    objectClassName: "object-[68%_center] md:object-[75%_center]",
  },
  {
    src: "/videos/hero-video-2.mp4",
    poster: "/images/hero-banner-2.png",
    label: "Sérum Dermaflora em composição entre flores de cerejeira ao entardecer",
    objectClassName: "object-[39%_center] md:object-[8%_center]",
  },
  {
    src: "/videos/hero-video-3.mp4",
    poster: "/images/hero-banner-3.png",
    label: "Mão retirando um produto Dermaflora de dentro de uma nécessaire verde-menta",
    objectClassName: "object-[70%_center] md:object-[78%_center]",
  },
  {
    src: "/videos/hero-video-4.mp4",
    poster: "/images/hero-banner-4.png",
    label: "Cápsulas manipuladas Dermaflora derramando de um frasco branco",
    objectClassName: "object-[65%_center] md:object-[72%_center]",
  },
  {
    src: "/videos/hero-video-5.mp4",
    poster: "/images/hero-banner-5.png",
    label:
      "Cinco potes de creme Dermaflora Caps Active Cream flutuando suavemente em um laboratório claro",
    objectClassName: "object-[45%_center] md:object-[40%_center]",
  },
];

// textOnRight controla três coisas em conjunto pra cada slide: o lado do
// texto/botão, o sentido do gradiente de legibilidade (fica escuro do lado
// do texto) e o alinhamento do subtítulo/CTA — ver usos abaixo.
const SLIDE_LAYOUTS = [
  { wrapClass: "absolute inset-0 flex items-center justify-start", textAlign: "", textOnRight: false },
  {
    wrapClass: "absolute inset-0 flex items-center justify-start md:justify-end",
    textAlign: "md:mr-12 md:text-right",
    textOnRight: true,
  },
  { wrapClass: "absolute inset-0 flex items-center justify-start", textAlign: "", textOnRight: false },
  { wrapClass: "absolute inset-0 flex items-center justify-start", textAlign: "", textOnRight: false },
  {
    wrapClass: "absolute inset-0 flex items-center justify-start md:justify-end",
    textAlign: "md:mr-12 md:text-right",
    textOnRight: true,
  },
];

const SLIDE_COUNT = SLIDE_VIDEOS.length;

export function Hero() {
  const { dict } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  // Avanço automático sincronizado com o fim do vídeo ativo: o próprio
  // <video> chama isso no evento "ended", então a troca de slide acontece
  // exatamente quando o vídeo termina, sem pausa nem corte antecipado.
  const handleVideoEnded = useCallback(() => {
    if (reduceMotion) return;
    goNext();
  }, [reduceMotion, goNext]);

  // Rede de segurança independente do vídeo, reiniciada a cada troca de
  // slide (automática ou manual), caso o "ended" nunca chegue a disparar.
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setTimeout(goNext, FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [current, reduceMotion, goNext]);

  return (
    <section id="topo" className="relative h-[640px]">
      <div className="absolute inset-0 overflow-hidden">
        {SLIDE_VIDEOS.map((video, i) => (
          <HeroVideo
            key={video.src}
            src={video.src}
            poster={video.poster}
            label={video.label}
            active={i === current}
            // Só o slide atual e o próximo baixam o vídeo inteiro; os demais
            // ficam só com metadata. Os 5 vídeos (~22MB juntos) disputando
            // banda ao mesmo tempo no load inicial era o que deixava o
            // carrossel travado no poster em conexões mais lentas.
            preload={i === current || i === (current + 1) % SLIDE_COUNT ? "auto" : "metadata"}
            onEnded={handleVideoEnded}
            className={`hero-slide absolute inset-0 h-full w-full object-cover ${video.objectClassName} ${
              i === current ? "is-active" : ""
            }`}
          />
        ))}

        {/* Um overlay por slide, cobrindo o lado onde o texto aparece em cada vídeo */}
        <div className="absolute inset-0">
          {SLIDE_VIDEOS.map((video, i) => (
            <div
              key={video.src}
              className={`hero-slide absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent ${
                SLIDE_LAYOUTS[i].textOnRight ? "md:bg-gradient-to-l" : ""
              } ${i === current ? "is-active" : ""}`}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-df-warm-100/70 via-transparent to-transparent md:from-transparent" />
      </div>

      <div className="relative mx-auto h-full max-w-7xl px-5 py-10 md:px-8">
        <Reveal className="relative h-full w-full">
          {dict.hero.slides.map((slide, i) => (
            <div
              key={SLIDE_VIDEOS[i].src}
              className={`hero-slide ${SLIDE_LAYOUTS[i].wrapClass} ${
                i === current ? "is-active" : ""
              }`}
            >
              <div className={`max-w-xl ${SLIDE_LAYOUTS[i].textAlign}`}>
                <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-df-ink-900 md:text-5xl lg:text-[3.25rem]">
                  {slide.title}
                </h1>
                <p
                  className={`mt-4 max-w-md text-lg leading-relaxed text-df-ink-700 ${
                    SLIDE_LAYOUTS[i].textOnRight ? "md:ml-auto" : ""
                  }`}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={`mt-6 flex flex-wrap items-center gap-4 ${
                    SLIDE_LAYOUTS[i].textOnRight ? "md:justify-end" : ""
                  }`}
                >
                  <a
                    href="#servicos"
                    className="glass inline-flex items-center rounded-df-full px-6 py-3.5 text-base font-semibold text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
                  >
                    {slide.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        {/* z-20 e docado no canto: a TrustBar (z-10) sobe por cima do rodapé
            da hero a partir de lg (~73px de sobreposição), então as setas
            sobem junto pra ficar acima da faixa de sobreposição, sem disputar
            clique nem ficar visualmente por cima dos cards. */}
        <div className="absolute bottom-6 right-0 z-20 flex gap-3 lg:bottom-24">
          <button
            type="button"
            onClick={goPrev}
            aria-label={dict.hero.prevAria}
            className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
          >
            <CaretLeft size={18} weight="bold" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label={dict.hero.nextAria}
            className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
          >
            <CaretRight size={18} weight="bold" />
          </button>
        </div>
      </div>
    </section>
  );
}
