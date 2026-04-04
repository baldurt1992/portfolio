<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>()

  const { t } = useI18n()
  const localePath = useLocalePath()

  const navItems = computed<NavigationMenuItem[]>(() => {
    const base = localePath('/')
    return [
      { label: t('nav.home'), to: `${base}#hero` },
      { label: t('nav.about'), to: `${base}#about` },
      { label: t('nav.skills'), to: `${base}#skills` },
      { label: t('nav.projects'), to: `${base}#projects` },
      { label: t('nav.experience'), to: `${base}#experience` },
      { label: t('nav.contact'), to: `${base}#contact` }
    ]
  })
</script>

<template>
  <UNavigationMenu variant="link" color="primary" :items="navItems" :orientation="orientation" />
</template>
