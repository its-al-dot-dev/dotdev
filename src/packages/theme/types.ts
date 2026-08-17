export type Scope = { kind: 'theme' } | { kind: 'component'; ui: string }

export type Category = 'length' | 'color'

export interface ComponentLike {
  config: ComponentConfig
}

export interface ThemeConfig {
  name?: string
  namespace?: string
  primitives?: Record<string, string>
  semantics?: Record<string, string | readonly [string, string]>
  utilities?: Record<string, string>
  components?: Record<string, ComponentConfig | ComponentLike>
}

export interface ComponentConfig {
  ui: string
  semantics?: Record<string, string | readonly [string, string]>
  utilities?: Record<string, string>
  rules?: Record<string, string>
}

export interface ThemeTokens {
  primitives: Record<string, string>
  semantics: Record<string, string | readonly [string, string]>
  components: Record<string, Record<string, string | readonly [string, string]>>
}

export type ResolvedValue =
  { kind: 'ref'; varName: string; opacity?: number } | { kind: 'raw'; value: string; opacity?: number }

interface BaseEntry {
  name: string
  scope: Scope
  varName: string
}

export interface PrimitiveEntry extends BaseEntry {
  kind: 'primitive'
  value: string
}

export interface SemanticEntry extends BaseEntry {
  kind: 'semantic'
  utilityName: string
  twKey: string
  light: string
  dark?: string
}

export interface UtilityEntry {
  kind: 'utility'
  name: string
  scope: Scope
  utilityName: string
  classes: string[]
}

export interface RuleEntry {
  kind: 'rule'
  scope: Scope
  selector: string
  classes: string[]
}

export type RegistryEntry = PrimitiveEntry | SemanticEntry | UtilityEntry | RuleEntry

export function isPair(value: string | readonly [string, string]): value is readonly [string, string] {
  return Array.isArray(value)
}

export function matchesScope(scope: Scope, ui?: string): boolean {
  if (ui === undefined) return scope.kind === 'theme'
  return scope.kind === 'component' && scope.ui === ui
}
