import type { VNode } from 'vue'

export interface ScrollAreaProps {
  minThumbSize?: number
}

export interface ScrollAreaEmits {
  (e: 'scroll', payload: { scrollTop: number; scrollLeft: number }): void
}

export interface ScrollAreaSlots {
  default(): VNode[]
  'scrollbar-y'?(props: { size: number; offset: number }): VNode[]
  'scrollbar-x'?(props: { size: number; offset: number }): VNode[]
}
