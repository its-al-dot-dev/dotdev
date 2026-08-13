import type { RouteLocationRaw } from 'vue-router'
import 'vue-router'
import type { IconName, UIMenuItem } from 'dotdev/ui-kit'
import type { Component } from 'vue'

declare module 'dotdev/ui-kit' {
  interface UIMenuItem {
    to?: RouteLocationRaw
  }

  interface UiKitRegister {}
}

declare module 'vue-router' {
  interface RouteMeta {
    order?: number
    kind?: UIMenuItem['kind']
    icon?: IconName
    examples?: Record<string, Component>
    sources?: Record<string, string>
  }
}
