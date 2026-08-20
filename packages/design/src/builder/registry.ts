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
  semantics: SemanticToken[]
  utilities: UtilityToken[]
  components: Map<string, ComponentsState>
}

export interface ComponentsState {
  primitives: PrimitiveToken[]
  semantics: SemanticToken[]
  utilities: UtilityToken[]
  rules: RuleToken[]
}

type StateValue = PrimitiveToken | SemanticToken | UtilityToken | RuleToken

type TokenRegistry<T> = Map<string, T>

export class Registry {
  private readonly namespace?: string

  private readonly primitives: TokenRegistry<PrimitiveToken> = new Map()
  private readonly semantics: TokenRegistry<SemanticToken> = new Map()
  private readonly utilities: TokenRegistry<UtilityToken> = new Map()
  private readonly rules: TokenRegistry<RuleToken> = new Map()

  private readonly theme: ThemeState = createThemeState()

  constructor(namespace?: string) {
    this.namespace = namespace
  }

  getTheme(): ThemeState {
    return this.theme
  }

  addPrimitive(scope: TokenScope, name: string, value: TokenValue): void {
    const { rawName, global } = normalizePrimitiveName(name)
    const varName = this.buildVarName(scope, rawName, global)
    const [light, dark] = splitLightDark(value)

    const token: PrimitiveToken = {
      kind: 'primitive',
      name: rawName,
      varName,
      global,
      scope,
      light,
      dark,
    }

    if (!this.registerUnique(this.primitives, varName, 'primitive', token)) {
      return
    }

    this.addToState(scope, token)
  }

  addSemantic(scope: TokenScope, name: string, value: TokenValue): void {
    const token = this.createSemanticToken(scope, name, value)
    this.resolveSemantic(token)
  }

  addUtility(scope: TokenScope, name: string, classes: string): void {
    const utilityName = this.buildScopedName(scope, name)

    const token: UtilityToken = {
      kind: 'utility',
      name,
      scope,
      utilityName,
      classes: this.replaceNamespace(classes),
    }

    if (!this.registerUnique(this.utilities, utilityName, `utility "${name}" (as "${utilityName}")`, token)) {
      return
    }

    this.addToState(scope, token)
  }

  addRule(scope: TokenScope, layer: string, selector: string, classes: string): void {
    const resolvedSelector = this.buildSelectorName(scope, selector)

    const token: RuleToken = {
      kind: 'rule',
      scope,
      layer,
      selector: resolvedSelector,
      classes: this.replaceNamespace(classes),
    }

    if (!this.registerUnique(this.rules, resolvedSelector, `rule "${selector}"`, token)) {
      return
    }

    this.addToState(scope, token)
  }

  toJSON() {
    return {
      namespace: this.namespace,
      primitives: [...this.primitives.values()],
      semantics: [...this.semantics.values()],
      utilities: [...this.utilities.values()],
      rules: [...this.rules.values()],
    }
  }

  private createSemanticToken(scope: TokenScope, name: string, value: TokenValue): SemanticToken {
    return {
      kind: 'semantic',
      name,
      scope,
      utilityName: this.buildScopedName(scope, name),
      utilityPrefix: getUtilityPrefix(name),
      varName: this.buildVarName(scope, name),
      value,
    }
  }

  private resolveSemantic(token: SemanticToken): void {
    const { scope, name, varName, utilityPrefix, utilityName, value } = token

    const [light, dark] = splitLightDark(value)

    const lightValue = this.resolveTokenValue(light, scope)

    if (!lightValue) {
      this.warnUnresolvedSemantic(scope, light)
      return
    }

    const darkValue = dark ? this.resolveTokenValue(dark, scope) : undefined

    if (dark && !darkValue) {
      this.warnUnresolvedSemantic(scope, dark)
      return
    }

    const resolvedToken: SemanticToken = {
      ...token,
      value: darkValue ? [lightValue, darkValue] : lightValue,
    }

    if (!this.registerUnique(this.semantics, utilityName, `semantic "${name}" (as "${utilityName}")`, resolvedToken)) {
      return
    }

    this.addToState(scope, resolvedToken)
    this.registerSemanticPrimitive(scope, name, lightValue, darkValue)
    this.registerSemanticUtility(scope, name, utilityPrefix, varName)
  }

  private resolveTokenValue(value: string, scope: TokenScope): string | undefined {
    const expression = parseTokenValue(value)
    return this.resolveTokenExpression(expression, scope)
  }

  private resolveTokenExpression(expression: TokenExpression, scope: TokenScope): string | undefined {
    if (expression.kind === 'css') {
      return expression.value
    }

    const primitive = this.findPrimitive(scope, expression.name)

    if (!primitive) {
      this.warnUnresolvedPrimitive(scope, expression.name)

      return undefined
    }

    if (expression.alpha !== undefined) {
      return withAlpha(`var(${primitive.varName})`, expression.alpha)
    }

    return `var(${primitive.varName})`
  }

