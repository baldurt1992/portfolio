/**
 * Cliente HTTP del formulario de contacto.
 * Turnstile + envío real viven en el Worker; aquí solo POST y mapeo de errores.
 */

export type ContactApiErrorCode =
  | 'turnstile_failed'
  | 'invalid_payload'
  | 'invalid_json'
  | 'token_required'
  | 'email_send_failed'
  | 'origin_not_allowed'
  | 'server_misconfigured'
  | 'http_error'

export class ContactApiError extends Error {
  constructor(
    public readonly code: ContactApiErrorCode,
    public readonly status: number
  ) {
    super(code)
    this.name = 'ContactApiError'
  }
}

const KNOWN_CODES = new Set<ContactApiErrorCode>([
  'turnstile_failed',
  'invalid_payload',
  'invalid_json',
  'token_required',
  'email_send_failed',
  'origin_not_allowed',
  'server_misconfigured',
  'http_error'
])

function asErrorCode(value: string | undefined): ContactApiErrorCode {
  if (value && KNOWN_CODES.has(value as ContactApiErrorCode)) {
    return value as ContactApiErrorCode
  }
  return 'http_error'
}

export async function submitContactMessage(
  apiUrl: string,
  payload: { name: string; email: string; message: string; token: string }
): Promise<void> {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (res.ok) return

  let code: ContactApiErrorCode = 'http_error'
  try {
    const data = (await res.json()) as { error?: string }
    code = asErrorCode(typeof data?.error === 'string' ? data.error : undefined)
  } catch {
    /* ignore */
  }

  throw new ContactApiError(code, res.status)
}
