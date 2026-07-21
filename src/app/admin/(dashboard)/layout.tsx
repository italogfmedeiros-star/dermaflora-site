import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { logout } from "@/lib/actions/auth";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-df-bg">
      <header className="border-b border-df-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoMark />
            <span className="text-sm font-semibold text-df-ink-700">
              Painel de conteúdo
            </span>
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm font-medium text-df-ink-400 transition-colors hover:text-df-ink-900"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
