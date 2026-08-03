import Link from "next/link";
import { LabTexture } from "@/components/LabTexture";
import { LogoMark } from "@/components/Logo";
import { logout } from "@/lib/actions/auth";

const SECTIONS = [
  { href: "/admin", label: "Posts do blog" },
  { href: "/admin/cursos", label: "Cursos e Eventos" },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-df-bg">
      <LabTexture className="-z-10" />
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
        <div className="mx-auto flex max-w-5xl gap-1 px-5">
          {SECTIONS.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="border-b-2 border-transparent px-3 py-2.5 text-sm font-medium text-df-ink-700 transition-colors hover:border-df-primary-300 hover:text-df-primary-700"
            >
              {section.label}
            </Link>
          ))}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-10">{children}</main>
    </div>
  );
}
