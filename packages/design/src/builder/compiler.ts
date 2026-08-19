import { Theme } from './theme.ts'
import type { ComponentsState, ThemeState } from './registry.ts'
import type { RuleToken, TokenScope } from './types.ts'

export interface CompileResult {
  theme: string
  components: Map<string, string>
}

export interface CompilerOptions {
  namespace?: string
  scope?: 'all' | TokenScope | TokenScope[]
  kinds?: ('primitives' | 'utilities' | 'rules')[]
}

export class Compiler {
  private state: ThemeState
  private theme: Theme

  constructor(theme: Theme) {
    this.state = theme.registry.getTheme()
    this.theme = theme
  }

  compile(options: CompilerOptions = {}): string {
    if (options.namespace) {
      this.state = new Theme(this.theme.config, options.namespace).registry.getTheme()
    }

    const scope = options?.scope ?? 'all'
    const scopes = Array.isArray(scope) ? scope : [scope]
    const kinds = new Set(options.kinds ?? ['primitives', 'utilities', 'rules'])

    const parts: string[] = []

    for (const s of scopes) {
      if (s === 'all' || s.kind === 'theme') {
        parts.push(...this.compileTheme(kinds))
      }

      if (s === 'all') {
        for (const [_, component] of this.state.components) {
          parts.push(...this.compileComponent(component, kinds))
        }
      } else if (s.kind === 'component') {
        const component = this.state.components.get(s.ui)
        if (component) parts.push(...this.compileComponent(component, kinds))
      }
    }

    return parts.filter(Boolean).join('\n\n')
  }

  compileAll(options: CompilerOptions = {}): CompileResult {
    if (options.namespace) {
      this.state = new Theme(this.theme.config, options.namespace).registry.getTheme()
    }

    const scope = options?.scope ?? 'all'
    const scopes = Array.isArray(scope) ? scope : [scope]
    const kinds = new Set(options.kinds ?? ['primitives', 'utilities', 'rules'])

    const needsTheme = scopes.some((s) => s === 'all' || s.kind === 'theme')
    const needsAllComponents = scopes.some((s) => s === 'all')

    const theme = needsTheme ? this.compileTheme(kinds).filter(Boolean).join('\n\n') : ''

    const components = new Map<string, string>()
    const componentScopes = scopes.filter((s): s is { kind: 'component'; ui: string } => {
      return s !== 'all' && s.kind === 'component'
    })

    const allComponents = needsAllComponents
      ? [...this.state.components.entries()]
      : componentScopes.map((s) => [s.ui, this.state.components.get(s.ui)!] as const).filter(([_, c]) => c)

    for (const [name, component] of allComponents) {
      const css = this.compileComponent(component, kinds).filter(Boolean).join('\n\n')
      if (css) components.set(name, css)
    }

    return { theme, components }
  }

  private compileComponent(component: ComponentsState, kinds: Set<string>): string[] {
    const parts: string[] = []

    if (kinds.has('primitives')) {
      parts.push(this.componentPrimitivesToCSS(component))
    }

    if (kinds.has('utilities')) {
      parts.push(this.componentUtilitiesToCSS(component))
    }

    if (kinds.has('rules')) {
      parts.push(this.componentRulesToCSS(component))
    }

    return parts
  }

  private compileTheme(kinds: Set<string>): string[] {
    const parts: string[] = []

    if (kinds.has('primitives')) {
      parts.push(this.themePrimitivesToCSS())
    }

    if (kinds.has('utilities')) {
      parts.push(this.themeUtilitiesToCSS())
    }

    return parts
  }

  private themePrimitivesToCSS(): string {
    const declarations = this.state.primitives.map((t) => `  ${t.varName}: ${t.light};`).join('\n')
    const darkEntries = this.state.primitives.filter((t) => t.dark)

    const blocks: string[] = []
    if (declarations) blocks.push(`@theme {\n${declarations}\n}`)

    if (darkEntries.length) {
      const darkDecls = darkEntries.map((t) => `  ${t.varName}: ${t.dark};`).join('\n')
      blocks.push(`.dark {\n${darkDecls}\n}`)
    }

    return blocks.join('\n\n')
  }

  private themeUtilitiesToCSS(): string {
    return this.state.utilities.map((t) => `.${t.utilityName} {\n  @apply ${t.classes};\n}`).join('\n\n')
  }

  private componentPrimitivesToCSS(component: ComponentsState): string {
    const declarations = component.primitives.map((t) => `  ${t.varName}: ${t.light};`).join('\n')
    const darkEntries = component.primitives.filter((t) => t.dark)

    const blocks: string[] = []
    if (declarations) blocks.push(`@theme {\n${declarations}\n}`)

    if (darkEntries.length) {
      const darkDecls = darkEntries.map((t) => `  ${t.varName}: ${t.dark};`).join('\n')
      blocks.push(`.dark {\n ${darkDecls}\n}`)
    }

    return blocks.join('\n\n')
  }

  private componentUtilitiesToCSS(component: ComponentsState): string {
    return component.utilities.map((t) => `@utility ${t.utilityName} {\n  @apply ${t.classes};\n}`).join('\n\n')
  }

  private componentRulesToCSS(component: ComponentsState): string {
    const grouped = new Map<string, RuleToken[]>()

    for (const rule of component.rules) {
      const existing = grouped.get(rule.layer)
      if (existing) existing.push(rule)
      else grouped.set(rule.layer, [rule])
    }

    const blocks: string[] = []
    for (const [layer, rules] of grouped) {
      const entries = rules.map((t) => `  ${t.selector} {\n    @apply ${t.classes};\n  }`).join('\n')
      blocks.push(`@layer ${layer} {\n${entries}\n}`)
    }

    return blocks.join('\n\n')
  }
}
