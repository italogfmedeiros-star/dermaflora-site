"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, animate, motion, useReducedMotion } from "motion/react";
import { MapPin, NavigationArrow, X } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const STORAGE_KEY = "df-branch-widget";
const AUTO_OPEN_DELAY_MS = 5000;

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("Rua Américo Brasiliense, 1290, Chácara Santo Antônio, São Paulo");

// Mapa ilustrativo (sem escala): Moema no alto à direita, Américo embaixo à
// esquerda, como na geografia real. As ruas abaixo são desenhadas à mão e o
// trajeto do carro é calculado sobre elas (esquina a esquina), não é rota real.
type Pt = readonly [number, number];
type Street = readonly [Pt, Pt];

const MAJOR_H: Record<"h1" | "h2" | "h3", Street> = {
  h1: [[-10, 40], [330, 18]],
  h2: [[-10, 96], [330, 70]],
  h3: [[-10, 150], [330, 128]],
};
const MAJOR_V: Record<"v1" | "v2" | "v3" | "v4", Street> = {
  v1: [[44, -10], [70, 210]],
  v2: [[120, -10], [150, 210]],
  v3: [[200, -10], [226, 210]],
  v4: [[278, -10], [296, 210]],
};
const MINOR_H: Street[] = [
  [[-10, 68], [330, 44]],
  [[-10, 124], [330, 100]],
  [[-10, 178], [330, 156]],
];
const MINOR_V: Street[] = [
  [[82, -10], [108, 210]],
  [[160, -10], [188, 210]],
  [[240, -10], [262, 210]],
];

function cross([a, b]: Street, [c, d]: Street): Pt {
  const d1x = b[0] - a[0];
  const d1y = b[1] - a[1];
  const d2x = d[0] - c[0];
  const d2y = d[1] - c[1];
  const t = ((c[0] - a[0]) * d2y - (c[1] - a[1]) * d2x) / (d1x * d2y - d1y * d2x);
  return [a[0] + t * d1x, a[1] + t * d1y];
}

// Caminho com as quinas arredondadas, para o carro fazer curva nas esquinas.
function roundedPath(points: Pt[], radius: number): string {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const sx = cx - ((cx - px) / inLen) * r;
    const sy = cy - ((cy - py) / inLen) * r;
    const ex = cx + ((nx - cx) / outLen) * r;
    const ey = cy + ((ny - cy) / outLen) * r;
    d += ` L ${sx} ${sy} Q ${cx} ${cy} ${ex} ${ey}`;
  }
  const last = points[points.length - 1];
  return `${d} L ${last[0]} ${last[1]}`;
}

const [MOEMA_X, MOEMA_Y] = cross(MINOR_H[0], MAJOR_V.v4);
const [AMERICO_X, AMERICO_Y] = cross(MAJOR_H.h3, MAJOR_V.v1);
const MOEMA = { x: MOEMA_X, y: MOEMA_Y };
const AMERICO = { x: AMERICO_X, y: AMERICO_Y };

// Moema desce pela v4, vira na h2, desce pela v2 e entra na h3 até a Américo.
const ROUTE_D = roundedPath(
  [
    [MOEMA_X, MOEMA_Y],
    cross(MAJOR_H.h2, MAJOR_V.v4),
    cross(MAJOR_H.h2, MAJOR_V.v2),
    cross(MAJOR_H.h3, MAJOR_V.v2),
    [AMERICO_X, AMERICO_Y],
  ],
  10
);
// O carro para rente ao pin da Américo, sem cobri-lo.
const CAR_STOP_GAP = 18;

const streetLines = (streets: Street[]) =>
  streets.map(([a, b]) => `M ${a[0]} ${a[1]} L ${b[0]} ${b[1]}`).join(" ");

type Stored = { seen?: boolean };

function readStored(): Stored {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "{}") as Stored;
  } catch {
    return {};
  }
}

function writeStored(patch: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStored(), ...patch }));
  } catch {
    // localStorage indisponível (modo privado etc.) — o widget só não lembra.
  }
}

