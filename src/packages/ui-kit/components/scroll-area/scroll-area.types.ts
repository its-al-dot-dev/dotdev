import type { VNode } from 'vue'
import type { UiKitBaseProps } from 'dotdev/ui-kit'

export interface UIScrollAreaProps extends UiKitBaseProps {
  /** Минимальный размер ползунка в пикселях */
  minThumbSize?: number
}

export interface UIScrollAreaEmits {
  (e: 'scroll', payload: UIScrollAreaScrollPayload): void
}

export interface UIScrollAreaSlots {
  default?(): VNode[]
  'scrollbar-y'?(props: UIScrollAreaThumbSlotProps): VNode[]
  'scrollbar-x'?(props: UIScrollAreaThumbSlotProps): VNode[]
}

export interface UIScrollAreaScrollPayload {
  scrollTop: number
  scrollLeft: number
}

export interface UIScrollAreaThumbSlotProps {
  size: number
  offset: number
}
