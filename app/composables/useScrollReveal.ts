import { useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core'

// allowConceal: no opacity-0 en 1er paint cliente si el bloque ya intersecta (SSR mostró visible)
export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const { threshold = 0, rootMargin = '0px' } = options ?? {}
  const target = ref<HTMLElement | null>(null)
  const motion = usePreferredReducedMotion()
  const revealed = shallowRef(false)
  const allowConceal = shallowRef(false)

  const prefersReduced = computed(() => motion.value === 'reduce')

  useIntersectionObserver(
    target,
    ([entry]) => {
      if (entry?.isIntersecting) revealed.value = true
    },
    { threshold, rootMargin }
  )

  onMounted(() => {
    if (prefersReduced.value) {
      revealed.value = true
      allowConceal.value = true
      return
    }
    nextTick(() => {
      const el = target.value
      if (!el) {
        allowConceal.value = true
        return
      }
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      if (r.top < vh && r.bottom > 0) revealed.value = true
      requestAnimationFrame(() => {
        allowConceal.value = true
      })
    })
  })

  const visible = computed(() => {
    if (import.meta.server) return true
    if (!allowConceal.value) return true
    return prefersReduced.value || revealed.value
  })

  return { target, visible }
}
