import { Theme } from './theme.ts'
import type { ComponentsState, ThemeState } from './registry.ts'
import type { PrimitiveToken, RuleToken, TokenScope, UtilityToken } from './types.ts'

export interface CompileResult {
  theme: string
  components: Map<string, string>
}

export type CompilerScope = { kind: 'all' } | TokenScope | TokenScope[]
export type CompilerKind = 'primitives' | 'utilities' | 'rules'

type ResolvedScope = { kind: 'all' } | TokenScope

export interface CompilerOptions {
  namespace?: string
  scope?: CompilerScope
  kinds?: CompilerKind[]
}

const DEFAULT_KINDS: CompilerKind[] = ['primitives', 'utilities', 'rules']

export class Compiler {
  private readonly theme: Theme
  private readonly state: ThemeState

  constructor(theme: Theme) {
    this.theme = theme
    this.state = theme.registry.getTheme()
  }

  compile(options: CompilerOptions = {}): string {
    const { theme, components } = this.compileAll(options)
    return [theme, ...components.values()].filter(Boolean).join('\n\n')
  }

  compileAll(options: CompilerOptions = {}): CompileResult {
    const state = this.resolveState(options.namespace)
    const scopes = this.resolveScopes(options.scope)
    const kinds = this.resolveKinds(options.kinds)

    const theme = this.needsTheme(scopes) ? this.renderTheme(state, kinds) : ''
    const components = this.compileComponents(state, scopes, kinds)

    return { theme, components }
  }

  private resolveState(namespace?: string): ThemeState {
    if (!namespace) return this.state
    return new Theme(this.theme.config, namespace).registry.getTheme()
  }

  private resolveScopes(scope?: CompilerScope): ResolvedScope[] {
    if (!scope) return [{ kind: 'all' }]
    return Array.isArray(scope) ? scope : [scope]
  }

  private resolveKinds(kinds?: CompilerKind[]): Set<CompilerKind> {
    return new Set(kinds ?? DEFAULT_KINDS)
  }

  private compileComponents(state: ThemeState, scopes: ResolvedScope[], kinds: Set<CompilerKind>): Map<string, string> {
    const result = new Map<string, string>()

    for (const [name, component] of this.resolveComponents(state, scopes)) {
      const css = this.renderComponent(component, kinds)
      if (css) result.set(name, css)
    }

    return result
  }

  private resolveComponents(state: ThemeState, scopes: ResolvedScope[]): Iterable<[string, ComponentsState]> {
    if (this.needsAllComponents(scopes)) {
      return state.components
    }

    const entries: [string, ComponentsState][] = []

    for (const scope of scopes) {
      if (scope.kind !== 'component') continue
      const component = state.components.get(scope.ui)
      if (component) entries.push([scope.ui, component])
    }

    return entries
  }

  private needsTheme(scopes: ResolvedScope[]): boolean {
    return scopes.some((scope) => scope.kind === 'all' || scope.kind === 'theme')
  }

  private needsAllComponents(scopes: ResolvedScope[]): boolean {
    return scopes.some((scope) => scope.kind === 'all')
  }

  private renderTheme(state: ThemeState, kinds: Set<CompilerKind>): string {
    const blocks: string[] = []

    if (kinds.has('primitives')) {
      blocks.push(this.primitivesToCSS(state.primitives))
    }

    if (kinds.has('utilities')) {
      blocks.push(this.utilitiesToCSS(state.utilities))
    }

    return this.join(blocks)
  }

  private renderComponent(component: ComponentsState, kinds: Set<CompilerKind>): string {
    const blocks: string[] = []

    if (kinds.has('primitives')) {
      blocks.push(this.primitivesToCSS(component.primitives))
    }

    if (kinds.has('utilities')) {
      blocks.push(this.utilitiesToCSS(component.utilities))
    }

    if (kinds.has('rules')) {
      blocks.push(this.rulesToCSS(component.rules))
    }

    return this.join(blocks)
  }

  /* Template generators */

  private generateThemeTemplate() {
    return
  }

  private generateComponentTemplate() {}

  /* CSS generators */

  private primitivesToCSS(tokens: PrimitiveToken[]): string {
    if (!tokens.length) return ''

    const blocks: string[] = []

    const declarations = tokens.map((token) => `  ${token.varName}: ${token.light};`).join('\n')
    blocks.push(`@theme {\n${declarations}\n}`)

    const darkTokens = tokens.filter((token) => token.dark)

    if (darkTokens.length) {
      const darkDeclarations = darkTokens.map((token) => `  ${token.varName}: ${token.dark};`).join('\n')
      blocks.push(`.dark {\n${darkDeclarations}\n}`)
    }

    return this.join(blocks)
  }

  private utilitiesToCSS(tokens: UtilityToken[]): string {
    return tokens.map((token) => `.${token.utilityName} {\n  @apply ${token.classes};\n}`).join('\n\n')
  }

  private rulesToCSS(rules: RuleToken[]): string {
    if (!rules.length) return ''

    const grouped = new Map<string, RuleToken[]>()

    for (const rule of rules) {
      const list = grouped.get(rule.layer)

      if (list) {
        list.push(rule)
      } else {
        grouped.set(rule.layer, [rule])
      }
    }

    return [...grouped.entries()]
      .map(([layer, layerRules]) => {
        const entries = layerRules.map((rule) => `  ${rule.selector} {\n    @apply ${rule.classes};\n  }`).join('\n')
        return `@layer ${layer} {\n${entries}\n}`
      })
      .join('\n\n')
  }

  private join(blocks: string[]): string {
    return blocks.filter(Boolean).join('\n\n')
  }
}
