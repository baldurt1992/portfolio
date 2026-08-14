import { getRequestURL } from 'h3'
import { joinURL } from 'ufo'

/** Índice de sitemaps válido para Google Search Console. */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const fromEnv = (config.public.siteUrl as string | undefined)?.trim().replace(/\/$/, '') ?? ''
  const fallback = (() => {
    try {
      const url = getRequestURL(event)
      return `${url.origin}${config.app.baseURL || '/'}`.replace(/\/$/, '')
    } catch {
      return ''
    }
  })()
  const base = fromEnv || fallback || ''
  const sitemap = base ? joinURL(base, 'sitemap.xml') : joinURL(config.app.baseURL || '/', 'sitemap.xml')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${sitemap}</loc>
  </sitemap>
</sitemapindex>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return xml
})
