import type { Registry } from '../registry'
import { matchesScope } from '../utils'
import { emitValue, resolveValue } from '../value'

export function renderVars(registry: Registry, ui?: string): string {
  const root: string[] = []
  const dark: string[] = []

  if (ui === undefined) {
    for (const entry of registry.primitives()) {
      if (entry.scope.kind !== 'theme') continue
      root.push(`  ${entry.varName}: ${emitValue(resolveValue(entry.value, registry))};`)
    }
  } else {
    for (const entry of registry.primitives()) {
      if (!matchesScope(entry.scope, ui)) continue
      root.push(`  ${entry.varName}: ${emitValue(resolveValue(entry.value, registry))};`)
    }
  }

  for (const entry of registry.semantics()) {
    if (!matchesScope(entry.scope, ui)) continue
    root.push(`  ${entry.varName}: ${emitValue(resolveValue(entry.light, registry))};`)
    if (entry.dark != null) {
      dark.push(`  ${entry.varName}: ${emitValue(resolveValue(entry.dark, registry))};`)
    }
  }

  const blocks: string[] = []
  if (root.length) blocks.push(`@theme {\n${root.join('\n')}\n}`)
  if (dark.length) blocks.push(`.dark {\n${dark.join('\n')}\n}`)
  return blocks.join('\n\n')
}
