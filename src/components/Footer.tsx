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
    <footer className="bg-df-ink-900 py-14 text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <LogoMark variant="white" />
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Fórmulas magistrais feitas sob medida para você, há 45 anos
              cuidando de saúde, beleza e bem-estar.
            </p>
            <a
              href="https://www.instagram.com/dermaflora"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Dermaflora"
              className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white"
            >
              <InstagramLogo size={19} weight="regular" />
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-1.5 border-t border-white/10 pt-8 text-xs leading-relaxed text-white/50 sm:grid-cols-2">
          <p>Farmacêutica Responsável: Edma Dourado Nobrega, CRF: 13207</p>
          <p>CNPJ: 45.680.634/0001-70</p>
          <p>CMVS: 355003080147700315710</p>
          <p>AFE: 7485451 | AE: 1.16.945-0</p>
          <p className="sm:col-span-2">
            Endereço: Rua Américo Brasiliense, 1290, Chácara Santo Antônio,
            São Paulo, CEP: 04715-002
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs leading-relaxed text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dermaflora Farmácia de Manipulação. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{" "}
            <span className="font-medium text-white/70">Devopsia</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
