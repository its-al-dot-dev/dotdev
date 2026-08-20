import { inject } from 'vue'
import { UI_KIT_CONFIG_KEY, UI_KIT_NAMESPACE_KEY, type UiKitBaseProps } from '@dotdev/ui-kit'

export interface UiKitThemeContext {
  injectStyles(namespace: string, ui: string, template: string): void
}

export function useUiKitTheme(props: UiKitBaseProps, template: string) {
  const overriddenNs = inject(UI_KIT_NAMESPACE_KEY, null)
  const namespace = overriddenNs ?? props.namespace
  const ui = props.ui

  if (!namespace || !ui) {
    throw new Error(`[dotdev/ui-kit] Both namespace and ui are required`)
  }

  const provided = inject(UI_KIT_CONFIG_KEY)

  const state = provided?.get(namespace)

  if (!state) {
    console.warn(`[dotdev/ui-kit] config not found for namespace "${namespace}"`)
  }

  if (state) {
    const styles = (state.theme.config?.components as any)?.[ui]

    if (styles) {
      const cmpVars = state.theme.toCSS(styles, ui)
      state.theme.injectCSS(cmpVars, `${namespace}-${ui}-vars`)
    }

    const css = state.theme.templateToCSS(template, namespace)
    state.theme.injectCSS(css, `${namespace}-${ui}`)
  }

  return state
}
