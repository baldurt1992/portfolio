<script setup lang="ts">
  const props = defineProps<{
    preview: 'fintech' | 'placeholder'
  }>()

  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let resizeObserver: ResizeObserver | null = null

  function drawFintech(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.fillStyle = '#F3F0EB'
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = '#E8E4DD'
    ctx.fillRect(w * 0.06, h * 0.18, w * 0.44, 3)
    ctx.fillStyle = '#D6D0C4'
    ctx.fillRect(w * 0.06, h * 0.28, w * 0.34, 2)

    ctx.fillStyle = '#FFFFFF'
    ctx.strokeStyle = '#E8E4DD'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(w * 0.06, h * 0.46, w * 0.56, h * 0.38, 8)
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = '#111111'
    ctx.font = `${h * 0.07}px Karla, ui-sans-serif, system-ui, sans-serif`
    ctx.fillText('$284,930.42', w * 0.1, h * 0.6)

    ctx.fillStyle = '#88837C'
    const fs = h * 0.04
    ctx.font = `${fs}px Karla, ui-sans-serif, system-ui, sans-serif`
    ctx.fillText('Saldo total', w * 0.1, h * 0.54)

    ctx.fillStyle = '#E8E4DD'
    ctx.beginPath()
    ctx.arc(w * 0.62, h * 0.54, fs * 3.2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = '#D6D0C4'
    ctx.beginPath()
    ctx.roundRect(w * 0.68, h * 0.16, w * 0.26, h * 0.24, 8)
    ctx.fill()

    ctx.strokeStyle = '#E8E4DD'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.roundRect(w * 0.68, h * 0.46, w * 0.26, h * 0.38, 8)
    ctx.stroke()

    ctx.fillStyle = '#111111'
    ctx.font = `bold ${fs * 1.1}px Karla, ui-sans-serif, system-ui, sans-serif`
    ctx.fillText('91,440', w * 0.72, h * 0.58)

    ctx.fillStyle = '#88837C'
    ctx.font = `${fs}px Karla, ui-sans-serif, system-ui, sans-serif`
    ctx.fillText('Disponible', w * 0.72, h * 0.54)

    ctx.fillStyle = '#D6D0C4'
    ctx.fillRect(w * 0.1, h * 0.89, w * 0.32, 3)
    ctx.fillStyle = '#E8E4DD'
    ctx.fillRect(w * 0.44, h * 0.89, w * 0.2, 3)
  }

  function drawPlaceholder(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.fillStyle = '#F3F0EB'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#E8E4DD'
    ctx.fillRect(w * 0.1, h * 0.4, w * 0.8, h * 0.2)
  }

  function draw() {
    const canvas = canvasRef.value
    if (!canvas || import.meta.server) return
    const parent = canvas.parentElement
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = Math.max(1, Math.floor(rect.width * dpr))
    canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)
    const w = rect.width
    const h = rect.height
    if (props.preview === 'fintech') {
      drawFintech(ctx, w, h)
    } else {
      drawPlaceholder(ctx, w, h)
    }
  }

  onMounted(() => {
    draw()
    if (import.meta.client && typeof ResizeObserver !== 'undefined' && canvasRef.value?.parentElement) {
      resizeObserver = new ResizeObserver(() => draw())
      resizeObserver.observe(canvasRef.value.parentElement)
    }
  })

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
  })
</script>

<template>
  <ClientOnly>
    <canvas ref="canvasRef" class="block h-full w-full" aria-hidden="true" />
  </ClientOnly>
</template>
