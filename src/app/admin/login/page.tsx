import type { Metadata } from "next";
import { LogoMark } from "@/components/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Entrar | Painel Dermaflora",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-df-bg px-5">
      <div className="w-full max-w-sm rounded-df-lg border border-df-line bg-white p-8 shadow-df-md">
        <div className="mb-6 flex justify-center">
          <LogoMark />
        </div>
        <h1 className="mb-1 text-center text-lg font-semibold text-df-ink-900">
          Painel de conteúdo
        </h1>
        <p className="mb-6 text-center text-sm text-df-ink-400">
          Acesso restrito à equipe Dermaflora
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
