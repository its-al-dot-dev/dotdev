import type { VNode } from 'vue'
import type { UiKitIcon } from 'dotdev/ui-kit'

export interface IconProps {
  name: UiKitIcon
}

export interface IconSlots {
  default(): VNode[]
}

export interface IconEmits {}
