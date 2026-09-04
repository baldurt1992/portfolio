function utf8ToBinary(value: string): string {
  const bytes = new TextEncoder().encode(value)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return binary
}

function toBase64(value: string): string {
  return btoa(utf8ToBinary(value))
}

function toBase64Url(value: string): string {
  return toBase64(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function encodeHeader(value: string): string {
  if (/^[\x20-\x7E]*$/.test(value)) return value
  return `=?UTF-8?B?${toBase64(value)}?=`
}

const MIME_BOUNDARY = 'baldurdev_contact_v1'

export function buildContactRfc822(params: {
  fromEmail: string
  fromName: string
  to: string
  replyTo: string
  subject: string
  text: string
  html: string
}): string {
  const from = `${encodeHeader(params.fromName)} <${params.fromEmail}>`
  return [
    `From: ${from}`,
    `To: ${params.to}`,
    `Reply-To: ${params.replyTo}`,
    `Subject: ${encodeHeader(params.subject)}`,
    'MIME-Version: 1.0',
    `Content-Type: multipart/alternative; boundary="${MIME_BOUNDARY}"`,
    '',
    `--${MIME_BOUNDARY}`,
    'Content-Type: text/plain; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    toBase64(params.text),
    `--${MIME_BOUNDARY}`,
    'Content-Type: text/html; charset="UTF-8"',
    'Content-Transfer-Encoding: base64',
    '',
    toBase64(params.html),
    `--${MIME_BOUNDARY}--`
  ].join('\r\n')
}

export function encodeRfc822ToGmailRaw(rfc822: string): string {
  return toBase64Url(rfc822)
}