export function BranchWidget() {
  const pathname = usePathname();
  const { dict } = useLanguage();
  const t = dict.branchWidget;

  const [mounted, setMounted] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const touchedRef = useRef(false);

  // O widget fica logo abaixo do header e da faixa de benefícios. A faixa
  // muda de altura conforme a largura da tela (o texto quebra) e recolhe ao
  // rolar, então um `top` fixo ora sobrepõe ela, ora deixa um vão. Em vez
  // disso, mede o fim real das duas e acompanha: scroll, resize e o
  // ResizeObserver (que dispara a cada frame do recolhimento animado).
  useEffect(() => {
    const el = rootRef.current;
    if (!mounted || hidden || !el) return;

    // header e faixa podem aparecer depois deste efeito (streaming/Suspense,
    // troca de rota): reencontra os dois a cada medição e passa a observá-los.
    const observed = new Set<Element>();
    const resizeObserver = new ResizeObserver(() => update());
    function update() {
      // Específico no header do site: páginas de post têm outros <header>.
      const header = document.querySelector("header.glass-header");
      const perks = document.querySelector("[data-perks-bar]");
      for (const node of [header, perks]) {
        if (node && !observed.has(node)) {
          observed.add(node);
          resizeObserver.observe(node);
        }
      }
      const bottom = Math.max(
        header?.getBoundingClientRect().bottom ?? 0,
        perks?.getBoundingClientRect().bottom ?? 0
      );
      el!.style.top = `${Math.max(bottom, 0) + 12}px`;
    }

    let frame = 0;
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    const mutationObserver = new MutationObserver(scheduleUpdate);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mounted, hidden, pathname]);

  useEffect(() => {
    const stored = readStored();
    // Deferred to after mount: localStorage during SSR/first render would
    // desync from the server HTML.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    // Primeira visita: o card abre sozinho uma vez, depois vira só a pílula.
    // Se a pessoa já mexeu na pílula antes dos 5s, não reabre na cara dela.
    if (stored.seen) return;
    const timer = window.setTimeout(() => {
      if (touchedRef.current) return;
      setOpen(true);
      writeStored({ seen: true });
    }, AUTO_OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Só oculta nesta visita, de propósito não grava nada: atualizar a página
  // traz a pílula de volta (o objetivo do widget é divulgar o endereço novo).
  const dismiss = useCallback(() => {
    setOpen(false);
    setHidden(true);
  }, []);

  if (!mounted || hidden || pathname.startsWith("/admin")) return null;

  return (
    <div ref={rootRef} className="pointer-events-none fixed left-4 top-32 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-start gap-3 md:left-6">
      <div className="pointer-events-auto flex items-center gap-1.5">
        {/* O pulso vive fora do botão: o vidro (.glass-strong) tem overflow
            hidden e cortaria qualquer anel que passasse da borda da pílula. */}
        <div className="relative">
          {!open && (
            <>
              <span aria-hidden="true" className="df-pill-pulse" />
              <span aria-hidden="true" className="df-pill-pulse" style={{ animationDelay: "1.1s" }} />
            </>
          )}
          <button
            type="button"
            onClick={() => {
              touchedRef.current = true;
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-label={open ? t.close : t.open}
            className="glass-strong group relative flex items-center gap-2.5 rounded-df-full py-2 pl-2 pr-4 text-[13px] font-semibold text-df-primary-900"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-df-primary-700 text-white">
              <MapPin size={16} weight="fill" />
            </span>
            {t.pill}
          </button>
        </div>
        {!open && (
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.dismiss}
            title={t.dismiss}
            className="glass flex h-7 w-7 items-center justify-center rounded-full text-df-ink-400 transition-colors hover:text-df-ink-900"
          >
            <X size={12} weight="bold" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="card"
            role="dialog"
            aria-label={t.title}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top left" }}
            className="glass-strong pointer-events-auto max-h-[calc(100dvh-11rem)] w-[22rem] max-w-full overflow-y-auto rounded-df-lg p-3"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-df-ink-700 shadow-df-sm transition-colors hover:bg-white"
            >
              <X size={16} weight="bold" />
            </button>

            <RouteMap />

            <div className="px-2 pb-1 pt-3">
              <h2 className="font-display text-base font-extrabold tracking-tight text-df-primary-900">
                {t.title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-df-ink-700">{t.caption}</p>

              <div className="mt-3.5 flex flex-wrap gap-2">
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-df-full bg-df-primary-700 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-df-primary-900"
                >
                  <NavigationArrow size={15} weight="fill" />
                  {t.directions}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RouteMap() {
  const { dict } = useLanguage();
  const t = dict.branchWidget;
  const reduce = useReducedMotion();

  const pathRef = useRef<SVGPathElement>(null);
  const carRef = useRef<SVGGElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    const path = pathRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    if (!path || !car || !trail) return;

    const total = path.getTotalLength();
    const drive = total - CAR_STOP_GAP;
    trail.style.strokeDasharray = `${total}`;

    const place = (progress: number) => {
      const len = drive * progress;
      const p = path.getPointAtLength(len);
      const ahead = path.getPointAtLength(Math.min(total, len + 2));
      const behind = path.getPointAtLength(Math.max(0, len - 2));
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      car.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);
      trail.style.strokeDashoffset = `${total - len}`;
    };

    if (reduce) {
      place(1);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setArrived(true);
      return;
    }

    // Um ciclo: sai de Moema, chega na Américo, segura um instante e recomeça.
    place(0);
    // `arrived` é estado do React; só atualiza quando muda, não a cada frame.
    let isArrived = false;
    const controls = animate(0, 1, {
      duration: 4.2,
      ease: [0.45, 0, 0.25, 1],
      repeat: Infinity,
      repeatDelay: 2.4,
      onUpdate: (v) => {
        place(v);
        const next = v >= 0.999 ? true : v < 0.02 ? false : isArrived;
        if (next !== isArrived) {
          isArrived = next;
          setArrived(next);
        }
      },
    });
    return () => controls.stop();
  }, [reduce]);

  return (
    <div className="relative overflow-hidden rounded-[calc(var(--df-radius-lg)-12px)] bg-df-warm-100">
      <svg
        viewBox="0 0 320 200"
        role="img"
        aria-label={`${t.moema} → ${t.americo}`}
        className="block h-auto w-full"
      >
        {/* Quadras e ruas */}
        <g stroke="#fff" strokeLinecap="round" opacity="0.9">
          <path
            strokeWidth="6"
            d={streetLines([...Object.values(MAJOR_H), ...Object.values(MAJOR_V)])}
          />
          <path strokeWidth="2.5" opacity="0.75" d={streetLines([...MINOR_H, ...MINOR_V])} />
        </g>

        {/* Parque (referência de Moema) e Rio Pinheiros (referência da Américo) */}
        <path
          d="M 196 14 C 224 6, 252 16, 258 36 C 250 52, 222 58, 200 50 C 186 40, 186 24, 196 14 Z"
          fill="var(--df-primary-200)"
          opacity="0.75"
        />
        <path
          d="M -10 196 C 40 176, 70 170, 110 178 S 190 206, 240 204 L 240 215 L -10 215 Z"
          fill="var(--df-primary-300)"
          opacity="0.35"
        />

        {/* Rota: tracejado-guia + trecho já percorrido */}
        <path
          ref={pathRef}
          d={ROUTE_D}
          fill="none"
          stroke="var(--df-primary-500)"
          strokeWidth="3"
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          ref={trailRef}
          d={ROUTE_D}
          fill="none"
          stroke="var(--df-primary-700)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Moema (encerrada) */}
        <g transform={`translate(${MOEMA.x} ${MOEMA.y})`}>
          <circle r="7" fill="#fff" stroke="var(--df-ink-400)" strokeWidth="2.5" />
          <circle r="2.5" fill="var(--df-ink-400)" />
          <text
            x="-12"
            y="4"
            textAnchor="end"
            className="fill-df-ink-700 font-display text-[11px] font-bold"
          >
            {t.moema}
          </text>
          <text
            x="-12"
            y="16"
            textAnchor="end"
            className="fill-df-ink-400 text-[9px] italic"
          >
            {t.moemaClosed}
          </text>
        </g>

        {/* Américo */}
        <g transform={`translate(${AMERICO.x} ${AMERICO.y})`}>
          <circle
            r="14"
            fill="var(--df-primary-500)"
            opacity={arrived ? 0.35 : 0.15}
            className="transition-opacity duration-500"
          />
          <path
            d="M 0 -22 C -9 -22, -14 -15, -14 -9 C -14 0, 0 12, 0 12 C 0 12, 14 0, 14 -9 C 14 -15, 9 -22, 0 -22 Z"
            fill="var(--df-primary-700)"
            stroke="#fff"
            strokeWidth="2"
            transform={`translate(0 ${arrived ? -2 : 0})`}
            className="transition-transform duration-300"
          />
          <circle cy="-9" r="4.5" fill="#fff" transform={`translate(0 ${arrived ? -2 : 0})`} />
          <text
            x="0"
            y="28"
            textAnchor="middle"
            className="fill-df-primary-900 font-display text-[12px] font-extrabold"
          >
            {t.americo}
          </text>
        </g>

        {/* Carro (vista de cima, aponta para +x; rotacionado ao longo da rota) */}
        <g ref={carRef}>
          <g transform="translate(-11 -6)">
            <rect x="0" y="0" width="22" height="12" rx="4.5" fill="var(--df-primary-900)" stroke="#fff" strokeWidth="1.5" />
            <path d="M 12 1.8 L 16.5 3 L 16.5 9 L 12 10.2 Z" fill="#cfe3d5" />
            <path d="M 5 2 L 9 2 L 9 10 L 5 10 Z" fill="#cfe3d5" opacity="0.7" />
            <rect x="19.6" y="1.6" width="2" height="2.4" rx="1" fill="#ffe9a8" />
            <rect x="19.6" y="8" width="2" height="2.4" rx="1" fill="#ffe9a8" />
          </g>
        </g>
      </svg>
      <span className="absolute bottom-1.5 right-2.5 text-[9px] text-df-ink-400">{t.mapNote}</span>
    </div>
  );
}
