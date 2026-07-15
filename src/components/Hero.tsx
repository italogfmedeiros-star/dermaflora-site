import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden pt-12 md:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <Reveal>
          <div className="mb-5 inline-flex items-center rounded-df-full bg-df-primary-100 px-4 py-1.5 text-sm font-semibold text-df-primary-700">
            45 anos cuidando de quem confia em nós
          </div>

          <h1 className="max-w-xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-df-ink-900 md:text-5xl lg:text-[3.25rem]">
            Cuidado de verdade começa por uma fórmula feita só para você.
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-df-ink-700">
            Há 45 anos cuidando de saúde, beleza e bem-estar com fórmulas
            personalizadas para o seu caso.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-df-full bg-df-primary-700 px-6 py-3.5 text-base font-semibold text-white shadow-df-md transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Falar com um especialista
              <ArrowRight size={18} weight="bold" />
            </a>
            <a
              href="#servicos"
              className="inline-flex items-center rounded-df-full border border-df-ink-900/15 px-6 py-3.5 text-base font-semibold text-df-ink-900 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
            >
              Conhecer os serviços
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-df-lg shadow-df-lg lg:ml-auto">
            <Image
              src="https://picsum.photos/seed/dermaflora-formulas-still-life/900/1125"
              alt="Fórmulas manipuladas da Dermaflora dispostas em composição still life"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-0 w-56 rounded-df-md border border-df-line bg-df-surface p-4 shadow-df-md sm:-left-6">
            <p className="font-display text-2xl font-extrabold text-df-primary-700">
              45 anos
            </p>
            <p className="mt-0.5 text-sm text-df-ink-700">
              de história e novas gerações de cuidado
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
