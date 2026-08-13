<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { landings } = useShowcaseLandings()

const contactTo = computed(() => ({ path: localePath('/'), hash: '#contact' }))
</script>

<template>
  <section class="relative py-16 sm:py-24">
    <UContainer>
      <div class="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <p class="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-primary">
          {{ t('showcase.eyebrow') }}
        </p>
        <h1 class="text-4xl font-bold tracking-tight text-text sm:text-5xl text-balance">
          {{ t('showcase.title') }}
        </h1>
        <p class="mt-4 text-lg text-text-muted">
          {{ t('showcase.description') }}
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ShowcaseLandingCard v-for="landing in landings" :key="landing.id" :landing="landing" />
      </div>

      <div
        class="mt-16 flex flex-col gap-6 rounded-2xl bg-surface px-6 py-8 shadow-sm sm:mt-20 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="max-w-2xl">
          <p class="font-mono text-xs font-medium uppercase tracking-widest text-accent">
            {{ t('showcase.cta.eyebrow') }}
          </p>
          <h2
            class="mt-3 font-heading text-2xl font-bold tracking-tight text-text sm:text-3xl text-balance"
          >
            {{ t('showcase.cta.title') }}
          </h2>
          <p class="mt-3 text-base text-text-muted sm:text-lg">
            {{ t('showcase.cta.description') }}
          </p>
        </div>

        <NuxtLink
          :to="contactTo"
          class="motion-lift inline-flex min-h-11 w-fit shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-accent-hover hover:shadow-md"
        >
          {{ t('showcase.cta.action') }}
          <UIcon name="i-lucide-arrow-right" class="size-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </UContainer>
  </section>
</template>
