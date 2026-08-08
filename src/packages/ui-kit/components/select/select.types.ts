import type { VNode } from 'vue'
import type { ArrayModelConfig, UiKitBaseProps, UiKitFieldVariant, UiKitOverride, UiKitSize } from 'dotdev/ui-kit'

export interface UISelectProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  size?: UISelectSize
  name?: string
  invalid?: boolean
  placeholder?: string
  variant?: UISelectVariant
}

export interface UISelectSlots<T = any> {
  default?(props: { option: T; selected: boolean; index: number }): VNode[]
  prefix?(props: { option: T; selected: boolean; index: number }): VNode[]
  suffix?(props: { option: T; selected: boolean; index: number }): VNode[]
}

export interface UISelectEmits {}

export type UISelectSize = UiKitOverride<UiKitSize, 'selectSize'>
export type UISelectVariant = UiKitOverride<UiKitFieldVariant, 'selectVariant'>
