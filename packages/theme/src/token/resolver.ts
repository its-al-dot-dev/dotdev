import type { Registry } from '../registry'
import type { ParsedToken } from './parser'
import type { ResolvedValue } from '../types'
import { parseToken } from './parser'

export interface ResolutionContext {
  registry?: Registry
  namespace?: string
}

export function resolve(parsed: ParsedToken, ctx: ResolutionContext): ResolvedValue {
  if (ctx.registry) {
    const entry = ctx.registry.findByName(parsed.name)
    if (entry) {
      return { kind: 'ref', varName: entry.varName, opacity: parsed.opacity }
    }
  }

  if (!parsed.isReference && !parsed.isCSSVar) {
    return { kind: 'raw', value: parsed.raw!, opacity: parsed.opacity }
  }

  const ns = ctx.namespace ? `${ctx.namespace}-` : ''
  const varName = parsed.isCSSVar ? `--${parsed.name}` : `--${ns}${parsed.name}`
  return { kind: 'ref', varName, opacity: parsed.opacity }
}

export function resolveValue(input: string, registry: Registry): ResolvedValue {
  const parsed = parseToken(input)
  return resolve(parsed, { registry })
}

export function resolveValueWithNamespace(
  input: string,
  registry: Registry,
  namespace: string,
): ResolvedValue {
  const parsed = parseToken(input)
  return resolve(parsed, { registry, namespace })
}
