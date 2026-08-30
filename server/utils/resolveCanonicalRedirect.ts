export interface CanonicalRedirectInput {
  host: string
  pathname: string
  search: string
  siteOrigin: string
}

const SKIP_PREFIXES = ['/_nuxt', '/_fonts', '/api', '/images', '/videos']
const FILE_EXT = /\.[a-z0-9]+$/i

function normalizeSearch(search: string): string {
  if (!search || search === '?') return ''
  return search.startsWith('?') ? search : `?${search}`
}

function shouldSkipPath(pathname: string): boolean {
  if (SKIP_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return true
  }
  return FILE_EXT.test(pathname)
}

/**
 * Devuelve la URL canónica (host apex + trailing slash) o null si ya está normalizada.
 * Un solo hop: www + sin slash → https://apex/path/
 */
export function resolveCanonicalRedirect(input: CanonicalRedirectInput): string | null {
  const pathname = input.pathname || '/'
  if (shouldSkipPath(pathname)) return null

  const needsSlash = pathname !== '/' && !pathname.endsWith('/')
  const siteOrigin = input.siteOrigin.trim().replace(/\/$/, '')

  let canonicalHost = ''
  if (siteOrigin) {
    try {
      canonicalHost = new URL(siteOrigin).hostname.toLowerCase()
    } catch {
      canonicalHost = ''
    }
  }

  const requestHost = (input.host.split(':')[0] ?? input.host).toLowerCase()
  const needsHostFix = Boolean(canonicalHost && requestHost === `www.${canonicalHost}`)

  if (!needsHostFix && !needsSlash) return null

  const nextPath = needsSlash ? `${pathname}/` : pathname
  const search = normalizeSearch(input.search)

  if (needsHostFix && siteOrigin) {
    return `${siteOrigin}${nextPath}${search}`
  }

  if (canonicalHost && requestHost === canonicalHost && siteOrigin) {
    return `${siteOrigin}${nextPath}${search}`
  }

  return `${nextPath}${search}`
}
