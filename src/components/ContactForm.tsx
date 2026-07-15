"use client";

import { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

const WHATSAPP_NUMBER = "5511988296867";

const inputClasses =
  "w-full rounded-df-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-shadow focus:border-df-primary-300/60 focus:shadow-[0_0_0_3px_rgba(185,222,186,0.2)]";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Olá! Meu nome é ${name}.`,
      `Email de contato: ${email}`,
      "",
      message,
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-white">
          Nome
        </label>
        <input
          id="contact-name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Como podemos te chamar?"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-semibold text-white">
          Email de contato
        </label>
        <input
          id="contact-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-white">
          Mensagem
        </label>
        <textarea
          id="contact-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte o que você precisa: fórmula, produto ou dúvida."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-df-full bg-white px-7 py-3.5 text-base font-semibold text-df-primary-900 shadow-df-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <PaperPlaneTilt size={20} weight="fill" />
        Enviar mensagem
      </button>
      <p className="text-xs text-white/50">
        Sua mensagem será enviada pelo WhatsApp da farmácia.
      </p>
    </form>
  );
}
