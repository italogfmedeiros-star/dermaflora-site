import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { LogoMark } from "./Logo";

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Perguntas" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="bg-df-ink-900 py-7 text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <LogoMark variant="white" />

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.instagram.com/dermaflora"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Dermaflora"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white"
            >
              <InstagramLogo size={16} weight="regular" />
            </a>
          </nav>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/50">
          <p>
            Farmacêutica Responsável: Edma Dourado Nobrega, CRF: 13207 · CNPJ:
            45.680.634/0001-70 · CMVS: 355003080147700315710 · AFE: 7485451 |
            AE: 1.16.945-0 · Rua Américo Brasiliense, 1290, Chácara Santo
            Antônio, São Paulo, CEP: 04715-002
          </p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Dermaflora Farmácia de Manipulação. Todos os direitos reservados.</p>
            <p>
              Desenvolvido por{" "}
              <span className="font-medium text-white/70">Devopsia</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
