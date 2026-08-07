"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src,
  poster,
  label,
  active,
  className,
  onEnded,
}: {
  src: string;
  poster: string;
  label: string;
  active: boolean;
  className?: string;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // O vídeo não usa loop: toca uma vez e congela no último frame. Sempre que
  // o slide volta a ficar ativo (avanço automático ou clique nas setas),
  // rebobina e toca de novo. Ao ficar inativo, pausa explicitamente pra não
  // continuar rodando escondido atrás do slide seguinte (o que disparia um
  // "ended" fora de hora).
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      aria-label={label}
      className={className}
      onEnded={onEnded}
    />
  );
}
