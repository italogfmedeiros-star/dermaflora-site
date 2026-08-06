"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { UploadSimple, Eye, ArrowCounterClockwise } from "@phosphor-icons/react";
import { savePost, deletePost, uploadPostImage } from "@/lib/actions/posts";
import { prepareImageForUpload } from "@/lib/prepare-image";
import {
  SeoPreview,
  CharacterCount,
  TITLE_LIMIT,
  EXCERPT_LIMIT,
  EXCERPT_MIN,
} from "./SeoPreview";
import { Editor } from "./Editor";
import { BLOG_CATEGORIES } from "@/lib/categories";
import { slugify } from "@/lib/slugify";
import type { Post } from "@/lib/supabase/types";

const STORAGE_PREFIX = "df-post-draft-";
const AUTOSAVE_DELAY = 800;

// Só os campos de texto entram no backup: é neles que mora o trabalho que dói
// perder. Categorias e status são um clique para refazer.
type Backup = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  savedAt: string;
};

const BACKUP_DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

// <input type="datetime-local"> fala "2026-08-01T14:30" no fuso do autor. O
// banco guarda ISO/UTC. As duas conversões ficam no cliente porque só aqui o
// fuso local é conhecido — o servidor roda em UTC.
function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toIso(localValue: string) {
  if (!localValue) return "";
  const date = new Date(localValue);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

export function PostForm({ post }: { post?: Post }) {
  const [state, formAction, pending] = useActionState(savePost, undefined);

  const initial = useMemo(
    () => ({
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImageUrl: post?.cover_image_url ?? "",
    }),
    [post]
  );

  const [title, setTitle] = useState(initial.title);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [excerpt, setExcerpt] = useState(initial.excerpt);
  const [content, setContent] = useState(initial.content);
  const [coverImageUrl, setCoverImageUrl] = useState(initial.coverImageUrl);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status ?? "draft"
  );
  const [publishedAtLocal, setPublishedAtLocal] = useState(
    toLocalInput(post?.published_at ?? null)
  );
  const [backup, setBackup] = useState<Backup | null>(null);
  // O TipTap só lê o conteúdo inicial ao montar. Trocar esta chave força a
  // remontagem para que o texto restaurado apareça de fato no editor.
  const [editorKey, setEditorKey] = useState(0);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const storageKey = `${STORAGE_PREFIX}${post?.id ?? "novo"}`;

  const isDirty =
    title !== initial.title ||
    slug !== initial.slug ||
    excerpt !== initial.excerpt ||
    content !== initial.content ||
    coverImageUrl !== initial.coverImageUrl;

  // Ao montar: descarta o backup se acabamos de salvar, senão oferece restaurar.
  useEffect(() => {
    const justSaved = new URLSearchParams(window.location.search).has("saved");

    if (justSaved) {
      try {
        window.localStorage.removeItem(storageKey);
      } catch {
        // localStorage indisponível (modo privado, cota): sem backup, sem drama.
      }
      return;
    }

    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Backup;
      const differs =
        parsed.title !== initial.title ||
        parsed.slug !== initial.slug ||
        parsed.excerpt !== initial.excerpt ||
        parsed.content !== initial.content ||
        parsed.coverImageUrl !== initial.coverImageUrl;

      // Necessariamente após a montagem: localStorage não existe no servidor e
      // lê-lo durante o render causaria divergência de hidratação.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (differs) setBackup(parsed);
    } catch {
      // Backup corrompido: ignora em silêncio em vez de travar o editor.
    }
  }, [storageKey, initial]);

  // Autosave local com debounce. Não substitui o "Salvar post" — é só a rede de
  // segurança para a aba que fecha no meio do texto.
  useEffect(() => {
    if (!isDirty) return;

    clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      try {
        const payload: Backup = {
          title,
          slug,
          excerpt,
          content,
          coverImageUrl,
          savedAt: new Date().toISOString(),
        };
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
      } catch {
        // Sem espaço ou sem permissão: seguir sem backup é melhor que quebrar.
      }
    }, AUTOSAVE_DELAY);

    return () => clearTimeout(autosaveTimer.current);
  }, [title, slug, excerpt, content, coverImageUrl, isDirty, storageKey]);

  // Avisa antes de fechar a aba com alterações não salvas.
  useEffect(() => {
    if (!isDirty) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function restoreBackup() {
    if (!backup) return;
    setTitle(backup.title);
    setSlug(backup.slug);
    setSlugTouched(true);
    setExcerpt(backup.excerpt);
    setContent(backup.content);
    setCoverImageUrl(backup.coverImageUrl);
    setEditorKey((k) => k + 1);
    setBackup(null);
  }

  function discardBackup() {
    try {
      window.localStorage.removeItem(storageKey);
    } catch {
      // Nada a fazer: o banner some de qualquer forma.
    }
    setBackup(null);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function handlePreviewClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (
      isDirty &&
      !confirm(
        "A visualização mostra a última versão salva, sem as alterações atuais. Continuar mesmo assim?"
      )
    ) {
      event.preventDefault();
    }
  }

  async function handleCoverFileSelected(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingCover(true);
    setCoverUploadError("");

    const prepared = await prepareImageForUpload(file);
    const formData = new FormData();
    formData.append("file", prepared.file);
    const result = await uploadPostImage(formData);

    setUploadingCover(false);
    if (result.url) {
      setCoverImageUrl(result.url);
    } else {
      setCoverUploadError(result.error ?? "Falha no upload.");
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="content" value={content} />

      {backup && (
        <div className="flex flex-col gap-3 rounded-df-sm border border-df-warm-500 bg-df-warm-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-df-ink-700">
            <span className="font-semibold text-df-ink-900">
              Há alterações não salvas
            </span>{" "}
            deste post, de{" "}
            {BACKUP_DATE_FORMATTER.format(new Date(backup.savedAt))}.
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={restoreBackup}
              className="inline-flex items-center gap-1.5 rounded-df-full bg-df-ink-900 px-4 py-2 text-xs font-semibold text-white"
            >
              <ArrowCounterClockwise size={14} weight="bold" />
              Restaurar
            </button>
            <button
              type="button"
              onClick={discardBackup}
              className="text-xs font-medium text-df-ink-400 hover:text-df-ink-900"
            >
              Descartar
            </button>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="title" className="text-sm font-medium text-df-ink-700">
            Título
          </label>
          <CharacterCount value={title} limit={TITLE_LIMIT} />
        </div>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="mt-1.5 w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm outline-none focus:border-df-primary-700"
        />
      </div>

      <div>
        <label htmlFor="slug" className="text-sm font-medium text-df-ink-700">
          Slug (URL)
        </label>
        <div className="mt-1.5 flex items-center gap-2 text-sm text-df-ink-400">
          <span className="shrink-0">/blog/</span>
          <input
            id="slug"
            name="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(e.target.value);
            }}
            className="w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm text-df-ink-900 outline-none focus:border-df-primary-700"
          />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor="excerpt" className="text-sm font-medium text-df-ink-700">
            Resumo (aparece na listagem e no Google)
          </label>
          <CharacterCount
            value={excerpt}
            limit={EXCERPT_LIMIT}
            min={EXCERPT_MIN}
          />
        </div>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1.5 w-full resize-none rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm outline-none focus:border-df-primary-700"
        />
        <div className="mt-3">
          <SeoPreview title={title} slug={slug} excerpt={excerpt} />
        </div>
      </div>

      <div>
        <label
          htmlFor="coverImageUrl"
          className="text-sm font-medium text-df-ink-700"
        >
          Imagem de capa
        </label>
        <div className="mt-1.5 flex items-center gap-2">
          <input
            id="coverImageUrl"
            name="coverImageUrl"
            type="url"
            placeholder="https://... ou envie um arquivo"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            className="w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm outline-none focus:border-df-primary-700"
          />
          <button
            type="button"
            disabled={uploadingCover}
            onClick={() => coverInputRef.current?.click()}
            className="inline-flex shrink-0 items-center gap-2 rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm font-medium text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700 disabled:opacity-60"
          >
            <UploadSimple size={16} />
            {uploadingCover ? "Enviando..." : "Enviar arquivo"}
          </button>
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCoverFileSelected}
          />
        </div>
        {coverUploadError && (
          <p className="mt-1.5 text-xs font-medium text-df-error">
            {coverUploadError}
          </p>
        )}
        {coverImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageUrl}
            alt="Pré-visualização da capa"
            className="mt-3 h-32 w-full rounded-df-sm object-cover"
          />
        )}
      </div>

      <div>
        <span className="text-sm font-medium text-df-ink-700">Categorias</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {BLOG_CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-2 rounded-df-full border border-df-line bg-white px-3 py-1.5 text-xs font-medium text-df-ink-700 has-[:checked]:border-df-primary-700 has-[:checked]:bg-df-primary-100 has-[:checked]:text-df-primary-900"
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                defaultChecked={post?.categories.includes(category)}
                className="sr-only"
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-df-ink-700">Conteúdo</span>
        <div className="mt-1.5">
          <Editor
            key={editorKey}
            initialContent={content}
            onChange={setContent}
            showCtaMarker
          />
        </div>
      </div>

      <div>
        <span className="text-sm font-medium text-df-ink-700">Status</span>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2 text-sm text-df-ink-700">
            <input
              type="radio"
              name="status"
              value="draft"
              checked={status === "draft"}
              onChange={() => setStatus("draft")}
            />
            Rascunho
          </label>
          <label className="flex items-center gap-2 text-sm text-df-ink-700">
            <input
              type="radio"
              name="status"
              value="published"
              checked={status === "published"}
              onChange={() => setStatus("published")}
            />
            Publicado
          </label>
        </div>

        {status === "published" && (
          <div className="mt-4">
            <label
              htmlFor="publishedAtLocal"
              className="text-sm font-medium text-df-ink-700"
            >
              Data de publicação
            </label>
            <input
              id="publishedAtLocal"
              type="datetime-local"
              value={publishedAtLocal}
              onChange={(e) => setPublishedAtLocal(e.target.value)}
              className="mt-1.5 block rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm text-df-ink-900 outline-none focus:border-df-primary-700"
            />
            {/* O servidor recebe sempre ISO/UTC, nunca o valor local do input. */}
            <input
              type="hidden"
              name="publishedAt"
              value={toIso(publishedAtLocal)}
            />
            <p className="mt-1.5 text-xs text-df-ink-400">
              Data futura agenda o post: ele só aparece no site a partir dela.
              Em branco, publica assim que você salvar.
            </p>
          </div>
        )}
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-df-error" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-df-line pt-6">
        {post ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Excluir este post? Essa ação não pode ser desfeita."))
                deletePost(post.id);
            }}
            className="text-sm font-medium text-df-error hover:underline"
          >
            Excluir post
          </button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          {post && (
            <a
              href={`/api/preview?id=${post.id}`}
              target="_blank"
              rel="noreferrer"
              onClick={handlePreviewClick}
              className="inline-flex items-center gap-2 rounded-df-full border border-df-line bg-white px-5 py-2.5 text-sm font-semibold text-df-ink-700 transition-colors hover:border-df-primary-700 hover:text-df-primary-700"
            >
              <Eye size={16} weight="bold" />
              Visualizar
            </a>
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center rounded-df-full bg-df-primary-700 px-6 py-2.5 text-sm font-semibold text-white shadow-df-sm disabled:opacity-60"
          >
            {pending ? "Salvando..." : "Salvar post"}
          </button>
        </div>
      </div>
    </form>
  );
}
