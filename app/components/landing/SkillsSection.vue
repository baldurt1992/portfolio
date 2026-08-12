<script setup lang="ts">
  const { t } = useI18n()
  const portfolioData = usePortfolioData()

  const sectionRef = ref<HTMLElement | null>(null)
  const gridRef = ref<HTMLElement | null>(null)

  const categories = computed(() => {
    const cats: { key: string; icon: string; items: string[] }[] = []
    const groups: Record<string, string[]> = {
      frontend: [],
      backend: [],
      wordpress: [],
      devops: []
    }
    for (const skill of portfolioData.value.skills) {
      const list = groups[skill.category] ?? []
      list.push(skill.name)
      groups[skill.category] = list
    }

    const order = ['frontend', 'backend', 'wordpress', 'devops'] as const
    const icons: Record<string, string> = {
      frontend: 'i-lucide-layout',
      backend: 'i-lucide-server',
      wordpress: 'i-simple-icons-wordpress',
      devops: 'i-lucide-cloud'
    }

    for (const key of order) {
      const items = groups[key]
      if (items && items.length > 0) {
        cats.push({ key, icon: icons[key] ?? 'i-lucide-code', items })
      }
    }
    return cats
  })

  useGsapInViewReveal(sectionRef, '.skill-card', {
    y: 24,
    duration: 0.5,
    stagger: 0.07,
    logTag: 'SkillsSection',
    triggerRef: gridRef
  })
</script>

<template>
  <section id="technologies" ref="sectionRef" class="relative px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36">
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 space-y-4 text-center sm:mb-16">
        <p class="font-mono text-sm font-medium uppercase tracking-widest text-accent">
          {{ t('skills.eyebrow') }}
        </p>
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
          {{ t('skills.title') }}
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-text-muted">
          {{ t('skills.description') }}
        </p>
      </div>

      <div ref="gridRef" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="category in categories" :key="category.key" class="skill-card h-full">
          <div
            class="group relative flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-5 shadow-sm transition-[color,box-shadow,border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg">
            <div class="mb-4 flex items-center gap-3">
              <span
                class="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent ring-1 ring-accent/20 transition-colors group-hover:bg-accent group-hover:text-slate-900">
                <UIcon :name="category.icon" class="size-5" aria-hidden="true" />
              </span>
              <h3 class="text-base font-semibold text-text">
                {{ t(`skills.category.${category.key}`) }}
              </h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="item in category.items" :key="item"
                class="inline-flex rounded-full bg-surface px-2.5 py-1 text-xs font-medium text-text-muted ring-1 ring-border transition-colors group-hover:bg-bg">
                {{ item }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
