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

    // Só chama play() quando já há pelo menos os metadados carregados
    // (readyState >= 1 = HAVE_METADATA), pra não disparar play() num vídeo
    // totalmente vazio. Usamos o evento "loadedmetadata" como gatilho, não
    // "canplay": o WebKit/Safari tem um bug documentado (relatos no próprio
    // fórum de desenvolvedores da Apple) em que "canplay"/"canplaythrough"
    // às vezes nunca disparam, mesmo com o vídeo carregando normalmente por
    // trás — isso deixava o slide congelado no poster só no Safari, porque
    // o listener ficava esperando um evento que nunca vinha. loadedmetadata
    // é o workaround confirmado: dispara de forma consistente tanto no
    // Chrome quanto no Safari.
    if (video.readyState >= 1) {
      play();
    } else {
      video.addEventListener("loadedmetadata", play, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", play);
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
