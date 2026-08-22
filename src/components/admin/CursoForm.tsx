"use client";

import { useActionState, useRef, useState } from "react";
import { UploadSimple } from "@phosphor-icons/react";
import { saveCurso, deleteCurso, uploadCursoImage } from "@/lib/actions/cursos";
import { Editor } from "./Editor";
import { slugify } from "@/lib/slugify";
import type { CursoEvento } from "@/lib/supabase/types";

export function CursoForm({ curso }: { curso?: CursoEvento }) {
  const [state, formAction, pending] = useActionState(saveCurso, undefined);
  const [title, setTitle] = useState(curso?.title ?? "");
  const [slug, setSlug] = useState(curso?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(curso));
  const [content, setContent] = useState(curso?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    curso?.cover_image_url ?? ""
  );
  const [uploadingCover, setUploadingCover] = useState(false);
  const [coverUploadError, setCoverUploadError] = useState("");
  const coverInputRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleCoverFileSelected(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingCover(true);
    setCoverUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadCursoImage(formData);

    setUploadingCover(false);
    if (result.url) {
      setCoverImageUrl(result.url);
    } else {
      setCoverUploadError(result.error ?? "Falha no upload.");
    }
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {curso && <input type="hidden" name="id" value={curso.id} />}
      <input type="hidden" name="content" value={content} />

      <div>
        <label htmlFor="title" className="text-sm font-medium text-df-ink-700">
          Título
        </label>
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
          <span className="shrink-0">/cursos-e-eventos/</span>
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
        <label htmlFor="excerpt" className="text-sm font-medium text-df-ink-700">
          Resumo (aparece na listagem e no Google)
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={3}
          defaultValue={curso?.excerpt}
          className="mt-1.5 w-full resize-none rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm outline-none focus:border-df-primary-700"
        />
      </div>

      <div>
        <label
          htmlFor="eventDate"
          className="text-sm font-medium text-df-ink-700"
        >
          Data do evento
        </label>
        <input
          id="eventDate"
          name="eventDate"
          type="date"
          defaultValue={curso?.event_date ?? ""}
          className="mt-1.5 w-full rounded-df-sm border border-df-line bg-white px-4 py-2.5 text-sm outline-none focus:border-df-primary-700"
        />
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
        <span className="text-sm font-medium text-df-ink-700">Conteúdo</span>
        <div className="mt-1.5">
          <Editor
            initialContent={curso?.content ?? ""}
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
              defaultChecked={!curso || curso.status === "draft"}
            />
            Rascunho
          </label>
          <label className="flex items-center gap-2 text-sm text-df-ink-700">
            <input
              type="radio"
              name="status"
              value="published"
              defaultChecked={curso?.status === "published"}
            />
            Publicado
          </label>
        </div>
      </div>

      {state?.error && (
        <p className="text-sm font-medium text-df-error" role="alert">
          {state.error}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-df-line pt-6">
        {curso ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Excluir este evento? Essa ação não pode ser desfeita."))
                deleteCurso(curso.id);
            }}
            className="text-sm font-medium text-df-error hover:underline"
          >
            Excluir evento
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center rounded-df-full bg-df-primary-700 px-6 py-2.5 text-sm font-semibold text-white shadow-df-sm disabled:opacity-60"
        >
          {pending ? "Salvando..." : "Salvar evento"}
        </button>
      </div>
    </form>
  );
}
