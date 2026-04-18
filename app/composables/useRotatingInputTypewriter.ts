import { usePreferredReducedMotion } from '@vueuse/core'
import { onBeforeUnmount, onMounted, ref, toValue, watch } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function useRotatingInputTypewriter(
  tokensSource: MaybeRefOrGetter<string[]>,
  options: {
    typeCharMs?: number
    deleteCharMs?: number
    pauseAfterTypedMs?: number
    pauseAfterClearedMs?: number
    pauseBetweenCyclesMs?: number
  } = {}
) {
  const displayed = ref('')
  const reduceMotion = usePreferredReducedMotion()

  let runId = 0

  const typeCharMs = options.typeCharMs ?? 42
  const deleteCharMs = options.deleteCharMs ?? 32
  const pauseAfterTypedMs = options.pauseAfterTypedMs ?? 900
  const pauseAfterClearedMs = options.pauseAfterClearedMs ?? 280
  const pauseBetweenCyclesMs = options.pauseBetweenCyclesMs ?? 700

  function startLoop() {
    runId += 1
    const id = runId

    ;(async () => {
      const raw = toValue(tokensSource) ?? []
      const tokens = raw.map((s) => s.trim()).filter(Boolean)

      if (!tokens.length) {
        displayed.value = ''
        return
      }

      if (reduceMotion.value === 'reduce') {
        displayed.value = tokens[0] ?? ''
        return
      }

      while (id === runId) {
        for (const word of tokens) {
          if (id !== runId) {
            return
          }

          displayed.value = ''

          for (let i = 0; i < word.length; i++) {
            if (id !== runId) {
              return
            }
            displayed.value += word[i]
            await delay(typeCharMs)
          }

          if (id !== runId) {
            return
          }
          await delay(pauseAfterTypedMs)

          while (displayed.value.length > 0 && id === runId) {
            displayed.value = displayed.value.slice(0, -1)
            await delay(deleteCharMs)
          }

          if (id !== runId) {
            return
          }
          await delay(pauseAfterClearedMs)
        }

        if (id !== runId) {
          return
        }
        await delay(pauseBetweenCyclesMs)
      }
    })()
  }

  onMounted(() => {
    startLoop()
    watch(
      () => [toValue(tokensSource), reduceMotion.value] as const,
      () => startLoop()
    )
  })

  onBeforeUnmount(() => {
    runId += 1
  })

  return { displayed }
}
