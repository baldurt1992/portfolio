<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      orientation?: 'horizontal' | 'vertical'
    }>(),
    {
      orientation: 'horizontal'
    }
  )

  const { t } = useI18n()
  const localePath = useLocalePath()
  const { activeHash, navActiveReady } = useLandingNavActive()

  const navItems = computed(() => {
    const home = localePath('/')

    return [
      { label: t('nav.home'), to: { path: home, hash: '#hero' as const }, fragment: '#hero' as const },
      { label: t('nav.about'), to: { path: home, hash: '#about' as const }, fragment: '#about' as const },
      { label: t('nav.skills'), to: { path: home, hash: '#technologies' as const }, fragment: '#technologies' as const },
      { label: t('nav.projects'), to: { path: home, hash: '#projects' as const }, fragment: '#projects' as const },
      { label: t('nav.experience'), to: { path: home, hash: '#experience' as const }, fragment: '#experience' as const },
      { label: t('nav.contact'), to: { path: home, hash: '#contact' as const }, fragment: '#contact' as const }
    ]
  })
</script>

<template>
  <nav aria-label="Primary">
    <ul :class="[
      'flex gap-1.5',
      props.orientation === 'horizontal' ? 'items-center' : 'flex-col'
    ]">
      <li v-for="item in navItems" :key="item.fragment">
        <NuxtLink
          :to="item.to"
          :class="[
            'inline-flex shrink-0 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default',
            navActiveReady && activeHash === item.fragment
              ? 'text-primary bg-primary/10'
              : 'text-muted hover:text-highlighted hover:bg-default/70'
          ]"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
