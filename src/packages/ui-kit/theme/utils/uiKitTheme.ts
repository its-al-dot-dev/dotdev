import type { UiKitNamespace } from 'dotdev/ui-kit'
import type { StyleSheet } from './builder.ts'
import { saveTheme } from './saveTheme.ts'

export interface UiKitThemeConfig {
  namespace: UiKitNamespace
  theme: string
  output?: string
  app?: Record<string, StyleSheet | undefined>
  components?: Record<string, StyleSheet | undefined>
}

export function uiKitTheme(config: UiKitThemeConfig): Record<string, string> {
  const result: Record<string, string> = {}

  for (const [name, sheet] of Object.entries(config.app ?? {})) {
    if (sheet) result[name] = sheet.$render(`.${name}`, name)
  }

  for (const [name, sheet] of Object.entries(config.components ?? {})) {
    if (sheet) result[name] = sheet.$render(`.${config.namespace}-${name}`, name)
  }

  if (config.output) saveTheme(config.output, config.theme, result).then()

  return result
}
