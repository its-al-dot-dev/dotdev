import type { VNode } from 'vue'
import type { UiKitConfig, UiKitNamespace } from '@dotdev/ui-kit'

export interface UiKitProviderProps {
  namespace?: UiKitNamespace
  config?: UiKitConfig
  merge?: boolean
}

export interface UiKitProviderSlots {
  default?(): VNode[]
}

export interface UiKitProviderEmits {}
