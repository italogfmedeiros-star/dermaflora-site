import { WhatsappLogo, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="contato" className="bg-df-primary-900 py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Vamos cuidar da sua saúde, beleza e bem-estar juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/80">
            Fale agora com nossos especialistas e monte a fórmula pensada
            para o seu caso.
          </p>

          <a
            href="https://wa.me/5511988296867"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-df-full bg-white px-7 py-4 text-base font-semibold text-df-primary-900 shadow-df-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <WhatsappLogo size={22} weight="fill" />
            Falar com um especialista
          </a>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mx-auto mt-14 grid max-w-lg grid-cols-1 gap-6 border-t border-white/15 pt-10 text-left sm:grid-cols-2"
        >
          <div className="flex items-start gap-3">
            <MapPin size={20} weight="regular" className="mt-0.5 shrink-0 text-white/70" />
            <div>
              <p className="text-sm font-semibold text-white">Endereço</p>
              <p className="mt-0.5 text-sm text-white/70">
                Rua Américo Brasiliense, 1290, Chácara Santo Antônio, São
                Paulo, CEP: 04715-002
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={20} weight="regular" className="mt-0.5 shrink-0 text-white/70" />
            <div>
              <p className="text-sm font-semibold text-white">Horário</p>
              <p className="mt-0.5 text-sm text-white/70">Segunda a sexta, das 8h às 18h</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
