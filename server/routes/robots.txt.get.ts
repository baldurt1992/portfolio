import { getRequestURL } from 'h3'
import { joinURL } from 'ufo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const fromEnv = (config.public.siteUrl as string | undefined)?.trim().replace(/\/$/, '') ?? ''
  /** Misma lógica que sitemap.xml: origen + app.baseURL (subruta GitHub Pages). */
  const fallback = (() => {
    try {
      const url = getRequestURL(event)
      return `${url.origin}${config.app.baseURL || '/'}`.replace(/\/$/, '')
    } catch {
      return ''
    }
  })()
  const base = fromEnv || fallback
  const sitemap = base
    ? joinURL(base, 'sitemap.xml')
    : joinURL(config.app.baseURL || '/', 'sitemap.xml')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n')
})
