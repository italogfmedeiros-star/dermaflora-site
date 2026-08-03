import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LabTexture } from "@/components/LabTexture";
import { CursoCard } from "@/components/cursos/CursoCard";
import { createClient } from "@/lib/supabase/server";
import { getPublishedCursos, groupCursosByYear } from "@/lib/cursos-data";
import { T } from "@/lib/i18n/T";

export const metadata: Metadata = {
  title: "Cursos e Eventos | Dermaflora Farmácia de Manipulação",
  description:
    "Cursos, palestras e eventos promovidos pela Dermaflora para profissionais de saúde e pacientes.",
  alternates: { canonical: "/cursos-e-eventos" },
};

export default async function CursosEEventosPage() {
  const supabase = await createClient();
  const cursos = await getPublishedCursos(supabase);
  const groups = groupCursosByYear(cursos);

  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden">
        <LabTexture className="-z-10" />
        <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-2xl">
            <T
              path="cursos.pageTitle"
              as="h1"
              className="font-display text-3xl font-extrabold tracking-tight text-df-ink-900 md:text-4xl"
            />
            <T
              path="cursos.pageSubtitle"
              as="p"
              className="mt-4 text-lg leading-relaxed text-df-ink-700"
            />
          </div>

          {groups.length === 0 ? (
            <T path="cursos.emptyState" as="p" className="mt-16 text-df-ink-400" />
          ) : (
            <div className="mt-12 flex flex-col gap-16">
              {groups.map(([year, items]) => (
                <div key={year}>
                  <h2 className="font-display text-2xl font-bold text-df-ink-900">
                    {year}
                  </h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((curso) => (
                      <CursoCard key={curso.id} curso={curso} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
