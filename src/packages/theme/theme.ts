import { Registry, semanticEntry } from './registry'
import { renderAll, renderFiles, renderTypes, type ThemeFiles } from './render'
import type { ComponentConfig, RuleEntry, Scope, ThemeConfig, ThemeTokens, UtilityEntry } from './types'
import { isPair } from './types'
import { emitValue, resolveValue } from './value'

function nsPrefix(namespace?: string): string {
  return namespace ? `${namespace}-` : ''
}

function splitClasses(source: string): string[] {
  return source.trim().split(/\s+/).filter(Boolean)
}

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
  private readonly ns: string

  constructor(config: ThemeConfig) {
    this.name = config.name ?? 'Default'
    this.namespace = config.namespace
    this.ns = nsPrefix(config.namespace)

    for (const [rawName, value] of Object.entries(config.primitives ?? {})) {
      const name = rawName.replace(/^--/, '')
      this.registry.add({
        kind: 'primitive',
        name,
        scope: { kind: 'theme' },
        varName: `--${this.ns}${name}`,
        value,
      })
    }

    for (const [name, value] of Object.entries(config.semantics ?? {})) {
      const [light, dark] = Array.isArray(value) ? value : [value, undefined]
      this.registry.add(semanticEntry({ kind: 'theme' }, name, light, dark, config.namespace))
    }

    for (const [name, source] of Object.entries(config.utilities ?? {})) {
      const entry: UtilityEntry = {
        kind: 'utility',
        name,
        scope: { kind: 'theme' },
        utilityName: name,
        classes: splitClasses(source),
      }
      this.registry.add(entry)
    }

    for (const [, maybeComponent] of Object.entries(config.components ?? {})) {
      const config_ = 'config' in maybeComponent ? maybeComponent.config : maybeComponent
      this.registerComponent(config_, config.namespace)
    }
  }

  render(): string {
    return renderAll(this.registry)
  }

  build(): ThemeFiles {
    return renderFiles(this.registry)
  }

  types(): string {
    return renderTypes(this.registry, this.name)
  }

  tokens(): ThemeTokens {
    const primitives: Record<string, string> = {}
    const semantics: Record<string, string | readonly [string, string]> = {}
    const components: Record<string, Record<string, string>> = {}

    for (const entry of this.registry.primitives()) {
      primitives[entry.name] = entry.value
    }
    for (const entry of this.registry.semantics()) {
      if (entry.scope.kind === 'theme') {
        semantics[entry.name] = entry.dark != null ? [entry.light, entry.dark] : entry.light
      } else {
        const map = (components[entry.scope.ui] ??= {})
        map[entry.name] = entry.light
      }
    }
    return { primitives, semantics, components }
  }

  resolve(): ThemeTokens {
    const tokens = this.tokens()
    if (!this.ns) return tokens

    const sub = (s: string) => s.replaceAll(`--${this.ns}`, '--{ns}-')
    const resolvePart = (v: string) => sub(emitValue(resolveValue(v, this.registry)))
    const resolveValue_ = (v: string | readonly [string, string]): string | readonly [string, string] =>
      isPair(v) ? [resolvePart(v[0]), resolvePart(v[1])] : resolvePart(v)

    const semantics: Record<string, string | readonly [string, string]> = {}
    for (const [name, value] of Object.entries(tokens.semantics)) {
      semantics[name] = resolveValue_(value)
    }
    const components: Record<string, Record<string, string | readonly [string, string]>> = {}
    for (const [ui, map] of Object.entries(tokens.components)) {
      const out: Record<string, string | readonly [string, string]> = {}
      for (const [name, value] of Object.entries(map)) out[name] = resolveValue_(value)
      components[ui] = out
    }
    return { primitives: tokens.primitives, semantics, components }
  }

  private registerComponent(config: ComponentConfig, namespace: string | undefined) {
    const scope: Scope = { kind: 'component', ui: config.ui }
    const ns = nsPrefix(namespace)

    for (const [name, value] of Object.entries(config.semantics ?? {})) {
      const [light, dark] = Array.isArray(value) ? value : [value, undefined]
      this.registry.add(semanticEntry(scope, name, light, dark, namespace))
    }

    for (const [name, source] of Object.entries(config.utilities ?? {})) {
      const entry: UtilityEntry = {
        kind: 'utility',
        name,
        scope,
        utilityName: `${config.ui}-${name}`,
        classes: splitClasses(source),
      }
      this.registry.add(entry)
    }

    for (const [raw, source] of Object.entries(config.rules ?? {})) {
      const entry: RuleEntry = {
        kind: 'rule',
        scope,
        selector: raw.replaceAll('&', `.${ns}${config.ui}`).replaceAll('..', `.`),
        classes: splitClasses(source),
      }
      this.registry.add(entry)
    }
  }
}
