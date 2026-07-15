"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // O vídeo não usa loop: toca uma vez e congela no último frame. Rebobina e
  // toca de novo sempre que o slide entra em cena — animationstart cobre a
  // primeira exibição (após o animation-delay) e animationiteration as voltas
  // seguintes do carrossel (a animação .hero-slide roda no próprio elemento).
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const replay = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };
    video.addEventListener("animationstart", replay);
    video.addEventListener("animationiteration", replay);
    return () => {
      video.removeEventListener("animationstart", replay);
      video.removeEventListener("animationiteration", replay);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      aria-label={label}
      className={className}
    />
  );
}
