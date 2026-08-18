import type { Registry } from './registry'
import type { ThemeTokens, TokenValue } from './types'
import { isPair } from './utils'
import { resolveValueWithNamespace, emitValue } from './token'

export function extractTokens(registry: Registry, namespace?: string): ThemeTokens {
  const primitives: Record<string, string> = {}
  const semantics: Record<string, TokenValue> = {}
  const components: Record<string, Record<string, TokenValue>> = {}

  for (const entry of registry.primitives()) {
    primitives[entry.name] = entry.value
  }
  for (const entry of registry.semantics()) {
    if (entry.scope.kind === 'theme') {
      semantics[entry.name] = entry.dark != null ? [entry.light, entry.dark] : entry.light
    } else {
      const map = (components[entry.scope.ui] ??= {})
      map[entry.name] = entry.light
    }
  }

  if (!namespace) return { primitives, semantics, components }

  const ns = `${namespace}-`
  const sub = (s: string) => s.replaceAll(`--${ns}`, '--{ns}-')
  const resolvePart = (v: string) => sub(emitValue(resolveValueWithNamespace(v, registry, namespace)))
  const resolve = (v: TokenValue): TokenValue =>
    isPair(v) ? [resolvePart(v[0]), resolvePart(v[1])] : resolvePart(v)

  for (const name of Object.keys(semantics)) {
    semantics[name] = resolve(semantics[name])
  }
  for (const map of Object.values(components)) {
    for (const name of Object.keys(map)) {
      map[name] = resolve(map[name])
    }
  }

  return { primitives, semantics, components }
}

