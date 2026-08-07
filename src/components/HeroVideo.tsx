"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src,
  poster,
  label,
  active,
  className,
}: {
  src: string;
  poster: string;
  label: string;
  active: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // O vídeo não usa loop: toca uma vez e congela no último frame. Sempre que
  // o slide volta a ficar ativo (avanço automático ou clique nas setas),
  // rebobina e toca de novo.
  useEffect(() => {
    const video = ref.current;
    if (!video || !active) return;
    video.currentTime = 0;
    video.play().catch(() => {});
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
    />
  );
}
