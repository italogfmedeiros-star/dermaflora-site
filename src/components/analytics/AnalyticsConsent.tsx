"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  ANALYTICS_ENABLED,
  CONSENT_STORAGE_KEY,
  GA_ID,
  OPEN_CONSENT_EVENT,
  trackEvent,
  type ConsentChoice,
} from "@/lib/analytics";

const COPY = {
  pt: {
    text: "Usamos cookies de análise (Google Analytics) para entender como o site é usado e melhorá-lo. Eles só são ativados se você aceitar.",
    policy: "Política de Privacidade",
    accept: "Aceitar",
    decline: "Recusar",
    label: "Aviso de cookies",
  },
  en: {
    text: "We use analytics cookies (Google Analytics) to understand how the site is used and improve it. They are only turned on if you accept.",
    policy: "Privacy Policy",
    accept: "Accept",
    decline: "Decline",
    label: "Cookie notice",
  },
} as const;

type Stored = ConsentChoice | null;

// Cookies do GA4 gravados no domínio; apagados quando o visitante recusa depois de ter aceitado.
function clearGaCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((n) => n === "_ga" || n.startsWith("_ga_"));
  const host = window.location.hostname;
  const domains = [host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    }
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const [consent, setConsent] = useState<Stored>(null);
  const [ready, setReady] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);

  // Lido só depois de montar: ler localStorage no render desalinharia com o HTML do servidor.
  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    /* eslint-disable react-hooks/set-state-in-effect */
    if (stored === "granted" || stored === "denied") setConsent(stored);
    else setBannerOpen(true);
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    const reopen = () => setBannerOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Medição dos cliques que viram contato: WhatsApp, telefone, e-mail e rota no mapa.
  // Um único listener no documento cobre todos os links, inclusive os de conteúdo do blog.
  useEffect(() => {
    if (consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!link || !href) return;

      const params = {
        link_url: href.split("?")[0],
        link_text: (link.textContent ?? "").trim().slice(0, 80),
        page_path: window.location.pathname,
      };
      if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) {
        trackEvent("whatsapp_click", params);
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", params);
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", params);
      } else if (href.includes("google.com/maps")) {
        trackEvent("directions_click", params);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [consent]);

  // O painel e o resto do admin não entram na medição nem mostram o aviso.
  if (!ANALYTICS_ENABLED || !ready || pathname.startsWith("/admin")) return null;

  const decide = (choice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    if (choice === "denied") {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = true;
      clearGaCookies();
    } else {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_ID}`] = false;
    }
    setConsent(choice);
    setBannerOpen(false);
  };

  const t = COPY[lang === "en" ? "en" : "pt"];

  return (
    <>
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {bannerOpen && (
        <div
          role="dialog"
          aria-label={t.label}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-df-lg border border-white/60 bg-white/95 p-4 shadow-xl backdrop-blur md:bottom-5 md:p-5"
        >
          <p className="text-sm leading-relaxed text-df-ink-700">
            {t.text}{" "}
            <Link
              href="/politica-de-privacidade"
              className="text-df-primary-700 underline underline-offset-2"
            >
              {t.policy}
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => decide("denied")}
              className="min-h-11 rounded-full border border-df-ink-900/20 px-5 text-sm font-semibold text-df-ink-900 transition-colors hover:bg-df-ink-900/5"
            >
              {t.decline}
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className="min-h-11 rounded-full bg-df-primary-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-df-primary-900"
            >
              {t.accept}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
