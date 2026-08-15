import type { VNode } from 'vue'
import type { UiKitBaseProps, UITableAlign } from 'dotdev/ui-kit'

export interface UITableCellProps extends UiKitBaseProps {
  /** Выравнивание содержимого ячейки */
  align?: UITableAlign
}

export interface UITableCellSlots {
  default?(): VNode[]
}

export interface UITableCellEmits {}
