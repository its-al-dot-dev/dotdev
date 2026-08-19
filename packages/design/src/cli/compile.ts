import type { CompilerOptions } from '../builder/compiler.ts'
import { Compiler } from '../builder/compiler.ts'
import type { ThemeConfig } from '../builder/theme.ts'
import { Theme } from '../builder/theme.ts'

export interface CompileResult {
  css: string
  theme: Theme
}

export function compile(config: ThemeConfig, options: CompilerOptions = {}): CompileResult {
  const theme = new Theme(config)
  const compiler = new Compiler(theme)
  const css = compiler.compile({ namespace: options.namespace, scope: options.scope, kinds: options.kinds })

  return { css, theme }
}

export function parseScope(raw?: string): CompilerOptions['scope'] {
  if (!raw || raw === 'all') return 'all'
  if (raw === 'theme') return { kind: 'theme' }
  return { kind: 'component', ui: raw }
}

export function parseKinds(raw?: string): CompilerOptions['kinds'] {
  if (!raw) return undefined
  const allowed = ['primitives', 'utilities', 'rules'] as const
  const parts = raw.split(',').map((s) => s.trim()) as any[]
  return parts.filter((k) => allowed.includes(k))
}
