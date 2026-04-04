/** Contenido del portafolio — única fuente de verdad para bio, proyectos, skills y experiencia. */

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  url?: string
  repo?: string
  year: string
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

export const portfolioData: PortfolioData = {
  bio: {
    name: 'Andrés Baldur Tamayo Marín',
    brandName: 'BaldurDev',
    title: 'Frontend Developer · Vue, Nuxt, Laravel & Tailwind',
    tagline:
      'Interfaces web rápidas, accesibles y mantenibles con Vue, Nuxt y Laravel — buenas prácticas de UX, performance y trabajo en equipo.',
    heroTrustLine:
      'Freelance · Bello, Antioquia · Clientes en Colombia y España · Vue, Nuxt, Laravel, WordPress (Divi, Elementor), SaaS/ERP y despliegues',
    avatar: '/images/portrait.jpg',
    aboutAvatar: '/images/avatar.png',
    email: 'andresbaldur92@gmail.com',
    location: 'Bello, Antioquia',
    social: {
      github: 'https://github.com/baldurt1992',
      linkedin: 'https://www.linkedin.com/in/baldur92/'
    }
  },

  aboutLead:
    'Soy desarrollador frontend con foco en Vue, Nuxt (incl. Nuxt UI), PrimeVue y Tailwind. En backend trabajo sobre todo con Laravel (APIs, Eloquent, colas cuando hace falta). También implemento y mantengo sitios WordPress con Divi y Elementor cuando el producto encaja con un CMS.',

  aboutMore:
    'Me interesa la arquitectura clara del lado Laravel y las integraciones limpias con el front. Colaboro en remoto con equipos en Colombia y Europa: desde sitios y APIs Laravel hasta producto B2B (SaaS, ERP, gestión de usuarios y flujos con dominios y despliegue). Uso Git, metodologías ágiles y sigo mejorando mi inglés. Disfruto traducir requisitos en interfaces que la gente use sin fricción.',

  projects: [
    {
      id: 'cosmos-erp',
      title: 'Cosmos ERP (multi-tenant)',
      description:
        'ERP en desarrollo: Laravel 12 y Nuxt 4, multi-tenant, Sanctum y Octane; Nuxt UI y TypeScript; MySQL y Redis. Infra Docker Compose (dev, staging y producción) con servicios alineados entre entornos. GitHub Actions: jobs de tests (Pest, Vitest, guardrails y cobertura) listos para integrar en el flujo, más pipelines de despliegue automatizado a servidores y paneles de hosting (Plesk, cPanel y similares) desde la rama principal. Documentación y flujos pensados Docker-first.',
      tags: [
        'Laravel',
        'Nuxt',
        'TypeScript',
        'Docker',
        'GitHub Actions',
        'MySQL',
        'Redis'
      ],
      year: '2025'
    },
    {
      id: 'hosting-orchestration',
      title: 'Orquestación de hosting, dominios y despliegues',
      description:
        'Plataforma en desarrollo en torno a integraciones con paneles y servidores de hosting (p. ej. Plesk, cPanel): flujos de dominios, aprovisionamiento y despliegue de aplicaciones; paneles internos con Laravel, Vue 3, PrimeVue y Pinia.',
      tags: ['Laravel', 'Vue', 'PrimeVue', 'Pinia', 'Tailwind CSS'],
      year: '2024'
    },
    {
      id: 'gov-nuxt',
      title: 'Aplicación web para entidad gubernamental',
      description:
        'Proyecto white label (2023): Nuxt, Pinia y Tailwind. Mejoras de rendimiento y accesibilidad, nuevo flujo de autenticación y ajustes en el modelo de datos para consultas más eficientes.',
      tags: ['Nuxt', 'Pinia', 'Tailwind CSS'],
      year: '2023'
    },
    {
      id: 'landing-nuxt',
      title: 'Landing freelance (Nuxt)',
      description:
        'Página altamente optimizada: métricas cercanas a 91 en performance, 96 en accesibilidad y 100 en SEO en Lighthouse; diseño responsive y experiencia fluida.',
      tags: ['Nuxt', 'Tailwind CSS'],
      year: '2023'
    },
    {
      id: 'wordpress-institucional',
      title: 'Plataforma institucional WordPress',
      description:
        'White label (2023): rediseño con Divi y Elementor donde aplica; foco en accesibilidad, tiempos de carga más bajos y navegación más clara.',
      tags: ['WordPress', 'Divi', 'Elementor', 'Accesibilidad'],
      year: '2023'
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
      date: '2024 — presente',
      title: 'Freelance — proyectos avanzados y producto B2B',
      company: 'Clientes en Colombia y España',
      description:
        'Desde 2024 intensifico colaboraciones con más carga de producto e infraestructura. Con una agencia en Colombia: Laravel, APIs y sitios WordPress ampliando stack hacia Divi además de Elementor. Con un equipo en España: producto B2B — SaaS, ERP multi-tenant (Laravel + Nuxt), plataformas de gestión de usuarios, compra de dominios y despliegue enlazado a hosting. Docker Compose entre entornos (dev, staging, producción) y GitHub Actions: tests backend/frontend (Pest, Vitest, guardrails) y pipelines de despliegue automatizado a servidores y paneles habituales (Plesk, cPanel y similares). Remoto y entregas orientadas a producción.',
      icon: 'i-lucide-briefcase'
    },
    {
      date: '2024 — 2025',
      title: 'Formación universitaria',
      company: 'Universidad EAFIT',
      description:
        'Carrera finalizada. Proyectos integradores, bases de ingeniería de software y hábitos de calidad que aplico en los proyectos con cliente.',
      icon: 'i-lucide-graduation-cap'
    },
    {
      date: '2023',
      title: 'Freelance — primeros proyectos',
      company: 'Autónomo · landings y sitios pequeños',
      description:
        'Proyectos acotados para clientes: landings y páginas promocionales con WordPress y Elementor, foco en maquetación clara y tiempos de entrega ágiles.',
      icon: 'i-lucide-layout-template'
    },
    {
      date: '2023',
      title: 'Formación técnica en desarrollo web',
      company: 'Cesde',
      description:
        'Programa orientado a desarrollo web: fundamentos de programación, bases de desarrollo y bases de datos como soporte para pasar a proyectos reales.',
      icon: 'i-lucide-book-open'
    }
  ]
}
