<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      description?: string
      eyebrow?: string
      id?: string
      contained?: boolean
      align?: 'center' | 'start'
      lot?: string
    }>(),
    { contained: true, align: 'start' }
  )
</script>

<template>
  <div :class="[
    'manifest-section-head',
    contained && 'max-w-3xl',
    align === 'center' && 'mx-auto text-center',
    align === 'start' && 'text-start'
  ]">
    <UiStackTitleBar :title="lot ? `${lot} · ${title}` : title" :meta="eyebrow" />
    <div class="manifest-section-head-body space-y-3">
      <h2 :id="id" class="manifest-display text-3xl sm:text-4xl md:text-5xl text-highlighted text-balance">
        {{ title }}
      </h2>
      <p v-if="description" :class="[
        'text-base sm:text-lg text-muted text-pretty max-w-prose',
        align === 'center' && 'mx-auto'
      ]">
        {{ description }}
      </p>
    </div>
  </div>
</template>
