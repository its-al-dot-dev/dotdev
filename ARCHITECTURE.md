# @dotdev — Design System Monorepo

Монорепозиторий с декларативной системой темизации на базе Tailwind CSS v4. Состоит из 4 пакетов и 1 приложения.

## Пакеты

```
@dotdev/web          Приложение (Vue 3 SPA — документация + playground)
@dotdev/theme        Движок тем (build-time + runtime)
@dotdev/ui-kit       Библиотека компонентов (20+ Vue компонентов)
@dotdev/studio       Фреймворк playground/docs для компонентов
@dotdev/icons        SVG иконки + Vite плагин для генерации TypeScript
```

### Зависимости

```
@dotdev/web ──→ @dotdev/ui-kit ──→ @dotdev/theme
           ──→ @dotdev/studio ──→ @dotdev/theme
           ──→ @dotdev/icons
```

`@dotdev/theme` — leaf-пакет, не зависит ни от кого внутри монорепо.

---

## Архитектура темы

Тема строится из четырёх слоёв токенов:

| Слой | Назначение | Пример |
|------|-----------|--------|
| **Primitives** | Сырые значения (цвета, размеры, отступы) | `brand-500: var(--color-indigo-500)` |
| **Semantics** | Именованные токены с light/dark парами | `bg-background: [white, neutral-950]` |
| **Utilities** | Определения Tailwind утилит | `size-sm: h-(--d-size-sm)` |
| **Components** | Токены + правила для конкретного компонента | Button: 57 семантических токена, 35+ правил |

### Namespace

Все CSS-переменные префиксуются namespace: `--{ns}-{component}-{name}`.
UI-Kit использует `namespace: 'd'`, Studio — `namespace: 's'`.

---

## @dotdev/theme

### Ключевые классы

**`Theme`** — основной API для описания темы. Принимает `ThemeConfig`:
```typescript
new Theme({
  name: 'Default',
  namespace: 'd',
  primitives: { ... },
  semantics: { ... },
  utilities: { ... },
  components: { button, accordion, ... }
})
```

**`Component`** — описание одного компонента:
```typescript
new Component({
  ui: 'button',
  layer: 'components',  // CSS layer (по умолчанию 'components')
  primitives: { ... },
  semantics: { ... },
  utilities: { ... },
  rules: {
    '&': 'button-rounded inline-flex items-center ...',
    '&--primary.&--solid': 'button-bg-primary-solid hover:button-bg-primary-solid-hover ...',
  }
})
```

**`Registry`** — центральный сборщик всех записей (primitives, semantics, utilities, rules). Каждая запись имеет `scope` — глобальный или привязанный к компоненту.

### Генерация CSS

CLI команда `dotdev-theme` с двумя подкомандами:

#### `dotdev-theme css` — генерация CSS файлов

```bash
dotdev-theme css --input theme/index.ts --output ./dist --name index
dotdev-theme css --input theme/index.ts --output ./dist --name index --part vars        # только переменные
dotdev-theme css --input theme/index.ts --output ./dist --name index --part utilities   # только утилиты
dotdev-theme css --input theme/index.ts --output ./dist --name index --part rules       # только правила
dotdev-theme css --input theme/index.ts --output ./dist --name index --watch            # watch mode
```

Рендереры:
- **`renderVars`** — `@theme { --d-*: ... }` блоки + `.dark { --d-*: ... }` переопределения
- **`renderUtilities`** — `@utility name { @apply ...; }` блоки (Tailwind v4)
- **`renderRules`** — `@layer <name> { .d-button { @apply ...; } }` блоки, группируются по layer

#### `dotdev-theme tokens` — генерация runtime TypeScript

```bash
dotdev-theme tokens --input theme/index.ts --output ./dist --name default
dotdev-theme tokens --input theme/index.ts --output ./dist --name default --part templates          # только шаблоны
dotdev-theme tokens --input theme/index.ts --output ./dist --name default --part templates:button  # шаблоны конкретных компонентов
dotdev-theme tokens --input theme/index.ts --output ./dist --name default --part tokens            # только токены (включает шаблоны)
```

Сложный pipeline:
1. Компилирует правила каждого компонента через PostCSS + Tailwind CSS
2. Инлайнирует CSS-переменные (рекурсивно разрешает `var(--d-*)` в реальные значения)
3. Удаляет внутренние Tailwind переменные (`--tw-*`)
4. Генерирует TypeScript шаблоны (`components/templates/{ui}.ts`) с предкомпилированным CSS
5. Генерирует `tokens.ts` — полный объект токенов как `const`

