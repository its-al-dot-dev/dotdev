import type { Component, VNode } from 'vue'
import type { UiKitBaseProps, UiKitColor, UiKitIcon, UiKitOverride } from 'dotdev/ui-kit'

export interface UITagProps extends UiKitBaseProps {
  is?: UITagElement
  label?: string
  rounded?: boolean
  border?: boolean
  prefixIcon?: UiKitIcon
  suffixIcon?: UiKitIcon
  color?: UITagColor
  variant?: UITagVariant
}

export interface UITagSlots {
  label?(): VNode[]
  prefix?(): VNode[]
  default?(): VNode[]
  suffix?(): VNode[]
}

export interface UITagEmits {}

export type UITagElement = keyof HTMLElementTagNameMap | Component

export type UITagColor = UiKitOverride<UiKitColor, 'tagColor'>

export type UITagVariant = UiKitOverride<UiKitTagVariant, 'tagVariant'>
type UiKitTagVariant = keyof UiKitTagVariants | (string & {})
interface UiKitTagVariants {
  soft: true
  solid: true
  plain: true
}
