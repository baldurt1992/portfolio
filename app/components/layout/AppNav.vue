<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>()

  const navItems: NavigationMenuItem[] = [
    { label: 'Inicio', to: '/#hero' },
    { label: 'Sobre mí', to: '/#about' },
    { label: 'Skills', to: '/#skills' },
    { label: 'Proyectos', to: '/#projects' },
    { label: 'Experiencia', to: '/#experience' },
    { label: 'Contacto', to: '/#contact' }
  ]
</script>

<template>
  <UNavigationMenu variant="link" color="primary" :items="navItems" :orientation="orientation" />
</template>
