import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitIcon } from '@dotdev/ui-kit'
import type { RouteLocationRaw } from 'vue-router'

export interface UIBreadcrumbItem {
  label?: string
  href?: string
  to?: RouteLocationRaw
  icon?: UiKitIcon
}

export interface UIBreadcrumbsProps extends UiKitBaseProps {
  items?: UIBreadcrumbItem[]
  separator?: string
  separatorIcon?: UiKitIcon
  ariaLabel?: string
}

export interface UIBreadcrumbsSlots {
  default?(props: { item: UIBreadcrumbItem; index: number }): VNode[]
  separator?(): VNode[]
}

export interface UIBreadcrumbsEmits {}
