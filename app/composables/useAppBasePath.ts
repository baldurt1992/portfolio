import { withBase, withoutTrailingSlash } from 'ufo'
import { normalizeAppRouterPath } from '~/utils/normalizeAppRouterPath'
import { withoutHash } from '~/utils/withoutHash'

/**
 * `resolve`: path del **router** (`/`, `/en`) para `NuxtLink` sin `external` — Vue aplica `app.baseURL`.
 *
 * `withFragment`: enlaces con `external` y `#hash`. Si concatenas `resolve(...) + '#id'`, sale `/#id`
 * y en `github.io/repo` el navegador va a `github.io/#id` (pierde `/repo`). Aquí se usa `withBase`
 * sobre el path ya normalizado (sin duplicar).
 */
export function useAppBasePath() {
  const runtimeConfig = useRuntimeConfig()

  function resolve(localeRelativePath: string) {
    const appBase = runtimeConfig.app.baseURL || '/'
    return normalizeAppRouterPath(withoutHash(localeRelativePath), appBase)
  }

  function resolveExternal(localeRelativePath: string) {
    const appBase = runtimeConfig.app.baseURL || '/'
    const rel = normalizeAppRouterPath(withoutHash(localeRelativePath), appBase)
    return withBase(rel, appBase)
  }

  function withFragment(localeRelativePath: string, fragment: string) {
    const f = fragment.startsWith('#') ? fragment : `#${fragment}`
    const full = resolveExternal(localeRelativePath)
    return `${withoutTrailingSlash(full)}${f}`
  }

  return { resolve, resolveExternal, withFragment }
}
