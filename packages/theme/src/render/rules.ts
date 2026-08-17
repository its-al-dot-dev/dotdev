import type { Registry } from '../registry'
import { matchesScope } from '../utils'

export function renderRules(registry: Registry, ui?: string): string {
  const rules = registry
    .rules()
    .filter((rule) => ui === undefined || matchesScope(rule.scope, ui))
    .map((rule) => `${rule.selector} {\n  @apply ${rule.classes.join(' ')};\n}`)
    .join('\n\n')

  if (!rules) return ''
  return `@layer components {\n${rules}\n}`
}
