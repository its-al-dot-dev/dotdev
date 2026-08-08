import type { UiKitBaseProps, UiKitFieldVariant, UiKitOverride, UiKitSize } from 'dotdev/ui-kit'

export interface UIInputProps extends UiKitBaseProps {
  size?: UIInputSize
  invalid?: boolean
  disabled?: boolean
  variant?: UIInputVariant
}

export interface UIInputSlots {}
export interface UIInputEmits {}

export type UIInputSize = UiKitOverride<UiKitSize, 'inputSize'>
export type UIInputVariant = UiKitOverride<UiKitFieldVariant, 'inputVariant'>
