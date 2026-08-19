import { Registry } from './registry'
import {
  renderAll,
  renderFiles,
  renderRulesAll,
  renderTypes,
  renderUtilitiesAll,
  renderVarsAll,
  type ThemeFiles,
} from './render'
import type { ComponentConfig, Scope, ThemeConfig, ThemeSource, ThemeTokens, TokenValue } from './types'
import { extractTokens } from './tokens'
import { componentSelector, isPair, nsPrefix, splitClasses } from './utils'

export class Component {
  readonly config: ComponentConfig

  constructor(config: ComponentConfig) {
    this.config = config
  }
}

function getConfig(source: ThemeSource | ThemeConfig): ThemeConfig {
  return (source as ThemeSource).config ?? source
}

function mergeComponentConfigs(base?: ComponentConfig, override?: ComponentConfig): ComponentConfig {
  if (!base) return override!
  if (!override) return base

  return {
    ui: override.ui ?? base.ui,
    layer: override.layer ?? base.layer,
    primitives: { ...base.primitives, ...override.primitives },
    semantics: { ...base.semantics, ...override.semantics },
    utilities: { ...base.utilities, ...override.utilities },
    rules: { ...base.rules, ...override.rules },
  }
}

function mergeComponents(
  base?: Record<string, { config: ComponentConfig }>,
  override?: Record<string, { config: ComponentConfig }>,
): Record<string, { config: ComponentConfig }> | undefined {
  if (!base && !override) return undefined
  if (!base) return override
  if (!override) return base

  const result: Record<string, { config: ComponentConfig }> = { ...base }
  for (const [ui, { config }] of Object.entries(override)) {
    const baseConfig = result[ui]?.config
    result[ui] = {
      config: baseConfig ? mergeComponentConfigs(baseConfig, config) : config,
    }
  }
  return result
}

function mergeThemeConfigs(base: ThemeConfig, override: ThemeConfig): ThemeConfig {
  return {
    name: override.name ?? base.name,
    namespace: override.namespace ?? base.namespace,
    primitives: { ...base.primitives, ...override.primitives },
    semantics: { ...base.semantics, ...override.semantics },
    utilities: { ...base.utilities, ...override.utilities },
    components: mergeComponents(base.components, override.components),
  }
}

function resolveExtends(source: ThemeSource | ThemeConfig, seen = new Set<object>()): ThemeConfig {
  const config = getConfig(source)
  if (!config.extend) return config

  const extendsList = Array.isArray(config.extend) ? config.extend : [config.extend]
  const resolved: ThemeConfig[] = []

  for (const ext of extendsList) {
    const extConfig = getConfig(ext)
    if (seen.has(extConfig)) {
      throw new Error('Circular theme extend detected')
    }
    seen.add(extConfig)
    resolved.push(resolveExtends(extConfig, seen))
  }

  return resolved.reduce((acc, cfg) => mergeThemeConfigs(acc, cfg), config)
}

export class Theme implements ThemeSource {
  readonly config: ThemeConfig
  readonly registry: Registry = new Registry()
  readonly name: string
  readonly namespace: string | undefined

  constructor(config: ThemeConfig) {
    this.config = config
    const extended = resolveExtends(config)
    const merged = mergeThemeConfigs(extended, config)

    this.name = merged.name ?? 'Default'
    this.namespace = merged.namespace

    this.addPrimitives({ kind: 'theme' }, merged.primitives, merged.namespace)
    this.addSemantics({ kind: 'theme' }, merged.semantics, merged.namespace)
    this.addUtilities({ kind: 'theme' }, merged.utilities)
    this.addComponents(merged.components, merged.namespace)
  }

  toCSS(): string {
    return renderAll(this.registry)
  }

  toVarsCSS(): string {
    return renderVarsAll(this.registry)
  }

  toUtilitiesCSS(): string {
    return renderUtilitiesAll(this.registry)
  }

  toRulesCSS(): string {
    return renderRulesAll(this.registry)
  }

  toFiles(): ThemeFiles {
    return renderFiles(this.registry)
  }

  toTypes(): string {
    return renderTypes(this.registry, this.name)
  }

  toTokens(): ThemeTokens {
    return extractTokens(this.registry, this.namespace)
  }

  private addPrimitives(scope: Scope, entries?: Record<string, string>, namespace?: string) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      this.registry.addPrimitive(scope, name, value, namespace)
    }
  }

  private addSemantics(scope: Scope, entries?: Record<string, TokenValue>, namespace?: string) {
    for (const [name, value] of Object.entries(entries ?? {})) {
      const [light, dark] = isPair(value) ? value : [value, undefined]
      this.registry.addSemantic(scope, name, light, dark, namespace)
    }
  }

  private addUtilities(scope: Scope, entries?: Record<string, string>, prefix?: string) {
    for (const [name, source] of Object.entries(entries ?? {})) {
      this.registry.addUtility(scope, name, prefix ? `${prefix}-${name}` : name, splitClasses(source))
    }
  }

  private addComponents(entries?: Record<string, { config: ComponentConfig }>, namespace?: string) {
    for (const [, component] of Object.entries(entries ?? {})) {
      this.registerComponent(component.config, namespace)
    }
  }

  private registerComponent(config: ComponentConfig, namespace: string | undefined) {
    const scope: Scope = { kind: 'component', ui: config.ui }
    const ns = nsPrefix(namespace)
    const layer = config.layer ?? 'components'

    this.addPrimitives(scope, config.primitives, namespace)
    this.addSemantics(scope, config.semantics, namespace)
    this.addUtilities(scope, config.utilities, config.ui)

    for (const [raw, source] of Object.entries(config.rules ?? {})) {
      this.registry.addRule(scope, layer, componentSelector(raw, ns, config.ui), splitClasses(source))
    }
  }
}
