import { Theme } from './theme.ts'
import type { ComponentsState, ThemeState } from './registry.ts'
import type { PrimitiveToken, RuleToken, TokenScope, UtilityToken } from './types.ts'

export interface CompileResult {
  theme: string
  components: Map<string, string>
}

export type CompilerScope = { kind: 'all' } | TokenScope | TokenScope[]
export type CompilerKind = 'primitives' | 'utilities' | 'rules'

export interface CompilerOptions {
  namespace?: string
  scope?: CompilerScope
  kinds?: CompilerKind[]
}

export class Compiler {
  private state: ThemeState
  private theme: Theme

  constructor(theme: Theme) {
    this.state = theme.registry.getTheme()
    this.theme = theme
  }

  compile(options: CompilerOptions = {}): string {
    const { theme, components } = this.compileAll(options)
    return [theme, ...components.values()].filter(Boolean).join('\n\n')
  }

  compileAll(options: CompilerOptions = {}): CompileResult {
    this.applyNamespace(options.namespace)

    const { scopes, kinds } = this.resolveOptions(options)

    const needsTheme = scopes.some((s) => s.kind === 'all' || s.kind === 'theme')
    const needsAllComponents = scopes.some((s) => s.kind === 'all')

    const theme = needsTheme ? this.renderTheme(kinds) : ''

    const components = new Map<string, string>()
    const componentScopes = scopes.filter((s): s is { kind: 'component'; ui: string } => s.kind === 'component')

    const allComponents = needsAllComponents
      ? [...this.state.components.entries()]
      : componentScopes.map((s) => [s.ui, this.state.components.get(s.ui)] as const).filter(([_, c]) => c)

    for (const [name, component] of allComponents) {
      if (!component) continue
      const css = this.renderComponent(component, kinds)
      if (css) components.set(name, css)
    }

    return { theme, components }
  }

  private resolveOptions(options: CompilerOptions) {
    const scope = options?.scope ?? { kind: 'all' }
    const scopes = Array.isArray(scope) ? scope : [scope]
    const kinds = new Set(options.kinds ?? ['primitives', 'utilities', 'rules'])
    return { scopes, kinds }
  }

  private applyNamespace(namespace?: string) {
    if (namespace) {
      this.state = new Theme(this.theme.config, namespace).registry.getTheme()
    }
  }

  private renderTheme(kinds: Set<string>): string {
    const parts: string[] = []

    if (kinds.has('primitives')) {
      parts.push(this.primitivesToCSS(this.state.primitives))
    }

    if (kinds.has('utilities')) {
      parts.push(this.utilitiesToCSS(this.state.utilities))
    }

    return parts.filter(Boolean).join('\n\n')
  }

  private renderComponent(component: ComponentsState, kinds: Set<string>): string {
    const parts: string[] = []

    if (kinds.has('primitives')) {
      parts.push(this.primitivesToCSS(component.primitives))
    }

    if (kinds.has('utilities')) {
      parts.push(this.utilitiesToCSS(component.utilities))
    }

    if (kinds.has('rules')) {
      parts.push(this.rulesToCSS(component.rules))
    }

    return parts.filter(Boolean).join('\n\n')
  }

  private primitivesToCSS(tokens: PrimitiveToken[]): string {
    const declarations = tokens.map((t) => `  ${t.varName}: ${t.light};`).join('\n')
    const darkEntries = tokens.filter((t) => t.dark)

    const blocks: string[] = []
    if (declarations) blocks.push(`@theme {\n${declarations}\n}`)

    if (darkEntries.length) {
      const darkDecls = darkEntries.map((t) => `  ${t.varName}: ${t.dark};`).join('\n')
      blocks.push(`.dark {\n${darkDecls}\n}`)
    }

    return blocks.join('\n\n')
  }

  private utilitiesToCSS(tokens: UtilityToken[]): string {
    return tokens.map((t) => `.${t.utilityName} {\n  @apply ${t.classes};\n}`).join('\n\n')
  }

  private rulesToCSS(rules: RuleToken[]): string {
    const grouped = new Map<string, RuleToken[]>()

    for (const rule of rules) {
      const existing = grouped.get(rule.layer)
      if (existing) existing.push(rule)
      else grouped.set(rule.layer, [rule])
    }

    const blocks: string[] = []
    for (const [layer, layerRules] of grouped) {
      const entries = layerRules.map((t) => `  ${t.selector} {\n    @apply ${t.classes};\n  }`).join('\n')
      blocks.push(`@layer ${layer} {\n${entries}\n}`)
    }

    return blocks.join('\n\n')
  }
}
