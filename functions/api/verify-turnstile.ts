/**
 * Cloudflare Pages Function — POST /api/verify-turnstile
 *
 * Solo se despliega si el proyecto es Cloudflare **Pages** (Git + carpeta `functions/`).
 * Si tu URL es `*.workers.dev` sin Pages, usa `workers/turnstile-verify` + Wrangler.
 *
 * Secrets: TURNSTILE_SECRET_KEY, TURNSTILE_ALLOWED_ORIGINS (opcional).
 *
 * @see https://developers.cloudflare.com/pages/functions/
 */

import type { TurnstileVerifyEnv } from '../../shared/turnstile-verify-request'
import { handleTurnstileVerify } from '../../shared/turnstile-verify-request'

export async function onRequest(context: {
  request: Request
  env: TurnstileVerifyEnv
}): Promise<Response> {
  return handleTurnstileVerify(context.request, context.env)
}
