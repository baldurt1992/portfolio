import { withBase } from 'ufo'
import { withoutHash } from '~/utils/withoutHash'

/**
 * Rutas de `localePath` / `switchLocalePath` son relativas al origen (`/`, `/en`).
 * Con `app.baseURL` en subruta (GitHub Pages) hay que prefijar; si no, `/#about` sale del repo.
 */
export function useAppBasePath() {
  const runtimeConfig = useRuntimeConfig()

  function resolve(localeRelativePath: string) {
    const rel = withoutHash(localeRelativePath) || '/'
    return withBase(rel, runtimeConfig.app.baseURL || '/')
  }

  return { resolve }
}
