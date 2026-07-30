import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getAllCursosForAdmin } from "@/lib/cursos-data";

export const metadata: Metadata = {
  title: "Cursos e Eventos | Painel Dermaflora",
  robots: { index: false, follow: false },
};

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default async function AdminCursosPage() {
  const supabase = await createClient();
  const cursos = await getAllCursosForAdmin(supabase);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-df-ink-900">Cursos e eventos</h1>
        <Link
          href="/admin/cursos/novo"
          className="inline-flex items-center rounded-df-full bg-df-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-df-sm"
        >
          Novo evento
        </Link>
      </div>

      {cursos.length === 0 ? (
        <p className="mt-10 text-sm text-df-ink-400">
          Nenhum evento ainda. Clique em &quot;Novo evento&quot; para começar.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-df-line overflow-hidden rounded-df-md border border-df-line bg-white">
          {cursos.map((curso) => (
            <li key={curso.id}>
              <Link
                href={`/admin/cursos/${curso.id}/editar`}
                className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-df-primary-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-df-ink-900">
                    {curso.title}
                  </p>
                  <p className="mt-1 text-xs text-df-ink-400">
                    {curso.event_date
                      ? DATE_FORMATTER.format(new Date(curso.event_date))
                      : "Sem data"}{" "}
                    · Atualizado em{" "}
                    {DATE_FORMATTER.format(new Date(curso.updated_at))}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-df-full px-3 py-1 text-xs font-semibold ${
                    curso.status === "published"
                      ? "bg-df-primary-100 text-df-primary-700"
                      : "bg-df-warm-300 text-df-ink-700"
                  }`}
                >
                  {curso.status === "published" ? "Publicado" : "Rascunho"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
