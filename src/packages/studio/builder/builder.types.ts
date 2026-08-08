import type { ComponentProps, PComponent } from '../types'
import type { PlayComponentMeta } from '../plugin/component-meta.types.ts'

export interface BaseConfig<C extends PComponent> {
  component: C
  name?: string
  props?: ComponentProps<C>
}

export type IterateProps<C extends PComponent> =
  { [K in keyof ComponentProps<C>]?: readonly ComponentProps<C>[K][] | boolean } | keyof ComponentProps<C>

export interface VariantConfig<C extends PComponent, R extends PComponent | undefined = undefined> {
  key?: string
  component?: R
  props?: R extends PComponent ? ComponentProps<R> : Partial<ComponentProps<C>>
  iterate?: IterateProps<C>
}

export interface Variant<C extends PComponent> {
  name: string
  config: VariantConfig<C, PComponent>
}

export interface PlaygroundManifest<C extends PComponent> {
  component: C
  meta?: PlayComponentMeta
  base: BaseConfig<C>
  variants: Variant<C>[]
}
