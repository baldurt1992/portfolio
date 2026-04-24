/**
 * POST /  — cuerpo JSON { "token": "<turnstile response>" }
 * NUXT_PUBLIC_TURNSTILE_VERIFY_URL debe ser la URL base del worker, ej. https://portfolio-turnstile-verify.andresbaldur92.workers.dev/
 */

import type { TurnstileVerifyEnv } from '../../../shared/turnstile-verify-request'
import { handleTurnstileVerify } from '../../../shared/turnstile-verify-request'

export default {
  fetch(request: Request, env: TurnstileVerifyEnv): Promise<Response> {
    return handleTurnstileVerify(request, env)
  }
}
