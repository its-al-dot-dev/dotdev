import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitFieldVariant, UiKitOverride, UiKitSize } from '@dotdev/ui-kit'

export interface UIGroupProps extends UiKitBaseProps {
  axis?: 'x' | 'y'
}

export interface UIGroupSlots {
  default?(): VNode[]
}

export interface UIGroupEmits {}

export interface UIGroupAddonProps extends UiKitBaseProps {
  size?: UIGroupAddonSize | 'none'
  variant?: UIGroupAddonVariant
  label?: string
  attach?: boolean
}

export interface UIGroupAddonSlots {
  default?(): VNode[]
}

export interface UIGroupAddonEmits {}
export type UIGroupAddonSize = UiKitOverride<UiKitSize, 'groupAddonSize'>
export type UIGroupAddonVariant = UiKitOverride<UiKitFieldVariant, 'groupAddonVariant'>
