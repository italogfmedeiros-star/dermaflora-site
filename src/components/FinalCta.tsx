import { WhatsappLogo, MapPin, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

export function FinalCta() {
  return (
    <section id="contato" className="relative overflow-hidden bg-df-primary-900 py-20 md:py-28">
      <div
        aria-hidden="true"
        className="bg-grain pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="ambient-glow left-1/2 top-0 h-80 w-80 -translate-x-1/2 bg-df-primary-300/20"
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Vamos cuidar da sua saúde, beleza e bem-estar juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-white/80">
            Fale agora com nossos especialistas e monte a fórmula pensada
            para o seu caso.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal delay={0.1} className="glass-dark rounded-df-lg p-7 md:p-8">
            <ContactForm />
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col gap-6">
            <div className="glass-dark min-h-[18rem] flex-1 overflow-hidden rounded-df-lg p-2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7315.971968467748!2d-46.69934820000002!3d-23.632852900000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5a11b1165555%3A0xc6959d91a7906bf6!2zRGVybWFmbG9yYSB8IEZhcm3DoWNpYSBkZSBNYW5pcHVsYcOnw6Nv!5e0!3m2!1spt-BR!2sbr!4v1784095013559!5m2!1spt-BR!2sbr"
                title="Localização da Dermaflora no Google Maps"
                className="h-full min-h-[17rem] w-full rounded-[calc(var(--df-radius-lg)-8px)] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="glass-dark grid grid-cols-1 gap-6 rounded-df-lg p-6 text-left sm:grid-cols-2">
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
                  <p className="mt-0.5 text-sm text-white/70">
                    Segunda a sexta, das 8h às 18h
                  </p>
                  <a
                    href="https://wa.me/5511988296867"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-df-primary-300"
                  >
                    <WhatsappLogo size={18} weight="fill" />
                    (11) 98829-6867
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
