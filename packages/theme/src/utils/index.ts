import type { Scope, TokenValue } from '../types'

export function nsPrefix(namespace?: string): string {
  return namespace ? `${namespace}-` : ''
}

export function splitClasses(source: string): string[] {
  return source.trim().split(/\s+/).filter(Boolean)
}

export function componentSelector(raw: string, ns: string, ui: string): string {
  return raw.replaceAll('&', `.${ns}${ui}`).replaceAll('..', '.')
}

export function isPair(value: TokenValue): value is readonly [string, string] {
  return Array.isArray(value)
}

export function matchesScope(scope: Scope, ui?: string): boolean {
  if (ui === undefined) return scope.kind === 'theme'
  return scope.kind === 'component' && scope.ui === ui
}

export const parts = (value: TokenValue): string[] =>
  isPair(value) ? [...value] : [value]
