import { resolveCanonicalRedirect } from '../utils/resolveCanonicalRedirect'

export default defineEventHandler((event) => {
  if (import.meta.prerender) return

  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string | undefined)?.trim() ?? ''
  const url = getRequestURL(event)

  try {
    const target = resolveCanonicalRedirect({
      host: url.hostname,
      pathname: url.pathname,
      search: url.search,
      siteOrigin: siteUrl
    })

    if (!target) return

    return sendRedirect(event, target, 301)
  } catch (error) {
    console.error('[SeoCanonical] Error al resolver redirect', {
      path: url.pathname,
      host: url.hostname,
      error
    })
  }
})
