<script setup lang="ts">
const { setTarget, isVisible } = useScrollReveal()
</script>

<template>
  <div
    :ref="setTarget"
    class="scroll-reveal"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
  >
    <slot />
  </div>
</template>
