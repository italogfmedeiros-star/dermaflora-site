"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

/** Reabre o aviso de cookies para o visitante mudar a escolha já feita. */
export function CookiePreferencesButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
    >
      {children}
    </button>
  );
}
