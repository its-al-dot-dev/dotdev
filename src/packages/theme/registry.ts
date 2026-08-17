import type { PrimitiveEntry, RegistryEntry, RuleEntry, Scope, SemanticEntry, UtilityEntry } from './types'

function nsPrefix(namespace?: string): string {
  return namespace ? `${namespace}-` : ''
}

export function semanticEntry(
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

  add(entry: RegistryEntry) {
    if (entry.kind === 'primitive' || entry.kind === 'semantic') {
      if (!this.byName.has(entry.name)) this.byName.set(entry.name, entry)
      if (entry.kind === 'primitive') this.primitivesList.push(entry)
      else {
        this.semanticsList.push(entry)
        if (entry.scope.kind === 'component') this.componentUisSet.add(entry.scope.ui)
      }
    } else if (entry.kind === 'utility') {
      this.utilitiesList.push(entry)
      if (entry.scope.kind === 'component') this.componentUisSet.add(entry.scope.ui)
    } else {
      this.rulesList.push(entry)
      if (entry.scope.kind === 'component') this.componentUisSet.add(entry.scope.ui)
    }
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
