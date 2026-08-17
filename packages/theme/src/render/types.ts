import type { Registry } from '../registry'

const SEMANTIC_VALUE = 'string | [string, string]'

export function renderTypes(registry: Registry, name: string): string {
  const lines: string[] = []
  lines.push(`interface ${name}Theme {`)

  const primitives = registry.primitives()

  if (primitives.length) {
    lines.push(`  primitives?: {`)

    for (const entry of primitives) {
      lines.push(`    "${entry.name}"?: string;`)
    }

    lines.push(`  };`)
  }

  const semantics = registry.semantics().filter((entry) => entry.scope.kind === 'theme')
  if (semantics.length) {
    lines.push(`  semantics?: {`)

    for (const entry of semantics) {
      lines.push(`    "${entry.name}"?: ${SEMANTIC_VALUE};`)
    }

    lines.push(`  };`)
  }

  const uis = registry.componentUis()
  if (uis.length) {
    lines.push(`  components?: {`)

    for (const ui of uis) {
      const keys = registry.semantics().filter((entry) => entry.scope.kind === 'component' && entry.scope.ui === ui)

      if (!keys.length) continue
      lines.push(`    "${ui}"?: {`)

      for (const entry of keys) {
        lines.push(`      "${entry.name}"?: ${SEMANTIC_VALUE};`)
      }

      lines.push(`    };`)
    }

    lines.push(`  };`)
  }

  lines.push(`}`)
  return lines.join('\n')
}
