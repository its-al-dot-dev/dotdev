// ============================================================================
// classify — определение типа токена и ссылки на другой токен (для манифеста).
//
// type (мелкая гранулярность): порядок вывода —
//   1. префикс ключа группы дизайн-токенов (radius/space/size/gap/label/font/color);
//   2. рекурсия по ссылке на другой токен (мемоизация по ключу, seen против циклов);
//   3. классификация литерала (длина/calc -> dimension, цветовые форматы -> color).
//   4. иначе raw.
// Решает двусмысленность text-*/bg-*: тип наследуется по цепочке ссылок, а не из имени.
//
// refs: bare-имя (bg-brand), bare/opacity (brand-500/50) или var(--ui-x) -> { sheet, key }.
// ============================================================================

import type { TokenRefLink, TokenType } from './types.ts'

/** Группы дизайн-токенов по префиксу ключа */
const PREFIX_TYPE: Record<string, TokenType> = {
  radius: 'radius',
  space: 'spacing',
  size: 'size',
  gap: 'gap',
  label: 'font-size',
  font: 'font-family',
  color: 'color',
}

/** Единицы длины CSS (без calc) */
const LENGTH_RE = /^[\d.+-]+(?:px|rem|em|%|vh|vw|vmin|vmax|ch|ex|fr|svh|svw|lvh|lvw|dvh|dvw|cm|mm|in|pc|pt|q)$/

/** Частые CSS-ключевые цвета (палитра в основном oklch/hex/var(--color-...)) */
const COLOR_KEYWORDS = new Set([
  'transparent',
  'currentColor',
  'white',
  'black',
  'red',
  'green',
  'blue',
  'gray',
  'grey',
  'orange',
  'yellow',
  'pink',
  'purple',
  'brown',
])

export interface TokenRefContext {
  /** bare-имя -> сырое значение (registry.values) */
  values: Map<string, string>
  /** bare-имя -> имя листа-владельца (registry.owner) */
  ownerOf: (bare: string) => string | undefined
  /** полное CSS-имя переменной -> ссылка на токен */
  varNameToRef: Map<string, TokenRefLink>
}

const BARE_RE = /^[a-zA-Z][a-zA-Z0-9-]*$/
const SLASH_RE = /^([a-zA-Z][a-zA-Z0-9-]*)\/\d+(?:\.\d+)?$/
const VAR_RE = /^var\((--[a-zA-Z0-9-]+)\)$/

/** Извлекает ссылку на другой токен из сырого значения, либо undefined */
export function extractRef(value: string, ctx: TokenRefContext): TokenRefLink | undefined {
  value = value.trim()
  if (!value) return undefined

  if (BARE_RE.test(value)) {
    const sheet = ctx.ownerOf(value)
    return sheet ? { sheet, key: value } : undefined
  }

  const slash = SLASH_RE.exec(value)
  if (slash) {
    const sheet = ctx.ownerOf(slash[1])
    return sheet ? { sheet, key: slash[1] } : undefined
  }

  const varMatch = VAR_RE.exec(value)
  if (varMatch) return ctx.varNameToRef.get(varMatch[1])

  return undefined
}

/** Тип токена по ключу и сырому значению */
export function classifyTokenType(key: string, value: string, ctx: TokenRefContext): TokenType {
  return classify(key, value, ctx, new Set(), new Map())
}

function classify(
  key: string,
  value: string,
  ctx: TokenRefContext,
  seen: Set<string>,
  memo: Map<string, TokenType>,
): TokenType {
  const cached = memo.get(key)
  if (cached) return cached

  const name = key.replace(/^--/, '')
  const sep = name.indexOf('-')
  const prefix = sep === -1 ? name : name.slice(0, sep)
  const prefixType = PREFIX_TYPE[prefix]
  if (prefixType) {
    memo.set(key, prefixType)
    return prefixType
  }

  if (seen.has(key)) return 'raw'
  seen.add(key)

  const ref = extractRef(value, ctx)
  if (ref) {
    const raw = ctx.values.get(ref.key)
    const type = raw ? classify(ref.key, raw, ctx, seen, memo) : 'raw'
    memo.set(key, type)
    return type
  }

  const type = classifyLiteral(value)
  memo.set(key, type)
  return type
}

function classifyLiteral(value: string): TokenType {
  value = value.trim()
  if (!value) return 'raw'
  if (LENGTH_RE.test(value) || /^calc\(/i.test(value)) return 'dimension'
  if (/^#/.test(value)) return 'color'
  if (/^(?:rgb|rgba|hsl|hsla|oklch|oklab|lab|lch|hwb|color)\(/i.test(value)) return 'color'
  if (value.startsWith('var(--color-')) return 'color'
  if (COLOR_KEYWORDS.has(value)) return 'color'
  return 'raw'
}
