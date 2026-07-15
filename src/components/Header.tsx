"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { LogoMark } from "./Logo";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "Perguntas" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-df-line bg-df-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <a href="#topo" aria-label="Dermaflora, início">
          <LogoMark />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-df-ink-700 transition-colors hover:text-df-primary-700"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contato"
            className="inline-flex items-center rounded-df-full bg-df-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Falar com um especialista
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-df-sm text-df-ink-900 transition-colors hover:bg-white/40 lg:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-df-line bg-df-bg px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-df-sm px-2 py-3 text-base font-medium text-df-ink-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-df-full bg-df-primary-700 px-5 py-3 text-base font-semibold text-white"
            >
              Falar com um especialista
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
