"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="text-sm font-medium text-df-ink-700">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="mt-1.5 w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm text-df-ink-900 outline-none transition-colors focus:border-df-primary-700"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-medium text-df-ink-700">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm text-df-ink-900 outline-none transition-colors focus:border-df-primary-700"
        />
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-df-error" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex items-center justify-center rounded-df-full bg-df-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm transition-opacity disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
