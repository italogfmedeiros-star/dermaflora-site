"use client";

import { HeroVideo } from "./HeroVideo";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SLIDE_VIDEOS = [
  {
    src: "/videos/hero-video-1.mp4",
    poster: "/images/hero-banner.png",
    label:
      "Mulher aplicando um creme hidratante Dermaflora no rosto, em ambiente claro e natural",
    className:
      "hero-slide absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-[75%_center]",
  },
  {
    src: "/videos/hero-video-2.mp4",
    poster: "/images/hero-banner-2.png",
    label: "Sérum Dermaflora em composição entre flores de cerejeira ao entardecer",
    className:
      "hero-slide absolute inset-0 h-full w-full object-cover object-[39%_center] md:object-[8%_center]",
  },
  {
    src: "/videos/hero-video-3.mp4",
    poster: "/images/hero-banner-3.png",
    label: "Mão retirando um produto Dermaflora de dentro de uma nécessaire lilás",
    className:
      "hero-slide absolute inset-0 h-full w-full object-cover object-[70%_center] md:object-[78%_center]",
  },
  {
    src: "/videos/hero-video-4.mp4",
    poster: "/images/hero-banner-4.png",
    label: "Cápsulas manipuladas Dermaflora derramando de um frasco branco",
    className:
      "hero-slide absolute inset-0 h-full w-full object-cover object-[65%_center] md:object-[72%_center]",
  },
];

const SLIDE_LAYOUTS = [
  { wrapClass: "hero-slide absolute inset-0 flex items-center justify-start", textAlign: "" },
  {
    wrapClass:
      "hero-slide absolute inset-0 flex items-center justify-start md:justify-end",
    textAlign: "md:mr-12 md:text-right",
  },
  { wrapClass: "hero-slide absolute inset-0 flex items-center justify-start", textAlign: "" },
  { wrapClass: "hero-slide absolute inset-0 flex items-center justify-start", textAlign: "" },
];

export function Hero() {
  const { dict } = useLanguage();

  return (
    <section id="topo" className="relative h-[640px]">
      <div className="absolute inset-0 overflow-hidden">
        {SLIDE_VIDEOS.map((video) => (
          <HeroVideo key={video.src} {...video} />
        ))}

        {/* Um overlay por slide, cobrindo o lado onde o texto aparece em cada vídeo */}
        <div className="absolute inset-0">
          <div className="hero-slide absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent" />
          <div className="hero-slide absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent md:bg-gradient-to-l" />
          <div className="hero-slide absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent" />
          <div className="hero-slide absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-df-warm-100/70 via-transparent to-transparent md:from-transparent" />
      </div>

      <div className="relative mx-auto h-full max-w-7xl px-5 py-10 md:px-8">
        <Reveal className="relative h-full w-full">
          {dict.hero.slides.map((slide, i) => (
            <div key={SLIDE_VIDEOS[i].src} className={SLIDE_LAYOUTS[i].wrapClass}>
              <div className={`max-w-xl ${SLIDE_LAYOUTS[i].textAlign}`}>
                <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-df-ink-900 md:text-5xl lg:text-[3.25rem]">
                  {slide.title}
                </h1>
                <p
                  className={`mt-4 max-w-md text-lg leading-relaxed text-df-ink-700 ${
                    i === 1 ? "md:ml-auto" : ""
                  }`}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={`mt-6 flex flex-wrap items-center gap-4 ${
                    i === 1 ? "md:justify-end" : ""
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
      </div>
    </section>
  );
}
