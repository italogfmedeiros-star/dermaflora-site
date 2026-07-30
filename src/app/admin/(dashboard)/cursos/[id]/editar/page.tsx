import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCursoById } from "@/lib/cursos-data";
import { CursoForm } from "@/components/admin/CursoForm";

export const metadata: Metadata = {
  title: "Editar evento | Painel Dermaflora",
  robots: { index: false, follow: false },
};

export default async function EditCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const curso = await getCursoById(supabase, id);

  if (!curso) notFound();

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-df-ink-900">
        Editar evento
      </h1>
      <CursoForm curso={curso} />
    </div>
  );
}
