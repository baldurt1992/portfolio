<script setup lang="ts">
  const { t } = useI18n()
  const { landings } = useShowcaseLandings()
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
    </UContainer>
  </section>
</template>
