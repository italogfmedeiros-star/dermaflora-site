"use client";

import { useEditor, EditorContent, type Editor as TiptapEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import { useRef, useState } from "react";
import {
  TextB,
  TextItalic,
  TextUnderline,
  TextStrikethrough,
  ListBullets,
  ListNumbers,
  TextHOne,
  TextHTwo,
  Quotes,
  Minus,
  LinkSimple,
  ImageSquare,
  ArrowUUpLeft,
  ArrowUUpRight,
} from "@phosphor-icons/react";
import { uploadPostImage } from "@/lib/actions/posts";
import { prepareImageForUpload } from "@/lib/prepare-image";
import { CtaMarker } from "./cta-marker";
import { EditorDialog } from "./EditorDialog";

// Aceita o que o autor digitar sem protocolo (dermaflora.com.br) e ainda
// preserva links internos, e-mail e telefone.
function normalizeUrl(input: string) {
  const value = input.trim();
  if (!value) return "";
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(value)) return value;
  return `https://${value}`;
}

function ToolbarButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-df-sm transition-colors disabled:opacity-30 ${
        active
          ? "bg-df-primary-700 text-white"
          : "text-df-ink-700 hover:bg-df-primary-100"
      }`}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <span aria-hidden="true" className="mx-1 h-5 w-px bg-df-line" />;
}

type DialogState =
  | { kind: "link"; initialValue: string }
  | { kind: "imageAlt"; url: string; width: number; height: number }
  | null;

export function Editor({
  initialContent,
  onChange,
  showCtaMarker = false,
}: {
  initialContent: string;
  onChange: (html: string) => void;
  /**
   * Só os posts do blog passam por `splitContentInHalf` e recebem o CTA no meio
   * do texto. Em Cursos e Eventos o conteúdo é renderizado inteiro, com um CTA
   * apenas no fim — mostrar o marcador lá apontaria algo que não acontece.
   */
  showCtaMarker?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      // O link já vem no StarterKit 3 — registrá-lo de novo à parte duplicaria
      // a extensão. A configuração passa por aqui.
      StarterKit.configure({ link: { openOnClick: false } }),
      // Imagens do corpo do texto ficam abaixo da dobra: carregá-las sob demanda
      // tira peso do primeiro render. Vai gravado no HTML salvo.
      ImageExtension.configure({
        HTMLAttributes: { loading: "lazy", decoding: "async" },
      }),
      ...(showCtaMarker ? [CtaMarker] : []),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        // Mesma largura e respiro do artigo publicado (max-w-3xl + px-5/md:px-8),
        // pra que a quebra de linha aqui seja a mesma que o leitor vai ver.
        class:
          "post-content mx-auto min-h-[320px] w-full max-w-3xl px-5 py-6 focus:outline-none md:px-8",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  function openLinkDialog(instance: TiptapEditor) {
    setDialog({
      kind: "link",
      initialValue: instance.getAttributes("link").href ?? "",
    });
  }

  function applyLink(value: string) {
    const url = normalizeUrl(value);
    if (editor && url) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setDialog(null);
  }

  function removeLink() {
    editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    setDialog(null);
  }

  function insertImage(
    url: string,
    alt: string,
    width: number,
    height: number
  ) {
    editor
      ?.chain()
      .focus()
      // Sem dimensões o navegador não reserva espaço e a página "pula" quando a
      // imagem carrega; só as informamos quando o redimensionamento as apurou.
      .setImage(width && height ? { src: url, alt, width, height } : { src: url, alt })
      .run();
    setDialog(null);
  }

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    setUploading(true);
    const prepared = await prepareImageForUpload(file);
    const formData = new FormData();
    formData.append("file", prepared.file);
    const result = await uploadPostImage(formData);
    setUploading(false);

    // A descrição é pedida depois do upload: assim um cancelamento não joga
    // fora o arquivo que já subiu.
    if (result.url) {
      setDialog({
        kind: "imageAlt",
        url: result.url,
        width: prepared.width,
        height: prepared.height,
      });
    }
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-df-sm border border-df-line bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-df-line bg-df-warm-100 p-1.5">
        <ToolbarButton
          label="Desfazer"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          <ArrowUUpLeft size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Refazer"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          <ArrowUUpRight size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Título 1"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <TextHOne size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <TextHTwo size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextB size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalic size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Sublinhado"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <TextUnderline size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Tachado"
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <TextStrikethrough size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Lista"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <ListBullets size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListNumbers size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Citação"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quotes size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Linha divisória"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={18} />
        </ToolbarButton>

        <ToolbarDivider />

        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => openLinkDialog(editor)}
        >
          <LinkSimple size={18} />
        </ToolbarButton>
        <ToolbarButton
          label={uploading ? "Enviando imagem..." : "Inserir imagem"}
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageSquare size={18} />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelected}
        />
      </div>

      {/* Formatação inline aparece junto do texto selecionado, sem obrigar a
          subir até a barra de ferramentas. */}
      <BubbleMenu
        editor={editor}
        shouldShow={({ editor: instance, from, to }) =>
          from !== to && !instance.isActive("image")
        }
        className="flex items-center gap-0.5 rounded-df-sm border border-df-line bg-white p-1 shadow-df-md"
      >
        <ToolbarButton
          label="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <TextB size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Itálico"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <TextItalic size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Sublinhado"
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <TextUnderline size={16} />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => openLinkDialog(editor)}
        >
          <LinkSimple size={16} />
        </ToolbarButton>
      </BubbleMenu>

      <EditorContent editor={editor} />

      {dialog?.kind === "link" && (
        <EditorDialog
          title={dialog.initialValue ? "Editar link" : "Inserir link"}
          label="Endereço"
          placeholder="dermaflora.com.br/blog"
          hint="Sem http:// na frente, completamos com https:// automaticamente."
          initialValue={dialog.initialValue}
          confirmLabel={dialog.initialValue ? "Salvar" : "Inserir"}
          requireValue
          secondaryLabel={dialog.initialValue ? "Remover link" : undefined}
          onSecondary={dialog.initialValue ? removeLink : undefined}
          onConfirm={applyLink}
          onCancel={() => setDialog(null)}
        />
      )}

      {dialog?.kind === "imageAlt" && (
        <EditorDialog
          title="Descrição da imagem"
          label="O que aparece na imagem?"
          placeholder="Ex.: frasco de sérum Dermaflora sobre bancada clara"
          hint="Lida por leitores de tela e usada pelo Google para entender a imagem."
          confirmLabel="Inserir imagem"
          requireValue
          secondaryLabel="Inserir sem descrição"
          onSecondary={() => insertImage(dialog.url, "", dialog.width, dialog.height)}
          onConfirm={(alt) => insertImage(dialog.url, alt, dialog.width, dialog.height)}
          onCancel={() => setDialog(null)}
        />
      )}
    </div>
  );
}
