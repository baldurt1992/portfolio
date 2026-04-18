<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'
  import { withoutHash } from '~/utils/withoutHash'

  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>()

  const { t } = useI18n()
  const localePath = useLocalePath()
  const { activeHash, navActiveReady } = useLandingNavActive()

  // NuxtLink + hash: `external` evita #fragment distinto SSR/cliente
  const navItems = computed<NavigationMenuItem[]>(() => {
    const base = withoutHash(localePath('/'))
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
      to: `${base}${fragment}`,
      external: true,
      active: navActiveReady.value && activeHash.value === fragment
    }))
  })
</script>

<template>
  <UNavigationMenu variant="link" color="primary" :items="navItems" :orientation="orientation" />
</template>
