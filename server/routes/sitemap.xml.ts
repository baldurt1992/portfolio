import { getRequestURL } from 'h3'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const fromEnv = (config.public.siteUrl as string | undefined)?.trim().replace(/\/$/, '') ?? ''
  const fallback = (() => {
    try {
      const url = getRequestURL(event)
      return `${url.origin}${config.app.baseURL || '/'}`
    } catch {
      return ''
    }
  })()

  const base = (fromEnv || fallback).replace(/\/$/, '')

  /** Misma convención que el HTML (GitHub Pages: `/en` → 301 a `/en/`). */
  const urls = [
    {
      loc: `${base}/`,
      alternatives: [
        { hreflang: 'es-CO', href: `${base}/` },
        { hreflang: 'en-US', href: `${base}/en/` },
        { hreflang: 'x-default', href: `${base}/` }
      ]
    },
    {
      loc: `${base}/en/`,
      alternatives: [
        { hreflang: 'es-CO', href: `${base}/` },
        { hreflang: 'en-US', href: `${base}/en/` },
        { hreflang: 'x-default', href: `${base}/` }
      ]
    }
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
${url.alternatives
  .map(
    (alt) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alt.hreflang)}" href="${escapeXml(alt.href)}" />`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return xml
})
