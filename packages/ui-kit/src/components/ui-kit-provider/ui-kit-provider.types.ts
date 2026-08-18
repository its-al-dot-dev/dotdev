import type { VNode } from 'vue'
import type { UiKitNamespace } from '@dotdev/ui-kit'

export interface UIKitProviderProps {
  namespace: UiKitNamespace
}

export interface UIKitProviderSlots {
  default?(): VNode[]
}

export interface UIKitProviderEmits {}
