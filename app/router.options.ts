import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        let attempts = 0
        const maxAttempts = 50
        const tryScroll = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve({ el: to.hash, behavior: 'smooth' })
          } else if (attempts++ < maxAttempts) {
            requestAnimationFrame(tryScroll)
          } else {
            resolve({ top: 0 })
          }
        }
        setTimeout(tryScroll, 50)
      })
    }
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
}
