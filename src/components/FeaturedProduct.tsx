import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

const BENEFITS = [
  "Blend 100% natural de fibras solúveis e insolúveis",
  "Enriquecido com antioxidantes",
  "Ajuda a equilibrar a flora intestinal",
];

export function FeaturedProduct() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="inline-flex items-center rounded-df-full bg-df-warm-300 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-df-ink-700">
            Produto próprio
          </span>

          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl">
            Gutfiber®, fibras que cuidam do seu equilíbrio por dentro.
          </h2>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-df-ink-700">
            Desenvolvido pela Dermaflora para apoiar sua digestão e trazer
            mais leveza para o dia a dia.
          </p>

          <ul className="mt-6 flex flex-col gap-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5">
                <CheckCircle
                  size={20}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-df-primary-700"
                />
                <span className="text-[15px] leading-relaxed text-df-ink-700">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#contato"
            className="mt-8 inline-flex items-center rounded-df-full bg-df-primary-700 px-6 py-3.5 text-base font-semibold text-white shadow-df-sm transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Falar com um especialista
          </a>
        </Reveal>

        <Reveal delay={0.15} className="order-1 lg:order-2">
          <div className="glass-strong w-full max-w-md rounded-df-lg p-3 lg:ml-auto">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[calc(var(--df-radius-lg)-12px)]">
              <Image
                src="/images/instagram-post-1.jpg"
                alt="Gutfiber, produto próprio de fibras da Dermaflora"
                fill
                sizes="(min-width: 1024px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
