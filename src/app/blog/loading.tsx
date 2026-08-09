import { LoadingOverlay } from "@/components/loading/LoadingOverlay";

// Boundary automático do Next: aparece sozinho enquanto /blog, /blog/[slug]
// e /blog/categoria/[slug] buscam os posts no Supabase, e some assim que a
// página real estiver pronta. Não cobre a home (âncoras como #sobre não
// navegam de verdade) nem os links externos (WhatsApp, redes sociais) — esses
// usam o "flash" do LoadingOverlayProvider, no layout raiz.
export default function Loading() {
  return <LoadingOverlay />;
}
