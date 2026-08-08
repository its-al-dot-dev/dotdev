import { type MaybeRefOrGetter, onUnmounted, ref, toValue } from 'vue'

type UseTypeaheadOptions<T> = {
  options: MaybeRefOrGetter<T[]>
  getLabel: (option: T) => string
  isDisabled?: (option: T) => boolean
  getCurrentIndex?: () => number
  timeout?: number
  onMatch: (index: number) => void
}

export function useTypeahead<T>({
  options,
  getLabel,
  isDisabled = () => false,
  getCurrentIndex = () => -1,
  timeout = 500,
  onMatch,
}: UseTypeaheadOptions<T>) {
  const searchQuery = ref('')

  let timer: ReturnType<typeof setTimeout> | undefined

  function reset() {
    searchQuery.value = ''

    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }

  function isMatch(option: T) {
    if (isDisabled(option)) {
      return false
    }

    return getLabel(option).toLowerCase().startsWith(searchQuery.value)
  }

  function findMatch() {
    const startIndex = getCurrentIndex()
    const normalizeOptions = toValue(options)

    for (let index = startIndex + 1; index < normalizeOptions.length; index++) {
      if (isMatch(normalizeOptions[index])) {
        return index
      }
    }

    for (let index = 0; index <= startIndex; index++) {
      if (isMatch(normalizeOptions[index])) {
        return index
      }
    }

    return -1
  }

  function search(key: string) {
    if (key.length !== 1) {
      return
    }

    searchQuery.value += key.toLowerCase()

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(reset, timeout)

    const index = findMatch()

    if (index !== -1) {
      onMatch(index)
    }
  }

  onUnmounted(reset)

  return {
    search,
    reset,
    searchQuery,
  }
}
