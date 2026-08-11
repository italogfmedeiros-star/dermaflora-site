"use client";

import { useEffect, useRef } from "react";

export function HeroVideo({
  src,
  poster,
  label,
  active,
  preload = "metadata",
  className,
  onEnded,
}: {
  src: string;
  poster: string;
  label: string;
  active: boolean;
  preload?: "auto" | "metadata" | "none";
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

    if (!active) {
      video.pause();
      return;
    }

    let cancelled = false;
    const play = () => {
      if (cancelled) return;
      video.currentTime = 0;
      // play() pode ser rejeitado (AbortError/NotAllowedError) se o
      // navegador ainda bloquear autoplay por algum motivo; nesse caso o
      // slide fica no poster, mas a troca automática (FALLBACK_MS no Hero)
      // garante que o carrossel continua andando mesmo assim.
      video.play().catch(() => {});
    };

    // Só chama play() quando já há buffer suficiente pra tocar sem travar
    // (readyState >= 3 = HAVE_FUTURE_DATA). Chamar play() num vídeo ainda
    // "vazio" é o que fazia o pedido ser abortado pelo navegador e o slide
    // nunca sair do frame estático — essa era a causa do carrossel parecer
    // só uma troca de imagens.
    if (video.readyState >= 3) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", play);
    };
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      preload={preload}
      aria-label={label}
      className={className}
      onEnded={onEnded}
    />
  );
}
