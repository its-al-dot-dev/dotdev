# Architecture Review: `@dotdev/theme`

Date: 2026-08-18

---

## P0 — Critical

### 1. Два независимых парсера токенов ✅ Выполнено

**Файлы:**
- `src/value.ts` — `parseOpacity`, `resolveValue`, `emitValue`, `resolveCategory`
- `src/runtime/define.ts` — `parseOpacity`, `varRef`, `mergeTokens`, `validateTokens`

Оба парсят один и тот же формат (`$/opacity`, `var(...)`, `--ref`, `color-mix`), но реализованы по-разному. Дублирование кода, риск расхождений при изменении формата, разная логика namespace-подстановки (`{ns}` vs `--${ns}-`).

**Решение:** Создан единый модуль `src/token/`:
- `parser.ts` — `parseToken()` → `ParsedToken`
- `resolver.ts` — `resolve()` → `ResolvedValue` с namespace-поддержкой
- `emitter.ts` — `emit()` → CSS-строка
- `category.ts` — `resolveCategory()` для length/color

Теперь `src/value.ts` и `src/runtime/define.ts` являются тонкими обёртками над `src/token/`.

---

### 2. `Component` — мёртвый класс

**Файл:** `src/theme.ts:7`

`Component` — это просто обёртка над `config` без методов. Используется только как `new Component({...})`, никогда не вызывает никакой логики.

**Решение:** Заменить на фабричную функцию или типизированный объект:
```ts
export const createComponent = (config: ComponentConfig): ComponentConfig => config
```
Или убрать вовсе, принимая `ComponentConfig` напрямую в `Theme`.

---

## P1 — High

### 3. Дублирование watch/build логики в CLI ✅ Выполнено

**Файлы:**
- `src/commands/css.ts`
- `src/commands/tokens.ts`

Оба содержали идентичный паттерн:
```ts
await build()
if (args.watch) {
  chokidar.watch(watchPath).on('change', async () => { ... })
}
```

**Решение:** Вынесено в `watchTask(buildFn, watchPath)` в `src/commands/utils.ts`.

---

### 4. Отсутствие композиции / наследования тем ✅ Выполнено

**Файл:** `src/theme.ts:20`

`Theme` принимал плоский `ThemeConfig`. Нет возможности:
- расширить базовую тему (аналог Tailwind `extend`)
- наследовать семантику от другой темы
- делать слои конфигурации (base → brand → component)

**Решение:** Добавлен `extend?: ThemeSource | ThemeConfig | (ThemeSource | ThemeConfig)[]` в `ThemeConfig`. Реализован `resolveExtends()` с рекурсивным мержем и детекцией циклов. `Theme` теперь реализует `ThemeSource`, поэтому можно расширять как экземпляры `Theme`, так и конфиги.

---

## P2 — Medium

### 5. Дублирование типов между пакетами ✅ Выполнено

**Файлы:**
- `src/types.ts:26` — `ThemeTokens`
- `src/runtime/define.ts:5` — `ThemeDefinition`

Оба описывают одну и ту же структуру, но как разные типы. Из-за этого в `@dotdev/ui-kit` пришлось дублировать тип через `// TODO refactor` (`packages/ui-kit/src/config/plugin.ts:11`).

**Решение:** Добавлен `PartialThemeTokens<T>` в `src/types.ts`. `ThemeDefinition` теперь использует `PartialThemeTokens<T>` вместо дублирования mapped-типов. Консьюмеры могут писать `PartialThemeTokens<typeof tokens>` вместо ручного дублирования структуры.

---

### 6. Нет кеширования рендера ✅ Выполнено

**Файл:** `src/render/index.ts:48`

`renderAll`, `renderVarsAll`, `renderUtilitiesAll`, `renderRulesAll` вызывали `renderFiles`, который каждый раз заново итерировал `registry`. Registry иммутабелен после конструирования.

**Решение:** Добавлен `WeakMap<Registry, ThemeFiles>` кеш в `src/render/index.ts`. `renderFiles` кеширует результат после первого вызова.

---

### 7. PostCSS-пайплайн в `tokens.ts` — монолит ✅ Выполнено

**Было:** `src/commands/tokens.ts:31-95`

Блок `compile → collectLocals → inlineVars → pruneEmptyRules → toComponentTemplate` — это ~60 строк спагетти, тесно связанные с конкретной CLI-командой.

**Решение:** Вынесено в `src/compile/` как пайплайн:
```
Input: rules CSS string
  ↓ compile (Tailwind)           → src/compile/tailwind.ts
  ↓ resolve (inline vars + props) → src/compile/resolve.ts
  ↓ inline vars                  → src/compile/inline.ts
  ↓ prune                        → src/compile/prune.ts
  ↓ template (replace namespace)  → src/compile/template.ts
Output: compiled CSS template string
```

Единая точка: `compileComponentRules()` в `src/compile/pipeline.ts`.

---

### 8. `Registry.findByName` — небезопасный union ✅ Выполнено

**Файл:** `src/registry.ts:30`

`byName: Map<string, PrimitiveEntry | SemanticEntry>`. При поиске по `--brand-500` мог вернуть `PrimitiveEntry`, а при `$bg-brand` — `SemanticEntry`. Consumer должен был каждый раз проверять `.kind`.

**Решение:** Разделен на `primitivesByName` и `semanticsByName`. Добавлены явные методы `findPrimitive(name)` и `findSemantic(name)`. `findByName(name)` сохранён для обратной совместимости (ищет сначала в primitives, потом в semantics).

---

## Сводная таблица

| **P0** | Объединить резолв токенов (build-time + runtime) | `src/value.ts`, `src/runtime/define.ts` | ✅ Выполнено — создан `src/token/` (parser, resolver, emitter, category) |
| **P0** | Убрать `Component` класс или дать ему поведение | `src/theme.ts` | ✅ Выполнено — добавлен `extend` в `ThemeConfig`, `Theme` реализует `ThemeSource` |
| **P1** | Вынести общий watch/build хелпер | `src/commands/css.ts`, `src/commands/tokens.ts`, `src/commands/utils.ts` | ✅ Выполнено — `watchTask` в `commands/utils.ts` |
| **P1** | Добавить `extend` в `ThemeConfig` | `src/types.ts`, `src/theme.ts` | ✅ Выполнено — `extend?: ThemeSource | ThemeConfig | (ThemeSource | ThemeConfig)[]` |
| **P2** | Убрать дублирование типов `ThemeTokens`/`ThemeDefinition` | `src/types.ts`, `src/runtime/define.ts` | ✅ Выполнено — добавлен `PartialThemeTokens<T>` |
| **P2** | Кешировать `renderFiles` | `src/render/index.ts` | ✅ Выполнено — `WeakMap<Registry, ThemeFiles>` |
| **P2** | Вынести PostCSS-пайплайн из `tokens.ts` | `src/commands/tokens.ts` | ✅ Выполнено — создан `src/compile/` (pipeline, tailwind, resolve, inline, prune, template) |
| **P2** | Разделить `byName` на два map или сделать безопасный union | `src/registry.ts` | ✅ Выполнено — `primitivesByName` + `semanticsByName`, `findPrimitive`/`findSemantic` |
