import { Eye } from "@phosphor-icons/react/dist/ssr";
import { exitPreview } from "@/lib/actions/preview";
import { isPostLive } from "@/lib/posts-data";
import type { PostStatus } from "@/lib/supabase/types";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function describe(status: PostStatus, publishedAt: string | null) {
  if (status === "draft") {
    return "este post ainda é um rascunho e não está no ar.";
  }
  if (!isPostLive({ status, published_at: publishedAt }) && publishedAt) {
    return `agendado para ${DATE_FORMATTER.format(new Date(publishedAt))} — ainda não está no ar.`;
  }
  return "você está vendo a versão salva deste post.";
}

export function PreviewBanner({
  postId,
  status,
  publishedAt,
}: {
  postId: string;
  status: PostStatus;
  publishedAt: string | null;
}) {
  return (
    <div className="sticky top-0 z-50 border-b border-df-warm-500 bg-df-warm-300">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-2.5 md:px-8">
        <p className="flex items-center gap-2 text-sm font-medium text-df-ink-900">
          <Eye size={18} weight="fill" className="shrink-0" />
          Modo de visualização — {describe(status, publishedAt)}
        </p>
        <form action={exitPreview}>
          <input type="hidden" name="postId" value={postId} />
          <button
            type="submit"
            className="rounded-df-full bg-df-ink-900 px-4 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Sair e voltar ao editor
          </button>
        </form>
      </div>
    </div>
  );
}
