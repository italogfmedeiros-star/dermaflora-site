"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import {
  PaperPlaneTilt,
  Paperclip,
  FileArrowUp,
  X,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { sendContactMessage, type ContactFormState } from "@/lib/actions/contact";

const inputClasses =
  "w-full rounded-df-md border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-shadow focus:border-df-primary-300/60 focus:shadow-[0_0_0_3px_rgba(185,222,186,0.2)]";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const initialContactFormState: ContactFormState = { status: "idle", message: "" };

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    initialContactFormState
  );
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  function handleFormReset() {
    setFile(null);
    setFileError("");
  }

  function applyFile(candidate: File | undefined | null) {
    if (!candidate) return;

    if (!ACCEPTED_FILE_TYPES.includes(candidate.type)) {
      setFileError("Envie a receita em JPG, PNG, WEBP ou PDF.");
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setFileError("O arquivo deve ter até 5MB.");
      return;
    }

    setFileError("");
    setFile(candidate);

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(candidate);
      fileInputRef.current.files = dataTransfer.files;
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    applyFile(e.target.files?.[0]);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    const item = Array.from(e.clipboardData.items).find((i) => i.kind === "file");
    const candidate = item?.getAsFile();
    if (candidate) {
      e.preventDefault();
      applyFile(candidate);
    }
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    applyFile(e.dataTransfer.files?.[0]);
  }

  function handleDropzoneKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  }

  function removeFile() {
    setFile(null);
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onReset={handleFormReset}
      className="flex flex-col gap-4 text-left"
    >
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-semibold text-white">
          Nome
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
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
          name="email"
          type="email"
          required
          autoComplete="email"
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
          name="message"
          required
          rows={4}
          placeholder="Conte o que você precisa: fórmula, produto ou dúvida."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-semibold text-white">
          Envie sua receita <span className="font-normal text-white/50">(opcional)</span>
        </label>
        <div
          role="button"
          tabIndex={0}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onKeyDown={handleDropzoneKeyDown}
          className="rounded-df-md border border-dashed border-white/25 bg-white/5 px-4 py-4 outline-none transition-colors focus-visible:border-df-primary-300/60 focus-visible:shadow-[0_0_0_3px_rgba(185,222,186,0.2)]"
        >
          {file ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <FileArrowUp size={20} className="shrink-0 text-df-primary-300" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-white/50">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                aria-label="Remover arquivo"
                className="shrink-0 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <Paperclip size={20} className="text-white/50" />
              <p className="text-sm text-white/70">
                Arraste, cole ou{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="font-semibold text-df-primary-300 underline-offset-2 hover:underline"
                >
                  selecione o arquivo
                </button>
              </p>
              <p className="text-xs text-white/40">
                Cole com Ctrl+V · JPG, PNG, WEBP ou PDF até 5MB
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          name="receita"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileError && <p className="mt-1.5 text-xs text-rose-300">{fileError}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-df-full bg-white px-7 py-3.5 text-base font-semibold text-df-primary-900 shadow-df-lg transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        <PaperPlaneTilt size={20} weight="fill" />
        {isPending ? "Enviando..." : "Enviar mensagem"}
      </button>

      {state.status !== "idle" && state.message && (
        <p
          className={`flex items-start gap-1.5 text-xs ${
            state.status === "success" ? "text-df-primary-300" : "text-rose-300"
          }`}
          aria-live="polite"
        >
          {state.status === "success" ? (
            <CheckCircle size={16} weight="fill" className="mt-0.5 shrink-0" />
          ) : (
            <WarningCircle size={16} weight="fill" className="mt-0.5 shrink-0" />
          )}
          {state.message}
        </p>
      )}

      <p className="text-xs text-white/50">
        Retornaremos o contato pelo WhatsApp da farmácia.
      </p>
    </form>
  );
}
