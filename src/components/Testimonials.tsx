"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight, Quotes, Star } from "@phosphor-icons/react";
import { LabTexture } from "./LabTexture";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useLoadingFlash } from "@/components/loading/LoadingOverlayProvider";
import { GOOGLE_RATING_VALUE, GOOGLE_REVIEWS_COUNT, GOOGLE_REVIEWS_URL } from "@/lib/seo";

// Velocidade da rolagem contínua, em pixels por segundo.
const SPEED = 30;

type TestimonialItem = { quote: string; name: string; context: string };

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

function TestimonialCard({
  t,
  highlight,
  hidden,
}: {
  t: TestimonialItem;
  highlight: boolean;
  hidden?: boolean;
}) {
  return (
    <div
      aria-hidden={hidden}
      className={
        (highlight
          ? "bg-gradient-to-br from-df-primary-600 to-df-primary-900 text-white shadow-df-lg"
          : "glass") +
        " flex w-[85vw] shrink-0 flex-col justify-between rounded-df-lg p-7 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
      }
    >
      <Quotes size={28} weight="fill" className={highlight ? "text-white/40" : "text-df-primary-300"} />
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
        <p className={highlight ? "mt-2 font-semibold" : "mt-2 font-semibold text-df-ink-900"}>
          {t.name}
        </p>
        <p className={highlight ? "text-sm text-white/70" : "text-sm text-df-ink-400"}>
          {t.context}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { dict } = useLanguage();
  const triggerFlash = useLoadingFlash();
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const jumpTargetRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const items = dict.testimonials.items;
  // Duplicado uma vez: com a largura de um conjunto (setWidthRef) sabemos
  // quando "dar a volta" de forma imperceptível, criando o loop contínuo.
  const loopItems = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      setWidthRef.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduceMotion) return;

    let raf = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      const setWidth = setWidthRef.current;

      if (setWidth > 0) {
        if (jumpTargetRef.current !== null) {
          // Distância circular mais curta até o alvo: sem isso, um alvo que
          // "estoura" para fora de [0, setWidth) (ex.: prev a partir do
          // primeiro item) nunca converge — o offset é normalizado de volta
          // pro intervalo a cada frame e o laço abaixo roda pra sempre.
          let diff = (jumpTargetRef.current - offsetRef.current) % setWidth;
          if (diff > setWidth / 2) diff -= setWidth;
          else if (diff < -setWidth / 2) diff += setWidth;

          if (Math.abs(diff) < 0.5) {
            offsetRef.current = jumpTargetRef.current;
            jumpTargetRef.current = null;
          } else {
            offsetRef.current += diff * Math.min(1, dt * 6);
          }
        } else if (!pausedRef.current) {
          offsetRef.current += SPEED * dt;
        }
        offsetRef.current = ((offsetRef.current % setWidth) + setWidth) % setWidth;
        el!.style.transform = `translateX(-${offsetRef.current}px)`;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const step = useCallback((direction: 1 | -1) => {
    const el = trackRef.current;
    const first = el?.children[0] as HTMLElement | undefined;
    const setWidth = setWidthRef.current;
    if (!el || !first || !setWidth) return;
    const gap = parseFloat(getComputedStyle(el).columnGap || "20") || 20;
    const cardStep = first.offsetWidth + gap;
    const base = jumpTargetRef.current ?? offsetRef.current;
    // Normalizado pro intervalo [0, setWidth): evita que cliques rápidos e
    // repetidos acumulem um alvo cada vez mais distante em ponto flutuante.
    jumpTargetRef.current = ((base + direction * cardStep) % setWidth + setWidth) % setWidth;
  }, []);

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
          <div className="max-w-2xl md:max-w-none">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl md:whitespace-nowrap">
              {dict.testimonials.title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={triggerFlash}
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
                onClick={() => step(-1)}
                aria-label={dict.testimonials.prevAria}
                className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={dict.testimonials.nextAria}
                className="glass grid h-11 w-11 place-items-center rounded-df-full text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            className="relative mt-10 overflow-hidden"
            onMouseEnter={() => {
              pausedRef.current = true;
            }}
            onMouseLeave={() => {
              pausedRef.current = false;
            }}
          >
            <div ref={trackRef} className="flex gap-5 will-change-transform">
              {loopItems.map((t, i) => (
                <TestimonialCard
                  key={i}
                  t={t}
                  highlight={i % 3 === 0}
                  hidden={i >= items.length}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
