import type { Registry } from '../registry'
import { matchesScope } from '../utils'

export function renderRules(registry: Registry, ui?: string): string {
  const rules = registry
    .rules()
    .filter((rule) => ui === undefined || matchesScope(rule.scope, ui))

  if (!rules.length) return ''

  const byLayer = new Map<string, string[]>()
  for (const rule of rules) {
    const body = `${rule.selector} {\n  @apply ${rule.classes.join(' ')};\n}`
    const list = byLayer.get(rule.layer)
    if (list) list.push(body)
    else byLayer.set(rule.layer, [body])
  }

  return [...byLayer.entries()]
    .map(([layer, items]) => `@layer ${layer} {\n${items.join('\n\n')}\n}`)
    .join('\n\n')
}
