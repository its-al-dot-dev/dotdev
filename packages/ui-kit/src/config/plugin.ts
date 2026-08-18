import type { App, Plugin } from 'vue'
import { defineTheme, type TokenValue } from '@dotdev/theme'
import { mergeUiKitConfig, UI_KIT_CONFIG_KEY, type UiKitConfig, type UiKitThemeContext } from '@dotdev/ui-kit'
import tokens from '../components/templates/tokens.ts'

export const BASE_CONFIG: UiKitConfig = {
  namespace: 'd',
}

// TODO refactor
interface UiThemeDefinition {
  primitives?: { [K in keyof (typeof tokens)['primitives']]?: string }
  semantics?: { [K in keyof (typeof tokens)['semantics']]?: TokenValue }
  components?: {
    [U in keyof (typeof tokens)['components']]?: {
      [K in keyof (typeof tokens)['components'][U]]?: TokenValue
    }
  }
}

export function defineUiKitConfig(config: Omit<UiKitConfig, 'theme'> & { theme?: UiThemeDefinition }): UiKitConfig {
  return config
}

function createInjector(namespace: string, theme: ReturnType<typeof defineTheme>, allTokens: typeof tokens) {
  return function injectStyles(ns: string, ui: string, template: string) {
    if (ns !== namespace) return
    theme.injectCSS(theme.renderRuntimeVars(allTokens, namespace, ui), `component-vars-${namespace}-${ui}`)
    theme.injectCSS(template.replaceAll('{ns}', namespace), `component-${namespace}-${ui}`)
  }
}

export const createUiKit = (configs: UiKitConfig | UiKitConfig[] = []): Plugin => {
  const list = Array.isArray(configs) ? configs : [configs]
  const configMap = new Map<string, UiKitConfig>()
  const themeMap = new Map<string, UiKitThemeContext>()

  for (const cfg of list) {
    const ns = cfg.namespace ?? 'd'
    configMap.set(ns, mergeUiKitConfig(BASE_CONFIG, cfg))

    const theme = defineTheme({ namespace: ns, tokens, ...cfg.theme })
    theme.inject()
    themeMap.set(ns, { injectStyles: createInjector(ns, theme, tokens) })
  }

  return {
    install(app: App) {
      app.provide(UI_KIT_CONFIG_KEY, { configs: configMap, themes: themeMap })
    },
  }
}
