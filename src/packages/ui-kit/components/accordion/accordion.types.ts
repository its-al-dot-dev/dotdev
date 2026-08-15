import type { ArrayModelConfig, UiKitBaseProps, UiKitOverride } from 'dotdev/ui-kit'

export interface UIAccordionProps<T = any, L = any, V = any, M = any>
  extends ArrayModelConfig<T, L, V, M>, UiKitBaseProps {
  variant?: UIAccordionVariant
}

export interface UIAccordionSlotsScope<T> {
  open: boolean
  disabled: boolean
  toggle: () => void
  item: T
  label: string
  value: string
  index: number
}

export interface UIAccordionSlots<T> {
  default(scope: UIAccordionSlotsScope<T>): void
  content(scope: UIAccordionSlotsScope<T>): void
  indicator(scope: UIAccordionSlotsScope<T>): void
}

export interface UIAccordionEmits {}

export type UIAccordionVariant = UiKitOverride<UIAccordionVariantDefault, 'accordionVariant'>
type UIAccordionVariantDefault = keyof UIAccordionVariants | (string & {})
interface UIAccordionVariants {
  outlined: true
  soft: true
  plain: true
  underline: true
}
