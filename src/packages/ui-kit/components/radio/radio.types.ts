import type { UiKitBaseProps, UiKitOverride, UiKitSize } from 'dotdev/ui-kit'

export interface UIRadioProps extends UiKitBaseProps {
  size?: UIRadioSize
  invalid?: boolean
  disabled?: boolean
  variant?: UIRadioVariant
}

export interface UIRadioSlots {}
export interface UIRadioEmits {}

export type UIRadioSize = UiKitOverride<UiKitSize, 'radioSize'>

interface UiKitRadioVariants {
  outlined: true
  subtle: true
}
type UiKitRadioVariantDefault = keyof UiKitRadioVariants | (string & {})
export type UIRadioVariant = UiKitOverride<UiKitRadioVariantDefault, 'radioVariant'>
