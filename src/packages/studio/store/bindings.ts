import { unref } from 'vue'
import type { PlayComponentMeta } from '../plugin/component-meta.types.ts'

interface BindingOptions {
  stateProps: Record<string, unknown>
  userEmits?: Record<string, unknown>
  meta?: PlayComponentMeta
  onEmit: (eventName: string, ...args: unknown[]) => void
}

export function createBindings(options: BindingOptions): Record<string, unknown> {
  const { stateProps, userEmits = {}, meta, onEmit } = options
  const bindings: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(stateProps)) {
    bindings[key] = unref(value)
  }

  // 2. Настраиваем перехватчики v-model на основе метаданных или именования
  // Ищем все пропсы, для которых возможен v-model (например, 'modelValue' -> 'onUpdate:modelValue')
  const propKeys = Object.keys(stateProps)

  for (const propName of propKeys) {
    const updateEventName = `onUpdate:${propName}`

    bindings[updateEventName] = (newValue: unknown) => {
      // Обновляем состояние в UI-контролах
      stateProps[propName] = newValue
      // Логируем событие
      onEmit(`update:${propName}`, newValue)
    }
  }

  // 3. Автоматически регистрируем слушатели для всех событий из метаданных (Emits)
  if (meta?.events) {
    for (const eventMeta of meta.events) {
      const handlerName = `on${eventMeta.name.charAt(0).toUpperCase()}${eventMeta.name.slice(1)}`

      // Пропускаем v-model обновляторы, они уже обработаны выше
      if (eventMeta.name.startsWith('update:')) continue

      const userHandler = userEmits[handlerName] || userEmits[eventMeta.name]

      bindings[handlerName] = (...args: unknown[]) => {
        onEmit(eventMeta.name, ...args)

        if (typeof userHandler === 'function') {
          userHandler(...args)
        }
      }
    }
  }

  // 4. Добавляем явные пользовательские эмиты из конфигурации варианта
  for (const [eventName, handler] of Object.entries(userEmits)) {
    if (typeof handler === 'function' && !bindings[eventName]) {
      bindings[eventName] = (...args: unknown[]) => {
        onEmit(eventName, ...args)
        handler(...args)
      }
    }
  }

  return bindings
}
