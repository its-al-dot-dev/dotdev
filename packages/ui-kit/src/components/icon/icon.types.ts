import type { Component, VNode } from 'vue'
import type { UiKitBaseProps, UiKitIcon } from '@dotdev/ui-kit'

export interface UIIconProps extends UiKitBaseProps {
  name?: UiKitIcon
  is?: Component
}

export interface UIIconSlots {
  default(): VNode[]
}

export interface UIIconEmits {}
