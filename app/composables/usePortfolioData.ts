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
  title: string
  tagline: string
  avatar?: string
  email: string
  location?: string
  social: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export function usePortfolioData() {
  const bio: Bio = {
    name: 'Tu Nombre',
    title: 'Software Developer',
    tagline: 'Creando experiencias digitales impactantes con código limpio y diseño cuidadoso.',
    email: 'tu@email.com',
    location: 'Tu Ciudad',
    social: {
      github: 'https://github.com/tu-usuario',
      linkedin: 'https://linkedin.com/in/tu-usuario',
      twitter: 'https://twitter.com/tu-usuario'
    }
  }

  const projects: Project[] = [
    {
      id: '1',
      title: 'Proyecto Destacado',
      description: 'Descripción breve del proyecto. Stack usado, desafíos resueltos y resultados.',
      tags: ['Vue', 'Nuxt', 'Tailwind'],
      year: '2024',
      url: '#',
      repo: '#'
    },
    {
      id: '2',
      title: 'Otro Proyecto',
      description: 'Otro proyecto con impacto. Qué problema resuelve y qué tecnologías usaste.',
      tags: ['TypeScript', 'Node.js'],
      year: '2024'
    }
  ]

  const skills: Skill[] = [
    { name: 'Vue.js', category: 'frontend', icon: 'i-simple-icons-vuedotjs' },
    { name: 'Nuxt', category: 'frontend', icon: 'i-simple-icons-nuxtdotjs' },
    {
      name: 'TypeScript',
      category: 'frontend',
      icon: 'i-simple-icons-typescript'
    },
    {
      name: 'Tailwind',
      category: 'frontend',
      icon: 'i-simple-icons-tailwindcss'
    },
    { name: 'Node.js', category: 'backend', icon: 'i-simple-icons-nodedotjs' },
    { name: 'Git', category: 'tools', icon: 'i-simple-icons-git' }
  ]

  const experience: ExperienceItem[] = [
    {
      date: '2023 - Presente',
      title: 'Software Developer',
      company: 'Tu Empresa',
      description: 'Desarrollo de aplicaciones web. Liderazgo técnico y mentoring.',
      icon: 'i-lucide-code'
    },
    {
      date: '2021 - 2023',
      title: 'Desarrollador Full Stack',
      company: 'Otra Empresa',
      description: 'Desarrollo full stack con Vue y Node. Integración de APIs.',
      icon: 'i-lucide-briefcase'
    }
  ]

  return {
    bio,
    projects,
    skills,
    experience
  }
}
