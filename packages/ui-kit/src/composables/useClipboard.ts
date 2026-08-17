import { type MaybeRef, onScopeDispose, ref, toValue } from 'vue'

interface UseClipboardOptions {
  copiedDuration?: number
}

export function useClipboard(source?: MaybeRef<string | null | undefined>, options: UseClipboardOptions = {}) {
  const { copiedDuration = 2000 } = options

  const pending = ref(false)
  const copied = ref(false)
  const error = ref<Error | null>(null)

  let copiedTimeout: ReturnType<typeof setTimeout> | null = null

  const isSupported = typeof navigator !== 'undefined' && !!navigator.clipboard

  function clearCopiedTimeout() {
    if (copiedTimeout) {
      clearTimeout(copiedTimeout)
      copiedTimeout = null
    }
  }

  async function copy(value?: string) {
    if (pending.value) return false

    if (!isSupported) {
      error.value = new Error('Clipboard API is not supported')
      return false
    }

    const text = value ?? toValue(source) ?? ''

    pending.value = true
    error.value = null

    try {
      await navigator.clipboard.writeText(text)

      clearCopiedTimeout()

      copied.value = true

      copiedTimeout = setTimeout(() => {
        copied.value = false
      }, copiedDuration)

      return true
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Failed to copy text')

      return false
    } finally {
      pending.value = false
    }
  }

  onScopeDispose(() => {
    clearCopiedTimeout()
  })

  return {
    copy,
    pending,
    copied,
    error,
    isSupported,
  }
}
