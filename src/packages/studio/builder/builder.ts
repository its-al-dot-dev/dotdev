import type { BaseConfig, PlaygroundManifest, Variant, VariantConfig } from './builder.types.ts'
import type { PComponent } from '../types'
import type { PlayComponentMeta } from '../plugin/component-meta.types.ts'

export class PlaygroundBuilder<C extends PComponent> {
  private readonly component: C
  private readonly meta?: PlayComponentMeta
  private readonly baseConfig: BaseConfig<C>
  private readonly variants: Variant<C>[] = []

  constructor(config: BaseConfig<C>) {
    this.component = config.component
    this.meta = config.component?.__meta
    this.baseConfig = config

    this.variants.push({
      name: config.name || 'Default',
      config: {
        key: 'default',
        props: config.props,
      },
    })
  }

  variant<R extends PComponent | undefined = undefined>(name: string, config: VariantConfig<C, R> = {}): this {
    const key = config.key ?? slugify(name)

    this.variants.push({
      name,
      config: { ...config, key },
    })

    return this
  }

  build(): PlaygroundManifest<C> {
    return {
      component: this.component,
      meta: this.meta,
      base: this.baseConfig,
      variants: [...this.variants],
    }
  }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^\w-]+/g, '')
}
