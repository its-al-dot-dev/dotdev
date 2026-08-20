import { Theme } from './theme.ts'
import type { ComponentsState, ThemeState } from './registry.ts'
import type { PrimitiveToken, RuleToken, TokenScope, TokenValue, UtilityToken } from './types.ts'

export interface CompileResult {
  theme: CompileThemeResult
  components: CompileComponentsResult
}

export type CompilerScope = { kind: 'all' } | TokenScope | TokenScope[]
export type CompilerKind = 'primitives' | 'utilities' | 'rules'

type ResolvedScope = { kind: 'all' } | TokenScope

export type CompileComponentsResult = Map<string, { css: string; config: Record<string, TokenValue> }>
export type CompileThemeResult = {
  css: string
  config: {
    primitives: Record<string, TokenValue>
    semantics: Record<string, TokenValue>
  }
}

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

  compile(options: CompilerOptions = {}): CompileResult {
    const state = this.resolveState(options.namespace)
    const scopes = this.resolveScopes(options.scope)
    const kinds = this.resolveKinds(options.kinds)

    const css = this.needsTheme(scopes) ? this.renderThemeCss(state, kinds) : ''
    const config = this.buildThemeConfig(state)
    const components = this.compileComponents(state, scopes, kinds)

    return { theme: { css, config }, components }
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

  private compileComponents(
    state: ThemeState,
    scopes: ResolvedScope[],
    kinds: Set<CompilerKind>,
  ): CompileComponentsResult {
    const result = new Map()

    for (const [name, component] of this.resolveComponents(state, scopes)) {
      const css = this.renderComponentCss(component, kinds)
      const config = this.buildComponentConfig(component)
      if (css) result.set(name, { css, config })
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

  private buildThemeConfig(state: ThemeState) {
    const excludedKeys = new Set<string>()

    const semantics = this.buildTokenValue(state.semantics, (token) => {
      excludedKeys.add(token.name)
      return token.value
    })

    const primitives = this.buildTokenValue(state.primitives, (token) => {
      if (excludedKeys.has(token.name)) return
      return token.dark ? [token.light, token.dark] : token.light
    })

    return { primitives, semantics }
  }

  private renderThemeCss(state: ThemeState, kinds: Set<CompilerKind>): string {
    const blocks: string[] = []

    if (kinds.has('primitives')) {
      blocks.push(this.primitivesToCSS(state.primitives))
    }

    if (kinds.has('utilities')) {
      blocks.push(this.utilitiesToCSS(state.utilities))
    }

    return this.join(blocks)
  }

  private buildComponentConfig(component: ComponentsState) {
    return this.buildTokenValue(component.primitives, (token) => {
      return token.dark ? [token.light, token.dark] : token.light
    })
  }

  private renderComponentCss(component: ComponentsState, kinds: Set<CompilerKind>): string {
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
    return tokens.map((token) => `@utility ${token.utilityName} {\n  @apply ${token.classes};\n}`).join('\n\n')
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

  private buildTokenValue<T extends { name: string }>(items: T[], resolve: (item: T) => TokenValue | undefined) {
    return items.reduce(
      (acc, item) => {
        const value = resolve(item)
        if (value) acc[item.name] = value
        return acc
      },
      {} as Record<string, TokenValue>,
    )
  }

  private join(blocks: string[]): string {
    return blocks.filter(Boolean).join('\n\n')
  }
}
