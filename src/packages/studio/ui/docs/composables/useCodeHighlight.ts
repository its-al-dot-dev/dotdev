import { type MaybeRefOrGetter, ref, toValue, watch } from 'vue'
import { codeToHtml } from 'shiki'

interface UseCodeHighlightOptions {
  lang?: string
  themes?: { light: string; dark: string }
}

export function useCodeHighlight(
  codeSource: MaybeRefOrGetter<string | undefined>,
  options: UseCodeHighlightOptions = {}
) {
  const htmlCode = ref('')
  const isHighlighting = ref(false)
  const error = ref<Error | null>(null)

  const lang = options.lang ?? 'vue'
  const themes = options.themes ?? { light: 'github-light', dark: 'github-dark' }

  async function highlight() {
    const code = toValue(codeSource)?.trim()

    if (!code) {
      htmlCode.value = ''
      return
    }

    isHighlighting.value = true
    error.value = null

    try {
      htmlCode.value = await codeToHtml(code, {
        lang,
        themes,
        defaultColor: false,
      }).then()
    } catch (err) {
      console.error('[useCodeHighlight] Error highlighting code:', err)
      error.value = err instanceof Error ? err : new Error(String(err))
      htmlCode.value = ''
    } finally {
      isHighlighting.value = false
    }
  }

  watch(() => toValue(codeSource), highlight, { immediate: true })

  return {
    htmlCode,
    isHighlighting,
    error,
    highlight,
  }
}
