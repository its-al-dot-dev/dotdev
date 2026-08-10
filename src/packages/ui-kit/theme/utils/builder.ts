import { findThemeModifier, resolveTokenValue, themeUtilityProperties } from './helpers.ts'

export interface StyleSheetConfig {
  /** CSS-переменные → `@theme { --<name>-<key>: value; }` */
  tokens?: Record<string, string>
  /** Семантический токен → CSS-переменная (`:root` + `.dark`) и утилита `@utility <key>`. Значение `[light, dark]` или одно значение */
  theme?: Record<string, string | [string, string]>
  /** Tailwind-утилиты → `@utility <name>-<key> { @apply value; }` */
  utilities?: Record<string, string>
  /** Компонентные BEM-правила → `@layer components { <selector> { @apply value; } }` */
  component?: Record<string, string>
  /** «Сырые» нативные декларации → `@layer components { <selector> { value; } }` */
  styles?: Record<string, string>
}

export type StyleSheetComponent = NonNullable<StyleSheetConfig['component']>

export interface StyleSheet {
  $render(base: string, name: string): string
}

type ThemeToken = [key: string, value: string | [string, string]]

export function defineStyleSheet(config: StyleSheetConfig): StyleSheet {
  return {
    $render(base, name) {
      return [
        renderTokens(name, config.tokens),
        renderThemeTokens(config.theme),
        renderTokenUtilities(config.theme),
        renderUtilities(name, config.utilities),
        renderComponentLayer(base, config.component, config.styles),
      ]
        .filter(Boolean)
        .join('\n\n')
    },
  }
}

function renderTokens(name: string, tokens?: StyleSheetConfig['tokens']) {
  const vars = Object.entries(tokens ?? {}).filter(([, value]) => value)
  if (!vars.length) return ''
  return `@theme {\n${vars.map(([key, value]) => `  --${name}-${key}: ${value};`).join('\n')}\n}`
}

function collectThemeTokens(theme?: StyleSheetConfig['theme']): ThemeToken[] {
  return Object.entries(theme ?? {}).filter(([, value]) => value)
}

function renderThemeTokens(theme?: StyleSheetConfig['theme']) {
  const tokens = collectThemeTokens(theme)
  if (!tokens.length) return ''

  const light = tokens.map(([key, value]) => {
    return `  --${key.replace('text', 'fg')}: ${resolveTokenValue(Array.isArray(value) ? value[0] : value)};`
  })

  const dark = tokens
    .filter(([, value]) => Array.isArray(value) && value[1])
    .map(([key, value]) => `  --${key.replace('text', 'fg')}: ${resolveTokenValue(value[1])};`)

  const lines = ['@theme {', ...light, '}']
  if (dark.length) lines.push('.dark {', ...dark, '}')
  return lines.join('\n')
}

function renderTokenUtilities(theme?: StyleSheetConfig['theme']) {
  return collectThemeTokens(theme)
    .map(([key]) => {
      const varKey = key.replace('text', 'fg')

      const property = key.split('-')[0]
      if (!themeUtilityProperties.has(property)) return ''
      const modifier = findThemeModifier(key)
      const apply = modifier ? `${modifier}:${property}-(--${varKey})` : `${property}-(--${varKey})`
      return `@utility ${key} {\n   @apply ${apply};\n}`
    })
    .filter(Boolean)
    .join('\n\n')
}

function renderUtilities(name: string, utilities?: StyleSheetConfig['utilities']) {
  return Object.entries(utilities ?? {})
    .filter(([, value]) => value)
    .map(([key, value]) => `@utility ${name}-${key} {\n   @apply ${value};\n}`)
    .join('\n\n')
}

function toSelector(key: string, base: string) {
  return key
    .replace(/\.&/g, '&')
    .replace(/&/g, base)
    .replace(/\.{2,}/g, '.')
}

function renderComponentRules(base: string, component?: StyleSheetConfig['component']) {
  return Object.entries(component ?? {})
    .filter(([, value]) => value)
    .map(([key, value]) => `  ${toSelector(key, base)} {\n    @apply ${value};\n  }`)
}

function renderRawStyles(base: string, styles?: StyleSheetConfig['styles']) {
  return Object.entries(styles ?? {})
    .filter(([, value]) => value)
    .map(([key, value]) => `  ${toSelector(key, base)} {\n    ${value};\n  }`)
}

function renderComponentLayer(
  base: string,
  component?: StyleSheetConfig['component'],
  styles?: StyleSheetConfig['styles'],
) {
  const rules = [...renderComponentRules(base, component), ...renderRawStyles(base, styles)]
  if (!rules.length) return ''
  return `@layer components {\n${rules.join('\n\n')}\n}`
}
