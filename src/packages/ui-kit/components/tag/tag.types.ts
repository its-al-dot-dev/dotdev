import type { Component, VNode } from 'vue'
import type { UiKitBaseProps, UiKitIcon } from 'dotdev/ui-kit'

export interface UITagProps extends UiKitBaseProps {
  is?: UITagElement
  label?: string
  rounded?: boolean
  border?: boolean
  prefixIcon?: UiKitIcon
  suffixIcon?: UiKitIcon
}

export interface UITagSlots {
  label?(): VNode[]
  prefix?(): VNode[]
  default?(): VNode[]
  suffix?(): VNode[]
}

export interface UITagEmits {}

export type UITagElement = keyof HTMLElementTagNameMap | Component
