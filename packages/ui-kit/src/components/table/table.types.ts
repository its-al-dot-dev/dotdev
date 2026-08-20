import type { VNode } from 'vue'
import type { UiKitBaseProps, UiKitOverride } from '@dotdev/ui-kit'

export interface UITableProps<T extends UITableData = UITableData> extends UiKitBaseProps {
  data: T[]
  columns: UITableColumn<T>[]
  hover?: boolean
  stickyHeader?: boolean
  striped?: boolean
  border?: UITableBorder
  align?: UITableAlign
  rowKey?: StringKey<T>
}

type UITableColumnScope<T, K extends keyof T = keyof T> = {
  data: T
  index: number
  key: K
  value: T[K]
}

type UITableHeaderScope<T, K extends keyof T = keyof T> = {
  key: K
  value?: string
}

export type UITableSlots<T extends UITableData = UITableData> = {
  footer?: () => VNode[]
  caption?: () => VNode[]
  header?: (scope: UITableHeaderScope<T>) => VNode[]
  column?: (scope: UITableColumnScope<T>) => VNode[]
  'loading-column'?: (scope: UITableColumnScope<T>) => VNode[]
} & UITableColumnSlot<T> &
  UITableHeaderSlot<T>

export interface UITableEmits {}

type UITableColumnSlot<T extends UITableData> = {
  [K in UITableColumn<T>['key'] as `col-${K & string}`]?: (scope: UITableColumnScope<T, K>) => VNode[]
}

type UITableHeaderSlot<T extends UITableData> = {
  [K in UITableColumn<T>['key'] as `header-${K & string}`]?: (scope: UITableHeaderScope<T, K>) => VNode[]
}

type StringKey<T> = Extract<keyof T, string>

interface UiKitTableBorders {
  none: true
  rows: true
  columns: true
  all: true
  outline: true
}
export type UITableBorder = UiKitOverride<UiKitTableBorders, 'tableBorder'>

export type UITableData = Record<string, unknown>
export type UITableAlign = 'left' | 'center' | 'right'
export interface UITableColumn<T> {
  key: StringKey<T> | (string & {})
  header?: string
  width?: string
}
