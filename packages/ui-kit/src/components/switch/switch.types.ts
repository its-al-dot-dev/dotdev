import type { UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'
import type { VNode } from 'vue'

export interface UISwitchProps extends UiKitBaseProps {
  disabled?: boolean
  invalid?: boolean
  variant?: UISwitchVariant
}

interface UiKitSwitchVariants {
  outlined: true
  soft: true
}
type UiKitSwitchVariantDefault = keyof UiKitSwitchVariants | (string & {})
export type UISwitchVariant = UiKitOverride<UiKitSwitchVariantDefault, 'switchVariant'>

export interface UISwitchSlots {
  default(): VNode[]
}

export interface UISwitchEmits {}
