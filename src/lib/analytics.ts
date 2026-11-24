// ID de métricas do GA4 ("Dermaflora – GA4"). Não é segredo: aparece no HTML
// de qualquer site que use o Google Analytics.
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-Z44YJT8B5F";

// Só mede em produção: em dev/preview local o banner nem aparece, pra não
// sujar os números reais com cliques de teste.
export const ANALYTICS_ENABLED = process.env.NODE_ENV === "production";

export const CONSENT_STORAGE_KEY = "df-analytics-consent";
export const OPEN_CONSENT_EVENT = "df-open-consent";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envia um evento ao GA4. Não faz nada se o visitante não aceitou ou se o script não carregou. */
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
