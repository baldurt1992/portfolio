<script setup lang="ts">
  import LandingScrollBackdrop from '~/components/ui/LandingScrollBackdrop.vue'
</script>

<template>
  <!-- Sin z-index en el root: evita que todo el `<main>` quede por encima del footer (hermano en `app.vue`). -->
  <div class="relative isolate min-h-screen flex flex-col bg-transparent">
    <LandingScrollBackdrop />
    <div class="relative z-10 flex flex-col">
      <slot />
    </div>
  </div>
</template>
