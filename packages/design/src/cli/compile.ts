import type { CompileResult, CompilerOptions, CompilerScope } from '../builder/compiler.ts'
import { Compiler } from '../builder/compiler.ts'
import type { ThemeConfig } from '../builder/theme.ts'
import { Theme } from '../builder/theme.ts'
import type { TokenScope } from '../builder/types.ts'

export interface Result {
  css: string
  structured: CompileResult
  theme: Theme
}

export function compile(config: ThemeConfig, options: CompilerOptions = {}): Result {
  const theme = new Theme(config)
  const compiler = new Compiler(theme)
  const structured = compiler.compileAll({ namespace: options.namespace, scope: options.scope, kinds: options.kinds })
  const css = [structured.theme, ...structured.components.values()].filter(Boolean).join('\n\n')

  return { css, structured, theme }
}

export function parseScope(raw?: string): CompilerScope {
  if (!raw || raw === 'all') return { kind: 'all' }
  if (raw === 'theme') return { kind: 'theme' }
  return { kind: 'component', ui: raw }
}

export function applyExclude(scope: CompilerScope, exclude?: string, componentNames?: string[]): CompilerScope {
  if (!exclude) return scope
  const excluded = new Set(exclude.split(',').map((s) => s.trim()))

  if (!Array.isArray(scope) && scope.kind === 'all') {
    if (excluded.size === 0) return { kind: 'all' }

    const parts: TokenScope[] = []

    if (!excluded.has('theme')) parts.push({ kind: 'theme' })

    if (componentNames) {
      for (const name of componentNames) {
        if (!excluded.has(name)) parts.push({ kind: 'component', ui: name })
      }
    }

    if (parts.length === 0) return scope
    return parts.length === 1 ? parts[0] : parts
  }

  const scopes = Array.isArray(scope) ? scope : [scope]
  const filtered = scopes.filter((s) => {
    if (s.kind === 'theme') return !excluded.has('theme')
    return !excluded.has(s.ui)
  })

  if (filtered.length === 0) return scope
  return filtered.length === 1 ? filtered[0] : filtered
}

export function parseKinds(raw?: string): CompilerOptions['kinds'] {
  if (!raw) return undefined
  const allowed = ['primitives', 'utilities', 'rules'] as const
  const parts = raw.split(',').map((s) => s.trim()) as any[]
  return parts.filter((k) => allowed.includes(k))
}