  private registerSemanticPrimitive(scope: TokenScope, name: string, lightValue: string, darkValue?: string): void {
    const value: TokenValue = darkValue ? [lightValue, darkValue] : lightValue
    this.addPrimitive(scope, name, value)
  }

  private registerSemanticUtility(scope: TokenScope, name: string, utilityPrefix: string, varName: string): void {
    this.addUtility(scope, name, `${utilityPrefix}-(${varName})`)
  }

  private findPrimitive(scope: TokenScope, name: string, fallbackToTheme = true): PrimitiveToken | undefined {
    const direct = this.primitives.get(this.buildVarName(scope, name))

    if (direct || !fallbackToTheme) {
      return direct
    }

    return this.primitives.get(this.buildVarName({ kind: 'theme' }, name))
  }

  private addToState(scope: TokenScope, token: StateValue): void {
    switch (scope.kind) {
      case 'theme':
        this.addThemeToken(token)
        return

      case 'component':
        this.addComponentToken(scope.ui, token)
        return
    }
  }

  private addThemeToken(token: StateValue): void {
    switch (token.kind) {
      case 'primitive':
        this.theme.primitives.push(token)
        return

      case 'semantic':
        this.theme.semantics.push(token)
        return

      case 'utility':
        this.theme.utilities.push(token)
        return

      case 'rule':
        return
    }
  }

  private addComponentToken(componentName: string, token: StateValue): void {
    const component = this.getOrCreateComponent(componentName)

    switch (token.kind) {
      case 'primitive':
        component.primitives.push(token)
        return

      case 'semantic':
        component.semantics.push(token)
        return

      case 'utility':
        component.utilities.push(token)
        return

      case 'rule':
        component.rules.push(token)
        return
    }
  }

  private getOrCreateComponent(componentName: string): ComponentsState {
    let component = this.theme.components.get(componentName)

    if (!component) {
      component = createComponentsState()
      this.theme.components.set(componentName, component)
    }

    return component
  }

  private warnUnresolvedSemantic(scope: TokenScope, value: string): void {
    const scopeName = getScopeName(scope)

    logger.warn(
      `cannot resolve semantic ${logger.ps.yellow(`"${scopeName}"`)}: light value "${value}" references an unresolved primitive`,
    )
  }

  private warnUnresolvedPrimitive(scope: TokenScope, name: string): void {
    const primitiveName = logger.ps.yellow(`"${name}"`)
    const scopeName = logger.ps.yellow(`"${getScopeName(scope)}"`)
    logger.warn(`primitive ${primitiveName} not found in scope ${scopeName}`)
  }

  private buildVarName(scope: TokenScope, name: string, global = false): string {
    const namespace = global ? '' : this.namespacePrefix()
    return `--${namespace}${this.componentPrefix(scope)}${name}`
  }

  private buildScopedName(scope: TokenScope, name: string): string {
    return `${this.componentPrefix(scope)}${name}`
  }

  private buildSelectorName(scope: TokenScope, selector: string): string {
    const namespace = this.namespacePrefix()
    const component = this.componentPrefix(scope)

    const className = `.${namespace}${component}`.slice(0, -1)

    if (selector === '&') {
      return className
    }

    return selector.replaceAll('&', className).replaceAll('..', '.')
  }

  private componentPrefix(scope: TokenScope): string {
    return scope.kind === 'component' ? `${scope.ui}-` : ''
  }

  private replaceNamespace(value: string): string {
    return value.replaceAll('$ns', this.namespace ?? '')
  }

  private namespacePrefix(): string {
    return this.namespace ? `${this.namespace}-` : ''
  }

  private registerUnique<T>(map: TokenRegistry<T>, key: string, type: string, entry: T): boolean {
    if (map.has(key)) {
      logger.warn(`${type} already registered, skipping`)
      return false
    }

    map.set(key, entry)
    return true
  }
}

function createThemeState(): ThemeState {
  return { primitives: [], semantics: [], utilities: [], components: new Map() }
}

function createComponentsState(): ComponentsState {
  return { primitives: [], semantics: [], utilities: [], rules: [] }
}

function normalizePrimitiveName(name: string) {
  const global = name.startsWith('--')

  return {
    rawName: global ? name.slice(2) : name,
    global,
  }
}

function getUtilityPrefix(name: string): string {
  return name.split('-')[0]
}

function getScopeName(scope: TokenScope): string {
  return scope.kind === 'component' ? scope.ui : scope.kind
}

function splitLightDark(value: TokenValue): [light: string, dark: string | undefined] {
  if (Array.isArray(value)) {
    return [value[0], value[1]]
  }

  return [value as string, undefined]
}

function withAlpha(value: string, alpha: number): string {
  return `color-mix(in oklab, ${value} ${alpha}%, transparent)`
}
