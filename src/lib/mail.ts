import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Dermaflora <suporte@dermasys.com.br>";
const TO = "contato@dermaflora.com.br";

type ContactEmailInput = {
  name: string;
  email: string;
  message: string;
  attachment?: { filename: string; content: Buffer; contentType: string };
};

export async function sendContactEmail({
  name,
  email,
  message,
  attachment,
}: ContactEmailInput) {
  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `Nova mensagem de contato — ${name}`,
    html: contactEmailHtml({ name, email, message, hasAttachment: Boolean(attachment) }),
    attachments: attachment
      ? [
          {
            filename: attachment.filename,
            content: attachment.content,
            contentType: attachment.contentType,
          },
        ]
      : undefined,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function contactEmailHtml({
  name,
  email,
  message,
  hasAttachment,
}: {
  name: string;
  email: string;
  message: string;
  hasAttachment: boolean;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nova mensagem de contato</title>
  </head>
  <body style="margin:0; padding:0; background-color:#faf5ee; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf5ee; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e6e2d9;">
            <tr>
              <td style="background-color:#1f3623; padding:28px 32px;">
                <p style="margin:0; font-size:20px; font-weight:800; letter-spacing:0.2px; color:#ffffff;">
                  Dermaflora
                </p>
                <p style="margin:4px 0 0; font-size:13px; color:#b9deba;">
                  Farmácia de Manipulação
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <p style="margin:0 0 4px; font-size:12px; font-weight:700; letter-spacing:0.5px; text-transform:uppercase; color:#6fa876;">
                  Nova mensagem pelo site
                </p>
                <h1 style="margin:0 0 24px; font-size:20px; color:#1c1e1c;">
                  Você recebeu um contato pelo formulário
                </h1>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                  <tr>
                    <td style="padding:4px 0; font-size:13px; color:#6f746e; width:90px;">Nome</td>
                    <td style="padding:4px 0; font-size:14px; color:#1c1e1c; font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0; font-size:13px; color:#6f746e;">Email</td>
                    <td style="padding:4px 0; font-size:14px;">
                      <a href="mailto:${safeEmail}" style="color:#43714a; text-decoration:underline;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>

                <div style="background-color:#f3faf3; border:1px solid #d3ead5; border-radius:12px; padding:16px 20px; margin-bottom:20px;">
                  <p style="margin:0 0 8px; font-size:13px; font-weight:700; color:#43714a;">Mensagem</p>
                  <p style="margin:0; font-size:14px; line-height:1.6; color:#3a3d3a;">${safeMessage}</p>
                </div>

                ${
                  hasAttachment
                    ? `<div style="display:flex; align-items:center; gap:8px; background-color:#faf5ee; border:1px solid #f3e7dc; border-radius:12px; padding:12px 16px;">
                        <p style="margin:0; font-size:13px; color:#3a3d3a;">📎 A receita enviada está anexada a este e-mail.</p>
                      </div>`
                    : ""
                }
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; background-color:#faf5ee; border-top:1px solid #e6e2d9;">
                <p style="margin:0; font-size:12px; color:#6f746e;">
                  Responda este e-mail para falar direto com ${safeName}, ou retorne pelo WhatsApp da farmácia.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
