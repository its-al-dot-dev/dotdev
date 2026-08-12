// ============================================================================
// render-semantics — рендер семантических токенов и их авто-утилит.
//
// Секция semantics делится на две части:
//   1. CSS-переменные: @theme (light) + .dark блок.
//   2. Авто-утилита на каждый ключ по конвенции «первый сегмент = CSS-свойство»:
//      ключ должен быть {property}-{role} (bg-soft, text-foreground, ring-brand).
//      Если значение резолвится в длину — добавляем хинт length: для
//      амбивалентных свойств (text = font-size | color), иначе Tailwind трактует
//      голую переменную как color.
// ============================================================================

import type { SemanticValue, Resolver, SheetConfig } from '../types.ts'
import { semanticIsLength } from '../value-analysis.ts'
import { utilityName, varPrefix } from './naming.ts'

export function semanticKeyError(key: string, name: string): string {
  return `[builder] semantics key '${key}' in sheet '${name}' must be '{property}-{role}', e.g. 'bg-soft'`
}

export function renderSemanticsBlock(
  semantics: SheetConfig['semantics'],
  name: string,
  scope: SheetConfig['scope'],
  resolve: Resolver,
  values: Map<string, string>,
): string {
  if (!semantics || !Object.keys(semantics).length) return ''

  const prefix = varPrefix(name)
  const light: string[] = []
  const dark: string[] = []

  for (const [key, value] of Object.entries(semantics)) {
    const varName = prefix(key)
    if (typeof value === 'string') {
      light.push(`  ${varName}: ${resolve(value)};`)
    } else if (Array.isArray(value)) {
      if (value[0]) light.push(`  ${varName}: ${resolve(value[0])};`)
      if (value[1]) dark.push(`  ${varName}: ${resolve(value[1])};`)
    } else {
      if (value.light) light.push(`  ${varName}: ${resolve(value.light)};`)
      if (value.dark) dark.push(`  ${varName}: ${resolve(value.dark)};`)
    }
  }

  const blocks: string[] = []
  if (light.length) blocks.push(`@theme {\n${light.join('\n')}\n}`)
  if (dark.length) blocks.push(`.dark {\n${dark.join('\n')}\n}`)

  const utilities = buildSemanticUtilities(semantics, name, scope, values)

  return [...blocks, utilities].filter(Boolean).join('\n\n')
}

/** Авто-утилиты из ключей семантики ({property}-{role} -> @utility) */
export function buildSemanticUtilities(
  semantics: Record<string, SemanticValue>,
  name: string,
  scope: SheetConfig['scope'],
  values: Map<string, string>,
): string {
  const prefix = varPrefix(name)
  const utilName = utilityName(name, scope ?? 'local')

  const utilities = Object.keys(semantics).map((key) => {
    const sep = key.indexOf('-')
    if (sep === -1) throw new Error(semanticKeyError(key, name))
    const prop = key.slice(0, sep)
    const util = utilName(key)
    const hint = semanticIsLength(semantics[key], values) ? 'length:' : ''
    return `@utility ${util} {\n  @apply ${prop}-(${hint}${prefix(key)});\n}`
  })

  return utilities.join('\n\n')
}
