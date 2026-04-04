import { portfolioData } from '~/data/portfolio'

export type {
  Bio,
  ExperienceItem,
  PortfolioData,
  Project,
  Skill
} from '~/data/portfolio'

/** Datos estáticos desde `app/data/portfolio.ts` (API/CMS → Pinia u otro patrón solo si hace falta). */
export function usePortfolioData() {
  return portfolioData
}
