import { uploadPostImage } from "@/lib/actions/posts";
import { prepareImageForUpload } from "@/lib/prepare-image";
import { MAX_UPLOAD_BYTES, formatMegabytes } from "@/lib/upload-limits";

export type UploadImageResult =
  | { url: string; width: number; height: number }
  | { error: string };

// Sem teto de tempo, uma conexão que trava deixaria o botão em "Enviando..."
// para sempre.
const UPLOAD_TIMEOUT_MS = 60_000;

// Redimensiona e envia uma imagem para o storage. Sempre devolve um resultado:
// qualquer falha vira `{ error }` com texto para o autor. Uma Server Action
// recusada (corpo grande demais, sessão vencida, página de um deploy antigo,
// rede caída) rejeita a promise, e quem chamava deixava o botão preso porque o
// código que o destrava só rodava no caminho feliz.
export async function uploadImage(file: File): Promise<UploadImageResult> {
  try {
    const prepared = await prepareImageForUpload(file);

    if (prepared.file.size > MAX_UPLOAD_BYTES) {
      return {
        error: `A imagem tem ${formatMegabytes(prepared.file.size)} e o limite é ${formatMegabytes(MAX_UPLOAD_BYTES)}. Reduza ou comprima o arquivo e tente de novo.`,
      };
    }

    const formData = new FormData();
    formData.append("file", prepared.file);

    const result = await Promise.race([
      uploadPostImage(formData),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), UPLOAD_TIMEOUT_MS)
      ),
    ]);

    if (result.url) {
      return { url: result.url, width: prepared.width, height: prepared.height };
    }
    return { error: result.error ?? "Falha no upload da imagem." };
  } catch (error) {
    if (error instanceof Error && error.message === "timeout") {
      return { error: "O envio demorou demais. Confira a conexão e tente de novo." };
    }
    return {
      error:
        "Não foi possível enviar a imagem. Confira a conexão e, se esta página está aberta há muito tempo, recarregue-a e tente de novo.",
    };
  }
}
