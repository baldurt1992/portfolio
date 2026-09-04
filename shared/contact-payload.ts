export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  message: 4000
} as const

export interface ContactPayload {
  name: string
  email: string
  message: string
  token: string
}

export type ContactPayloadError = 'invalid_json' | 'invalid_payload' | 'token_required'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function stripHeaderInjection(value: string): string {
  return value.replace(/[\r\n\0]+/g, ' ').trim()
}

export function parseContactPayload(
  body: unknown
): { ok: true; data: ContactPayload } | { ok: false; error: ContactPayloadError } {
  if (body == null || typeof body !== 'object') {
    return { ok: false, error: 'invalid_json' }
  }

  const raw = body as Record<string, unknown>
  const name = typeof raw.name === 'string' ? stripHeaderInjection(raw.name) : ''
  const email = typeof raw.email === 'string' ? stripHeaderInjection(raw.email) : ''
  const message = typeof raw.message === 'string' ? raw.message.trim() : ''
  const token = typeof raw.token === 'string' ? raw.token.trim() : ''

  if (!token) {
    return { ok: false, error: 'token_required' }
  }

  if (
    !name ||
    name.length > CONTACT_LIMITS.name ||
    !email ||
    email.length > CONTACT_LIMITS.email ||
    !EMAIL_RE.test(email) ||
    !message ||
    message.length > CONTACT_LIMITS.message
  ) {
    return { ok: false, error: 'invalid_payload' }
  }

  return { ok: true, data: { name, email, message, token } }
}
