<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'

  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>()

  const { t } = useI18n()
  const localePath = useLocalePath()
  const { withFragment } = useAppBasePath()
  const { activeHash, navActiveReady } = useLandingNavActive()

  // NuxtLink + hash: `external` evita #fragment distinto SSR/cliente; `withFragment` incluye app.baseURL
  const navItems = computed<NavigationMenuItem[]>(() => {
    const home = localePath('/')
    const entries = [
      { label: t('nav.home'), fragment: '#hero' as const },
      { label: t('nav.about'), fragment: '#about' as const },
      { label: t('nav.skills'), fragment: '#skills' as const },
      { label: t('nav.projects'), fragment: '#projects' as const },
      { label: t('nav.experience'), fragment: '#experience' as const },
      { label: t('nav.contact'), fragment: '#contact' as const }
    ]
    return entries.map(({ label, fragment }) => ({
      label,
      to: withFragment(home, fragment),
      external: true,
      active: navActiveReady.value && activeHash.value === fragment
    }))
  })
</script>

<template>
  <UNavigationMenu variant="link" color="primary" :items="navItems" :orientation="orientation" />
</template>
