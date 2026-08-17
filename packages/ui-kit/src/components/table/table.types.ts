import type { VNode } from 'vue'
import type { UiKitBaseProps } from '@dotdev/ui-kit'

export interface UITableProps extends UiKitBaseProps {
  /** Подсветка строк при наведении */
  hover?: boolean
  /** Фиксация шапки при скролле (нужен контейнер с overflow) */
  stickyHeader?: boolean
}

export interface UITableSlots {
  default?(): VNode[]
  caption?(): VNode[]
}

export interface UITableEmits {}

export type UITableAlign = 'left' | 'center' | 'right'
