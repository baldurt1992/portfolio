import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

let scriptPromise: Promise<void> | null = null

function ensureTurnstileScript(): Promise<void> {
  if (import.meta.server) return Promise.resolve()
  if (typeof window === 'undefined') return Promise.resolve()
  if (window.turnstile) return Promise.resolve()

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const el = document.createElement('script')
      el.src = SCRIPT_SRC
      el.async = true
      el.defer = true
      el.onload = () => resolve()
      el.onerror = () => {
        scriptPromise = null
        reject(new Error('[Turnstile] script load failed'))
      }
      document.head.appendChild(el)
    })
  }

  return scriptPromise
}

/**
 * Widget Turnstile (cliente): monta el script, renderiza en `containerRef` y expone el token.
 * Si `siteKey` está vacío, no hace nada.
 */
export function useTurnstileWidget(siteKey: MaybeRefOrGetter<string>) {
  const containerRef = ref<HTMLElement | null>(null)
  const token = ref<string | null>(null)
  const scriptFailed = ref(false)
  let widgetId: string | undefined

  function teardownWidget() {
    if (import.meta.server) return
    if (widgetId && window.turnstile) {
      try {
        window.turnstile.remove(widgetId)
      } catch {
        /* ignore */
      }
      widgetId = undefined
    }
    token.value = null
  }

  watch(
    [containerRef, () => toValue(siteKey)],
    async () => {
      if (import.meta.server) return

      teardownWidget()

      const el = containerRef.value
      const key = toValue(siteKey)?.trim()
      if (!el || !key) return

      try {
        await ensureTurnstileScript()
      } catch {
        scriptFailed.value = true
        return
      }

      if (!window.turnstile) {
        scriptFailed.value = true
        return
      }

      scriptFailed.value = false
      widgetId = window.turnstile.render(el, {
        sitekey: key,
        theme: 'dark',
        callback: (t: string) => {
          token.value = t
        },
        'error-callback': () => {
          token.value = null
        },
        'expired-callback': () => {
          token.value = null
        }
      })
    },
    { immediate: true, flush: 'post' }
  )

  onUnmounted(() => {
    teardownWidget()
  })

  function reset() {
    token.value = null
    if (import.meta.server) return
    if (widgetId && window.turnstile) {
      try {
        window.turnstile.reset(widgetId)
      } catch {
        /* ignore */
      }
    }
  }

  return {
    containerRef,
    token,
    scriptFailed,
    reset
  }
}
