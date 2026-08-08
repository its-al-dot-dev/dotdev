import type { Component } from 'vue'
import type { PlayComponentMeta } from '../plugin/component-meta.types.ts'
import type { ComponentProps as CP } from 'vue-component-type-helpers'

export type PComponent = Component & { __name?: string; __meta?: PlayComponentMeta }
export type ComponentProps<C extends PComponent> = CP<C>
