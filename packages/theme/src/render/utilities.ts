import type { Registry } from '../registry'
import type { SemanticEntry } from '../types'
import { matchesScope } from '../utils'
import { resolveCategory } from '../value'

function applyExpr(entry: SemanticEntry, registry: Registry): string {
  if (entry.twKey === 'text') {
    return resolveCategory(entry.light, registry) === 'length'
      ? `text-(length:${entry.varName})`
      : `text-(${entry.varName})`
  }
  return `${entry.twKey}-(${entry.varName})`
}

export function renderUtilities(registry: Registry, ui?: string): string {
  const blocks: string[] = []

  for (const entry of registry.semantics()) {
    if (ui !== undefined && entry.scope.kind !== 'theme' && !matchesScope(entry.scope, ui)) continue
    blocks.push(`@utility ${entry.utilityName} {\n  @apply ${applyExpr(entry, registry)};\n}`)
  }

  for (const entry of registry.utilities()) {
    if (ui !== undefined && entry.scope.kind !== 'theme' && !matchesScope(entry.scope, ui)) continue
    blocks.push(`@utility ${entry.utilityName} {\n  @apply ${entry.classes.join(' ')};\n}`)
  }

  return blocks.join('\n\n')
}
