"use client";

import { useEffect, useRef } from "react";

/** Altura do ladrilho de `.bg-lab`, em px. */
const TILE = 120;

/**
 * Camada de textura das seções claras — a malha de laboratório definida em
 * `.bg-lab`. Fica atrás do conteúdo (as seções que a usam são `relative`), e de
 * fora do banner e do contato, que têm fundo próprio.
 *
 * Em páginas cujo conteúdo não é posicionado — blog, cursos, login — a camada
 * cobriria o texto e as fotos; nesses casos o pai recebe `isolate` e a camada,
 * `-z-10`, o que a joga para o fundo do empilhamento.
 *
 * Cada camada começaria a desenhar o ladrilho a partir do topo da sua própria
 * seção, o que quebra o desenho nas junções. Por isso o fundo é deslocado pelo
 * resto da distância entre o topo da seção e o topo do documento: assim todas
 * as camadas caem na mesma grade e as linhas atravessam as junções sem emenda.
 */
export function LabTexture({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = 0;

    const apply = () => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      el.style.backgroundPosition = `0 ${-(((top % TILE) + TILE) % TILE)}px`;
    };

    const align = () => {
      apply();
      // O reflow que disparou a medição pode ainda não ter terminado acima desta
      // seção, então mede-se de novo assim que a fila de tarefas esvaziar.
      clearTimeout(timer);
      timer = window.setTimeout(apply, 0);
    };

    align();

    // O topo da seção muda quando o conteúdo acima dela reflui (fontes, imagens,
    // troca de idioma, acordeão do FAQ), não só quando a janela muda de tamanho.
    const observer = new ResizeObserver(align);
    observer.observe(document.body);
    observer.observe(el);
    window.addEventListener("resize", align);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", align);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`bg-lab pointer-events-none absolute inset-0 opacity-[0.045] ${className}`}
    />
  );
}
