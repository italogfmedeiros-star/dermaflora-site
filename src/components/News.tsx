"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, InstagramLogo } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { INSTAGRAM_POSTS } from "@/data/instagram-posts";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function News() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  function scrollByPage(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth, behavior: "smooth" });
  }

  return (
    <section id="noticias" className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden="true"
        className="ambient-glow -right-20 top-16 h-64 w-64 bg-df-warm-500/35"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
              Últimas notícias
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-df-ink-700">
              Novidades, dicas e conteúdos direto do nosso Instagram,{" "}
              <a
                href="https://www.instagram.com/dermaflora"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-df-primary-700 transition-colors hover:text-df-primary-500"
              >
                @dermaflora
              </a>
              .
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              aria-label="Notícias anteriores"
              className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700 disabled:pointer-events-none disabled:opacity-40"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              aria-label="Próximas notícias"
              className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700 disabled:pointer-events-none disabled:opacity-40"
            >
              <CaretRight size={18} weight="bold" />
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {INSTAGRAM_POSTS.map((post) => (
              <a
                key={post.shortcode}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-df-lg transition-transform duration-200 hover:-translate-y-1 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-df-primary-100 to-df-secondary-300/50">
                  <Image
                    src={post.image}
                    alt={post.excerpt}
                    width={640}
                    height={640}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-df-full bg-white/80 text-df-ink-900 backdrop-blur">
                    <InstagramLogo size={16} weight="regular" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="rounded-df-full bg-df-primary-100 px-2.5 py-1 text-df-primary-700">
                      {post.category}
                    </span>
                    <span className="text-df-ink-400">
                      {DATE_FORMATTER.format(new Date(post.date))}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-df-ink-700 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-df-primary-700">
                    Ver no Instagram →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
