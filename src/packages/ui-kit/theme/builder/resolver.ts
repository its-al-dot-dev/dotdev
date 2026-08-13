// ============================================================================
// resolver — резолв значения токена в CSS-строку.
//
// Правила (важно сохранить как есть):
//   - 'brand-500'        -> var(--ui-brand-500)                 (известный токен)
//   - 'brand-500/50'     -> color-mix(in srgb, var(--ui-brand-500) 50%, transparent)
//   - 'color-white'      -> var(--color-white)                  (палитра Tailwind v4)
//   - 'transparent', 'currentColor', ...                        -> как есть (CSS-ключевые)
//   - 'var(--x)', 'calc(..)', '[..]', '0.5rem', '#fff', '.5'    -> как есть
//   - всё прочее неизвестное идентификатороподобное              -> throw (ловим опечатки)
// ============================================================================

import type { Resolver } from './types.ts'
import type { TokenRegistry } from './registry.ts'

/** CSS-ключевые слова и литералы, не являющиеся токенами */
const CSS_KEYWORDS = new Set([
  'transparent',
  'currentColor',
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
  'none',
  'auto',
  'normal',
  'medium',
  'thick',
  'thin',
  'default',
  'pointer',
  'move',
  'grab',
  'solid',
  'dashed',
  'dotted',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'hidden',
  'visible',
  'white',
  'black',
])

/**
 * Резолвер принимает реестр токенов и возвращает функцию-резолвер.
 * Тип Resolver заморожен контрактом defineSheet — поэтому это фабрика,
 * а не класс: возвращается именно (value: string) => string.
 */
export function createResolver(registry: Pick<TokenRegistry, 'lookup'>, context?: { sheet?: string }): Resolver {
  return (value: string) => {
    if (!value) return value

    const passthrough = /^(var\(|calc\(|color-mix\(|url\(|\[|#|\.)/
    if (passthrough.test(value)) return value

    const slash = value.indexOf('/')
    if (slash !== -1) {
      const base = value.slice(0, slash)
      const opacity = value.slice(slash + 1)
      const varName = registry.lookup(base)
      if (varName) return `color-mix(in srgb, var(${varName}) ${opacity}%, transparent)`
      return value
    }

    // Числа и длины: 0.625rem, -2px, 0.5 ...
    if (/^[\d.-]/.test(value)) return value

    // Сырые CSS-значения (шрифты, составные декларации и т.п.) — не являются
    // bare-идентификаторами токенов, пропускаем как есть.
    if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(value)) return value

    const varName = registry.lookup(value)
    if (varName) return `var(${varName})`

    // Палитра Tailwind v4: color-white -> var(--color-white)
    if (/^color-/.test(value)) return `var(--${value})`

    if (CSS_KEYWORDS.has(value)) return value

    throw new Error(
      `[builder] unknown token reference '${value}'` +
        (context?.sheet ? ` in sheet '${context.sheet}'` : '') +
        `. Register it in vars/semantics, write it as var(--...), or use the Tailwind palette form (e.g. color-white).`,
    )
  }
}
