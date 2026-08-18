import { defineTheme } from '@dotdev/theme'
import tokens from '../components/templates/tokens.ts'
import { type App, inject, type InjectionKey, type Plugin } from 'vue'
import type { UiKitBaseProps } from '@dotdev/ui-kit/types/ui-kit.ts'

export interface ThemeContext {
  injectStyles(namespace: string, ui: string, template: string): void
}

export interface ThemeDefinition {
  primitives?: { [K in keyof (typeof tokens)['primitives']]?: string }
  semantics?: { [K in keyof (typeof tokens)['semantics']]?: string | readonly [string, string] }
  components?: {
    [U in keyof (typeof tokens)['components']]?: {
      [K in keyof (typeof tokens)['components'][U]]?: string | readonly [string, string]
    }
  }
}

export const themeInjectionKey: InjectionKey<ThemeContext> = Symbol('dotdev-theme')

export function useThemeProvider(namespace: string = 'd', config?: ThemeDefinition): Plugin {
  const theme = defineTheme({
    namespace,
    tokens: tokens,
    ...config,
  })

  theme.inject()

  function injectStyles(ns: string, ui: string, template: string) {
    if (ns !== namespace) return
    theme.injectCSS(theme.renderRuntimeVars(tokens, namespace, ui), `component-vars-${namespace}-${ui}`)
    theme.injectCSS(template.replaceAll('{ns}', namespace), `component-${namespace}-${ui}`)
  }

  return {
    install(app: App) {
      app.provide(themeInjectionKey, { injectStyles })
    },
  }
}

export function useUiKitTheme(props: UiKitBaseProps, template: string) {
  const { namespace, ui } = props
  if (!namespace || !ui) return

  const ctx = inject(themeInjectionKey, null)

  if (!ctx) {
    console.warn('[dotdev/ui-kit] useUiKitTheme: no useThemeProvider in the component tree')
    return
  }

  ctx.injectStyles(namespace, ui, template)
}
