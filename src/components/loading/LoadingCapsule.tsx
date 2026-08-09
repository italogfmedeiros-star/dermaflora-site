// Só o visual — cápsula bicolor girando em rotateY + hélice de DNA "respirando"
// ao fundo + sombra pulsando no mesmo ritmo. Reinterpretação do antigo
// pill_loader.gif do site em WordPress. Sem estado, sem texto: quem controla
// quando aparece/some é o componente que o envolve (LoadingOverlay).
export function LoadingCapsule() {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      {/* Hélice dupla, ao fundo — só "respira" em opacidade, pra não competir
          com o giro da cápsula em primeiro plano. */}
      <svg
        viewBox="0 0 80 120"
        className="df-loading-dna absolute h-20 w-[3.3rem] text-df-primary-500"
        aria-hidden="true"
      >
        <path
          d="M8,0 C8,10 72,10 72,20 C72,30 8,30 8,40 C8,50 72,50 72,60 C72,70 8,70 8,80 C8,90 72,90 72,100 C72,110 8,110 8,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M72,0 C72,10 8,10 8,20 C8,30 72,30 72,40 C72,50 8,50 8,60 C8,70 72,70 72,80 C72,90 8,90 8,100 C8,110 72,110 72,120"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        {[20, 40, 60, 80, 100].map((y) => (
          <line
            key={y}
            x1="8"
            y1={y}
            x2="72"
            y2={y}
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.25"
          />
        ))}
      </svg>

      {/* Sombra elíptica: encolhe/estica no mesmo ritmo do giro, reforçando
          a ilusão de profundidade da cápsula girando no eixo vertical. */}
      <div
        aria-hidden="true"
        className="df-loading-shadow absolute bottom-2 h-1.5 w-11 rounded-full bg-df-ink-900/25 blur-[2px]"
      />

      {/* Cápsula em primeiro plano — dois tons, girando em rotateY contínuo
          (o "perspective" no wrapper dá a profundidade pro filho girar). */}
      <div className="relative [perspective:240px]" aria-hidden="true">
        <svg
          viewBox="0 0 100 40"
          className="df-loading-capsule h-[1.6rem] w-[4.4rem] drop-shadow-[0_6px_10px_rgba(49,63,50,0.25)]"
        >
          <defs>
            <clipPath id="df-capsule-clip">
              <rect x="1" y="1" width="98" height="38" rx="19" ry="19" />
            </clipPath>
          </defs>
          <rect
            x="0"
            y="0"
            width="100"
            height="40"
            rx="20"
            fill="var(--df-warm-100)"
            stroke="var(--df-primary-300)"
            strokeWidth="1.5"
          />
          <rect
            x="0"
            y="0"
            width="50"
            height="40"
            fill="var(--df-primary-600)"
            clipPath="url(#df-capsule-clip)"
          />
        </svg>
      </div>
    </div>
  );
}
