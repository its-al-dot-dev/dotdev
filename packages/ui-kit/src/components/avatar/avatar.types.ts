import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitColor, UiKitIcon, UiKitOverride } from '@dotdev/ui-kit'

export interface UIAvatarProps extends UiKitBaseProps {
  label?: string
  alt?: string
  src?: string
  border?: boolean
  square?: boolean
  icon?: UiKitIcon
  color?: UIAvatarColor
  variant?: UIAvatarVariant
}

export interface UIAvatarSlots {
  default?(): VNode[]
  avatar?(): VNode[]
}

export interface UIAvatarEmits {}

export type UIAvatarColor = UiKitOverride<UiKitColor, 'avatarColor'>

export type UIAvatarVariant = UiKitOverride<UiKitAvatarVariant, 'avatarVariant'>
type UiKitAvatarVariant = keyof UiKitAvatarVariants | (string & {})
interface UiKitAvatarVariants {
  soft: true
  solid: true
}
