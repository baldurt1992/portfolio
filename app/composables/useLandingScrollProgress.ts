import { useEventListener, useWindowScroll, useWindowSize } from '@vueuse/core'

export function useLandingScrollProgress() {
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  const layoutVersion = ref(0)

  const bumpLayout = () => {
    layoutVersion.value++
  }

  let raf = 0
  const scheduleBump = () => {
    if (typeof window === 'undefined') return
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      bumpLayout()
    })
  }

  useEventListener(window, 'resize', scheduleBump)

  onMounted(() => {
    bumpLayout()
    const ro = new ResizeObserver(scheduleBump)
    ro.observe(document.documentElement)
    onUnmounted(() => {
      ro.disconnect()
      if (raf) cancelAnimationFrame(raf)
    })
  })

  const progress = computed(() => {
    const layoutEpoch = layoutVersion.value
    const scrollY = y.value
    const viewportH = height.value
    if (import.meta.server) return 0
    const max = Math.max(1, document.documentElement.scrollHeight - viewportH)
    const p = Math.min(1, Math.max(0, scrollY / max))
    return layoutEpoch >= 0 ? p : 0
  })

  const easedProgress = computed(() => {
    const t = progress.value
    return t * t * (3 - 2 * t)
  })

  return { progress, easedProgress }
}
