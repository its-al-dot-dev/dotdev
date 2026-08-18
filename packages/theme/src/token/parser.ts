import type { ResolvedValue } from '../types'

const OPACITY_RE = /\/(\d{1,3})$/

export interface ParsedToken {
  name: string
  opacity?: number
  isReference: boolean
  isCSSVar: boolean
  raw?: string
}

export function parseToken(input: string): ParsedToken {
  const trimmed = input.trim()
  const { base, opacity } = parseOpacity(trimmed)

  if (base.startsWith('var(')) {
    return {
      name: extractVarName(base),
      opacity,
      isReference: true,
      isCSSVar: true,
    }
  }
  if (base.startsWith('$')) {
    return {
      name: base.slice(1),
      opacity,
      isReference: true,
      isCSSVar: false,
    }
  }
  if (base.startsWith('--')) {
    return {
      name: base.slice(2),
      opacity,
      isReference: true,
      isCSSVar: true,
    }
  }
  return {
    name: base,
    opacity,
    isReference: false,
    isCSSVar: false,
    raw: trimmed,
  }
}

export function parseOpacity(input: string): { base: string; opacity?: number } {
  const match = OPACITY_RE.exec(input)
  if (!match) return { base: input }
  return { base: input.slice(0, -match[0].length), opacity: Number(match[1]) }
}

function extractVarName(varExpr: string): string {
  const start = varExpr.indexOf('(') + 1
  const end = varExpr.lastIndexOf(')')
  return varExpr.slice(start, end).trim()
}
