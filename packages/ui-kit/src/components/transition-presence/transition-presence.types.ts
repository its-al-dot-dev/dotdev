import type { VNode } from 'vue'

export interface TransitionPresenceProps {
  show: boolean
  name: string
}

export interface TransitionPresenceSlots {
  default?(): VNode[]
}

export interface TransitionPresenceEmits {}
