import { joinURL } from 'ufo'

/**
 * Archivos en `public/` con prefijo `app.baseURL` (p. ej. GitHub Pages en `/repo/`).
 * Usa `runtimeConfig.app.baseURL` en contexto Nuxt (SSR/prerender incluido); `import.meta.env.BASE_URL`
 * puede ser `/` en el bundle del servidor aunque el sitio esté en subruta.
 */
export function publicPath(path: string): string {
  const trimmed = path.replace(/^\/+/, '')
  try {
    const { app } = useRuntimeConfig()
    return joinURL(app.baseURL || '/', trimmed)
  } catch {
    return joinURL(import.meta.env.BASE_URL || '/', trimmed)
  }
}
