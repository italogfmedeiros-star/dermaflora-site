import { LoadingOverlay } from "@/components/loading/LoadingOverlay";

// Boundary automático do Next: aparece sozinho enquanto /cursos-e-eventos e
// /cursos-e-eventos/[slug] buscam os cursos no Supabase, e some assim que a
// página real estiver pronta.
export default function Loading() {
  return <LoadingOverlay />;
}
