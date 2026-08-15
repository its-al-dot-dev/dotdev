// ============================================================================
// define-config — публичная фабрика конфига темы.
//
// Чистая функция без IO: типизирует вход, валидирует и возвращает как есть.
// Загрузка/рендер — отдельно (ThemeBuilder, writeThemeFiles).
// ============================================================================

import type { ThemeConfig } from './types.ts'

export function defineConfig(config: ThemeConfig): ThemeConfig {
  const groups = Object.entries(config.groups)
  if (!groups.length) {
    throw new Error('[defineConfig] theme must define at least one group.')
  }

  const seen = new Map<string, string>()
  for (const [groupName, group] of groups) {
    const sheets = Object.entries(group.sheets)
    if (!sheets.length) {
      throw new Error(`[defineConfig] group '${groupName}' must contain at least one sheet.`)
    }

    for (const [key, sheet] of sheets) {
      const owner = seen.get(sheet.$name)
      if (owner) {
        throw new Error(
          `[defineConfig] duplicate sheet name '${sheet.$name}' (key '${key}') in groups '${owner}' and '${groupName}'. ` +
            `Sheet names must be unique across the whole theme: they become output file names.`,
        )
      }
      seen.set(sheet.$name, groupName)
    }
  }

  return config
}
