import { type MaybeRefOrGetter, type Ref, toValue } from 'vue'

export interface ArrayModelConfig<T, L, V, M> {
  options: T[]
  labelKey?: L
  valueKey?: V
  multiple?: M
  deselectable?: boolean
  disabled?: boolean
  optionDisabled?: (option: T) => boolean
}

export interface ArrayModelOptions<T> {
  valueKey?: MaybeRefOrGetter<keyof T | undefined>
  multiple?: MaybeRefOrGetter<boolean>
  deselectable?: MaybeRefOrGetter<boolean>
}

export function useArrayModel<T>(model: Ref<T[] | T | undefined>, options: ArrayModelOptions<T>) {
  const { valueKey, multiple = false, deselectable = false } = options

  const equals = (a: T, b: T) => {
    const key = toValue(valueKey)

    if (key) return a[key] === b[key]

    return Object.is(a, b)
  }

  const isSelected = (item: T) => {
    if (toValue(multiple)) {
      return Array.isArray(model.value) ? model.value.some((value) => equals(value, item)) : false
    }

    return model.value != null && !Array.isArray(model.value) && equals(model.value, item)
  }

  const select = (item: T) => {
    if (toValue(multiple)) {
      const values = Array.isArray(model.value) ? model.value : []

      if (!values.some((value) => equals(value, item))) {
        model.value = [...values, item]
      }

      return
    }

    model.value = item
  }

  const unselect = (item: T) => {
    if (toValue(multiple)) {
      if (!Array.isArray(model.value)) return

      model.value = model.value.filter((value) => !equals(value, item))
      return
    }

    if (!toValue(deselectable)) return

    if (model.value != null && !Array.isArray(model.value) && equals(model.value, item)) {
      model.value = undefined
    }
  }

  const toggle = (item: T) => {
    isSelected(item) ? unselect(item) : select(item)
  }

  return {
    isSelected,
    select,
    unselect,
    toggle,
  }
}
