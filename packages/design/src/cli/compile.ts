import type { CompileResult, CompilerOptions } from '../builder/compiler.ts'
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

export function parseScope(raw?: string) {
  if (!raw || raw === 'all') return 'all' as const
  if (raw === 'theme') return { kind: 'theme' } as const
  return { kind: 'component', ui: raw } as const
}

export function applyExclude(
  scope: 'all' | TokenScope | TokenScope[],
  exclude?: string,
  componentNames?: string[],
): 'all' | TokenScope | TokenScope[] {
  if (!exclude) return scope
  const excluded = new Set(exclude.split(',').map((s) => s.trim()))

  if (scope === 'all') {
    if (excluded.size === 0) return 'all'
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
