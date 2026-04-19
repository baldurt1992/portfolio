import { getRequestURL } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const fromEnv = (config.public.siteUrl as string | undefined)?.trim().replace(/\/$/, '') ?? ''
  const fallback = (() => {
    try {
      return getRequestURL(event).origin
    } catch {
      return ''
    }
  })()
  const base = fromEnv || fallback
  const sitemapPath = '/sitemap.xml'
  const sitemap = base ? `${base}${sitemapPath}` : sitemapPath
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemap}`, ''].join('\n')
})
