"use client";

import { useEffect, useRef, useState } from "react";

// Modal simples usado pelo editor no lugar de window.prompt, que não permite
// editar/remover um valor existente nem validar antes de aplicar.
export function EditorDialog({
  title,
  label,
  hint,
  placeholder,
  initialValue = "",
  confirmLabel,
  requireValue = false,
  secondaryLabel,
  onSecondary,
  onConfirm,
  onCancel,
}: {
  title: string;
  label: string;
  hint?: string;
  placeholder?: string;
  initialValue?: string;
  confirmLabel: string;
  requireValue?: boolean;
  secondaryLabel?: string;
  onSecondary?: () => void;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const trimmed = value.trim();
  const canConfirm = !requireValue || trimmed.length > 0;

  function confirm() {
    if (canConfirm) onConfirm(trimmed);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 grid place-items-center bg-df-ink-900/40 px-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div className="w-full max-w-md rounded-df-md border border-df-line bg-white p-6 shadow-df-lg">
        <h2 className="font-display text-lg font-bold text-df-ink-900">{title}</h2>

        <label className="mt-4 block text-sm font-medium text-df-ink-700">
          {label}
          <input
            ref={inputRef}
            value={value}
            placeholder={placeholder}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                confirm();
              }
            }}
            className="mt-1.5 w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm text-df-ink-900 outline-none focus:border-df-primary-700"
          />
        </label>

        {hint && <p className="mt-2 text-xs text-df-ink-400">{hint}</p>}

        <div className="mt-6 flex items-center justify-between gap-3">
          {secondaryLabel && onSecondary ? (
            <button
              type="button"
              onClick={onSecondary}
              className="text-sm font-medium text-df-ink-400 transition-colors hover:text-df-error"
            >
              {secondaryLabel}
            </button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="text-sm font-medium text-df-ink-400 transition-colors hover:text-df-ink-900"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={!canConfirm}
              className="inline-flex items-center rounded-df-full bg-df-primary-700 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
