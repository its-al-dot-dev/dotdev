// ============================================================================
// theme-builder — чистая оркестрация сборки темы (без IO).
//
// Заменяет старые uiKitTheme() и buildTheme(). Отвечает за:
//   - сбор общего реестра токенов из глобальных листов (TokenRegistry);
//   - резолвер значений;
//   - вывод base-селектора по группе (app -> .{name}, components -> .{namespace}-{name});
//   - рендер каждого листа и сборку результата.
//
// scope листа управляет ТОЛЬКО регистрацией токенов в реестре, а группа —
// ТОЛЬКО base-селектором. Это два ортогональных решения, они не смешаны.
// ============================================================================

import type { ThemeBuilderConfig } from './types.ts'
import { TokenRegistry } from './registry.ts'
import { createResolver } from './resolver.ts'

export class ThemeBuilder {
  private readonly config: ThemeBuilderConfig
  private readonly registry: TokenRegistry

  constructor(config: ThemeBuilderConfig) {
    this.config = config
    this.registry = new TokenRegistry()
    this.registry.collect([
      ...Object.values(config.app ?? {}),
      ...Object.values(config.components ?? {}),
    ])
  }

  /** Рендерит каждый лист в отдельный CSS-текст: имя листа -> CSS */
  renderAll(): Record<string, string> {
    const resolve = createResolver(this.registry)
    const result: Record<string, string> = {}

    for (const sheet of Object.values(this.config.app ?? {})) {
      if (sheet) result[sheet.$name] = sheet.$render(`.${sheet.$name}`, resolve, this.registry.values)
    }
    for (const sheet of Object.values(this.config.components ?? {})) {
      if (sheet) {
        result[sheet.$name] = sheet.$render(
          `.${this.config.namespace}-${sheet.$name}`,
          resolve,
          this.registry.values,
        )
      }
    }

    return result
  }

  /** Собирает все листы в единый CSS-текст (порядок: app -> components) */
  build(): string {
    return Object.values(this.renderAll()).filter(Boolean).join('\n\n')
  }
}

export function createThemeBuilder(config: ThemeBuilderConfig): ThemeBuilder {
  return new ThemeBuilder(config)
}
