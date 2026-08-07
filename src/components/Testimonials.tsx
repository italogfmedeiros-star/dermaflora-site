"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Quotes, Star } from "@phosphor-icons/react";
import { LabTexture } from "./LabTexture";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GOOGLE_RATING_VALUE, GOOGLE_REVIEWS_COUNT, GOOGLE_REVIEWS_URL } from "@/lib/seo";

function StarRow({ tone }: { tone: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          weight="fill"
          className={tone === "dark" ? "text-amber-300" : "text-amber-400"}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { dict } = useLanguage();
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
    <section id="depoimentos" className="relative overflow-hidden bg-df-primary-200 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <LabTexture />
      <div
        aria-hidden="true"
        className="ambient-glow -left-20 bottom-0 h-72 w-72 bg-df-primary-300/40"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
              {dict.testimonials.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 rounded-df-lg px-4 py-3 transition-transform hover:-translate-y-0.5"
            >
              <StarRow tone="light" />
              <span className="text-sm text-df-ink-700">
                <strong className="font-display text-base font-extrabold text-df-ink-900">
                  {GOOGLE_RATING_VALUE}
                </strong>{" "}
                {dict.testimonials.ratingPrefix} {GOOGLE_REVIEWS_COUNT}{" "}
                {dict.testimonials.ratingSuffix}
              </span>
            </a>
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollByPage(-1)}
                disabled={!canPrev}
                aria-label={dict.testimonials.prevAria}
                className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700 disabled:pointer-events-none disabled:opacity-40"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => scrollByPage(1)}
                disabled={!canNext}
                aria-label={dict.testimonials.nextAria}
                className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700 disabled:pointer-events-none disabled:opacity-40"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {dict.testimonials.items.map((t, i) => {
              const highlight = i % 3 === 0;
              return (
                <div
                  key={t.name}
                  className={
                    (highlight
                      ? "bg-gradient-to-br from-df-primary-600 to-df-primary-900 text-white shadow-df-lg"
                      : "glass") +
                    " flex w-[85%] shrink-0 snap-start flex-col justify-between rounded-df-lg p-7 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
                  }
                >
                  <Quotes
                    size={28}
                    weight="fill"
                    className={highlight ? "text-white/40" : "text-df-primary-300"}
                  />
                  <p
                    className={
                      highlight
                        ? "mt-4 text-lg font-medium leading-snug"
                        : "mt-4 text-lg font-medium leading-snug text-df-ink-900"
                    }
                  >
                    {t.quote}
                  </p>
                  <div className="mt-6">
                    <StarRow tone={highlight ? "dark" : "light"} />
                    <p
                      className={
                        highlight ? "mt-2 font-semibold" : "mt-2 font-semibold text-df-ink-900"
                      }
                    >
                      {t.name}
                    </p>
                    <p className={highlight ? "text-sm text-white/70" : "text-sm text-df-ink-400"}>
                      {t.context}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
