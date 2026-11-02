// Tamanho máximo de uma imagem enviada pelo painel, já depois do redimensionamento
// no navegador (`prepare-image.ts`).
//
// O envio passa por uma Server Action, cujo corpo o Next limita a 1 MB por
// padrão; `next.config.ts` sobe isso para 4 MB. A Vercel corta pedidos acima de
// 4,5 MB, então 3,5 MB de arquivo deixa folga para o que o multipart acrescenta.
// Se mexer num valor, mexa nos dois.
export const MAX_UPLOAD_BYTES = 3.5 * 1024 * 1024;

export function formatMegabytes(bytes: number) {
  return `${(bytes / (1024 * 1024)).toLocaleString("pt-BR", {
    maximumFractionDigits: 1,
  })} MB`;
}
