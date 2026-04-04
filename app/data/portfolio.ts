/** Contenido del portafolio — tipos, estructura compartida (rutas/ids) y shape de mensajes i18n. */

/** Módulo demostrable del producto (video + copy) — p. ej. recorrido Ticador en el drawer de la card. */
export interface ProjectMediaModule {
  id: string
  title: string
  description: string
  videoSrc: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  url?: string
  repo?: string
  year: string
  /** Clips o recorridos en video con copy, mostrados en “Ver detalles” (drawer). */
  mediaModules?: ProjectMediaModule[]
}

export interface ProjectMediaModuleStructure {
  id: string
  videoSrc: string
}

export interface ProjectStructure {
  id: string
  image?: string
  url?: string
  repo?: string
  year: string
  mediaModules?: ProjectMediaModuleStructure[]
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'devops'
  icon?: string
}

export interface ExperienceItem {
  date: string
  title: string
  company: string
  description: string
  icon?: string
}

export interface ExperienceStructureItem {
  id: string
  icon: string
}

export interface Bio {
  name: string
  brandName?: string
  title: string
  tagline: string
  heroTrustLine?: string
  /** Retrato principal del hero (foto). */
  avatar?: string
  /** Avatar / ilustración para “Sobre mí” (p. ej. pixel art); independiente del retrato del hero. */
  aboutAvatar?: string
  email: string
  location?: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface PortfolioData {
  bio: Bio
  aboutLead: string
  aboutMore: string
  projects: Project[]
  skills: Skill[]
  experience: ExperienceItem[]
}

export interface PortfolioLocaleMessages {
  bio: Pick<Bio, 'title' | 'tagline' | 'heroTrustLine' | 'location'>
  aboutLead: string
  aboutMore: string
  projects: Record<
    string,
    {
      title: string
      description: string
      tags: string[]
      mediaModules?: Record<string, { title: string; description: string }>
    }
  >
  experience: Record<
    string,
    Pick<ExperienceItem, 'date' | 'title' | 'company' | 'description'>
  >
}

export interface PortfolioStructure {
  bio: Omit<Bio, 'title' | 'tagline' | 'heroTrustLine' | 'location'>
  projects: ProjectStructure[]
  skills: Skill[]
  experience: ExperienceStructureItem[]
}

/** Rutas, ids y datos no lingüísticos; el copy vive en `locales/*.json` → clave `portfolio`. */
export const portfolioStructure: PortfolioStructure = {
  bio: {
    name: 'Andrés Baldur Tamayo Marín',
    brandName: 'BaldurDev',
    avatar: '/images/portrait.jpg',
    aboutAvatar: '/images/avatar.png',
    email: 'andresbaldur92@gmail.com',
    social: {
      github: 'https://github.com/baldurt1992',
      linkedin: 'https://www.linkedin.com/in/baldur92/'
    }
  },

  projects: [
    {
      id: 'ticador-platform',
      image: '/images/projects/ticador-dashboard.png',
      url: 'https://ticador.online',
      year: '2024',
      mediaModules: [
        { id: 'main-navigation', videoSrc: '/videos/ticador/ticador-main-navigation.mp4' },
        { id: 'device-access', videoSrc: '/videos/ticador/ticador-device-access.mp4' },
        { id: 'incident-report', videoSrc: '/videos/ticador/ticador-incident-report.mp4' },
        { id: 'employee-check-in-out', videoSrc: '/videos/ticador/ticador-employee-check-in-out.mp4' },
        { id: 'onboarding-wizard', videoSrc: '/videos/ticador/ticador-onboarding-wizard.mp4' }
      ]
    },
    {
      id: 'cosmos-erp',
      year: '2025'
    },
    {
      id: 'wordpress-elementor-agenda',
      year: '2024'
    }
  ],

  skills: [
    { name: 'HTML / CSS', category: 'frontend', icon: 'i-simple-icons-html5' },
    { name: 'Tailwind CSS', category: 'frontend', icon: 'i-simple-icons-tailwindcss' },
    { name: 'JavaScript', category: 'frontend', icon: 'i-simple-icons-javascript' },
    { name: 'Vue.js', category: 'frontend', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Nuxt · Nuxt UI', category: 'frontend', icon: 'i-simple-icons-nuxtdotjs' },
    { name: 'PrimeVue', category: 'frontend', icon: 'i-simple-icons-primevue' },
    { name: 'Pinia', category: 'frontend', icon: 'i-simple-icons-pinia' },
    { name: 'Laravel', category: 'backend', icon: 'i-simple-icons-laravel' },
    { name: 'PHP', category: 'backend', icon: 'i-simple-icons-php' },
    { name: 'PostgreSQL', category: 'backend', icon: 'i-simple-icons-postgresql' },
    { name: 'MySQL', category: 'backend', icon: 'i-simple-icons-mysql' },
    { name: 'Git', category: 'tools', icon: 'i-simple-icons-git' },
    { name: 'GitHub', category: 'tools', icon: 'i-simple-icons-github' },
    { name: 'Docker', category: 'devops', icon: 'i-simple-icons-docker' },
    { name: 'GitHub Actions', category: 'devops', icon: 'i-simple-icons-githubactions' },
    { name: 'WordPress', category: 'tools', icon: 'i-simple-icons-wordpress' },
    { name: 'Divi', category: 'tools', icon: 'i-lucide-layout-template' },
    { name: 'Elementor', category: 'tools', icon: 'i-simple-icons-elementor' }
  ],

  experience: [
    {
      id: 'freelance-advanced',
      icon: 'i-lucide-briefcase'
    },
    {
      id: 'university-eafit',
      icon: 'i-lucide-graduation-cap'
    },
    {
      id: 'freelance-early',
      icon: 'i-lucide-layout-template'
    },
    {
      id: 'cesde-tech',
      icon: 'i-lucide-book-open'
    }
  ]
}
