export interface ShowcaseLanding {
  /** Identificador único de la landing. */
  id: string
  /** Slug del directorio en el repo showcase (ej. 'fintech', 'ai'). */
  slug: string
  /** Clave i18n para la categoría/etiqueta. */
  categoryKey: string
  /** Clave i18n para el título. */
  titleKey: string
  /** Clave i18n para la descripción. */
  descriptionKey: string
  /** Captura de la landing en `public/images/showcase/`. */
  image: string
}

export const showcaseLandings: ShowcaseLanding[] = [
  {
    id: 'vantapay',
    slug: 'fintech',
    categoryKey: 'showcase.landings.fintech.category',
    titleKey: 'showcase.landings.fintech.title',
    descriptionKey: 'showcase.landings.fintech.description',
    image: '/images/showcase/vantapay.webp'
  },
  {
    id: 'novaai',
    slug: 'ai',
    categoryKey: 'showcase.landings.ai.category',
    titleKey: 'showcase.landings.ai.title',
    descriptionKey: 'showcase.landings.ai.description',
    image: '/images/showcase/novaai.webp'
  }
]
