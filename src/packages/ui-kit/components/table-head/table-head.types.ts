import type { VNode } from 'vue'
import type { UiKitBaseProps, UITableAlign } from 'dotdev/ui-kit'

export interface UITableHeadProps extends UiKitBaseProps {
  /** Выравнивание содержимого ячейки */
  align?: UITableAlign
  /** Ширина колонки (CSS-значение, например '120px' или '25%') */
  width?: string
  /** Связь ячейки с данными таблицы */
  scope?: 'col' | 'row'
}

export interface UITableHeadSlots {
  default?(): VNode[]
}

export interface UITableHeadEmits {}
