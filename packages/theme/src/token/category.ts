import type { Registry } from '../registry'
import type { Category } from '../types'
import { parseOpacity } from './parser'

export function resolveCategory(
  input: string,
  registry: Registry,
  seen: Set<string> = new Set(),
): Category {
  const { base } = parseOpacity(input.trim())
  if (seen.has(base)) return 'color'
  seen.add(base)

  const name = base.startsWith('$') ? base.slice(1) : base.replace(/^--/, '')
  const entry = registry.findByName(name)

  if (entry) {
    if (entry.kind === 'primitive') return categorize(entry.value)
    if (entry.kind === 'semantic')
      return resolveCategory(entry.light, registry, seen)
    return 'color'
  }
  if (base.startsWith('$') || base.startsWith('--') || base.startsWith('var('))
    return 'color'
  return categorize(base)
}

const LENGTH_RE =
  /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%|vw|vh|vmin|vmax|svh|lvh|dvh|ch|ex|cm|mm|in|pt|pc)$/

function categorize(raw: string): Category {
  return LENGTH_RE.test(raw.trim()) ? 'length' : 'color'
}
