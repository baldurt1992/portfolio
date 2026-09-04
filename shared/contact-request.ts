import { parseContactPayload } from './contact-payload'
import { buildContactRfc822, encodeRfc822ToGmailRaw } from './contact-rfc822'
import { sendGmailRawMessage } from './gmail-send'
import { verifyTurnstileTokenOnServer } from './turnstile-siteverify'
import { corsHeaders, isOriginAllowed, jsonResponse } from './worker-http'

const LOG_TAG = '[ContactMail]'
const MAX_BODY_BYTES = 20_480

export interface ContactMailEnv {
  TURNSTILE_SECRET_KEY: string
  TURNSTILE_ALLOWED_ORIGINS?: string
  MAIL_FROM: string
  MAIL_TO: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GOOGLE_OAUTH_CLIENT_SECRET: string
  GOOGLE_OAUTH_REFRESH_TOKEN: string
}

function json(env: ContactMailEnv, request: Request, body: unknown, status: number): Response {
  return jsonResponse(body, status, request, env.TURNSTILE_ALLOWED_ORIGINS)
}

function isConfigured(env: ContactMailEnv): boolean {
  return Boolean(
    env.TURNSTILE_SECRET_KEY?.trim() &&
    env.MAIL_FROM?.trim() &&
    env.MAIL_TO?.trim() &&
    env.GOOGLE_OAUTH_CLIENT_ID?.trim() &&
    env.GOOGLE_OAUTH_CLIENT_SECRET?.trim() &&
    env.GOOGLE_OAUTH_REFRESH_TOKEN?.trim()
  )
}

export async function handleContactRequest(
  request: Request,
  env: ContactMailEnv
): Promise<Response> {
  const origins = env.TURNSTILE_ALLOWED_ORIGINS

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(request, origins) })
  }

  if (request.method !== 'POST') {
    return json(env, request, { ok: false, error: 'method_not_allowed' }, 405)
  }

  if (!isOriginAllowed(request, origins)) {
    console.warn(JSON.stringify({ tag: LOG_TAG, message: 'origin_not_allowed' }))
    return json(env, request, { ok: false, error: 'origin_not_allowed' }, 403)
  }

  if (!isConfigured(env)) {
    console.error(JSON.stringify({ tag: LOG_TAG, message: 'server_misconfigured' }))
    return json(env, request, { ok: false, error: 'server_misconfigured' }, 500)
  }

  const contentLength = request.headers.get('content-length')
  if (contentLength != null) {
    const size = Number(contentLength)
    if (!Number.isFinite(size) || size > MAX_BODY_BYTES) {
      return json(env, request, { ok: false, error: 'invalid_payload' }, 413)
    }
  }

  let parsedJson: unknown
  try {
    parsedJson = await request.json()
  } catch {
    return json(env, request, { ok: false, error: 'invalid_json' }, 400)
  }

  const payload = parseContactPayload(parsedJson)
  if (!payload.ok) {
    console.warn(
      JSON.stringify({ tag: LOG_TAG, message: 'payload_rejected', error: payload.error })
    )
    return json(env, request, { ok: false, error: payload.error }, 400)
  }

  const turnstile = await verifyTurnstileTokenOnServer({
    secret: env.TURNSTILE_SECRET_KEY,
    token: payload.data.token,
    remoteIp: request.headers.get('CF-Connecting-IP') ?? undefined
  })

  if (!turnstile.success) {
    console.warn(
      JSON.stringify({
        tag: LOG_TAG,
        message: 'turnstile_failed',
        errorCodes: turnstile.errorCodes
      })
    )
    return json(env, request, { ok: false, error: 'turnstile_failed' }, 403)
  }

  const { name, email, message } = payload.data
  const rfc822 = buildContactRfc822({
    fromEmail: env.MAIL_FROM.trim(),
    fromName: 'Baldur Dev',
    to: env.MAIL_TO.trim(),
    replyTo: email,
    subject: `Contacto desde el sitio — ${name}`,
    text: `${message}\n\n— ${name}\n${email}`
  })

  try {
    await sendGmailRawMessage(
      {
        clientId: env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
        refreshToken: env.GOOGLE_OAUTH_REFRESH_TOKEN
      },
      encodeRfc822ToGmailRaw(rfc822)
    )

    console.info(
      JSON.stringify({
        tag: LOG_TAG,
        message: 'envío OK',
        to: env.MAIL_TO.trim()
      })
    )

    return json(env, request, { ok: true }, 200)
  } catch (error) {
    console.error(
      JSON.stringify({
        tag: LOG_TAG,
        message: 'email_send_failed',
        error: error instanceof Error ? error.message : 'unknown'
      })
    )
    return json(env, request, { ok: false, error: 'email_send_failed' }, 502)
  }
}
