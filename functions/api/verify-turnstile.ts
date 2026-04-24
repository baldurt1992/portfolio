/**
 * Cloudflare Pages Function — POST /api/verify-turnstile
 * Valida el token con Cloudflare (secret solo en el edge).
 *
 * Secrets (Pages → Settings → Environment variables):
 * - TURNSTILE_SECRET_KEY
 * - TURNSTILE_ALLOWED_ORIGINS (opcional, CSV; ej: https://user.github.io/repo,http://localhost:3000)
 *
 * @see https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 * @see https://developers.cloudflare.com/pages/functions/
 */

interface Env {
  TURNSTILE_SECRET_KEY: string
  /** Orígenes permitidos para CORS, separados por coma. Si falta, se acepta cualquier Origin (menos estricto). */
  TURNSTILE_ALLOWED_ORIGINS?: string
}

const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

function parseAllowedOrigins(raw: string | undefined): string[] | null {
  if (raw == null || raw.trim() === '') return null
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function corsHeaders(request: Request, env: Env): Headers {
  const h = new Headers()
  const origin = request.headers.get('Origin') ?? ''
  const allowed = parseAllowedOrigins(env.TURNSTILE_ALLOWED_ORIGINS)

  if (allowed === null) {
    h.set('Access-Control-Allow-Origin', origin || '*')
  } else if (origin && allowed.includes(origin)) {
    h.set('Access-Control-Allow-Origin', origin)
  }

  h.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  h.set('Access-Control-Allow-Headers', 'Content-Type')
  h.set('Access-Control-Max-Age', '86400')
  return h
}

function json(body: unknown, status: number, request: Request, env: Env): Response {
  const headers = corsHeaders(request, env)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(body), { status, headers })
}

export async function onRequest(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request, env) })
  }

  if (request.method !== 'POST') {
    return json({ ok: false, error: 'method_not_allowed' }, 405, request, env)
  }

  const allowed = parseAllowedOrigins(env.TURNSTILE_ALLOWED_ORIGINS)
  const origin = request.headers.get('Origin') ?? ''
  if (allowed !== null && origin && !allowed.includes(origin)) {
    return json({ ok: false, error: 'origin_not_allowed' }, 403, request, env)
  }

  const secret = env.TURNSTILE_SECRET_KEY
  if (!secret?.trim()) {
    return json({ ok: false, error: 'server_misconfigured' }, 500, request, env)
  }

  let token = ''
  try {
    const body = (await request.json()) as { token?: string }
    token = typeof body?.token === 'string' ? body.token.trim() : ''
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400, request, env)
  }

  if (!token) {
    return json({ ok: false, error: 'token_required' }, 400, request, env)
  }

  const verifyRes = await fetch(SITEVERIFY, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret,
      response: token,
      remoteip: request.headers.get('CF-Connecting-IP') ?? undefined
    })
  })

  const outcome = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] }

  if (!outcome.success) {
    const codes = outcome['error-codes']?.join(',') ?? 'verify_failed'
    return json({ ok: false, error: codes }, 403, request, env)
  }

  return json({ ok: true }, 200, request, env)
}
