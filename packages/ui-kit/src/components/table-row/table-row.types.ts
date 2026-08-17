import type { VNode } from 'vue'
import type { UiKitBaseProps } from '@dotdev/ui-kit'

export interface UITableRowProps extends UiKitBaseProps {
  /** Выделение строки (выбранное состояние) */
  selected?: boolean
}

export interface UITableRowSlots {
  default?(): VNode[]
}

export interface UITableRowEmits {}
