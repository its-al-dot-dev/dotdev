import { theme, type ThemeDefinition } from '../generated'
import { NAMESPACE, type TokenValue } from '@dotdev/design'

type PrimitiveMap = NonNullable<ThemeDefinition['primitives']>
type SemanticMap = NonNullable<ThemeDefinition['semantics']>

type PrimitiveKey = keyof PrimitiveMap & string
type SemanticKey = keyof SemanticMap & string

type PrimitiveReference = `$${PrimitiveKey}`
type SemanticReference = `$${SemanticKey}`

type StringWithSuggestions<T extends string> = T | (string & {})

type TypedTokenPrimitives = StringWithSuggestions<PrimitiveReference>
type TypedTokenSemantics = StringWithSuggestions<SemanticReference>

type TypedTokenValueSemantics = TokenValue<TypedTokenPrimitives>
type TypedTokenValueAll = TokenValue<TypedTokenPrimitives | TypedTokenSemantics>

export interface DefineThemeConfig {
  namespace: string
  primitives?: PrimitiveMap
  semantics?: ThemeDefinition<TypedTokenValueSemantics>['semantics']
  components?: ThemeDefinition<TypedTokenValueAll>['components']
}

export interface ThemeAPI {
  readonly config: ThemeDefinition
  templateToCSS: (template: string, namespace: string) => string

  toCSS(part: Record<string, TokenValue>, component?: string): string

  injectCSS(css: string, id: string, update?: boolean): void
}

export function createTheme(config: DefineThemeConfig): ThemeAPI {
  const registry = new CSSVariableRegistry()

  const { namespace, ...overrides } = config
  const merged = mergeTheme(theme as ThemeDefinition, overrides)

  return {
    config: merged,
    toCSS: (part, component = '') => {
      return createCSS(part, { namespace, component, registry })
    },
    injectCSS,
    templateToCSS: buildTemplateCSS,
  }
}

function mergeTheme(base: ThemeDefinition, override: Partial<ThemeDefinition>): ThemeDefinition {
  return deepMerge(base, override) as ThemeDefinition
}

function deepMerge(base: unknown, override: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override
  }

  const result: Record<string, unknown> = {
    ...base,
  }

  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key]

    result[key] = isPlainObject(baseValue) && isPlainObject(value) ? deepMerge(baseValue, value) : value
  }

  return result
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

interface CSSOptions {
  namespace: string
  component: string
  registry: CSSVariableRegistry
}

function createCSS(part: Record<string, TokenValue>, options: CSSOptions): string {
  const { component, namespace, registry } = options
  const prefix = createPrefix(component)

  const lightVariables: string[] = []
  const darkVariables: string[] = []

  for (const [key, value] of Object.entries(part)) {
    const variableName = createVariableName(namespace, prefix, key)

    registry.add(variableName)

    if (Array.isArray(value)) {
      const [light, dark] = value

      lightVariables.push(formatVariable(variableName, normalizeValue(light, namespace, registry)))

      darkVariables.push(formatVariable(variableName, normalizeValue(dark, namespace, registry)))

      continue
    }

    lightVariables.push(formatVariable(variableName, normalizeValue(value, options.namespace, registry)))
  }

  return createCSSDocument(lightVariables, darkVariables)
}

function createCSSDocument(lightVariables: string[], darkVariables: string[]): string {
  const root = createCSSRule(':root', lightVariables)

  if (darkVariables.length === 0) {
    return root
  }

  return [root, createCSSRule('.dark', darkVariables)].join('\n\n')
}

function createCSSRule(selector: string, variables: string[]): string {
  return `${selector} {
  ${variables.join('\n  ')}
}`
}

function formatVariable(name: string, value: string): string {
  return `${name}: ${value};`
}

function createPrefix(component: string): string {
  return component ? `-${component}-` : '-'
}

function createVariableName(namespace: string, prefix: string, key: string): string {
  return `--${namespace}${prefix}${key}`
}

function normalizeValue(value: string, namespace: string, registry: CSSVariableRegistry): string {
  if (isTokenReference(value)) {
    return resolveTokenReference(value, namespace, registry)
  }

  return normalizeNamespace(value, namespace)
}

function isTokenReference(value: string): boolean {
  return value.startsWith('$')
}

function resolveTokenReference(value: string, namespace: string, registry: CSSVariableRegistry): string {
  const key = value.slice(1)
  const [variable, alpha] = key.split('/')
  const variableName = `--${namespace}-${variable}`

  if (!registry.has(variableName)) {
    console.warn(`[dotdev/ui-kit] Unresolved variable reference: ${value}`)
  }

  return alpha ? `color-mix(in oklch, var(${variableName}) ${alpha}%, transparent)` : `var(${variableName})`
}

function normalizeNamespace(value: string, namespace: string): string {
  return value.replace(`--${NAMESPACE}-`, `--${namespace}-`)
}

class CSSVariableRegistry {
  private readonly variables = new Set<string>()

  add(name: string): void {
    this.variables.add(name)
  }

  has(name: string): boolean {
    return this.variables.has(name)
  }
}

function injectCSS(css: string, id: string, update = false): void {
  const existing = document.getElementById(id)

  if (existing) {
    if (update) existing.textContent = css
    return
  }

  const style = document.createElement('style')

  style.id = id
  style.textContent = css

  document.head.appendChild(style)
}

function buildTemplateCSS(template: string, namespace: string) {
  return template.replaceAll(NAMESPACE, namespace)
}
