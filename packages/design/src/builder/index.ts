import { NAMESPACE, type ThemeConfig } from './theme.ts'
import type { ComponentConfig, TokenValue } from './types.ts'

export function defineTheme(config: ThemeConfig): ThemeConfig {
  return config
}

export function defineComponent(config: ComponentConfig): { config: ComponentConfig } {
  return { config }
}

export { NAMESPACE, type ThemeConfig, type TokenValue }
