import type { ResolvedValue } from '../types'

export function emit(resolved: ResolvedValue): string {
  if (resolved.kind === 'raw') {
    return wrapOpacity(resolved.value, resolved.opacity)
  }
  return wrapOpacity(`var(${resolved.varName})`, resolved.opacity)
}

export function emitValue(value: ResolvedValue): string {
  return emit(value)
}

function wrapOpacity(source: string, opacity?: number): string {
  if (opacity == null) return source
  return `color-mix(in oklab, ${source} ${opacity}%, transparent)`
}
