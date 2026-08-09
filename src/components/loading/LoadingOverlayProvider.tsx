"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { LoadingOverlay } from "./LoadingOverlay";

// Tempo mínimo em tela no boot — evita que a animação só "pisque" em
// conexões rápidas — e duração do fade, espelhando o antigo loader do
// WordPress (0.35s ease-out).
const BOOT_MIN_VISIBLE_MS = 550;
// Duração fixa do "flash" disparado por um link externo (WhatsApp, redes
// sociais, avaliações do Google): não há nada real pra esperar — o link abre
// em nova aba, imediatamente, sem bloquear —, então é só um retorno visual
// curto de "te levando pra fora do site".
const FLASH_VISIBLE_MS = 500;
const FADE_MS = 400;

type Phase = "visible" | "hiding" | "hidden";

const LoadingFlashContext = createContext<(() => void) | null>(null);

/**
 * Montado uma vez no layout raiz. Dois papéis:
 *
 * 1. Boot — mostra a cápsula girando até a janela terminar de carregar,
 *    depois some sozinha. Só roda uma vez: o layout raiz não remonta entre
 *    navegações client-side do Next (Link), então não reaparece ao trocar
 *    de rota dentro do site.
 * 2. Flash — qualquer link que leve pra fora do site (WhatsApp, Instagram,
 *    Facebook, avaliações do Google) chama `useLoadingFlash()` no clique,
 *    pra um retorno visual rápido de "te levando pra fora" — sem atrasar o
 *    link em si, que continua abrindo em nova aba imediatamente.
 *
 * Não cobre as páginas institucionais (blog, cursos e eventos): essas usam
 * `loading.tsx` do próprio Next, que mostra a mesma `LoadingOverlay`
 * automaticamente enquanto a rota busca dados no servidor — e não os links
 * âncora dentro da própria home (#sobre, #atendimento etc.), que não
 * navegam pra lugar nenhum.
 */
export function LoadingOverlayProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("visible");
  const hideTimer = useRef(0);
  const removeTimer = useRef(0);

  const runHideSequence = useCallback((minVisibleMs: number, start: number) => {
    const wait = Math.max(0, minVisibleMs - (Date.now() - start));
    hideTimer.current = window.setTimeout(() => {
      setPhase("hiding");
      removeTimer.current = window.setTimeout(() => setPhase("hidden"), FADE_MS);
    }, wait);
  }, []);

  // Boot: espera a janela terminar de carregar.
  useEffect(() => {
    const start = Date.now();
    const beginHide = () => runHideSequence(BOOT_MIN_VISIBLE_MS, start);

    if (document.readyState === "complete") {
      beginHide();
    } else {
      window.addEventListener("load", beginHide, { once: true });
    }

    return () => {
      window.removeEventListener("load", beginHide);
      window.clearTimeout(hideTimer.current);
      window.clearTimeout(removeTimer.current);
    };
  }, [runHideSequence]);

  const triggerFlash = useCallback(() => {
    // Já visível (boot ainda rolando, ou outro flash em andamento): não
    // interrompe, deixa o ciclo atual terminar sozinho.
    if (phase !== "hidden") return;
    window.clearTimeout(hideTimer.current);
    window.clearTimeout(removeTimer.current);
    setPhase("visible");
    runHideSequence(FLASH_VISIBLE_MS, Date.now());
  }, [phase, runHideSequence]);

  return (
    <LoadingFlashContext.Provider value={triggerFlash}>
      {phase !== "hidden" && (
        <LoadingOverlay
          className={`transition-opacity ease-out ${
            phase === "hiding" ? "pointer-events-none opacity-0 duration-[400ms]" : "opacity-100"
          }`}
        />
      )}
      {children}
    </LoadingFlashContext.Provider>
  );
}

/** Dispara o "flash" da tela de carregamento — usar no onClick de links que levam pra fora do site. */
export function useLoadingFlash() {
  const trigger = useContext(LoadingFlashContext);
  if (!trigger) {
    throw new Error("useLoadingFlash must be used within a LoadingOverlayProvider");
  }
  return trigger;
}
