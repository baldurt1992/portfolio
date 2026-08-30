import { withTrailingSlash } from 'ufo'
import { withoutHash } from '~/utils/withoutHash'

/**
 * localePath de documentos HTML, siempre con trailing slash (alineado a las canónicas).
 */
export function useLocaleDocumentPath() {
  const localePath = useLocalePath()

  return (path: string, locale?: 'es' | 'en') => {
    const resolved = locale ? localePath(path, locale) : localePath(path)
    return withTrailingSlash(withoutHash(resolved))
  }
}
