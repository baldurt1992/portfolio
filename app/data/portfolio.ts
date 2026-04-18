/** Contenido del portafolio — tipos, estructura compartida (rutas/ids) y shape de mensajes i18n. */
/** Rutas bajo `public/` (sin `app.baseURL`); el prefijo lo aplica `buildPortfolioData`. */

/** Módulo demostrable del producto (video + copy) — p. ej. recorrido Ticador en el drawer de la card. */
export interface ProjectMediaModule {
  id: string
  title: string
  description: string
  videoSrc: string
  /** Título de sección i18n (p. ej. provisioning vs app de asistencia), opcional. */
  mediaGroupTitle?: string
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
  /** Clave en `portfolio.projects[id].mediaModuleGroups` para agrupar ítems en el drawer. */
  mediaGroup?: string
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
  /** Hero: texto fijo antes del “teclado”; debe ser prefijo de `tagline`. */
  taglinePrefix?: string
  /** Hero: fragmento con animación tipo escritura; `tagline` = prefix + typewriter. */
  taglineTypewriter?: string
  /** Hero: términos que rotan dentro del “input” (escribir → borrar con backspace → siguiente). */
  taglineRotatingTokens?: string[]
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
  bio: Pick<Bio, 'title' | 'tagline' | 'heroTrustLine' | 'location'> &
    Partial<Pick<Bio, 'taglinePrefix' | 'taglineTypewriter' | 'taglineRotatingTokens'>>
  aboutLead: string
  aboutMore: string
  projects: Record<
    string,
    {
      title: string
      /** Periodo mostrado en la card; si falta, se usa `year` de `portfolioStructure`. */
      year?: string
      description: string
      tags: string[]
      mediaModules?: Record<string, { title: string; description: string }>
      mediaModuleGroups?: Record<string, { title: string }>
    }
  >
  experience: Record<string, Pick<ExperienceItem, 'date' | 'title' | 'company' | 'description'>>
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
      year: '2024/2025',
      mediaModules: [
        {
          id: 'main-navigation',
          videoSrc: '/videos/ticador/ticador-main-navigation.mp4',
          mediaGroup: 'provisioning-admin'
        },
        {
          id: 'tenant-provisioning-flow',
          videoSrc: '/videos/ticador/ticador-tenant-provisioning-flow.mp4',
          mediaGroup: 'provisioning-admin'
        },
        {
          id: 'subscriptions-coupons-cycle',
          videoSrc: '/videos/ticador/ticador-subscriptions-coupons-cycle.mp4',
          mediaGroup: 'provisioning-admin'
        },
        {
          id: 'onboarding-wizard',
          videoSrc: '/videos/ticador/ticador-onboarding-wizard.mp4',
          mediaGroup: 'workforce-app'
        },
        {
          id: 'application-main-navigation',
          videoSrc: '/videos/ticador/ticador-app-main-navigation.mp4',
          mediaGroup: 'workforce-app'
        },
        {
          id: 'device-access',
          videoSrc: '/videos/ticador/ticador-device-access.mp4',
          mediaGroup: 'workforce-app'
        },
        {
          id: 'employee-check-in-out',
          videoSrc: '/videos/ticador/ticador-employee-check-in-out.mp4',
          mediaGroup: 'workforce-app'
        },
        {
          id: 'incident-report',
          videoSrc: '/videos/ticador/ticador-incident-report.mp4',
          mediaGroup: 'workforce-app'
        }
      ]
    },
    {
      id: 'cosmos-erp',
      image: '/images/projects/cosmos-erp-dashboard.png',
      year: '2025 / actualidad',
      mediaModules: [
        {
          id: 'initial-setup',
          videoSrc: '/videos/cosmos/cosmos-initial-setup.mp4',
          mediaGroup: 'core-erp'
        },
        {
          id: 'erp-overview',
          videoSrc: '/videos/cosmos/cosmos-erp-overview.mp4',
          mediaGroup: 'core-erp'
        },
        {
          id: 'customer-creation',
          videoSrc: '/videos/cosmos/cosmos-customer-creation.mp4',
          mediaGroup: 'core-erp'
        },
        {
          id: 'sales-invoice-creation',
          videoSrc: '/videos/cosmos/cosmos-sales-invoice-creation.mp4',
          mediaGroup: 'core-erp'
        },
        {
          id: 'document-conversion',
          videoSrc: '/videos/cosmos/cosmos-document-conversion.mp4',
          mediaGroup: 'core-erp'
        },
        {
          id: 'pos-configuration-billing',
          videoSrc: '/videos/cosmos/cosmos-pos-configuration-billing.mp4',
          mediaGroup: 'pos-operations'
        }
      ]
    },
    {
      id: 'wordpress-elementor-agenda',
      image: '/images/projects/wordpress-dental-site.png',
      url: 'https://carolinaodontologa.com/',
      year: '2025',
      mediaModules: [
        {
          id: 'main-navigation',
          videoSrc: '/videos/wordpress-elementor-agenda/wordpress-main-navigation.mp4'
        },
        {
          id: 'booking-flow',
          videoSrc: '/videos/wordpress-elementor-agenda/wordpress-booking-flow.mp4'
        }
      ]
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
