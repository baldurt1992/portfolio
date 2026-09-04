/**
 * POST / — JSON { name, email, message, token }
 * NUXT_PUBLIC_CONTACT_API_URL = https://portfolio-contact.<subcuenta>.workers.dev/
 */

import type { ContactMailEnv } from '../../../shared/contact-request'
import { handleContactRequest } from '../../../shared/contact-request'

export default {
  fetch(request: Request, env: ContactMailEnv): Promise<Response> {
    return handleContactRequest(request, env)
  }
}
