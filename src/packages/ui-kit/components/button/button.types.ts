import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitColor, UiKitIcon, UiKitOverride, UiKitSize } from 'dotdev/ui-kit'

export interface UIButtonProps extends UiKitBaseProps {
  size?: UIButtonSize
  href?: string
  target?: string
  label?: string
  icon?: UiKitIcon
  loading?: boolean
  disabled?: boolean
  iconPos?: 'prefix' | 'suffix'
  color?: UIButtonColor
  variant?: UIButtonVariant
  type?: 'button' | 'submit' | 'reset'
}

export interface UIButtonSlots {
  default?(): VNode[]
  prefix?(): VNode[]
  suffix?(): VNode[]
}

export interface UIButtonEmits {
  click: [event: MouseEvent]
}

export type UIButtonSize = UiKitOverride<UiKitSize, 'buttonSize'>

export type UIButtonColor = UiKitOverride<UiKitColor, 'buttonColor'>

export type UIButtonVariant = UiKitOverride<UiKitButtonVariant, 'buttonVariant'>
type UiKitButtonVariant = keyof UiKitButtonVariants | (string & {})
interface UiKitButtonVariants {
  solid: true
  outlined: true
  ghost: true
  subtle: true
  text: true
}
