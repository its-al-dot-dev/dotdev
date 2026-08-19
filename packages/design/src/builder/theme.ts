import { Registry } from './registry.ts'
import type { ComponentConfig, ComponentEntry, TokenScope, TokenValue } from './types.ts'

export interface ThemeConfig {
  name?: string
  extend?: ThemeConfig
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  components?: ComponentEntry
}

export const NAMESPACE = '_NS_'

export class Theme {
  public registry: Registry
  readonly config: ThemeConfig
  private readonly namespace: string = NAMESPACE

  constructor(config: ThemeConfig, namespace?: string) {
    this.namespace = namespace ?? this.namespace
    const extended = config.extend ? this.resolveExtends(config.extend) : undefined
    const merged = extended ? this.mergeConfigs(extended, config) : config

    this.registry = new Registry(this.namespace)
    this.config = merged

    this.registerPrimitives({ kind: 'theme' }, merged.primitives)
    this.registerSemantics({ kind: 'theme' }, merged.semantics)
    this.registerUtilities({ kind: 'theme' }, merged.utilities)
    this.registerComponents(merged.components)
  }

  toJSON() {
    return {
      config: this.config,
      registry: this.registry.toJSON(),
    }
  }

  private registerPrimitives(scope: TokenScope, entries?: Record<string, string>) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      this.registry.addPrimitive(scope, name, value)
    }
  }

  private registerSemantics(scope: TokenScope, entries?: Record<string, TokenValue>) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      this.registry.addSemantic(scope, name, value)
    }
  }

  private registerUtilities(scope: TokenScope, entries?: Record<string, string>) {
    for (const [name, classes] of Object.entries(entries ?? {})) {
      this.registry.addUtility(scope, name, classes)
    }
  }

  private registerComponents(entries?: ComponentEntry) {
    for (const component of Object.values(entries ?? {})) {
      this.registerComponent(component.config)
    }
  }

  private registerComponent(config: ComponentConfig) {
    const scope: TokenScope = { kind: 'component', ui: config.ui }
    const layer = config.layer ?? 'components'

    this.registerPrimitives(scope, config.primitives)
    this.registerSemantics(scope, config.semantics)
    this.registerUtilities(scope, config.utilities)

    for (const [selector, classes] of Object.entries(config.rules ?? {})) {
      this.registry.addRule(scope, layer, selector, classes)
    }
  }

  private resolveExtends(source: ThemeConfig): ThemeConfig {
    const chain: ThemeConfig[] = []
    let current: ThemeConfig | undefined = source

    while (current) {
      if (chain.includes(current)) {
        const message = `[theme] circular "extend" detected: ${chain.map((c) => c.name ?? '(unnamed)').join(' → ')} → ${current.name ?? '(unnamed)'}`
        throw new Error(message)
      }

      chain.push(current)
      current = current.extend
    }

    return chain[chain.length - 1]
  }

  private mergeConfigs(base: ThemeConfig, override: ThemeConfig): ThemeConfig {
    return {
      name: override.name ?? base.name,
      primitives: { ...base.primitives, ...override.primitives },
      semantics: { ...base.semantics, ...override.semantics },
      utilities: { ...base.utilities, ...override.utilities },
      components: this.mergeComponents(base.components, override.components),
    }
  }

  private mergeComponents(base?: ComponentEntry, override?: ComponentEntry): ComponentEntry | undefined {
    if (!base && !override) return undefined
    if (!base) return override
    if (!override) return base

    const result: ComponentEntry = { ...base }

    for (const [ui, { config }] of Object.entries(override)) {
      const baseConfig = result[ui]?.config

      result[ui] = {
        config: baseConfig ? this.mergeComponentConfigs(baseConfig, config) : config,
      }
    }

    return result
  }

  private mergeComponentConfigs(base: ComponentConfig, override: ComponentConfig): ComponentConfig {
    return {
      ui: override.ui ?? base.ui,
      layer: override.layer ?? base.layer,
      primitives: { ...base.primitives, ...override.primitives },
      semantics: { ...base.semantics, ...override.semantics },
      utilities: { ...base.utilities, ...override.utilities },
      rules: { ...base.rules, ...override.rules },
    }
  }
}
