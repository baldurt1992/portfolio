export interface ContactEmailContent {
  name: string
  email: string
  message: string
}

const SITE_URL = 'https://baldurdev.com'
const BRAND = 'BaldurDev'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function messageToHtml(message: string): string {
  return escapeHtml(message).replace(/\r\n|\n|\r/g, '<br>')
}

export function buildContactEmailText(content: ContactEmailContent): string {
  return [
    `Nuevo mensaje desde ${SITE_URL}`,
    '',
    `Nombre: ${content.name}`,
    `Email: ${content.email}`,
    '',
    'Mensaje:',
    content.message,
    '',
    `— ${BRAND}`
  ].join('\n')
}

export function buildContactEmailHtml(content: ContactEmailContent): string {
  const name = escapeHtml(content.name)
  const email = escapeHtml(content.email)
  const body = messageToHtml(content.message)
  const replyHref = `mailto:${encodeURIComponent(content.email)}?subject=${encodeURIComponent(`Re: ${content.name} — baldurdev.com`)}`

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Nuevo contacto — ${BRAND}</title>
</head>
<body style="margin:0;padding:0;background-color:#05050a;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${name} escribió desde el sitio — ${email}
  </div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#05050a;margin:0;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="width:560px;max-width:560px;background-color:#0f111a;border:1px solid rgba(255,255,255,0.08);border-radius:20px;overflow:hidden;">
          <tr>
            <td style="height:4px;background-color:#fb923c;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 32px 8px 32px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
              <p style="margin:0 0 8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#fb923c;">
                Contacto · ${BRAND}
              </p>
              <h1 style="margin:0;font-family:'Space Grotesk',Inter,Segoe UI,Helvetica,Arial,sans-serif;font-size:26px;line-height:1.25;font-weight:700;color:#f0f1f5;">
                Nuevo mensaje desde el sitio
              </h1>
              <p style="margin:10px 0 0 0;font-size:14px;line-height:1.5;color:#9aa3b2;">
                Llegó a través del formulario de
                <a href="${SITE_URL}" style="color:#3b82f6;text-decoration:none;">baldurdev.com</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#161922;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 4px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9aa3b2;">Nombre</p>
                    <p style="margin:0 0 16px 0;font-size:16px;line-height:1.4;font-weight:600;color:#f0f1f5;">${name}</p>
                    <p style="margin:0 0 4px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9aa3b2;">Email</p>
                    <p style="margin:0;font-size:16px;line-height:1.4;">
                      <a href="mailto:${email}" style="color:#3b82f6;text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 32px 8px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#161922;border:1px solid rgba(255,255,255,0.08);border-radius:14px;">
                <tr>
                  <td style="padding:18px 20px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;">
                    <p style="margin:0 0 10px 0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9aa3b2;">Mensaje</p>
                    <p style="margin:0;font-size:15px;line-height:1.65;color:#c9ced8;">${body}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 32px 32px;" align="left">
              <a href="${replyHref}" style="display:inline-block;background-color:#fb923c;color:#111216;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;padding:12px 20px;border-radius:12px;">
                Responder a ${name}
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px 32px;font-family:Inter,Segoe UI,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:#9aa3b2;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:18px 0 0 0;">
                ${BRAND} · Andrés Baldur Tamayo · Full Stack Software Engineer
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
