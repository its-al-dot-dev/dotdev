export type TokenScope = { kind: 'theme' } | { kind: 'component'; ui: string }

export type TokenValue<T = string> = T | [T, T]

export type TokenExpression = { kind: 'css'; value: string } | { kind: 'reference'; name: string; alpha?: number }

export interface PrimitiveToken {
  kind: 'primitive'
  name: string
  varName: string
  global: boolean
  scope: TokenScope
  light: string
  dark?: string
}

export interface SemanticToken {
  kind: 'semantic'
  name: string
  scope: TokenScope
  varName: string
  utilityName: string
  utilityPrefix: string
  value: TokenValue
}

export interface UtilityToken {
  kind: 'utility'
  name: string
  scope: TokenScope
  utilityName: string
  classes: string
}

export interface RuleToken {
  kind: 'rule'
  scope: TokenScope
  layer: string
  selector: string
  classes: string
}

export interface ComponentConfig {
  ui: string
  layer?: string
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  rules?: Record<string, string>
}

export type ComponentEntry = Record<string, { config: ComponentConfig }>

export interface ToCssOptions {
  scope?: 'all' | TokenScope
  kinds?: ('primitives' | 'utilities' | 'rules')[]
}
