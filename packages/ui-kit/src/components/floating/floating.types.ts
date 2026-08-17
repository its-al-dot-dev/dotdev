import type { CSSProperties, VNode, VNodeRef } from 'vue'
import type { UIFloatingConfig } from '@dotdev/ui-kit'

export type UIFloatingFn = (event?: Event) => void
export interface UIFloatingProps extends UIFloatingConfig {
  fit?: boolean
  dismissable?: boolean
}

export interface UIFloatingSlots {
  default(scope: {
    isOpen: boolean
    ref: VNodeRef | undefined
    style: CSSProperties
    open: UIFloatingFn
    close: UIFloatingFn
    toggle: UIFloatingFn
  }): VNode[]
}

export interface UIFloatingEmits {
  'click-outside': [event: MouseEvent]
}
