// O Tiptap gera uma sequência plana de blocos (<p>, <h2>, <h3>, <ul>, <ol>,
// <blockquote>) sem wrapper. Isso permite dividir o HTML no meio de forma
// segura (sem cortar uma tag) pra inserir um CTA no meio do artigo.
const BLOCK_REGEX = /<(p|h2|h3|ul|ol|blockquote)[^>]*>[\s\S]*?<\/\1>/g;

export function splitContentInHalf(html: string) {
  const blocks = html.match(BLOCK_REGEX);

  if (!blocks || blocks.length < 4) {
    return { before: html, after: "" };
  }

  const midpoint = Math.ceil(blocks.length / 2);
  return {
    before: blocks.slice(0, midpoint).join(""),
    after: blocks.slice(midpoint).join(""),
  };
}
