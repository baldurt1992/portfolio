<script setup lang="ts">
  withDefaults(
    defineProps<{
      title: string
      meta?: string
      credit?: boolean
    }>(),
    { credit: false }
  )
</script>

<template>
  <div class="hc-titlebar">
    <span class="hc-titlebar-dots" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
    <span class="hc-titlebar-label">{{ title }}</span>
    <span v-if="meta" class="hc-titlebar-meta">{{ meta }}</span>
    <span v-if="credit" class="hc-credit" aria-hidden="true">CREDIT</span>
  </div>
</template>
