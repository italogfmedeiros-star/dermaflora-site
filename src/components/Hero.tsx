import Image from "next/image";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="topo" className="relative h-[640px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-banner.png"
          alt="Mulher aplicando um creme hidratante Dermaflora no rosto, em ambiente claro e natural"
          fill
          priority
          sizes="100vw"
          className="hero-slide object-cover object-[68%_center] md:object-[75%_center]"
        />
        <Image
          src="/images/hero-banner-2.png"
          alt="Sérum Dermaflora em composição entre flores de cerejeira"
          fill
          sizes="100vw"
          className="hero-slide object-cover object-[39%_center] md:object-[8%_center]"
        />
        <Image
          src="/images/hero-banner-3.png"
          alt="Nécessaire Dermaflora com fórmulas manipuladas sendo organizada"
          fill
          sizes="100vw"
          className="hero-slide object-cover object-[70%_center] md:object-[78%_center]"
        />
        <Image
          src="/images/hero-banner-4.png"
          alt="Cápsulas manipuladas Dermaflora derramando de um frasco branco"
          fill
          sizes="100vw"
          className="hero-slide object-cover object-[65%_center] md:object-[72%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-df-warm-100 via-df-warm-100/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-df-warm-100/70 via-transparent to-transparent md:from-transparent" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 py-10 md:px-8">
        <Reveal className="max-w-xl">
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-df-ink-900 md:text-5xl lg:text-[3.25rem]">
            Cuidado de verdade começa por uma fórmula feita só para você.
          </h1>

          <p className="mt-4 max-w-md text-lg leading-relaxed text-df-ink-700">
            Há 45 anos cuidando de saúde, beleza e bem-estar com fórmulas
            personalizadas para o seu caso.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#servicos"
              className="glass inline-flex items-center rounded-df-full px-6 py-3.5 text-base font-semibold text-df-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:text-df-primary-700"
            >
              Conhecer os serviços
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
