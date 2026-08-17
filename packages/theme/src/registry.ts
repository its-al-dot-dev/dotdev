import type { PrimitiveEntry, RuleEntry, Scope, SemanticEntry, UtilityEntry } from './types'
import { nsPrefix } from './utils'

function semanticEntry(
  scope: Scope,
  name: string,
  light: string,
  dark: string | undefined,
  namespace: string | undefined,
): SemanticEntry {
  const ns = nsPrefix(namespace)
  const component = scope.kind === 'component' ? `${scope.ui}-` : ''
  return {
    kind: 'semantic',
    name,
    scope,
    varName: `--${ns}${component}${name}`,
    utilityName: `${component}${name}`,
    twKey: name.split('-')[0],
    light,
    dark,
  }
}

export class Registry {
  private readonly primitivesList: PrimitiveEntry[] = []
  private readonly semanticsList: SemanticEntry[] = []
  private readonly utilitiesList: UtilityEntry[] = []
  private readonly rulesList: RuleEntry[] = []
  private readonly byName = new Map<string, PrimitiveEntry | SemanticEntry>()
  private readonly componentUisSet = new Set<string>()

  addPrimitive(scope: Scope, name: string, value: string, namespace?: string) {
    const global = name.startsWith('--')
    const rawName = global ? name.slice(2) : name
    const component = scope.kind === 'component' ? `${scope.ui}-` : ''
    const ns = global ? '' : nsPrefix(namespace)
    const entry: PrimitiveEntry = {
      kind: 'primitive',
      name: rawName,
      varName: `--${ns}${component}${rawName}`,
      value,
      global,
      scope,
    }
    this.primitivesList.push(entry)
    if (!this.byName.has(name)) this.byName.set(name, entry)
  }

  addSemantic(scope: Scope, name: string, light: string, dark?: string, namespace?: string) {
    const entry = semanticEntry(scope, name, light, dark, namespace)
    this.semanticsList.push(entry)
    if (!this.byName.has(name)) this.byName.set(name, entry)
    if (scope.kind === 'component') this.componentUisSet.add(scope.ui)
  }

  addUtility(scope: Scope, name: string, utilityName: string, classes: string[]) {
    const entry: UtilityEntry = { kind: 'utility', name, scope, utilityName, classes }
    this.utilitiesList.push(entry)
    if (scope.kind === 'component') this.componentUisSet.add(scope.ui)
  }

  addRule(scope: Scope, selector: string, classes: string[]) {
    const entry: RuleEntry = { kind: 'rule', scope, selector, classes }
    this.rulesList.push(entry)
    if (scope.kind === 'component') this.componentUisSet.add(scope.ui)
  }

  findByName(name: string): PrimitiveEntry | SemanticEntry | undefined {
    return this.byName.get(name)
  }

  primitives(): PrimitiveEntry[] {
    return this.primitivesList
  }

  semantics(): SemanticEntry[] {
    return this.semanticsList
  }

  utilities(): UtilityEntry[] {
    return this.utilitiesList
  }

  rules(): RuleEntry[] {
    return this.rulesList
  }

  componentUis(): string[] {
    return [...this.componentUisSet]
  }
}
