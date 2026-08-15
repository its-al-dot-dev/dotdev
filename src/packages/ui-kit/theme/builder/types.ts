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

export interface ThemeBuilderConfig {
  /** Неймспейс для base-селекторов локальных (components) листов */
  namespace: string
  /** Имя темы (используется CLI для записи в {output}/{theme}/components) */
  theme: string
  /** Глобальные листы приложения: base = .{name} */
  app?: Record<string, Sheet>
  /** Компоненты: base = .{namespace}-{name} */
  components?: Record<string, Sheet>
}
