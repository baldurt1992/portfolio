import { useIntersectionObserver, usePreferredReducedMotion } from '@vueuse/core'

/**
 * Reveal al entrar en viewport: IO estable (VueUse) + sync si ya está visible al montar.
 * Respeta prefers-reduced-motion.
 * `allowConceal` evita opacity-0 en el primer paint del cliente para alinear hidratación con SSR.
 */
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
