/**
 * Cicla un índice 0…length-1. Se detiene si el usuario pide menos movimiento.
 */
export function useRotatingIndex(length: MaybeRefOrGetter<number>, intervalMs = 2400) {
  const index = ref(0)

  onMounted(() => {
    const total = () => toValue(length)
    if (total() < 2) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      const n = total()
      if (n < 2) return
      index.value = (index.value + 1) % n
    }, intervalMs)

    onUnmounted(() => window.clearInterval(id))
  })

  return { index }
}
