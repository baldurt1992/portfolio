import type { Composer } from 'vue-i18n'

type RtFn = Composer['rt']

function asRtInput(v: unknown): Parameters<RtFn>[0] {
  return v as Parameters<RtFn>[0]
}

function isIntlifyMessageNode(o: object): o is Record<string, unknown> {
  const x = o as Record<string, unknown>
  return typeof x.type === 'number' && x.body != null && typeof x.body === 'object'
}

// tm() devuelve nodos Intlify; rt() los convierte a string para la UI
export function resolveTmTree<T>(value: T, rt: RtFn): T {
  if (value == null) return value
  const t = typeof value
  if (t === 'string' || t === 'number' || t === 'boolean') return value
  if (Array.isArray(value)) {
    return value.map((item) => resolveTmTree(item, rt)) as T
  }
  if (t === 'object') {
    const o = value as Record<string, unknown>
    if (isIntlifyMessageNode(o)) {
      return rt(asRtInput(o)) as T
    }
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(o)) {
      out[k] = resolveTmTree(v, rt)
    }
    return out as T
  }
  return rt(asRtInput(value)) as T
}
