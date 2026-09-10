"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

// Cards revelados em sincronia com o progresso real do scroll (inspirado no
// "Scroll Reveal Grid Cards" do Skiper UI, recriado com `motion` via
// useScroll/useTransform em vez de whileInView) — sem sticky/pin, a página
// segue rolando normalmente depois que cada card termina de revelar.
//
// Cada item rastreia a própria posição na tela (não uma fatia de um
// progresso único do grid inteiro). Isso importa porque o grid empilha em 1
// coluna no mobile — bem mais alto que a fileira do desktop — e uma divisão
// por fatias fazia os últimos cards ficarem 100% opacos bem antes de
// entrarem na viewport, aparecendo já "parados" quando o usuário rolava até
// eles. Rastreando a posição de cada card individualmente, o efeito fica
// correto em qualquer layout (fileira ou coluna).

// Pequeno deslocamento por índice: em fileira (desktop), os cards ficam lado
// a lado na mesma posição vertical, então sem isso todos animariam juntos.
// Com o deslocamento, cada card seguinte dispara um pouco depois do
// anterior, criando uma cascata da esquerda pra direita.
const INDEX_SHIFT = 0.06;

export function ScrollRevealItem({
  index = 0,
  className,
  children,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduceScrollReveal();
  const shift = index * INDEX_SHIFT;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${0.9 - shift}`, `start ${0.5 - shift}`],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { opacity, y, scale }}>
      {children}
    </motion.div>
  );
}

export function useReduceScrollReveal() {
  return !!useReducedMotion();
}
