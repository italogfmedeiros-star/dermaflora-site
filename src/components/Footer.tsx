"use client";

import Link from "next/link";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";
import { LogoMark } from "./Logo";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Footer() {
  const { dict } = useLanguage();

  const links = [
    { href: "/#sobre", label: dict.nav.sobre },
    { href: "/#servicos", label: dict.nav.servicos },
    { href: "/#depoimentos", label: dict.nav.depoimentos },
    { href: "/cursos-e-eventos", label: dict.nav.cursosEEventos },
    { href: "/blog", label: dict.nav.blog },
    { href: "/#faq", label: dict.nav.perguntas },
    { href: "/#contato", label: dict.nav.contato },
  ];

  return (
    <footer className="bg-df-ink-900 py-7 text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <LogoMark variant="white" />

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/dermaflora"
              target="_blank"
              rel="noreferrer"
              aria-label={dict.header.instagramAria}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white"
            >
              <InstagramLogo size={16} weight="regular" />
            </a>
            <a
              href="https://www.facebook.com/dermaflora"
              target="_blank"
              rel="noreferrer"
              aria-label={dict.header.facebookAria}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white/50 hover:text-white"
            >
              <FacebookLogo size={16} weight="regular" />
            </a>
          </nav>
        </div>

        <div className="mt-5 border-t border-white/10 pt-4 text-[11px] leading-relaxed text-white/50">
          <p>{dict.footer.legal}</p>
          <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <p>{dict.footer.copyright.replace("{year}", String(new Date().getFullYear()))}</p>
            <p>
              {dict.footer.developedBy}{" "}
              <span className="font-medium text-white/70">Devopsia</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
