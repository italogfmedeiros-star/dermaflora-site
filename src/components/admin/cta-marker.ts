import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

// Espelha a regra de `src/lib/split-content.ts`, que fatia o HTML publicado
// para encaixar o CTA do WhatsApp no meio do artigo. Lá a conta é feita sobre
// as tags <p|h2|h3|ul|ol|blockquote>; aqui, sobre os nós equivalentes do
// editor. Se as duas regras divergirem, o marcador aponta o lugar errado.
const BLOCK_NODES = new Set(["paragraph", "bulletList", "orderedList", "blockquote"]);
const MIN_BLOCKS = 4;

function countsForSplit(node: ProseMirrorNode) {
  if (node.type.name === "heading") {
    return node.attrs.level === 2 || node.attrs.level === 3;
  }
  return BLOCK_NODES.has(node.type.name);
}

function buildDecorations(doc: ProseMirrorNode) {
  const positions: number[] = [];

  doc.forEach((node, offset) => {
    if (countsForSplit(node)) positions.push(offset);
  });

  // Abaixo do mínimo o split não acontece e nenhum CTA é injetado no meio.
  if (positions.length < MIN_BLOCKS) return DecorationSet.empty;

  const target = positions[Math.ceil(positions.length / 2)];
  if (target === undefined) return DecorationSet.empty;

  const widget = Decoration.widget(
    target,
    () => {
      const el = document.createElement("div");
      el.className = "cta-marker";
      el.setAttribute("contenteditable", "false");
      el.textContent = "Aqui entra o convite para o WhatsApp";
      return el;
    },
    { side: -1 }
  );

  return DecorationSet.create(doc, [widget]);
}

export const CtaMarker = Extension.create({
  name: "ctaMarker",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("ctaMarker"),
        props: {
          decorations(state) {
            return buildDecorations(state.doc);
          },
        },
      }),
    ];
  },
});
