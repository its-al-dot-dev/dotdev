import type { ComponentConfig } from './types.ts'

export class Component {
  readonly config: ComponentConfig

  constructor(config: ComponentConfig) {
    this.config = config
  }
}
