import { withTrailingSlash } from 'ufo'
import { publicPath } from '~/utils/publicPath'

/** Construye la ruta interna de una landing estática integrada en el portafolio. */
export function useShowcaseLandingUrl(slug: string): string {
  const normalizedSlug = slug.replace(/^\/+/, '').replace(/\/$/, '')
  return withTrailingSlash(publicPath(`/showcase/${normalizedSlug}`))
}
