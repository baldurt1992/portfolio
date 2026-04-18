import { withBase, withoutTrailingSlash } from 'ufo'
import { withoutHash } from '~/utils/withoutHash'

/**
 * Rutas de `localePath` / `switchLocalePath` suelen ser `/`, `/en` (respecto al origen).
 * Con `app.baseURL` en subruta hay que prefijar para que no resuelvan a `/#hash` en el host.
 * Si i18n ya devuelve `/portfolio/en`, no volver a aplicar base (evita `/portfolio/portfolio/en`).
 * Si llega `portfolio/en` sin `/` inicial, `withBase` duplicaba el segmento.
 */
export function useAppBasePath() {
  const runtimeConfig = useRuntimeConfig()

  function resolve(localeRelativePath: string) {
    const appBase = runtimeConfig.app.baseURL || '/'
    let rel = withoutHash(localeRelativePath) || '/'
    if (!rel.startsWith('/')) {
      rel = `/${rel}`
    }
    const root = withoutTrailingSlash(appBase)
    if (root && root !== '/' && (rel === root || rel.startsWith(`${root}/`))) {
      return rel
    }
    return withBase(rel, appBase)
  }

  return { resolve }
}
