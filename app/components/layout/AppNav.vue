<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui'
  import { withoutHash } from '~/utils/withoutHash'

  defineProps<{
    orientation?: 'horizontal' | 'vertical'
  }>()

  const { t } = useI18n()
  const localePath = useLocalePath()

  /** `external: true` evita que RouterLink recorte el `#fragment` en SSR → mismatch de hidratación. */
  const navItems = computed<NavigationMenuItem[]>(() => {
    const base = withoutHash(localePath('/'))
    return [
      { label: t('nav.home'), to: `${base}#hero`, external: true },
      { label: t('nav.about'), to: `${base}#about`, external: true },
      { label: t('nav.skills'), to: `${base}#skills`, external: true },
      { label: t('nav.projects'), to: `${base}#projects`, external: true },
      { label: t('nav.experience'), to: `${base}#experience`, external: true },
      { label: t('nav.contact'), to: `${base}#contact`, external: true }
    ]
  })
</script>

<template>
  <UNavigationMenu variant="link" color="primary" :items="navItems" :orientation="orientation" />
</template>
