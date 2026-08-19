import { parseTokenValue } from './utils.ts'
import { logger } from './logger.ts'
import type {
  PrimitiveToken,
  RuleToken,
  SemanticToken,
  TokenExpression,
  TokenScope,
  TokenValue,
  UtilityToken,
} from './types.ts'

export interface ThemeState {
  primitives: PrimitiveToken[]
  utilities: UtilityToken[]
  components: Map<string, ComponentsState>
}

export interface ComponentsState {
  primitives: PrimitiveToken[]
  utilities: UtilityToken[]
  rules: RuleToken[]
}

type StateValue = PrimitiveToken | UtilityToken | RuleToken

export class Registry {
  private readonly namespace?: string
  private _primitives: Map<string, PrimitiveToken> = new Map()
  private _semantics: Map<string, SemanticToken> = new Map()
  private _utilities: Map<string, UtilityToken> = new Map()
  private _rules: Map<string, RuleToken> = new Map()

  private theme: ThemeState = {
    primitives: [],
    utilities: [],
    components: new Map<string, ComponentsState>(),
  }

  constructor(namespace?: string) {
    this.namespace = namespace
  }

  getTheme() {
    return this.theme
  }

  addPrimitive(scope: TokenScope, name: string, value: TokenValue) {
    const isGlobal = name.startsWith('--')
    const rawName = isGlobal ? name.slice(2) : name
    const varName = this.buildVarName(scope, rawName, isGlobal)
    const [light, dark] = splitLightDark(value)

    const entry: PrimitiveToken = {
      kind: 'primitive',
      name: rawName,
      varName,
      global: isGlobal,
      scope,
      light,
      dark,
    }

    this.registerIfNotExists(this._primitives, varName, 'primitive', entry)
    this.addToState(scope, entry)
  }

  addSemantic(scope: TokenScope, name: string, value: TokenValue) {
    const varName = this.buildVarName(scope, name)
    const resolvedName = this.buildScopedName(scope, name)
    const utilityPrefix = name.split('-')[0]

    const entry: SemanticToken = {
      kind: 'semantic',
      name,
      scope,
      utilityName: resolvedName,
      utilityPrefix,
      varName,
      value,
    }

    if (this.registerIfNotExists(this._semantics, resolvedName, `semantic "${name}" (as "${resolvedName}")`, entry)) {
      this.resolveSemantic(entry)
    }
  }

  addUtility(scope: TokenScope, name: string, classes: string) {
    const resolvedName = this.buildScopedName(scope, name)

    const entry: UtilityToken = {
      kind: 'utility',
      name,
      scope,
      utilityName: resolvedName,
      classes: this.replaceNamespace(classes),
    }

    this.registerIfNotExists(this._utilities, resolvedName, `utility "${name}" (as "${resolvedName}")`, entry)
    this.addToState(scope, entry)
  }

  addRule(scope: TokenScope, layer: string, selector: string, classes: string) {
    const resolvedSelector = this.buildSelectorName(scope, selector)

    const entry: RuleToken = {
      kind: 'rule',
      scope,
      layer,
      selector: resolvedSelector,
      classes: this.replaceNamespace(classes),
    }

    this.registerIfNotExists(this._rules, resolvedSelector, `rule "${selector}"`, entry)
    this.addToState(scope, entry)
  }

  toJSON() {
    return {
      namespace: this.namespace,
      primitives: [...this._primitives.values()],
      semantics: [...this._semantics.values()],
      utilities: [...this._utilities.values()],
      rules: [...this._rules.values()],
    }
  }

  private addToState(scope: TokenScope, token: StateValue) {
    if (scope.kind === 'theme') {
      if (token.kind === 'primitive') this.theme.primitives.push(token)
      if (token.kind === 'utility') this.theme.utilities.push(token)
    }

    if (scope.kind === 'component') {
      if (!this.theme.components.has(scope.ui)) {
        this.theme.components.set(scope.ui, { primitives: [], utilities: [], rules: [] })
      }

      const component = this.theme.components.get(scope.ui)

      if (token.kind === 'primitive') component?.primitives.push(token)
      if (token.kind === 'utility') component?.utilities.push(token)
      if (token.kind === 'rule') component?.rules.push(token)
    }
  }

  private resolveSemantic(entry: SemanticToken) {
    const { scope, name, varName, utilityPrefix, value } = entry
    const [light, dark] = splitLightDark(value)

    const lightExpression = parseTokenValue(light)
    const darkExpression = dark ? parseTokenValue(dark) : undefined

    const lightValue = this.resolveTokenExpression(lightExpression, scope)
    const darkValue = darkExpression ? this.resolveTokenExpression(darkExpression, scope) : undefined

    if (!lightValue) {
      logger.warn(`cannot resolve semantic "${name}": light value "${light}" references unresolved primitive`)
      return
    }

    this.registerSemanticPrimitive(scope, name, lightValue, darkValue)
    this.registerSemanticUtility(scope, name, utilityPrefix, varName)
  }

  private registerSemanticPrimitive(scope: TokenScope, name: string, lightValue: string, darkValue?: string) {
    this.addPrimitive(scope, name, darkValue ? [lightValue, darkValue] : lightValue)
  }

  private registerSemanticUtility(scope: TokenScope, name: string, utilityPrefix: string, varName: string) {
    this.addUtility(scope, name, `${utilityPrefix}-(${varName})`)
  }

  private resolveTokenExpression(expression: TokenExpression, scope: TokenScope) {
    if (expression.kind === 'css') return expression.value

    const primitive = this.findPrimitive(scope, expression.name)

    if (!primitive) {
      logger.warn(`primitive "${expression.name}" not found in scope`)
      return undefined
    }

    if (expression.alpha) {
      return withAlpha(`var(${primitive.varName})`, expression.alpha)
    }

    return `var(${primitive.varName})`
  }

  private findPrimitive(scope: TokenScope, name: string, fallbackToTheme = true) {
    const direct = this._primitives.get(this.buildVarName(scope, name))
    if (direct || !fallbackToTheme) return direct
    return this._primitives.get(this.buildVarName({ kind: 'theme' }, name))
  }

  private buildVarName(scope: TokenScope, name: string, isGlobal = false) {
    const ns = isGlobal ? '' : this.namespacePrefix()
    return `--${ns}${this.componentPrefix(scope)}${name}`
  }

  private buildScopedName(scope: TokenScope, name: string) {
    return `${this.componentPrefix(scope)}${name}`
  }

  private buildSelectorName(scope: TokenScope, selector: string) {
    const ns = this.namespacePrefix()
    const cmp = this.componentPrefix(scope)
    const cls = `.${ns}${cmp}`
    if (selector === '&') return cls
    return selector.replaceAll('&-', cls).replaceAll('..', '.')
  }

  private componentPrefix(scope: TokenScope) {
    return scope.kind === 'component' ? `${scope.ui}-` : ''
  }

  private replaceNamespace(str: string) {
    return str.replaceAll('$ns', `${this.namespace ?? ''}`)
  }

  private namespacePrefix() {
    return this.namespace ? `${this.namespace}-` : ''
  }

  private registerIfNotExists<T>(map: Map<string, T>, key: string, type: string, entry: T): boolean {
    if (map.has(key)) {
      logger.warn(`${type} already registered, skipping`)
      return false
    }
    map.set(key, entry)
    return true
  }
}

function splitLightDark(value: TokenValue) {
  return (Array.isArray(value) ? value : [value, undefined]) as [string, string | undefined]
}

function withAlpha(value: string, alpha: number) {
  return `color-mix(in oklab, ${value} ${alpha}%, transparent)`
}
