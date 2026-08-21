import type { Component } from 'vue'
import type { UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UISkeletonProps extends UiKitBaseProps {
  is?: UISkeletonElement
  variant?: UISkeletonVariant
  rounded?: boolean
}

export interface UISkeletonSlots {}

export interface UISkeletonEmits {}

export type UISkeletonElement = keyof HTMLElementTagNameMap | Component

export type UISkeletonVariant = UiKitOverride<UISkeletonVariantDefault, 'skeletonVariant'>
type UISkeletonVariantDefault = keyof UISkeletonVariants | (string & {})
interface UISkeletonVariants {
  pulse: true
  static: true
}
