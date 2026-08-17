export function stripDefineExample(code: string): string {
  let result = code

  const match = /\bdefineExample\s*\(/.exec(result)
  if (match) {
    const openIdx = match.index + match[0].length - 1
    let depth = 0
    let quote: '"' | "'" | '`' | null = null
    let end = -1

    for (let i = openIdx; i < result.length; i++) {
      const char = result[i]

      if (quote) {
        if (char === '\\') i++
        else if (char === quote) quote = null
        continue
      }

      if (char === '"' || char === "'" || char === '`') {
        quote = char
        continue
      }

      if (char === '/' && result[i + 1] === '/') {
        const newline = result.indexOf('\n', i)
        i = newline === -1 ? result.length : newline - 1
        continue
      }

      if (char === '/' && result[i + 1] === '*') {
        const close = result.indexOf('*/', i + 2)
        i = close === -1 ? result.length : close + 1
        continue
      }

      if (char === '(') depth++
      else if (char === ')') {
        depth--
        if (depth === 0) {
          end = i + 1
          break
        }
      }
    }

    if (end !== -1) {
      const lineStart = result.lastIndexOf('\n', match.index - 1) + 1
      const prevLineStart = result.lastIndexOf('\n', lineStart - 2) + 1
      const precedingBlank = /^[ \t]*$/.test(result.slice(prevLineStart, lineStart - 1))
      const cutStart = precedingBlank ? prevLineStart : lineStart

      const nextLineStart = result.indexOf('\n', end)
      const cutEnd = nextLineStart === -1 ? result.length : nextLineStart + 1

      result = result.slice(0, cutStart) + result.slice(cutEnd)
    }
  }

  return result
}
