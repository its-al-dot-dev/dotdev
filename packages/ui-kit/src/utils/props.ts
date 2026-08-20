import type { Ref } from 'vue'

export function normalizeBooleanProp<T>(value: T): boolean {
  return value === '' || Boolean(value)
}

// need for resolve useUiKitProps in template when props have generics
export function asTemplateRef<T>(value: T) {
  return value as Ref<T>
}
