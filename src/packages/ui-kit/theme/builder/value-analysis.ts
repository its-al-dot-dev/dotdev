// ============================================================================
// value-analysis — анализ значений семантических токенов.
//
// Два направления:
//   1. semanticLightValue — достать строковое (light) значение из любой формы
//      SemanticValue (строка | DarkToken | кортеж [light, dark]).
//   2. length-детект — понять, резолвится ли значение в CSS-длину. Нужен для
//      хинта `length:` в авто-утилитах: иначе Tailwind трактует голую переменную
//      в text-*/px-* и т.п. как color.
// ============================================================================

import type { SemanticValue } from './types.ts'

/** Достаёт строковое (light) значение из всех форм SemanticValue */
export function semanticLightValue(value: SemanticValue): string {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value[0] ?? ''
  return value.light ?? ''
}

/** Единицы длины CSS для вывода типа */
const LENGTH_UNIT_RE = /^[\d.+-]+(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|fr|svh|svw|lvh|lvw|dvh|dvw|cm|mm|in|pc|pt|q)$/

/** Является ли значение семантического токена длиной (с учётом ссылок на токены) */
export function semanticIsLength(value: SemanticValue, values: Map<string, string>): boolean {
  const raw = semanticLightValue(value)
  return isLengthValue(raw, values, new Set())
}

export function isLengthValue(value: string, values: Map<string, string>, seen: Set<string>): boolean {
  value = value.trim()
  if (!value) return false
  if (LENGTH_UNIT_RE.test(value)) return true
  if (/^calc\(/i.test(value)) return true

  // bare-ссылка на токен -> рекурсивно проверяем его сырое значение
  if (/^[a-zA-Z][a-zA-Z0-9-]*$/.test(value) && !seen.has(value)) {
    const raw = values.get(value)
    if (raw !== undefined) {
      seen.add(value)
      return isLengthValue(raw, values, seen)
    }
  }

  return false
}
