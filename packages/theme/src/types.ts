export type Scope = { kind: 'theme' } | { kind: 'component'; ui: string }

export type Category = 'length' | 'color'

/** Single value or [light, dark] pair */
export type TokenValue = string | readonly [string, string]

export interface ThemeConfig {
  name?: string
  namespace?: string
  extend?: ThemeSource | ThemeConfig | (ThemeSource | ThemeConfig)[]
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  components?: Record<string, { config: ComponentConfig }>
}

export interface ThemeSource {
  config: ThemeConfig
}

export interface ComponentConfig {
  ui: string
  layer?: string
  primitives?: Record<string, string>
  semantics?: Record<string, TokenValue>
  utilities?: Record<string, string>
  rules?: Record<string, string>
}

export type PartialThemeTokens<T extends ThemeTokens = ThemeTokens> = {
  primitives?: Partial<T['primitives']>
  semantics?: Partial<T['semantics']>
  components?: {
    [U in keyof T['components']]?: Partial<T['components'][U]>
  }
}

export interface ThemeTokens {
  primitives: Record<string, string>
  semantics: Record<string, TokenValue>
  components: Record<string, Record<string, TokenValue>>
}

export type ResolvedValue =
  | {
      kind: 'ref'
      varName: string
      opacity?: number
    }
  | {
      kind: 'raw'
      value: string
      opacity?: number
    }

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
  layer: string
  selector: string
  classes: string[]
}

export type Part =
  | 'all'
  | 'vars'
  | 'utilities'
  | 'rules'
  | 'tokens'
  | 'templates'
  | `templates:${string}`
  | 'components'
  | `components:${string}`

export interface BuildTarget {
  name: string
  type: 'css' | 'tokens'
  parts?: Part[]
}

export interface BuildConfig {
  input: string
  output?: string
  targets: BuildTarget[]
  watch?: boolean
  watchPath?: string
}
