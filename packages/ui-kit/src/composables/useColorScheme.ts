import { type MaybeRefOrGetter, onMounted, onUnmounted, ref, toValue, watch } from 'vue'

export type ColorScheme = 'light' | 'dark' | 'auto'

const STORAGE_KEY = 'color-scheme'

// Глобальное состояние темы (общее для всех вызовов хука)
const scheme = ref<ColorScheme>(
  (typeof window !== 'undefined' && (localStorage.getItem(STORAGE_KEY) as ColorScheme)) || 'auto'
)

function getSystemScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export interface UseColorSchemeOptions {
  /**
   * Элемент, к которому применяется класс.
   * По умолчанию: `document.documentElement` (тег <html>)
   */
  target?: MaybeRefOrGetter<HTMLElement | null | undefined>
  /**
   * Название CSS-класса для тёмной темы.
   * По умолчанию: 'dark'
   */
  darkClass?: string
}

export function useColorScheme(options: UseColorSchemeOptions = {}) {
  const { darkClass = 'dark' } = options

  const getTargetElement = (): HTMLElement | null => {
    if (typeof document === 'undefined') return null
    return toValue(options.target) ?? document.documentElement
  }

  const update = () => {
    const el = getTargetElement()
    if (!el) return

    const effectiveScheme = scheme.value === 'auto' ? getSystemScheme() : scheme.value
    const isDark = effectiveScheme === 'dark'

    // Добавляет или удаляет класс в зависимости от темы
    el.classList.toggle(darkClass, isDark)
  }

  // Следим за изменением схемы и самого target-элемента
  watch(
    [scheme, () => toValue(options.target)],
    ([newScheme]) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, newScheme)
      }
      update()
    },
    { immediate: true }
  )

  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemChange = () => {
      if (scheme.value === 'auto') {
        update()
      }
    }

    mediaQuery.addEventListener('change', handleSystemChange)

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleSystemChange)
    })
  })

  return {
    scheme,
  }
}
