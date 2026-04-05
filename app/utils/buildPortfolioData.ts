import type {
  Bio,
  ExperienceItem,
  PortfolioData,
  PortfolioLocaleMessages,
  PortfolioStructure
} from '~/data/portfolio'

/**
 * Une `portfolioStructure` (rutas, ids, URLs) con copy por idioma desde vue-i18n (`tm('portfolio')`).
 */
export function buildPortfolioData(
  structure: PortfolioStructure,
  messages: PortfolioLocaleMessages
): PortfolioData {
  const bio: Bio = {
    ...structure.bio,
    ...messages.bio
  }

  const projects = structure.projects.map((p) => {
    const copy = messages.projects[p.id]
    if (!copy) {
      console.error('[buildPortfolioData] Falta copy i18n para proyecto', { projectId: p.id })
      throw new Error(`Missing i18n portfolio.projects.${p.id}`)
    }

    const mediaModules =
      p.mediaModules?.map((m) => {
        const modCopy = copy.mediaModules?.[m.id]
        if (!modCopy) {
          console.error('[buildPortfolioData] Falta copy i18n para módulo', {
            projectId: p.id,
            moduleId: m.id
          })
          throw new Error(`Missing i18n media module ${p.id}/${m.id}`)
        }
        let mediaGroupTitle: string | undefined
        if (m.mediaGroup != null && m.mediaGroup !== '') {
          const g = copy.mediaModuleGroups?.[m.mediaGroup]
          if (!g?.title) {
            console.error('[buildPortfolioData] Falta título i18n para grupo de medios', {
              projectId: p.id,
              mediaGroup: m.mediaGroup,
              moduleId: m.id
            })
            throw new Error(`Missing i18n mediaModuleGroups.${m.mediaGroup} for ${p.id}`)
          }
          mediaGroupTitle = g.title
        }
        return {
          id: m.id,
          videoSrc: m.videoSrc,
          title: modCopy.title,
          description: modCopy.description,
          mediaGroupTitle
        }
      }) ?? undefined

    return {
      id: p.id,
      image: p.image,
      url: p.url,
      repo: p.repo,
      year: p.year,
      tags: copy.tags,
      title: copy.title,
      description: copy.description,
      mediaModules
    }
  })

  const experience = structure.experience.map((row) => {
    const expCopy = messages.experience[row.id]
    if (!expCopy) {
      console.error('[buildPortfolioData] Falta copy i18n para experiencia', {
        experienceId: row.id
      })
      throw new Error(`Missing i18n portfolio.experience.${row.id}`)
    }
    const item: ExperienceItem = {
      date: expCopy.date,
      title: expCopy.title,
      company: expCopy.company,
      description: expCopy.description,
      icon: row.icon
    }
    return item
  })

  return {
    bio,
    aboutLead: messages.aboutLead,
    aboutMore: messages.aboutMore,
    projects,
    skills: structure.skills,
    experience
  }
}
