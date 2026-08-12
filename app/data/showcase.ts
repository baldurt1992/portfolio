export interface ShowcaseLanding {
  /** Identificador único de la landing. */
  id: string
  /** Slug del directorio en el repo showcase (ej. 'fintech'). */
  slug: string
  /** Clave i18n para la categoría/etiqueta. */
  categoryKey: string
  /** Clave i18n para el título. */
  titleKey: string
  /** Clave i18n para la descripción. */
  descriptionKey: string
  /** Tipo de preview visual que se dibuja en el canvas. */
  preview: 'fintech' | 'placeholder'
}

export const showcaseLandings: ShowcaseLanding[] = [
  {
    id: 'vantapay',
    slug: 'fintech',
    categoryKey: 'showcase.landings.fintech.category',
    titleKey: 'showcase.landings.fintech.title',
    descriptionKey: 'showcase.landings.fintech.description',
    preview: 'fintech'
  }
]
