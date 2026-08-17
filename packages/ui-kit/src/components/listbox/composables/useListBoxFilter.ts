import { computed, type MaybeRefOrGetter, ref, toValue } from 'vue'

export function useListBoxFilter<T>(options: MaybeRefOrGetter<T[]>, filter?: (option: T, query: string) => boolean) {
  filter = filter ? filter : (option, query) => String(option).toLowerCase().includes(query.toLowerCase())
  const listbox = ref<any>(null)
  const query = ref('')
  const isFocused = ref(false)

  const filteredOptions = computed(() => {
    if (!query.value) return toValue(options)
    return toValue(options).filter((option) => filter(option, query.value))
  })

  function onFocus() {
    isFocused.value = true
    listbox?.value?.focusIn(0)
  }

  function onBlur() {
    isFocused.value = false
    listbox?.value?.focusOut()
  }

  return {
    query,
    filteredOptions,
    isFocused,
    inputBindings: {
      onFocus,
      onBlur,
    },
    listboxBindings: computed(() => ({
      ref: listbox,
      options: filteredOptions.value,
      typeahead: !isFocused.value,
    })),
  }
}
