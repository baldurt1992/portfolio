/**
 * Construye la URL absoluta de una landing dentro del showcase.
 * La base viene de `NUXT_PUBLIC_SHOWCASE_URL` (local: localhost:5500, prod: dominio separado).
 */
export function useShowcaseLandingUrl(slug: string): string {
  const runtimeConfig = useRuntimeConfig()
  const base = String(runtimeConfig.public.showcaseUrl || '').trim().replace(/\/$/, '')
  const normalizedSlug = slug.replace(/^\/+/, '').replace(/\/$/, '')
  return base ? `${base}/${normalizedSlug}/` : `/${normalizedSlug}/`
}
