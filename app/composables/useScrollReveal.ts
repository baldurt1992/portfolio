export function useScrollReveal(options?: { threshold?: number; rootMargin?: string }) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const { threshold = 0.1, rootMargin = '0px 0px -80px 0px' } = options ?? {}

  const setTarget = (el: unknown) => {
    observer?.disconnect()
    observer = null
    const target = el instanceof Element ? el : null
    if (!target) return
    observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.value = entry?.isIntersecting ?? false
      },
      { threshold, rootMargin }
    )
    observer.observe(target)
  }

  onBeforeUnmount(() => observer?.disconnect())

  return { setTarget, isVisible }
}
