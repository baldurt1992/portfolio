import { withoutBase, withoutTrailingSlash } from 'ufo'

/**
 * Con `app.baseURL` en subruta, vue-router + @nuxtjs/i18n pueden exponer `fullPath` con el
 * prefijo del deploy repetido o mezclado. Cualquier `joinURL(siteUrl, path)` o `withBase` sobre
 * eso duplica el segmento (p. ej. …/portfolio/portfolio). Esta función deja un path relativo al
 * router de la app: `/`, `/en`, etc.
 */
export function normalizeAppRouterPath(path: string | undefined, baseURL: string): string {
  const root = withoutTrailingSlash(baseURL || '/')
  let p = path?.trim() || '/'
  if (!p.startsWith('/')) {
    p = `/${p}`
  }
  if (!root || root === '/') {
    return p || '/'
  }
  let prev = ''
  while (p !== prev) {
    prev = p
    const stripped = withoutBase(p, root)
    p = stripped === '' ? '/' : stripped.startsWith('/') ? stripped : `/${stripped}`
  }
  return p || '/'
}
