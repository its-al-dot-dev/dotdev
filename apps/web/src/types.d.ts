import 'vue-router'
import type { UiKitIcon, UIMenuItem } from '@dotdev/ui-kit'
import type { Component } from 'vue'

declare module 'vue-router' {
  interface RouteMeta {
    order?: number
    kind?: UIMenuItem['kind']
    icon?: UiKitIcon
    examples?: Record<string, Component>
    sources?: Record<string, string>
  }
}
