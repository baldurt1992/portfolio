<script setup lang="ts">
  import LandingScrollBackdrop from '~/components/ui/LandingScrollBackdrop.vue'
</script>

<template>
  <div class="relative z-1 isolate min-h-screen flex flex-col">
    <LandingScrollBackdrop />
    <slot />
  </div>
</template>
