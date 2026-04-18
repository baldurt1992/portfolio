import { joinURL } from 'ufo'

/** Subrutas: en SSR/prerender `import.meta.env.BASE_URL` suele ser `/`; `runtimeConfig.app.baseURL` no. */
export function publicPath(path: string): string {
  const trimmed = path.replace(/^\/+/, '')
  try {
    const { app } = useRuntimeConfig()
    return joinURL(app.baseURL || '/', trimmed)
  } catch {
    return joinURL(import.meta.env.BASE_URL || '/', trimmed)
  }
}
