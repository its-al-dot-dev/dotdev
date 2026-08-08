import type { UiKitNamespace } from 'dotdev/ui-kit'
import { saveTheme } from './saveTheme.ts'

type UiKitThemeValue = { light?: string; dark?: string } | string
type ExtractLiterals<T> = T extends string ? (string extends T ? never : T) : never
type PartialRecord<A extends string, B> = Partial<Record<A, B>>

export type UITheme<A extends string> = PartialRecord<ExtractLiterals<A>, UiKitThemeValue> & {
  [key: string]: UiKitThemeValue
}

export interface UiKitThemeConfig {
  namespace: UiKitNamespace
  theme: string
  output?: string
  app?: {
    [selector: string]: UITheme<string> | undefined
  }
  components?: {
    [selector: string]: UITheme<string> | undefined
  }
}

function parseSelector(key: string, component: string, namespace?: string): string {
  const baseSelector = namespace ? `.${namespace}-${component}` : `.${component}`

  return key
    .replace(/\.&/g, '&')
    .replace(/&/g, baseSelector)
    .replace(/\.{2,}/g, '.')
    .trim()
}

export const tw = (strings: TemplateStringsArray, ...values: any[]): string => {
  return String.raw({ raw: strings }, ...values)
}

export function uiKitTheme(config: UiKitThemeConfig): Record<string, string> {
  const { namespace, components, app } = config
  if (!components && !app) return {}

  const result: Record<string, string> = {}

  const processSection = (section?: Record<string, UITheme<string> | undefined>, ns?: string) => {
    if (!section) return

    for (const [name, themeConfig] of Object.entries(section)) {
      if (!themeConfig) continue

      const cssRules: string[] = []

      for (const [key, styles] of Object.entries(themeConfig)) {
        if (!styles) continue

        if (key.startsWith('--')) {
          cssRules.push(`@theme {\n   --${name}-${key.replace('--', '')}: ${styles};\n}`)
          continue
        }

        if (key.startsWith('@') && typeof styles === 'string') {
          cssRules.push(`@utility ${name}-${key.replace('@', '')} {\n   @apply ${styles};\n}`)
          continue
        }

        const groupSelector = parseSelector(key, name, ns)
        if (!groupSelector) continue

        if (typeof styles === 'string') {
          cssRules.push(`${groupSelector} {\n  @apply ${styles};\n}`)
        } else if (typeof styles === 'object') {
          if (styles.light) {
            cssRules.push(`${groupSelector} {\n  @apply ${styles.light};\n}`)
          }
          if (styles.dark) {
            cssRules.push(`.dark ${groupSelector} {\n  @apply ${styles.dark};\n}`)
          }
        }
      }

      if (cssRules.length > 0) {
        const generatedCss = cssRules.join('\n\n')
        result[name] = result[name] ? `${result[name]}\n\n${generatedCss}` : generatedCss
      }
    }
  }

  processSection(app)
  processSection(components, namespace)

  if (config.output) saveTheme(config.output, config.theme, result).then()

  return result
}
