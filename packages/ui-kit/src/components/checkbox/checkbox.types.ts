import type { UiKitBaseProps, UiKitOverride, UiKitSize } from '@dotdev/ui-kit'

export interface UICheckboxProps extends UiKitBaseProps {
  size?: UICheckboxSize
  invalid?: boolean
  disabled?: boolean
  variant?: UICheckboxVariant
}

export interface UICheckboxSlots {}
export interface UICheckboxEmits {}

export type UICheckboxSize = UiKitOverride<UiKitSize, 'checkboxSize'>

interface UiKitCheckboxVariants {
  outlined: true
  soft: true
}
type UiKitCheckboxVariantDefault = keyof UiKitCheckboxVariants | (string & {})
export type UICheckboxVariant = UiKitOverride<UiKitCheckboxVariantDefault, 'checkboxVariant'>
