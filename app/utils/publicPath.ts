import { joinURL } from 'ufo'
import { tryUseNuxtApp } from '#app'

/** Subrutas: en SSR/prerender `import.meta.env.BASE_URL` suele ser `/`; `runtimeConfig.app.baseURL` no. */
export function publicPath(path: string): string {
  const trimmed = path.replace(/^\/+/, '')
  // `useRuntimeConfig()` emite NUXT_E1001 (y spam de nostics) antes del throw.
  // Con `tryUseNuxtApp` leemos el baseURL sin disparar el diagnóstico.
  const baseURL = tryUseNuxtApp()?.$config?.app?.baseURL || import.meta.env.BASE_URL || '/'
  return joinURL(baseURL, trimmed)
}
