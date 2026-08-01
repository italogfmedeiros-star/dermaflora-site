// Reduz a imagem no navegador antes do upload. Foto de celular chega com 4MB e
// 4000px de largura; o artigo nunca passa de ~750px de área útil, então o
// excesso é peso puro para o leitor. Roda só no cliente (usa canvas).

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 0.82;
// Abaixo disso não vale reprocessar: o ganho é pequeno e recodificar sempre
// custa alguma qualidade.
const SIZE_THRESHOLD = 300 * 1024;

// Formatos que não sobrevivem ao canvas: GIF perderia a animação e SVG é
// vetorial (redimensionar não faz sentido e já é leve).
const SKIP_TYPES = new Set(["image/gif", "image/svg+xml"]);

export type PreparedImage = {
  file: File;
  width: number;
  height: number;
};

export async function prepareImageForUpload(file: File): Promise<PreparedImage> {
  if (!file.type.startsWith("image/") || SKIP_TYPES.has(file.type)) {
    return { file, width: 0, height: 0 };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Arquivo que o navegador não decodifica: sobe o original e deixa o
    // servidor decidir se aceita.
    return { file, width: 0, height: 0 };
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  if (scale === 1 && file.size <= SIZE_THRESHOLD) {
    bitmap.close();
    return { file, width, height };
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    return { file, width, height };
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", WEBP_QUALITY)
  );

  // Se a conversão falhou ou ficou maior que o original, o original vence.
  if (!blob || blob.size >= file.size) {
    return { file, width, height };
  }

  const name = `${file.name.replace(/\.[^.]+$/, "")}.webp`;
  return {
    file: new File([blob], name, { type: "image/webp" }),
    width,
    height,
  };
}
