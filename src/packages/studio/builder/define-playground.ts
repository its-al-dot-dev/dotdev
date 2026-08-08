import { PlaygroundBuilder } from './builder.ts'
import type { PComponent } from '../types'
import type { BaseConfig } from './builder.types.ts'

export function definePlay<C extends PComponent>(config: BaseConfig<C>) {
  return new PlaygroundBuilder(config)
}
