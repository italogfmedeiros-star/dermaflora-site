"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export type CrossfadeSlide = {
  src: string;
  alt: string;
  imageClassName?: string;
};

export function ImageCrossfade({
  slides,
  intervalMs = 4500,
  priority = false,
  showDots = true,
}: {
  slides: CrossfadeSlide[];
  intervalMs?: number;
  priority?: boolean;
  showDots?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      intervalMs
    );
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  const active = slides[index];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={active.src}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={priority && index === 0}
            className={
              active.imageClassName ??
              "object-cover transition-transform duration-500 group-hover:scale-105"
            }
          />
        </motion.div>
      </AnimatePresence>

      {showDots && slides.length > 1 && (
        <div className="absolute right-4 top-4 z-10 flex gap-1.5">
          {slides.map((slide, i) => (
            <span
              key={slide.src}
              className={`h-1.5 rounded-df-full transition-all duration-500 ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