### Runtime API

```typescript
import { defineTheme } from '@dotdev/theme'

const theme = defineTheme({
  namespace: 'd',
  tokens: generatedTokens,
  overrides: { ... }
})

theme.inject()       // вставляет <style> в document.head
theme.toVarsCSS()    // генерирует CSS custom properties
```

- **`injectCSS(id, css)`** — вставляет/обновляет `<style>` по ID в `<head>`
- **`renderRuntimeVars(tokens, namespace, ui?)`** — генерирует CSS custom properties для runtime
- **`mergeTokens(base, overrides)`** — мержит базовые токены с переопределениями
- **`validateTokens(tokens)`** — проверяет неизвестные ссылки
- **`toComponentTemplate(css, namespace)`** — заменяет namespace на `{ns}` плейсхолдер

### Watch mode

Обе команды поддерживают `--watch` с опциональным `--watch-path`. Исправлен баг с кэшированием ESM `import()` — теперь используем query-параметр `?t=${Date.now()}` для инвалидации кэша.

---

## @dotdev/ui-kit

### Компоненты (21 шт.)

| Компонент | Файлы |
|-----------|-------|
| Accordion | `components/accordion/Accordion.vue` |
| Avatar | `components/avatar/Avatar.vue` |
| Breadcrumbs | `components/breadcrumbs/Breadcrumbs.vue` |
| Button | `components/button/Button.vue` |
| Checkbox | `components/checkbox/Checkbox.vue` |
| Divider | `components/divider/Divider.vue` |
| Group | `components/group/Group.vue` |
| Icon | `components/icon/Icon.vue` |
| IconButton | `components/icon-button/IconButton.vue` |
| Input | `components/input/Input.vue` |
| ListBox | `components/listbox/ListBox.vue` |
| Menu | `components/menu/Menu.vue` |
| Message | `components/message/Message.vue` |
| Radio | `components/radio/Radio.vue` |
| ScrollArea | `components/scroll-area/ScrollArea.vue` |
| Select | `components/select/Select.vue` |
| SelectButton | `components/select-button/SelectButton.vue` |
| Switch | `components/switch/Switch.vue` |
| Table + TableCell/TableHead/TableRow | `components/table/Table.vue` |
| Tag | `components/tag/Tag.vue` |
| Textarea | `components/textarea/Textarea.vue` |

### Паттерн компонента

Каждый компонент использует три composable:

```vue
<script setup lang="ts">
import type { UIButtonProps } from './button.types.ts'
import { computed } from 'vue'
import { useUiKitProps } from '../../config'
import { useUiKitBem, useUiKitTheme } from '../../composables'
import { template } from '../templates/button.ts'

const props = defineProps<UIButtonProps>()

const ui = useUiKitProps('button', props)
useUiKitTheme(ui, template)
const bem = useUiKitBem(ui)
</script>
```

1. **`useUiKitProps(name, props)`** — Proxy-объект, мержит глобальные дефолты из конфига с пропсами компонента
2. **`useUiKitTheme(ui, template)`** — инжектит runtime CSS (переменные + предкомпилированные стили) в DOM
3. **`useUiKitBem(ui)`** — генерирует BEM-классы: `d-button d-button--md d-button--primary`

### Composables

| Composable | Назначение |
|------------|-----------|
| `useBem` / `useUiKitBem` | BEM-генерация классов |
| `useThemeProvider` / `useUiKitTheme` | Runtime инъекция темы |
| `useClickOutside` | Обработка кликов вне элемента |
| `useClipboard` | Копирование в буфер |
| `useColorScheme` | Определение light/dark системных настроек |
| `useFloating` | Позиционирование через @floating-ui |
| `useGlobalEvent` | Глобальные DOM-события |
| `useKeyboardNavigation` | Навигация клавиатурой |
| `useSelectOptions` | Опции для select/listbox |
| `useTypeahead` | Поиск по вводу |
| `useArrayModel` | Вложенные v-model для массивов |

### Конфигурация

```typescript
import { createUiKit } from '@dotdev/ui-kit'
import { uiKitIcons } from '@dotdev/icons'

app.use(createUiKit({
  namespace: 'd',
  icons: uiKitIcons,
  defaults: {
    button: { size: 'md', color: 'brand', variant: 'solid' },
  }
}))
```

