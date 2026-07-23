"use server";

import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const ContactInputSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome."),
  email: z.string().trim().email("Informe um email válido."),
  message: z.string().trim().min(1, "Escreva sua mensagem."),
});

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = ContactInputSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Verifique os campos e tente novamente.",
    };
  }

  const file = formData.get("receita");
  let attachment: { filename: string; content: Buffer; contentType: string } | undefined;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_SIZE) {
      return { status: "error", message: "O arquivo da receita deve ter até 5MB." };
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return { status: "error", message: "Envie a receita em JPG, PNG, WEBP ou PDF." };
    }
    attachment = {
      filename: file.name || "receita",
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type,
    };
  }

  try {
    await sendContactEmail({ ...parsed.data, attachment });
  } catch (error) {
    console.error("Falha ao enviar email de contato", error);
    return {
      status: "error",
      message: "Não conseguimos enviar agora. Tente novamente ou fale pelo WhatsApp.",
    };
  }

  return {
    status: "success",
    message: "Mensagem enviada! Retornaremos o contato pelo WhatsApp da farmácia.",
  };
}
