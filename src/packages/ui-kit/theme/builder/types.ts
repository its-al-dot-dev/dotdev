// ============================================================================
// Публичные (замороженные) типы API defineSheet + внутренние типы сборки.
//
// ЗАМОРОЖЕНО: TokenRef, DarkToken, SemanticValue, SheetConfig, Sheet, Resolver.
// Их нельзя менять — на них завязан публичный контракт defineSheet.
// Внутренние типы (ThemeBuilderConfig) можно менять свободно.
// ============================================================================

export type TokenRef = string

export interface DarkToken {
  /** Значение в светлой теме (по умолчанию применяется и к тёмной) */
  light?: string
  /** Значение в тёмной теме; если нет — наследуется light */
  dark?: string
}

export type SemanticValue = TokenRef | DarkToken | [string, string]

export interface SheetConfig {
  /** Имя стиля. Используется для неймспейса vars/semantics/utilities */
  name: string
  /** 'global' — утилиты без префикса (обычно дизайн-токены), 'local' — компонент */
  scope?: 'global' | 'local'
  /** Примитивы: --{name}-{key}. Без тёмного режима */
  vars?: Record<string, TokenRef>
  /** Семантические токены: --{name}-{key} + .dark, плюс авто-утилита из ключа */
  semantics?: Record<string, SemanticValue>
  /** Кастомные утилиты: @utility {name}-{key} { @apply ... } */
  utilities?: Record<string, string>
  /** Правила компонента: SCSS-style &, значение — utility-классы */
  rules?: Record<string, string>
  /** Сырые CSS-правила (без @apply) */
  styles?: Record<string, string>
}

export interface Sheet {
  /** Имя листа (для сообщений реестра) */
  $name: string
  /** Скоуп: глобальные листы регистрируются в реестре первыми */
  $scope: 'global' | 'local'
  /** Имена токенов этого листа для общего реестра: bare -> --{name}-{key} */
  $tokens: Map<string, string>
  /** Сырые значения токенов: bare -> исходная строка из конфига (для вывода типа) */
  $values: Map<string, string>

  $render(base: string, resolve: Resolver, values: Map<string, string>): string
}

/** Функция резолва токена в значении (см. createResolver) */
export type Resolver = (value: string) => string

// ============================================================================
// Внутренние типы (не заморожены)
// ============================================================================

/** Группа листов темы: общий namespace-префикс и сами листы */
export interface ThemeGroup {
  /** Префикс base-селектора: 'd' → .d-{name}; пусто/отсутствует → .{name} */
  namespace?: string
  /** Листы группы в порядке объявления (порядок = порядок каскада) */
  sheets: Record<string, Sheet>
}

/** Публичный конфиг темы (вход defineConfig) */
export interface ThemeConfig {
  /** Имя темы (для пути вывода). Если нет — CLI использует 'default' */
  theme?: string
  /** Группы листов в порядке объявления */
  groups: Record<string, ThemeGroup>
}
