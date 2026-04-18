<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      description?: string
      /** Etiqueta pequeña encima del título (ej. sección). */
      eyebrow?: string
      id?: string
      /**
       * Si true (default), el encabezado usa max-w-2xl centrado.
       * En false, ocupa el ancho del padre (útil cuando padre y cuerpo comparten la misma max-width).
       */
      contained?: boolean
      /** Alineación del texto: center para bloques centrados; start para columna editorial (desktop). */
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
