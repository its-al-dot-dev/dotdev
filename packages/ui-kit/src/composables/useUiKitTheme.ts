import { inject } from 'vue'
import { UI_KIT_CONFIG_KEY, UI_KIT_NAMESPACE_KEY, type UiKitBaseProps } from '@dotdev/ui-kit'

export interface UiKitThemeContext {
  injectStyles(namespace: string, ui: string, template: string): void
}

export function useUiKitTheme(props: UiKitBaseProps, template: string) {
  const overriddenNs = inject(UI_KIT_NAMESPACE_KEY, null)
  const namespace = overriddenNs ?? props.namespace
  const ui = props.ui
  if (!namespace || !ui) return

  const { themes, configs } = inject(UI_KIT_CONFIG_KEY, {
    themes: new Map(),
    configs: new Map(),
  })

  const ctx = themes.get(namespace)

  if (!ctx) {
    console.warn(`[dotdev/ui-kit] No theme registered for namespace "${namespace}"`)
    return
  }

  ctx.injectStyles(namespace, ui, template)
  return { themes, configs }
}
