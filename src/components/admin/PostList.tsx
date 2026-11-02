"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { deletePosts, publishPosts } from "@/lib/actions/posts";

export type PostListItem = {
  id: string;
  title: string;
  categories: string[];
  status: "draft" | "published";
  dateLabel: string;
};

export function PostList({
  posts,
  page,
  pageCount,
  total,
  pageSize,
}: {
  posts: PostListItem[];
  page: number;
  pageCount: number;
  total: number;
  pageSize: number;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(
    null
  );
  const [pending, startTransition] = useTransition();
  const allRef = useRef<HTMLInputElement>(null);

  // A seleção vale só para a página aberta: o `key` da página zera o estado ao
  // trocar de página, e aqui descartamos ids que já não estão na lista (ex.:
  // depois de excluir), para nunca agir sobre um post que o usuário não vê.
  const visibleIds = posts.map((post) => post.id);
  const selectedIds = visibleIds.filter((id) => selected.has(id));
  const selectedDrafts = posts.filter(
    (post) => selected.has(post.id) && post.status === "draft"
  );
  const allSelected = posts.length > 0 && selectedIds.length === posts.length;

  useEffect(() => {
    if (allRef.current) {
      allRef.current.indeterminate = selectedIds.length > 0 && !allSelected;
    }
  }, [selectedIds.length, allSelected]);

  function toggle(id: string) {
    setMessage(null);
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setMessage(null);
    setSelected(allSelected ? new Set() : new Set(visibleIds));
  }

  function run(
    action: (ids: string[]) => Promise<{ error: string } | { count: number }>,
    ids: string[],
    done: (count: number) => string
  ) {
    startTransition(async () => {
      const result = await action(ids);
      if ("error" in result) {
        setMessage({ kind: "error", text: result.error });
        return;
      }
      setSelected(new Set());
      setMessage({ kind: "ok", text: done(result.count) });
    });
  }

  function handleDelete() {
    const n = selectedIds.length;
    if (
      !confirm(
        `Excluir ${n} ${n === 1 ? "post" : "posts"}? Essa ação não pode ser desfeita.`
      )
    ) {
      return;
    }
    run(deletePosts, selectedIds, (count) =>
      `${count} ${count === 1 ? "post excluído" : "posts excluídos"}.`
    );
  }

  function handlePublish() {
    const n = selectedDrafts.length;
    if (
      !confirm(
        `Publicar ${n} ${n === 1 ? "rascunho" : "rascunhos"}? ${
          n === 1 ? "Ele passa" : "Eles passam"
        } a aparecer no site.`
      )
    ) {
      return;
    }
    run(
      publishPosts,
      selectedDrafts.map((post) => post.id),
      (count) => `${count} ${count === 1 ? "post publicado" : "posts publicados"}.`
    );
  }

  const first = (page - 1) * pageSize + 1;
  const last = first + posts.length - 1;

  return (
    <div className="mt-8">
      <div className="flex min-h-11 flex-wrap items-center gap-x-4 gap-y-2">
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-df-ink-700">
          <input
            ref={allRef}
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            disabled={pending}
            className="h-4 w-4 cursor-pointer accent-df-primary-700"
          />
          Selecionar todos desta página
        </label>

        {selectedIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-df-ink-400">
              {selectedIds.length}{" "}
              {selectedIds.length === 1 ? "selecionado" : "selecionados"}
            </span>
            <button
              type="button"
              onClick={handlePublish}
              disabled={pending || selectedDrafts.length === 0}
              title={
                selectedDrafts.length === 0
                  ? "Nenhum rascunho na seleção"
                  : undefined
              }
              className="rounded-df-full bg-df-primary-700 px-4 py-2 text-sm font-semibold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              Publicar{selectedDrafts.length > 0 ? ` (${selectedDrafts.length})` : ""}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="rounded-df-full border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Excluir ({selectedIds.length})
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              disabled={pending}
              className="px-2 py-2 text-sm font-medium text-df-ink-400 transition-colors hover:text-df-ink-900 disabled:opacity-40"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`min-h-5 text-sm ${
          message?.kind === "error" ? "text-red-700" : "text-df-primary-700"
        }`}
      >
        {pending ? "Aplicando…" : message?.text}
      </p>

      <ul className="mt-3 divide-y divide-df-line overflow-hidden rounded-df-md border border-df-line bg-white">
        {posts.map((post) => {
          const isSelected = selected.has(post.id);
          return (
            <li
              key={post.id}
              className={`flex items-center transition-colors ${
                isSelected ? "bg-df-primary-50" : "hover:bg-df-primary-50"
              }`}
            >
              <label className="flex shrink-0 cursor-pointer items-center self-stretch pl-5 pr-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(post.id)}
                  disabled={pending}
                  aria-label={`Selecionar “${post.title}”`}
                  className="h-4 w-4 cursor-pointer accent-df-primary-700"
                />
              </label>
              <Link
                href={`/admin/posts/${post.id}/editar`}
                className="flex min-w-0 flex-1 items-center justify-between gap-4 py-4 pr-5"
              >
                {/* contain-inline-size: sem isso o título em uma linha só alarga
                    a linha e o celular amplia o viewport inteiro. */}
                <div className="min-w-0 flex-1 contain-inline-size">
                  <p className="truncate text-sm font-semibold text-df-ink-900">
                    {post.title}
                  </p>
                  <p className="mt-1 text-xs text-df-ink-400">
                    {post.categories.join(", ") || "Sem categoria"} · {post.dateLabel}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-df-full px-3 py-1 text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-df-primary-100 text-df-primary-700"
                      : "bg-df-warm-300 text-df-ink-700"
                  }`}
                >
                  {post.status === "published" ? "Publicado" : "Rascunho"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {total > 0 && (
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-df-ink-400">
            Mostrando {first}–{last} de {total}
          </p>
          {pageCount > 1 && <Pagination page={page} pageCount={pageCount} />}
        </div>
      )}
    </div>
  );
}

function pageHref(n: number) {
  return n === 1 ? "/admin" : `/admin?pagina=${n}`;
}

function Pagination({ page, pageCount }: { page: number; pageCount: number }) {
  const linkClass =
    "grid h-9 min-w-9 place-items-center rounded-df-full px-2 text-sm font-semibold transition-colors";

  return (
    <nav aria-label="Paginação" className="flex items-center gap-1.5">
      {page > 1 ? (
        <Link
          href={pageHref(page - 1)}
          className={`${linkClass} text-df-ink-700 hover:bg-df-primary-100`}
        >
          Anterior
        </Link>
      ) : null}
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={pageHref(n)}
          aria-current={n === page ? "page" : undefined}
          className={`${linkClass} ${
            n === page
              ? "bg-df-primary-700 text-white"
              : "text-df-ink-700 hover:bg-df-primary-100"
          }`}
        >
          {n}
        </Link>
      ))}
      {page < pageCount ? (
        <Link
          href={pageHref(page + 1)}
          className={`${linkClass} text-df-ink-700 hover:bg-df-primary-100`}
        >
          Próxima
        </Link>
      ) : null}
    </nav>
  );
}
