// ============================================================================
// theme-builder — чистая оркестрация сборки темы (без IO).
//
// Заменяет старые uiKitTheme() и buildTheme(). Отвечает за:
//   - сбор общего реестра токенов из глобальных листов (TokenRegistry);
//   - резолвер значений;
//   - вывод base-селектора по группе: namespace → .{ns}-{name}, иначе .{name};
//   - рендер каждого листа и сборку результата.
//
// scope листа управляет ТОЛЬКО регистрацией токенов в реестре, а namespace
// группы — ТОЛЬКО base-селектором. Это два ортогональных решения.
// Порядок групп = порядок объявления в конфиге: он определяет каскад (index.css)
// и first-wins в реестре для глобальных токенов.
// ============================================================================

import type { ThemeConfig, ThemeGroup } from './types.ts'
import { TokenRegistry } from './registry.ts'
import { createResolver } from './resolver.ts'
import type { SheetModel } from './sheet.ts'

export class ThemeBuilder {
  private readonly config: ThemeConfig
  private readonly registry: TokenRegistry
  /** Листы в порядке групп конфига. SheetModel — конкретная IR-реализация
   *  замороженного интерфейса Sheet, в рантайме это те же объекты. */
  private readonly sheets: SheetModel[]

  constructor(config: ThemeConfig) {
    this.config = config
    this.registry = new TokenRegistry()
    this.sheets = Object.values(config.groups).flatMap((group) => Object.values(group.sheets)) as SheetModel[]
    this.registry.collect(this.sheets)
  }

  /** Base-селектор листа по группе: {ns}-{name} или {name} */
  private baseFor(group: ThemeGroup, name: string): string {
    return group.namespace ? `.${group.namespace}-${name}` : `.${name}`
  }

  /** Рендерит каждый лист в отдельный CSS-текст: группа -> имя листа -> CSS */
  renderAll(): Record<string, Record<string, string>> {
    const resolve = createResolver(this.registry)
    const result: Record<string, Record<string, string>> = {}

    for (const [groupName, group] of Object.entries(this.config.groups)) {
      const styles: Record<string, string> = {}
      for (const sheet of Object.values(group.sheets)) {
        styles[sheet.$name] = sheet.$render(this.baseFor(group, sheet.$name), resolve, this.registry.values)
      }
      result[groupName] = styles
    }

    return result
  }

  /** Собирает все листы в единый CSS-текст (порядок групп конфига) */
  build(): string {
    return Object.values(this.renderAll())
      .flatMap((group) => Object.values(group))
      .filter(Boolean)
      .join('\n\n')
  }
}

export function createThemeBuilder(config: ThemeConfig): ThemeBuilder {
  return new ThemeBuilder(config)
}
