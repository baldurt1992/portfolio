import { joinURL } from 'ufo'

/** Redirección relativa al despliegue (ej. /portfolio/sitemap.xml), no a la raíz del dominio. */
export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const target = joinURL(config.app.baseURL || '/', 'sitemap.xml')
  sendRedirect(event, target, 301)
})
