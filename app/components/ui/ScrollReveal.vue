<script setup lang="ts">
const { target, visible } = useScrollReveal()
</script>

<template>
  <div
    ref="target"
    class="scroll-reveal"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
  >
    <slot />
  </div>
</template>
