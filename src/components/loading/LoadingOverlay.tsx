"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LoadingCapsule } from "./LoadingCapsule";

/**
 * Moldura cheia (fundo + textura de laboratório + a cápsula) por trás de
 * dois usos diferentes:
 *  - `loading.tsx` das rotas institucionais (blog, cursos e eventos): o
 *    Next.js monta/desmonta ela sozinho via Suspense enquanto a página
 *    busca dados no servidor, então aqui ela só entra com um fade-in leve.
 *  - `LoadingOverlayProvider`, que controla show/hide manualmente (primeiro
 *    load da página e o "flash" dos links externos) passando `className`
 *    com a transição de opacidade.
 */
export function LoadingOverlay({ className = "" }: { className?: string }) {
  const { dict } = useLanguage();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={dict.loading.label}
      className={`df-loading-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-df-bg ${className}`}
    >
      <div
        aria-hidden="true"
        className="bg-lab pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <LoadingCapsule />
    </div>
  );
}
