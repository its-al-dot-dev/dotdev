import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'

export type CodeLoader = string | (() => Promise<string | { default: string }>)

export function useCodeLoader(source: MaybeRefOrGetter<CodeLoader | string | undefined>) {
  const rawCode = ref('')
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  async function loadCode() {
    const val = toValue(source)

    if (!val) {
      rawCode.value = ''
      return
    }

    isLoading.value = true
    error.value = null

    try {
      if (typeof val === 'function') {
        const res = await val()
        rawCode.value = typeof res === 'string' ? res : res.default
      } else {
        rawCode.value = val
      }
    } catch (err) {
      console.error('[useCodeLoader] Failed to load code:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      rawCode.value = ''
    } finally {
      isLoading.value = false
    }
  }

  watch(() => toValue(source), loadCode, { immediate: true })

  return {
    rawCode,
    isLoading,
    error,
    reload: loadCode,
  }
}
