export interface VarResolver {
  (name: string, fallback: string | undefined): string | undefined
}

export function findTopLevelComma(input: string): number {
  let depth = 0
  for (let i = 0; i < input.length; i++) {
    const c = input[i]
    if (c === '(') depth++
    else if (c === ')') depth--
    else if (c === ',' && depth === 0) return i
  }
  return -1
}

export function inlineVars(
  value: string,
  resolve: VarResolver,
  depth = 0,
): string {
  if (depth > 20) return value
  let out = ''
  let i = 0
  while (i < value.length) {
    const idx = value.indexOf('var(', i)
    if (idx === -1) {
      out += value.slice(i)
      break
    }
    out += value.slice(i, idx)
    let k = idx + 4
    let parens = 1
    while (k < value.length) {
      const c = value[k]
      if (c === '(') parens++
      else if (c === ')') {
        parens--
        if (parens === 0) break
      }
      k++
    }
    const inner = value.slice(idx + 4, k)
    const comma = findTopLevelComma(inner)
    let name: string
    let fallback: string | undefined
    if (comma === -1) {
      name = inner.trim()
    } else {
      name = inner.slice(0, comma).trim()
      fallback = inner.slice(comma + 1).trim()
    }
    const replacement = resolve(name, fallback)
    if (replacement === undefined) {
      out += value.slice(idx, k + 1)
    } else {
      out += inlineVars(replacement, resolve, depth + 1)
    }
    i = k + 1
  }
  return out
}
