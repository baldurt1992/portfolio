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
      { key: 'home', label: t('nav.home'), to: { path: home, hash: '#hero' as const }, fragment: '#hero' as const },
      { key: 'about', label: t('nav.about'), to: { path: home, hash: '#about' as const }, fragment: '#about' as const },
      { key: 'skills', label: t('nav.skills'), to: { path: home, hash: '#technologies' as const }, fragment: '#technologies' as const },
      { key: 'projects', label: t('nav.projects'), to: { path: home, hash: '#projects' as const }, fragment: '#projects' as const },
      { key: 'experience', label: t('nav.experience'), to: { path: home, hash: '#experience' as const }, fragment: '#experience' as const },
      { key: 'contact', label: t('nav.contact'), to: { path: home, hash: '#contact' as const }, fragment: '#contact' as const },
      { key: 'showcase', label: t('nav.showcase'), to: localePath('/showcase') }
    ]
  })
</script>

<template>
  <nav aria-label="Primary">
    <ul :class="[
      'flex gap-0.5',
      props.orientation === 'horizontal' ? 'items-center' : 'flex-col'
    ]">
      <li v-for="item in navItems" :key="item.key">
        <NuxtLink :to="item.to"
          class="hc-nav-link inline-flex shrink-0 items-center whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-seal"
          :class="item.fragment && navActiveReady && activeHash === item.fragment && 'is-active'">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
