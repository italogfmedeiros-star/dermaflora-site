import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

/**
 * Depoimentos ilustrativos, a substituir por relatos reais de clientes
 * com autorização de uso de nome (ver briefing-landing-page.md, seção 5).
 */
const TESTIMONIALS = [
  {
    quote:
      "Depois de anos trocando de produto, finalmente encontrei uma fórmula que entende a minha pele.",
    name: "Marina Albuquerque",
    context: "cliente de dermocosmética",
    highlight: true,
  },
  {
    quote:
      "O atendimento é diferente. Sinto que conversam comigo, não apenas vendem um produto.",
    name: "Carlos Eduardo Santos",
    context: "cliente há 6 anos",
    highlight: false,
  },
  {
    quote: "O Gutfiber mudou minha rotina. Simples assim.",
    name: "Beatriz Lima Ferreira",
    context: "cliente de nutrição",
    highlight: false,
  },
];

export function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            Quem confia em nós, conta como foi.
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              className={
                t.highlight
                  ? "flex flex-col justify-between rounded-df-lg bg-df-primary-700 p-7 text-white"
                  : "flex flex-col justify-between rounded-df-lg bg-df-warm-100 p-7"
              }
            >
              <Quotes
                size={28}
                weight="fill"
                className={t.highlight ? "text-white/40" : "text-df-primary-300"}
              />
              <p
                className={
                  t.highlight
                    ? "mt-4 text-lg font-medium leading-snug"
                    : "mt-4 text-lg font-medium leading-snug text-df-ink-900"
                }
              >
                {t.quote}
              </p>
              <div className="mt-6">
                <p className={t.highlight ? "font-semibold" : "font-semibold text-df-ink-900"}>
                  {t.name}
                </p>
                <p
                  className={
                    t.highlight ? "text-sm text-white/70" : "text-sm text-df-ink-400"
                  }
                >
                  {t.context}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
