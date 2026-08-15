// ============================================================================
// sheet — SheetModel: IR листа, построенного из SheetConfig.
//
// Это внутренняя реализация. Внешняя форма совпадает с замороженным
// интерфейсом Sheet ($name, $scope, $tokens, $values, $render) — именно её
// возвращает defineSheet. $render делегирует чистым рендерерам из render/*.
// ============================================================================

import type { Resolver, Sheet, SheetConfig } from './types.ts'
import { semanticLightValue } from './value-analysis.ts'
import { renderSheet } from './render/render-sheet.ts'
import { varPrefix } from './render/naming.ts'

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
}
