<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      description?: string
      eyebrow?: string
      id?: string
      contained?: boolean
      align?: 'center' | 'start'
    }>(),
    { contained: true, align: 'start' }
  )
</script>

<template>
  <div :class="[
    'space-y-4',
    contained && 'max-w-3xl',
    align === 'center' && 'mx-auto text-center'
  ]">
    <div class="space-y-3">
      <p v-if="eyebrow" class="font-mono text-xs font-medium uppercase tracking-widest text-primary">
        {{ eyebrow }}
      </p>
      <h2 :id="id" class="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl text-balance">
        {{ title }}
      </h2>
    </div>
    <p v-if="description" :class="[
      'text-base sm:text-lg text-text-muted leading-relaxed text-pretty max-w-prose',
      align === 'center' && 'mx-auto'
    ]">
      {{ description }}
    </p>
  </div>
</template>
