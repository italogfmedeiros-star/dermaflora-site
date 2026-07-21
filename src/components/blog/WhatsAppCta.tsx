import { WHATSAPP_URL } from "@/lib/seo";

export function WhatsAppCta({
  title = "Ficou com dúvida sobre o seu caso?",
  subtitle = "Fale agora com a equipe Dermaflora pelo WhatsApp e receba orientação personalizada.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-df-lg border border-df-primary-300 bg-df-primary-50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-base font-bold text-df-ink-900">
          {title}
        </p>
        <p className="mt-1 text-sm text-df-ink-700">{subtitle}</p>
      </div>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center rounded-df-full bg-df-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm transition-transform hover:-translate-y-0.5"
      >
        Falar no WhatsApp
      </a>
    </div>
  );
}
