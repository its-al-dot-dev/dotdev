export function normalizeBooleanProp<T>(value: T): boolean {
  return value === '' || Boolean(value)
}
