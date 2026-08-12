<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      orientation?: 'horizontal' | 'vertical'
    }>(),
    {
      orientation: 'horizontal'
    }
  )

  defineEmits<{
    click: []
  }>()

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
      { key: 'contact', label: t('nav.contact'), to: { path: home, hash: '#contact' as const }, fragment: '#contact' as const }
    ]
  })
</script>

<template>
  <nav aria-label="Primary">
    <ul :class="[
      'flex',
      props.orientation === 'horizontal' ? 'items-center gap-1' : 'flex-col gap-1'
    ]">
      <li v-for="item in navItems" :key="item.key">
        <NuxtLink :to="item.to"
          class="relative inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-text-muted outline-none transition-colors hover:bg-surface-soft hover:text-text focus-visible:ring-2 focus-visible:ring-primary/50"
          :class="item.fragment && navActiveReady && activeHash === item.fragment && 'bg-primary-soft text-primary hover:bg-primary/20 hover:text-primary'"
          @click="$emit('click')">
          {{ item.label }}
          <span v-if="item.fragment && navActiveReady && activeHash === item.fragment"
            class="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary" aria-hidden="true" />
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
