import { useThrottleFn } from '@vueuse/core'

const SECTION_HASHES = [
  '#hero',
  '#about',
  '#skills',
  '#projects',
  '#experience',
  '#contact'
] as const

type SectionHash = (typeof SECTION_HASHES)[number]

function isLandingHash(h: string): h is SectionHash {
  return (SECTION_HASHES as readonly SectionHash[]).includes(h as SectionHash)
}

export function useLandingNavActive() {
  const route = useRoute()
  const activeHash = ref<SectionHash>(SECTION_HASHES[0])
  // SSR sin #fragment: diff de active 1er paint; hasta onMounted no aplicamos active en el nav
  const navActiveReady = ref(false)

  function computeActiveFromScroll() {
    if (import.meta.server) {
      return
    }
    const offsetPx = 100
    let current: SectionHash = SECTION_HASHES[0]
    for (const hash of SECTION_HASHES) {
      const el = document.querySelector(hash)
      if (!el) {
        continue
      }
      if (el.getBoundingClientRect().top <= offsetPx) {
        current = hash
      }
    }
    activeHash.value = current
  }

  function syncHashFromRoute() {
    const h = route.hash
    if (h && isLandingHash(h)) {
      activeHash.value = h
    }
  }

  const throttled = useThrottleFn(computeActiveFromScroll, 80)

  watch(
    () => route.hash,
    () => {
      syncHashFromRoute()
      if (import.meta.client) {
        nextTick(() => computeActiveFromScroll())
      }
    },
    { immediate: true }
  )

  onMounted(() => {
    syncHashFromRoute()
    computeActiveFromScroll()
    navActiveReady.value = true
    window.addEventListener('scroll', throttled, { passive: true })
    window.addEventListener('resize', throttled)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', throttled)
    window.removeEventListener('resize', throttled)
  })

  return { activeHash, navActiveReady }
}
