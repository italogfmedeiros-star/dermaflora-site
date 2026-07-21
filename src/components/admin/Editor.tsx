"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { useRef } from "react";
import {
  TextB,
  TextItalic,
  ListBullets,
  ListNumbers,
  TextHOne,
  TextHTwo,
  LinkSimple,
  ImageSquare,
} from "@phosphor-icons/react";
import { uploadPostImage } from "@/lib/actions/posts";

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-df-sm transition-colors ${
        active
          ? "bg-df-primary-700 text-white"
          : "text-df-ink-700 hover:bg-df-primary-100"
      }`}
    >
      {children}
    </button>
  );
}

export function Editor({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (html: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ImageExtension,
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "post-content min-h-[320px] px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  async function handleImageSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadPostImage(formData);
    if (result.url) {
      editor.chain().focus().setImage({ src: result.url }).run();
    }
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-df-sm border border-df-line bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-df-line bg-df-warm-100 p-1.5">
        <ToolbarButton
          label="Título 1"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <TextHOne size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Título 2"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <TextHTwo size={18} />
        </ToolbarButton>
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
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL do link");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkSimple size={18} />
        </ToolbarButton>
        <ToolbarButton
          label="Inserir imagem"
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
      <EditorContent editor={editor} />
    </div>
  );
}
