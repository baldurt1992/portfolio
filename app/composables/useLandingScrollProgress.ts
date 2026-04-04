import { useEventListener, useWindowScroll, useWindowSize } from '@vueuse/core'

/** Progreso de scroll 0–1 sobre el documento (cliente); reacciona a resize y cambios de altura del layout. */
export function useLandingScrollProgress() {
  const { y } = useWindowScroll()
  const { height } = useWindowSize()
  const layoutVersion = ref(0)

  const bumpLayout = () => {
    layoutVersion.value++
  }

  /** Un repintado por frame: evita picos con ResizeObserver al hacer scroll / cargar imágenes. */
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
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - viewportH
    )
    const p = Math.min(1, Math.max(0, scrollY / max))
    return layoutEpoch >= 0 ? p : 0
  })

  /** Smoothstep para transiciones más suaves entre tintes. */
  const easedProgress = computed(() => {
    const t = progress.value
    return t * t * (3 - 2 * t)
  })

  return { progress, easedProgress }
}
