import { Buildings, Sparkle, HeartStraight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const MILESTONES = [
  {
    icon: Buildings,
    title: "Uma farmácia nascida para cuidar",
    text: "Começamos como uma farmácia de manipulação dedicada a transformar receitas em cuidado sob medida, formula a formula.",
  },
  {
    icon: Sparkle,
    title: "Nova direção, há 14 anos",
    text: "Uma nova geração assumiu a condução da Dermaflora, trazendo inovação e ampliando a atuação para dermocosmética, nutrição e cabelos.",
  },
  {
    icon: HeartStraight,
    title: "Hoje, referência em cuidado",
    text: "Somos reconhecidos pela personalização e pela ciência por trás de cada fórmula, incluindo produtos próprios como o Gutfiber®.",
  },
];

export function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-df-warm-100 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -right-24 top-10 h-64 w-64 bg-df-secondary-300/35"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            45 anos de história, escritos fórmula a fórmula.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-df-ink-700">
            Da fundação até hoje, o que nunca mudou foi o compromisso de
            olhar para cada pessoa como um caso único.
          </p>
        </Reveal>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-df-line md:block"
          />
          {MILESTONES.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1} className="relative">
              <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-df-primary-700 text-white shadow-df-sm">
                <m.icon size={22} weight="regular" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-df-ink-900">
                {m.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-df-ink-700">
                {m.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
