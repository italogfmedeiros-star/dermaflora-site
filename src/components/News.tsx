"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Newspaper } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";

/**
 * Posts placeholder, a substituir por conteúdo real do blog posteriormente.
 */
const POSTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  category: "Categoria",
  date: "Em breve",
  title: "Título da notícia",
  excerpt:
    "Resumo da publicação aparecerá aqui assim que o conteúdo for adicionado.",
}));

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
              Novidades, dicas e conteúdos sobre saúde, beleza e bem-estar.
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
            {POSTS.map((post) => (
              <article
                key={post.id}
                className="glass flex w-[85%] shrink-0 snap-start flex-col overflow-hidden rounded-df-lg transition-transform duration-200 hover:-translate-y-1 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
              >
                <div className="grid aspect-[16/10] place-items-center bg-gradient-to-br from-df-primary-100 to-df-secondary-300/50">
                  <Newspaper size={32} weight="regular" className="text-df-primary-500" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="rounded-df-full bg-df-primary-100 px-2.5 py-1 text-df-primary-700">
                      {post.category}
                    </span>
                    <span className="text-df-ink-400">{post.date}</span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-df-ink-900">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-df-ink-700">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-semibold text-df-primary-700">
                    Ler mais →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
