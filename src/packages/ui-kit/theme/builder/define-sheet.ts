// ============================================================================
// define-sheet — ЗАМОРОЖЕННАЯ фабрика.
//
// Публичный API не меняется ни каким образом:
//   defineSheet(config: SheetConfig): Sheet
// Внутри строит SheetModel — тот же набор токенов/значений и тот же рендер.
// ============================================================================

import type { Sheet, SheetConfig } from './types.ts'
import { SheetModel } from './sheet.ts'

export function defineSheet(config: SheetConfig): Sheet {
  return new SheetModel(config)
}
