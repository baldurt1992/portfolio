<script setup lang="ts">
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const colorMode = useColorMode()
  const { init, cleanup } = useAmbientWebglScene(canvasRef)

  const isDark = computed(() => colorMode.value === 'dark')

  onMounted(() => {
    nextTick(init)
  })

  onUnmounted(cleanup)
</script>

<template>
  <canvas ref="canvasRef" class="pointer-events-none block h-full w-full"
    :class="isDark ? 'opacity-70 mix-blend-screen' : 'opacity-55 mix-blend-multiply'" aria-hidden="true" />
</template>
