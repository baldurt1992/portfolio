/** Error lanzado solo cuando falla POST /api/verify-turnstile (no EmailJS). */
export class TurnstileVerifyError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TurnstileVerifyError'
  }
}

/**
 * Valida el token de Turnstile contra tu Pages Function / Worker (siteverify en servidor).
 */
export async function verifyTurnstileToken(verifyUrl: string, token: string): Promise<void> {
  const res = await fetch(verifyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token })
  })

  if (res.ok) return

  let detail = ''
  try {
    const data = (await res.json()) as { error?: string }
    if (typeof data?.error === 'string') detail = data.error
  } catch {
    /* ignore */
  }

  throw new TurnstileVerifyError(detail || `Turnstile verify HTTP ${res.status}`)
}
