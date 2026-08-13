import type { App, Plugin } from 'vue'
import { UI_KIT_CONFIG_KEY, type UiKitConfig } from './config.types.ts'

export const BASE_CONFIG: UiKitConfig = {
  namespace: 'd',
}

export const createUiKit = (userConfig: UiKitConfig = {}): Plugin => {
  return {
    install(app: App) {
      app.provide(UI_KIT_CONFIG_KEY, { ...BASE_CONFIG, ...userConfig })
    },
  }
}
