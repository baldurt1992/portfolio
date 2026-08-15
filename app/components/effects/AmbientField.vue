<script setup lang="ts">
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  const { init, cleanup } = useAmbientWebglScene(canvasRef)

  onMounted(() => {
    nextTick(init)
  })

  onUnmounted(cleanup)
</script>

<template>
  <canvas ref="canvasRef"
    class="pointer-events-none block h-full w-full opacity-55 mix-blend-multiply dark:opacity-70 dark:mix-blend-screen"
    aria-hidden="true" />
</template>
