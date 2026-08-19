import type { TokenExpression } from './types.ts'

const CSS_KEYWORDS = new Set([
  'auto',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'transparent',
  'currentColor',
  'none',
])

const CSS_FUNCTION = /^[a-z-]+\s*\(.*\)$/i
const CSS_DIMENSION = /^-?(?:\d+\.?\d*|\.\d+)(?:[a-z]+|%)$/i
const TOKEN_ALPHA = /^(.+)\/(\d+(?:\.\d+)?)$/

export function parseTokenValue(value: string): TokenExpression {
  const input = value.trim()

  if (input.startsWith('--')) {
    return { kind: 'css', value: `var(${input})` }
  }

  if (/^var\(\s*--[^)]+\)$/i.test(input)) {
    return { kind: 'css', value: input }
  }

  if (CSS_FUNCTION.test(input)) {
    return { kind: 'css', value: input }
  }

  if (CSS_DIMENSION.test(input)) {
    return { kind: 'css', value: input }
  }

  if (CSS_KEYWORDS.has(input)) {
    return { kind: 'css', value: input }
  }

  const alphaMatch = input.match(TOKEN_ALPHA)

  if (alphaMatch) {
    const [, name, alpha] = alphaMatch
    return { kind: 'reference', name, alpha: Number(alpha) }
  }

  return { kind: 'reference', name: input }
}
