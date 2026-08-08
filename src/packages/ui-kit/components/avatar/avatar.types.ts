import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitIcon } from 'dotdev/ui-kit'

export interface UIAvatarProps extends UiKitBaseProps {
  label?: string
  alt?: string
  src?: string
  border?: boolean
  icon?: UiKitIcon
}

export interface UIAvatarSlots {
  default?(): VNode[]
  avatar?(): VNode[]
}

export interface UIAvatarEmits {}
