import { normalizeAppRouterPath } from '~/utils/normalizeAppRouterPath'
import { withoutHash } from '~/utils/withoutHash'

/**
 * Devuelve un path relativo al **router** (`/`, `/en`), sin el prefijo de deploy (`/portfolio`).
 * `NuxtLink` / Vue Router aplican `app.baseURL` solos; si aquí se hace `withBase` y además pasas
 * el resultado a `NuxtLink`, el href queda `/portfolio/portfolio`.
 */
export function useAppBasePath() {
  const runtimeConfig = useRuntimeConfig()

  function resolve(localeRelativePath: string) {
    const appBase = runtimeConfig.app.baseURL || '/'
    return normalizeAppRouterPath(withoutHash(localeRelativePath), appBase)
  }

  return { resolve }
}
