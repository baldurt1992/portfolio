<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="text-center max-w-2xl mx-auto">
    <h2 class="text-3xl sm:text-4xl font-bold text-highlighted tracking-tight">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-lg text-muted">
      {{ description }}
    </p>
  </div>
</template>
