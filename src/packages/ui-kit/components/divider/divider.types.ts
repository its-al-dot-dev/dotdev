import type { Component, VNode } from 'vue'
import type { UiKitBaseProps, UiKitColor, UiKitOverride } from 'dotdev/ui-kit'

export interface UIDividerProps extends UiKitBaseProps {
  is?: UIDividerElement
  orientation?: UIDividerOrientation
  variant?: UIDividerVariant
  color?: UIDividerColor
  label?: string
}

export interface UIDividerSlots {
  default?(): VNode[]
}

export interface UIDividerEmits {}

export type UIDividerElement = keyof HTMLElementTagNameMap | Component

export type UIDividerOrientation = 'horizontal' | 'vertical'

export type UIDividerColor = UiKitOverride<UiKitColor, 'dividerColor'>

export type UIDividerVariant = UiKitOverride<UIDividerVariantDefault, 'dividerVariant'>
type UIDividerVariantDefault = keyof UIDividerVariants | (string & {})
interface UIDividerVariants {
  solid: true
  dashed: true
  dotted: true
}
