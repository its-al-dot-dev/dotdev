import type { VNode } from 'vue'
import type { ArrayModelConfig, UiKitBaseProps, UiKitIcon, UiKitOverride, UiKitSize } from '@dotdev/ui-kit'

export interface UIListBoxProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  size?: UIListBoxSize
  variant?: UIListBoxVariant
  invalid?: boolean
  checkmark?: boolean | 'left' | 'right'
  checkmarkIcon?: UiKitIcon
  typeahead?: boolean
  columns?: number
  square?: boolean
}

export interface UIListBoxSlots<T = any> {
  default?(props: UIListBoxSlotScope<T>): VNode[]
}

export interface UIListBoxEmits {}

export type UIListBoxSize = UiKitOverride<UiKitSize, 'listBoxSize'>

interface UiKitListBoxVariants {
  outlined: true
  soft: true
  plain: true
}
type UiKitListBoxVariantDefault = keyof UiKitListBoxVariants | (string & {})
export type UIListBoxVariant = UiKitOverride<UiKitListBoxVariantDefault, 'listBoxVariant'>

export interface UIListBoxItemProps {
  label: string
  disabled: boolean
  highlighted: boolean
  focused: boolean
  selected: boolean
  size: number
  index: number
}

export interface UIListBoxSlotScope<T> extends UIListBoxItemProps {
  option: T
}
