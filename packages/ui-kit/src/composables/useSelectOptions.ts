export function useSelectOptions<T, L extends keyof T = keyof T, V extends keyof T = keyof T>(
  labelKey?: L,
  valueKey?: V
) {
  function getOptionLabel(option: T | undefined | null): string {
    if (option === null || option === undefined) return ''

    if (labelKey && typeof option === 'object') {
      return String(option[labelKey])
    }

    return String(option)
  }

  function getOptionKey(option: T, index: number): string | number {
    if (valueKey && typeof option === 'object' && option !== null) {
      return String(option[valueKey])
    }

    return typeof option === 'object' ? index : String(option)
  }

  return {
    getOptionLabel,
    getOptionKey,
  }
}
