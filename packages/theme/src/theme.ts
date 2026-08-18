import { Registry } from './registry'
import { renderAll, renderFiles, renderTypes, renderVarsAll, renderUtilitiesAll, renderRulesAll, type ThemeFiles } from './render'
import type { ComponentConfig, Scope, ThemeConfig, ThemeTokens, TokenValue } from './types'
import { extractTokens } from './tokens'
import { componentSelector, isPair, nsPrefix, splitClasses } from './utils'

export class Component {
  readonly config: ComponentConfig

  constructor(config: ComponentConfig) {
    this.config = config
  }
}

export class Theme {
  readonly registry: Registry = new Registry()
  readonly name: string
  readonly namespace: string | undefined

  constructor(config: ThemeConfig) {
    this.name = config.name ?? 'Default'
    this.namespace = config.namespace

    this.addPrimitives({ kind: 'theme' }, config.primitives, config.namespace)
    this.addSemantics({ kind: 'theme' }, config.semantics, config.namespace)
    this.addUtilities({ kind: 'theme' }, config.utilities)
    this.addComponents(config.components, config.namespace)
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
