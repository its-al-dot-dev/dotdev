import type { UiKitBaseProps, UiKitFieldVariant, UiKitOverride, UiKitSize } from 'dotdev/ui-kit'

export interface UITextareaProps extends UiKitBaseProps {
  size?: UITextareaSize
  invalid?: boolean
  disabled?: boolean
  variant?: UITextareaVariant
  autosize?: boolean
}

export interface UITextareaSlots {}
export interface UITextareaEmits {}

export type UITextareaSize = UiKitOverride<UiKitSize, 'textareaSize'>
export type UITextareaVariant = UiKitOverride<UiKitFieldVariant, 'textareaVariant'>
