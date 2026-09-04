const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstileTokenOnServer(params: {
  secret: string
  token: string
  remoteIp?: string
}): Promise<{ success: true } | { success: false; errorCodes: string[] }> {
  const verifyRes = await fetch(SITEVERIFY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: params.secret,
      response: params.token,
      remoteip: params.remoteIp
    })
  })

  const outcome = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] }

  if (!outcome.success) {
    return { success: false, errorCodes: outcome['error-codes'] ?? ['verify_failed'] }
  }

  return { success: true }
}
