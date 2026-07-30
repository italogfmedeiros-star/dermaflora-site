import type { Metadata } from "next";
import { CursoForm } from "@/components/admin/CursoForm";

export const metadata: Metadata = {
  title: "Novo evento | Painel Dermaflora",
  robots: { index: false, follow: false },
};

export default function NewCursoPage() {
  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-df-ink-900">Novo evento</h1>
      <CursoForm />
    </div>
  );
}