Плагин предоставляет глобальный конфиг через `provide/inject`. Все компоненты автоматически подхватывают дефолты через `useUiKitProps`.

### Типизация

`UiKitRegister` — расширяемый интерфейс для типизации иконок, namespace, размеров, цветов:

```typescript
interface UiKitRegister {
  icons: Record<string, Component>
  namespace: 'd'
  sizes: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  colors: 'brand' | 'neutral' | 'danger' | 'warning' | 'info' | 'success'
}
```

---

## @dotdev/studio

Фреймворк для playground и документации компонентов.

### API

```typescript
import { definePlay } from '@dotdev/studio'

const play = definePlay(Button, {
  props: { size: 'md', color: 'brand' },
  slots: { default: 'Click me' },
})
```

### Компоненты

- `Playground` — интерактивный playground для компонентов
- Документационные UI-компоненты (examples, code blocks, и т.д.)

### Тема

Studio использует отдельную тему с `namespace: 's'` и тремя компонентами:
- `layout` — сайдбар, хедер, хлебные крошки
- `landing` — главная страница
- `doc` — страницы документации

---

## @dotdev/icons

SVG иконки + Vite плагин.

Плагин `uiKitIcons`:
- Читает SVG-файлы из `src/pack/`
- Генерирует `icons.ts` (карта иконок)
- Генерирует `icon-types.d.ts` (расширяет `UiKitRegister`)
- Генерирует `svg-env.d.ts` (декларирует `*.svg?component`)
- В dev-режиме следит за файлами и триггерит HMR

---

## @dotdev/web

Vue 3 SPA — документация и playground для всей дизайн-системы.

### Стек

- Vue 3 + Vite 8 + Tailwind CSS v4
- Vue Router (file-based routing)
- Pinia (state management)
- Shiki (syntax highlighting)
- AutoImport (для `defineExample` из studio)

### Генерируемые файлы

```
src/generated/styles/    CSS файлы (vars.css, utilities.css, studio.css)
src/generated/icons/     SVG иконки как Vue-компоненты
```

### Запуск

```bash
bun dev       # Vite dev server
bun build     # vue-tsc -b && vite build
bun preview   # preview сборки
```

---

## Структура файлов темы

```
packages/ui-kit/src/theme/
├── index.ts                    # Главный Theme экземпляр
├── components/
│   ├── button.ts               # Определение темы Button
│   ├── accordion.ts            # Определение темы Accordion
│   ├── ...                     # (21 компонент)
│   ├── button/                 # Сгенерированные подкаталоги
│   │   └── rules.css           # PostCSS-скомпилированные правила
│   ├── accordion/
│   └── ...

packages/ui-kit/src/components/templates/
├── tokens.ts                   # Сгенерированные токены (673 строки)
├── button.ts                   # Предкомпилированный CSS Button
├── accordion.ts                # Предкомпилированный CSS Accordion
└── ...                         # (25 файлов)
```

---

## Генерация CSS — pipeline

```
ThemeConfig (TypeScript)
    │
    ▼
Theme → Registry (все записи: primitives, semantics, utilities, rules)
    │
    ├─── renderVars()     → @theme { --d-*: ... } + .dark { ... }
    ├─── renderUtilities() → @utility name { @apply ...; }
    └─── renderRules()    → @layer <name> { .selector { @apply ...; } }
    │
    ▼
CSS файлы (для Tailwind CSS v4)
    │
    ▼
dotdev-theme tokens → PostCSS + Tailwind компиляция
    │
    ├── Инлайн var(--d-*) → реальные значения
    ├── Удаление --tw-* internals
    │
    ▼
Runtime TypeScript (templates/*.ts + tokens.ts)
    │
    ▼
useUiKitTheme() → injectCSS() → <style> в <head>
```

---

## Технологии

| Категория | Технологии |
|-----------|-----------|
| Runtime | Bun, Node.js |
| Framework | Vue 3.5, Vite 8, Pinia 4 |
| CSS | Tailwind CSS v4, PostCSS 8 |
| TypeScript | TS 6.0 |
| CLI | citty |
| File watching | chokidar 4 |
| Positioning | @floating-ui/dom |
| Syntax highlighting | shiki 4 |
| Build | tsup 8 |
| Linting/Formatting | Prettier 3.9 |
