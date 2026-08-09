"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { CaretLeft, CaretRight, Images, X } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { EventGalleryPhoto } from "@/data/event-galleries";

/**
 * Grade de miniaturas + lightbox, pra reproduzir o carrossel de fotos que os
 * eventos tinham no site antigo. `photos` vem de `src/data/event-galleries.ts`
 * (curadoria manual, ver esse arquivo pra adicionar uma galeria nova).
 */
export function EventGallery({ photos }: { photos: EventGalleryPhoto[] }) {
  const { dict } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const showPrev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );
  const showNext = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex, close, showPrev, showNext]);

  if (photos.length === 0) return null;

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <div className="mt-10">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold text-df-ink-900">
        <Images size={22} weight="bold" className="text-df-primary-700" />
        {dict.eventGallery.title}
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={dict.eventGallery.openAria}
            className="group relative aspect-square overflow-hidden rounded-df-md bg-df-primary-100"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={dict.eventGallery.title}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-df-ink-900/90 px-4 py-10"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label={dict.eventGallery.closeAria}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-df-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={22} weight="bold" />
          </button>

          <button
            type="button"
            onClick={showPrev}
            aria-label={dict.eventGallery.prevAria}
            className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-df-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:left-4"
          >
            <CaretLeft size={22} weight="bold" />
          </button>

          <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
            <div className="relative aspect-[4/3] w-full max-h-full">
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={showNext}
            aria-label={dict.eventGallery.nextAria}
            className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-df-full text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:right-4"
          >
            <CaretRight size={22} weight="bold" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {dict.eventGallery.counter
              .replace("{current}", String(openIndex + 1))
              .replace("{total}", String(photos.length))}
          </p>
        </div>
      )}
    </div>
  );
}
