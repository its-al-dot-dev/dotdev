import type { App, Plugin } from 'vue'
import { mergeUiKitConfig, UI_KIT_CONFIG_KEY, type UiKitConfig, type UiKitConfigWithTheme } from '@dotdev/ui-kit'
import { createTheme } from '@dotdev/theme'

export const BASE_CONFIG: UiKitConfig = {
  namespace: 'd',
}

export function defineUiKitConfig(config: UiKitConfig): UiKitConfig {
  return config
}

export const createUiKit = (configs: UiKitConfig | UiKitConfig[] = []): Plugin => {
  const list = Array.isArray(configs) ? configs : [configs]
  const configMap = new Map<string, UiKitConfigWithTheme>()

  for (const config of list) {
    const namespace = config.namespace ?? 'd'
    const theme = createTheme({ namespace, ...config.theme })
    const merged = mergeUiKitConfig(BASE_CONFIG, config)

    configMap.set(namespace, { theme, config: merged })

    const css = theme.toCSS({ ...theme.config.primitives, ...theme.config.semantics })
    theme.injectCSS(css, `${namespace}-theme`)
  }

  return {
    install(app: App) {
      app.provide(UI_KIT_CONFIG_KEY, configMap)
    },
  }
}
