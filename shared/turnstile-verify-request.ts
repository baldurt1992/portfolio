/**
 * Lógica compartida: Pages Function (`functions/api/verify-turnstile`) y Worker (`workers/turnstile-verify`).
 */

import { verifyTurnstileTokenOnServer } from './turnstile-siteverify'
import { corsHeaders, isOriginAllowed, jsonResponse } from './worker-http'

export interface TurnstileVerifyEnv {
  TURNSTILE_SECRET_KEY: string
  TURNSTILE_ALLOWED_ORIGINS?: string
}

function json(body: unknown, status: number, request: Request, env: TurnstileVerifyEnv): Response {
  return jsonResponse(body, status, request, env.TURNSTILE_ALLOWED_ORIGINS)
}

export async function handleTurnstileVerify(
  request: Request,
  env: TurnstileVerifyEnv
): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(request, env.TURNSTILE_ALLOWED_ORIGINS)
    })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405, request, env)
  }

  if (!isOriginAllowed(request, env.TURNSTILE_ALLOWED_ORIGINS)) {
    return json({ ok: false, error: 'origin_not_allowed' }, 403, request, env)
  }

  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret?.trim()) {
    return json({ ok: false, error: 'server_misconfigured' }, 500, request, env)
  }

  let token: string
  try {
    const body = (await request.json()) as { token?: string }
    token = typeof body?.token === 'string' ? body.token.trim() : ''
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, request, env)
  }

  if (!token) {
    return json({ ok: false, error: 'token_required' }, 400, request, env)
  }

  const outcome = await verifyTurnstileTokenOnServer({
    secret,
    token,
    remoteIp: request.headers.get('CF-Connecting-IP') ?? undefined
  })

  if (!outcome.success) {
    const codes = outcome.errorCodes.join(',')
    return json({ ok: false, error: codes }, 403, request, env)
  }

  return json({ ok: true }, 200, request, env)
}
