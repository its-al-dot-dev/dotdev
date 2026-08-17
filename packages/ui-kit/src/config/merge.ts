import type { UiKitConfig } from './config.types.ts'

type UiKitComponents = NonNullable<UiKitConfig['components']>

function mergeComponents(
  base: UiKitConfig['components'],
  override: UiKitConfig['components'],
): UiKitConfig['components'] {
  if (override === undefined) return undefined

  const baseEntries = Object.entries(base ?? {})
  const overrideEntries = Object.entries(override).map(([key, overrideProps]) => {
    if (overrideProps === undefined) {
      return [key, undefined]
    }

    const baseProps = ((base ?? {}) as Record<string, object>)[key]
    return [key, { ...baseProps, ...overrideProps }]
  })

  return Object.fromEntries([...baseEntries, ...overrideEntries]) as UiKitComponents
}

export function mergeUiKitConfig(base: UiKitConfig, override: UiKitConfig): UiKitConfig {
  const merged: UiKitConfig = { ...base, ...override }

  if (override.components !== undefined) {
    merged.components = mergeComponents(base.components, override.components)
  }

  if (override.icons !== undefined) {
    merged.icons = { ...(base.icons ?? {}), ...override.icons }
  }

  return merged
}
