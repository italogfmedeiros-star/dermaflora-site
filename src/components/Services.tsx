import Image from "next/image";
import { Flask, Drop, Leaf, HairDryer } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-df-primary-50 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -left-24 top-1/3 h-72 w-72 bg-df-primary-300/40"
      />
      <div
        aria-hidden="true"
        className="ambient-glow -right-16 bottom-0 h-64 w-64 bg-df-warm-500/40"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            Quatro frentes de cuidado, uma só filosofia.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-df-ink-700">
            Personalização em tudo o que fazemos, da manipulação à estética.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4">
          <Reveal className="group relative overflow-hidden rounded-df-lg sm:col-span-2 lg:col-span-2 lg:row-span-2">
            <Image
              src="/images/formulas-magistrais.png"
              alt="Fórmulas magistrais manipuladas pela Dermaflora"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-df-ink-900/85 via-df-ink-900/20 to-transparent" />
            <div className="relative flex h-full min-h-[22rem] flex-col justify-end p-7">
              <Flask size={26} weight="regular" className="text-white" />
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                Fórmulas Magistrais
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
                Cada receita manipulada com precisão, na dose e forma ideais
                para o seu tratamento.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="glass flex flex-col justify-end rounded-df-lg p-6 transition-transform duration-200 hover:-translate-y-1 sm:col-span-2 lg:col-span-2 lg:row-span-1"
          >
            <div className="flex h-full min-h-[10.5rem] flex-col justify-end">
              <Drop size={24} weight="regular" className="text-df-primary-700" />
              <h3 className="mt-2 font-display text-lg font-bold text-df-ink-900">
                Dermocosmética
              </h3>
              <p className="mt-1 max-w-xs text-sm leading-relaxed text-df-ink-700">
                Cuidados de pele personalizados, do hidratante ao protocolo
                completo.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.15}
            className="glass flex flex-col justify-between rounded-df-lg p-6 transition-transform duration-200 hover:-translate-y-1 lg:col-span-1 lg:row-span-1"
          >
            <Leaf size={24} weight="regular" className="text-df-primary-700" />
            <div>
              <h3 className="mt-2 font-display text-base font-bold text-df-ink-900">
                Nutrição
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-df-ink-700">
                Suplementos como o Gutfiber®, para o bem-estar de dentro para
                fora.
              </p>
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="glass flex flex-col justify-between rounded-df-lg p-6 transition-transform duration-200 hover:-translate-y-1 lg:col-span-1 lg:row-span-1"
          >
            <HairDryer size={24} weight="regular" className="text-df-primary-700" />
            <div>
              <h3 className="mt-2 font-display text-base font-bold text-df-ink-900">
                Linha de Cabelos
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-df-ink-700">
                Produtos dedicados à saúde e estética dos seus cabelos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
