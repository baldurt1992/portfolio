import { buildPortfolioData } from '~/utils/buildPortfolioData'
import { portfolioStructure } from '~/data/portfolio'
import { resolveTmTree } from '~/utils/resolveTmTree'
import type { PortfolioData, PortfolioLocaleMessages } from '~/data/portfolio'

export type {
  Bio,
  ExperienceItem,
  PortfolioData,
  Project,
  ProjectMediaModule,
  Skill
} from '~/data/portfolio'

/**
 * Portafolio del sitio según el locale activo (vue-i18n → clave `portfolio` en `locales/*.json`).
 * `tm()` devuelve mensajes compilados; hay que pasarlos por `rt()` (ver docs vue-i18n).
 */
export function usePortfolioData(): ComputedRef<PortfolioData> {
  const { locale, tm, rt } = useI18n()

  return computed(() => {
    void locale.value
    const raw = tm('portfolio')
    const messages = resolveTmTree(raw, rt) as PortfolioLocaleMessages
    return buildPortfolioData(portfolioStructure, messages)
  })
}
