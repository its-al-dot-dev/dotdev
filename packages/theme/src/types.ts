export type Scope = { kind: 'theme' } | { kind: 'component'; ui: string }

export type Category = 'length' | 'color'

/** Single value or [light, dark] pair */
export type TokenValue = string | readonly [string, string]

export interface ThemeConfig {
  name?: string
  namespace?: string
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  components?: Record<string, { config: ComponentConfig }>
}

export interface ComponentConfig {
  ui: string
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  rules?: Record<string, string>
}

export interface ThemeTokens {
  primitives: Record<string, string>
  semantics: Record<string, TokenValue>
  components: Record<string, Record<string, TokenValue>>
}

export type ResolvedValue =
  { kind: 'ref'; varName: string; opacity?: number } | { kind: 'raw'; value: string; opacity?: number }

export interface PrimitiveEntry {
  kind: 'primitive'
  name: string
  varName: string
  value: string
  global: boolean
  scope: Scope
}

export interface SemanticEntry {
  kind: 'semantic'
  name: string
  scope: Scope
  varName: string
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
