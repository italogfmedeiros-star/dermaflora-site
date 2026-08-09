"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CaretDown,
  FacebookLogo,
  InstagramLogo,
  List,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react";
import { LogoMark } from "./Logo";
import { WHATSAPP_URL } from "@/lib/seo";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "@/lib/i18n/LanguageToggle";
import { useLoadingFlash } from "@/components/loading/LoadingOverlayProvider";

type NavLink =
  | { id: string; href: string; label: string }
  | { id: string; label: string; children: { href: string; label: string }[] };

export function Header() {
  const { dict } = useLanguage();
  const triggerFlash = useLoadingFlash();
  const [open, setOpen] = useState(false);
  const [institucionalOpen, setInstitucionalOpen] = useState(false);

  const navLinks: NavLink[] = [
    { id: "sobre", href: "/#sobre", label: dict.nav.sobre },
    { id: "servicos", href: "/#atendimento", label: dict.nav.servicos },
    { id: "depoimentos", href: "/#depoimentos", label: dict.nav.depoimentos },
    { id: "perguntas", href: "/#faq", label: dict.nav.perguntas },
    {
      id: "institucional",
      label: dict.nav.institucional,
      children: [
        { href: "/cursos-e-eventos", label: dict.nav.cursosEEventos },
        { href: "/blog", label: dict.nav.blog },
      ],
    },
    { id: "contato", href: "/#contato", label: dict.nav.contato },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-df-line bg-df-bg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <Link href="/#topo" aria-label={dict.header.homeAria}>
          <LogoMark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            "children" in link ? (
              <div key={link.id} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-df-ink-700 transition-colors hover:text-df-primary-700"
                >
                  {link.label}
                  <CaretDown
                    size={14}
                    weight="bold"
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>
                <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="w-48 rounded-df-sm border border-df-line bg-df-bg py-2 shadow-df-sm">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm font-medium text-df-ink-700 transition-colors hover:text-df-primary-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.id}
                href={link.href}
                className="text-sm font-medium text-df-ink-700 transition-colors hover:text-df-primary-700"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={triggerFlash}
            className="inline-flex items-center gap-2 rounded-df-full bg-df-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm transition-[transform,filter] hover:-translate-y-0.5 hover:brightness-95 active:scale-[0.98]"
          >
            <WhatsappLogo size={18} weight="fill" />
            {dict.header.whatsAppCta}
          </a>
          <a
            href="https://www.instagram.com/dermaflora"
            target="_blank"
            rel="noreferrer"
            onClick={triggerFlash}
            aria-label={dict.header.instagramAria}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-df-line text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
          >
            <InstagramLogo size={18} weight="regular" />
          </a>
          <a
            href="https://www.facebook.com/dermaflora"
            target="_blank"
            rel="noreferrer"
            onClick={triggerFlash}
            aria-label={dict.header.facebookAria}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-df-line text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
          >
            <FacebookLogo size={18} weight="regular" />
          </a>
          <LanguageToggle className="h-10" />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-df-sm text-df-ink-900 transition-colors hover:bg-white/40 lg:hidden"
          aria-label={open ? dict.header.closeMenuAria : dict.header.openMenuAria}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-df-line bg-df-bg px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              "children" in link ? (
                <div key={link.id}>
                  <button
                    type="button"
                    onClick={() => setInstitucionalOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-df-sm px-2 py-3 text-base font-medium text-df-ink-700"
                    aria-expanded={institucionalOpen}
                  >
                    {link.label}
                    <CaretDown
                      size={16}
                      weight="bold"
                      className={`transition-transform ${institucionalOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {institucionalOpen && (
                    <div className="ml-2 flex flex-col gap-1 border-l border-df-line pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className="rounded-df-sm px-2 py-2 text-sm font-medium text-df-ink-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-df-sm px-2 py-3 text-base font-medium text-df-ink-700"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-2 flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  triggerFlash();
                  setOpen(false);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-df-full bg-df-whatsapp px-5 py-3 text-base font-semibold text-white active:brightness-95"
              >
                <WhatsappLogo size={20} weight="fill" />
                {dict.header.whatsAppCta}
              </a>
              <a
                href="https://www.instagram.com/dermaflora"
                target="_blank"
                rel="noreferrer"
                onClick={triggerFlash}
                aria-label={dict.header.instagramAria}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-df-line text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
              >
                <InstagramLogo size={20} weight="regular" />
              </a>
              <a
                href="https://www.facebook.com/dermaflora"
                target="_blank"
                rel="noreferrer"
                onClick={triggerFlash}
                aria-label={dict.header.facebookAria}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-df-line text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
              >
                <FacebookLogo size={20} weight="regular" />
              </a>
            </div>
            <LanguageToggle className="mt-2 h-11 w-full justify-center py-3 text-sm" />
          </nav>
        </div>
      )}
    </header>
  );
}
