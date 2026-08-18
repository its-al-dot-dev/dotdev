import type { ThemeTokens, TokenValue } from '../types'
import { parts } from '../utils'
import { injectCSS } from './inject'

export interface ThemeDefinition<T extends ThemeTokens = ThemeTokens> {
  tokens?: T
  namespace?: string
  primitives?: { [K in keyof T['primitives']]?: string }
  semantics?: { [K in keyof T['semantics']]?: TokenValue }
  components?: {
    [U in keyof T['components']]?: {
      [K in keyof T['components'][U]]?: TokenValue
    }
  }
}

const OPACITY_RE = /\/(\d{1,3})$/m

function isRawCSSValue(value: string): boolean {
  const trimmed = value.trim()
  return (
    /^#([0-9a-fA-F]{3,8})$/.test(trimmed) ||
    /^(\d*\.?\d+)(rem|em|px|%|vh|vw|ch|ex)$/.test(trimmed) ||
    /^(\d*\.?\d+)$/.test(trimmed) ||
    /^(rgba?|hsla?)\(/.test(trimmed) ||
    trimmed === 'transparent' ||
    trimmed === 'currentcolor' ||
    trimmed === 'inherit' ||
    trimmed === 'initial' ||
    trimmed === 'unset'
  )
}

function varRef(value: string, ns: string): string {
  const trimmed = value.trim()

  if (isRawCSSValue(trimmed)) return trimmed

  if (trimmed.startsWith('color-mix')) return trimmed

  const { base, opacity } = parseOpacity(trimmed)

  const varName = base.startsWith('$')
    ? `--${ns}-${base.slice(1)}`
    : base.startsWith('--')
      ? `--${ns}-${base.slice(2)}`
      : base.startsWith('var(')
        ? base
        : `--${ns}-${base}`

  const source = varName.startsWith('var(') ? varName : `var(${varName})`

  if (opacity == null) return source
  return `color-mix(in oklab, ${source} ${opacity}%, transparent)`
}

function parseOpacity(input: string): { base: string; opacity?: number } {
  const match = OPACITY_RE.exec(input)
  if (!match) return { base: input }
  return { base: input.slice(0, -match[0].length), opacity: Number(match[1]) }
}

export function mergeTokens<T extends ThemeTokens = ThemeTokens>(
  base: T | undefined,
  def: ThemeDefinition<T>,
): ThemeTokens {
  const primitives: Record<string, string> = { ...(base?.primitives ?? {}) }
  for (const [name, value] of Object.entries(def.primitives ?? {})) {
    if (value != null) primitives[name] = value
  }

  const semantics: Record<string, TokenValue> = { ...(base?.semantics ?? {}) }
  for (const [name, value] of Object.entries(def.semantics ?? {})) {
    if (value != null) semantics[name] = value
  }

  const components: Record<string, Record<string, TokenValue>> = {}
  for (const [ui, map] of Object.entries(base?.components ?? {})) {
    components[ui] = { ...map }
  }
  for (const [ui, map] of Object.entries(def.components ?? {})) {
    components[ui] = { ...(components[ui] ?? {}), ...map }
  }

  return { primitives, semantics, components }
}

export function validateTokens(tokens: ThemeTokens): void {
  const known = new Set([...Object.keys(tokens.primitives), ...Object.keys(tokens.semantics)])

  for (const map of Object.values(tokens.components)) {
    for (const name of Object.keys(map)) known.add(name)
  }

  const check = (value: string) => {
    for (const match of value.matchAll(/\$([\w-]+)/g)) {
      if (!known.has(match[1])) {
        throw new Error(`Unknown token reference: $${match[1]}`)
      }
    }
  }

  for (const value of Object.values(tokens.semantics)) {
    for (const part of parts(value)) check(part)
  }

  for (const map of Object.values(tokens.components)) {
    for (const value of Object.values(map)) {
      for (const part of parts(value)) check(part)
    }
  }
}

export function renderRuntimeVars(tokens: ThemeTokens, namespace: string, component?: string): string {
  const ns = `${namespace}-`
  const decl = (varName: string, value: string): string =>
    `  ${varName}: ${varRef(value.replaceAll('{ns}', namespace), namespace)};`

  const blocks: string[] = []

  if (component) {
    const map = tokens.components[component]

    if (!map) return ''

    const rootLines: string[] = []
    const darkLines: string[] = []

    for (const [name, value] of Object.entries(map)) {
      const [light, dark] = Array.isArray(value) ? value : [value, undefined]
      rootLines.push(decl(`--${ns}${component}-${name}`, light))
      if (dark != null) darkLines.push(decl(`--${ns}${component}-${name}`, dark))
    }

    blocks.push(`:root {\n${rootLines.join('\n')}\n}`)

    if (darkLines.length) blocks.push(`.dark {\n${darkLines.join('\n')}\n}`)

    return blocks.join('\n\n')
  }

  const root: string[] = []
  const dark: string[] = []

  for (const [name, value] of Object.entries(tokens.primitives)) {
    root.push(decl(`--${ns}${name}`, value))
  }

  for (const [name, value] of Object.entries(tokens.semantics)) {
    const [light, d] = Array.isArray(value) ? value : [value, undefined]
    root.push(decl(`--${ns}${name}`, light))
    if (d != null) dark.push(decl(`--${ns}${name}`, d))
  }

  if (root.length) blocks.push(`:root {\n${root.join('\n')}\n}`)
  if (dark.length) blocks.push(`.dark {\n${dark.join('\n')}\n}`)

  return blocks.join('\n\n')
}

export function defineTheme<T extends ThemeTokens = ThemeTokens>(def: ThemeDefinition<T>) {
  const defaults = def.tokens
  const namespace = def.namespace ?? 'd'
  const tokens = mergeTokens(defaults, def)
  validateTokens(tokens)

  return {
    namespace,
    tokens,
    css: renderRuntimeVars(tokens, namespace),
    injectCSS,
    renderRuntimeVars,
    inject() {
      injectCSS(this.css, `theme-${this.namespace}`)
    },
  }
}
