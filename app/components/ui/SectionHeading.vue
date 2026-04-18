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
    { contained: true, align: 'center' }
  )
</script>

<template>
  <div :class="[
    contained && 'max-w-2xl mx-auto',
    align === 'center' && 'text-center',
    align === 'start' && 'text-center md:text-start'
  ]">
    <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
      {{ eyebrow }}
    </p>
    <h2 :id="id" class="text-3xl sm:text-4xl font-bold text-highlighted tracking-tight text-balance">
      {{ title }}
    </h2>
    <p v-if="description" :class="[
      'mt-4 text-lg text-muted text-pretty',
      align === 'start' && 'md:max-w-prose'
    ]">
      {{ description }}
    </p>
  </div>
</template>
