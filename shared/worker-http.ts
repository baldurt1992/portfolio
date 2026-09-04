export function parseAllowedOrigins(raw: string | undefined): string[] | null {
  if (raw == null || raw.trim() === '') return null
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function corsHeaders(request: Request, allowedOriginsRaw: string | undefined): Headers {
  const h = new Headers()
  const origin = request.headers.get('Origin') ?? ''
  const allowed = parseAllowedOrigins(allowedOriginsRaw)

  if (allowed === null) {
    h.set('Access-Control-Allow-Origin', origin || '*')
  } else if (origin && allowed.includes(origin)) {
    h.set('Access-Control-Allow-Origin', origin)
  }

  h.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  h.set('Access-Control-Allow-Headers', 'Content-Type')
  h.set('Access-Control-Max-Age', '86400')
  h.set('X-Robots-Tag', 'noindex, nofollow')
  return h
}

export function jsonResponse(
  body: unknown,
  status: number,
  request: Request,
  allowedOriginsRaw: string | undefined
): Response {
  const headers = corsHeaders(request, allowedOriginsRaw)
  headers.set('Content-Type', 'application/json; charset=utf-8')
  return new Response(JSON.stringify(body), { status, headers })
}

export function isOriginAllowed(request: Request, allowedOriginsRaw: string | undefined): boolean {
  const allowed = parseAllowedOrigins(allowedOriginsRaw)
  const origin = request.headers.get('Origin') ?? ''
  if (allowed === null) return true
  if (!origin) return true
  return allowed.includes(origin)
}
