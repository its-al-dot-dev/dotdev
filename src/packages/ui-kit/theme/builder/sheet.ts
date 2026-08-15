// ============================================================================
// sheet — SheetModel: IR листа, построенного из SheetConfig.
//
// Это внутренняя реализация. Внешняя форма совпадает с замороженным
// интерфейсом Sheet ($name, $scope, $tokens, $values, $render) — именно её
// возвращает defineSheet. $render делегирует чистым рендерерам из render/*.
// ============================================================================

import type { Resolver, Sheet, SheetConfig, TokenMeta } from './types.ts'
import { semanticParts, semanticLightValue } from './value-analysis.ts'
import { renderSheet } from './render/render-sheet.ts'
import { utilityName, varPrefix } from './render/naming.ts'

export class SheetModel implements Sheet {
  readonly $name: string
  readonly $scope: 'global' | 'local'
  readonly $tokens = new Map<string, string>()
  readonly $values = new Map<string, string>()

  private readonly config: SheetConfig

  constructor(config: SheetConfig) {
    this.$name = config.name
    this.$scope = config.scope ?? 'local'
    this.config = config

    const prefix = varPrefix(config.name)

    for (const [key, value] of Object.entries(config.vars ?? {})) {
      this.$tokens.set(key, prefix(key))
      this.$values.set(key, value)
    }
    for (const [key, value] of Object.entries(config.semantics ?? {})) {
      this.$tokens.set(key, prefix(key))
      this.$values.set(key, semanticLightValue(value))
    }
  }

  $render(base: string, resolve: Resolver, values: Map<string, string>): string {
    return renderSheet(this.config, base, resolve, values)
  }

  /** Сырые записи токенов листа (vars + semantics) для манифеста, без резолва */
  $tokenMeta(): TokenMeta[] {
    const prefix = varPrefix(this.$name)
    const utilName = utilityName(this.$name, this.$scope)

    const meta: TokenMeta[] = []

    for (const [key, value] of Object.entries(this.config.vars ?? {})) {
      const varName = key.startsWith('--') ? key : prefix(key)
      meta.push({ kind: 'vars', key, varName, ...(value ? { light: value } : {}) })
    }
    for (const [key, value] of Object.entries(this.config.semantics ?? {})) {
      const { light, dark } = semanticParts(value)
      meta.push({
        kind: 'semantics',
        key,
        varName: prefix(key),
        utility: utilName(key),
        ...(light ? { light } : {}),
        ...(dark ? { dark } : {}),
      })
    }

    return meta
  }
}
