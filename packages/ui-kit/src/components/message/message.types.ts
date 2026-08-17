import type { Component, VNode } from 'vue'
import type { UiKitBaseProps, UiKitColor, UiKitIcon, UiKitOverride } from '@dotdev/ui-kit'

export interface UIMessageProps extends UiKitBaseProps {
  is?: UIMessageElement
  icon?: UiKitIcon
  title?: string
  message?: string
  color?: UIMessageColor
  variant?: UIMessageVariant
  border?: boolean
  role?: UIMessageRole
}

export interface UIMessageSlots {
  icon?(): VNode[]
  title?(): VNode[]
  message?(): VNode[]
  default?(): VNode[]
}

export interface UIMessageEmits {}

export type UIMessageElement = keyof HTMLElementTagNameMap | Component

export type UIMessageColor = UiKitOverride<UiKitColor, 'messageColor'>

export type UIMessageVariant = UiKitOverride<UIMessageVariantDefault, 'messageVariant'>
type UIMessageVariantDefault = keyof UIMessageVariants | (string & {})
interface UIMessageVariants {
  soft: true
  plain: true
}

export type UIMessageRole = 'status' | 'alert' | 'none'
