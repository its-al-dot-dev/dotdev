/**
 * Возможные виды пропсов для выбора подходящего UI-контрола на фронтенде (Controls)
 */
export type PropControlType =
  | 'string' // string
  | 'number' // number
  | 'boolean' // boolean
  | 'select' // union литералов ('sm' | 'md' | 'lg')
  | 'object' // Record, Interfaces, Types
  | 'array' // T[]
  | 'function' // () => void
  | 'unknown'

/**
 * Вариант значения для UI-контролов типа 'select'
 */
export interface PropOption {
  label: string
  value: string
}

export interface PropTag {
  name: string
  text?: string
}
/**
 * Метаданные одного пропса
 */
export interface PlayPropMeta {
  /** Имя пропса (например: 'disabled', 'size') */
  name: string
  tags: PropTag[]

  /**
   * Сырое строковое представление типа из TS
   * (например: "'sm' | 'md' | 'lg'", "ButtonVariant")
   */
  type: string

  /** Обязателен ли пропс */
  required: boolean

  /** Значение по умолчанию (если есть) */
  default?: unknown

  /** Описание из JSDoc / TSDoc комментариев */
  description?: string

  /** Подсказка для UI-редактора: какой контрол лучше срендерить */
  controlType: PropControlType

  /** Варианты выбора, если controlType === 'select' */
  options?: PropOption[]

  /** Помечен ли пропс как @deprecated в JSDoc */
  isDeprecated?: boolean

  /** Текст причини депрекейта из @deprecated */
  deprecationReason?: string
}

/**
 * Метаданные события (Emits)
 */
export interface PlayEventMeta {
  /** Имя события (например: 'update:modelValue', 'click') */
  name: string
  tags: PropTag[]

  /** Полная сигнатура события (например: '(value: string) => void') */
  signature: string

  /** Описание из JSDoc */
  description?: string
}

/**
 * Метаданные слота
 */
export interface PlaySlotMeta {
  /** Имя слота ('default', 'header', 'icon') */
  name: string
  tags: PropTag[]
  /**
   * Тип передаваемого скоупа (Slot Props).
   * Если слот не scoped, будет 'undefined' или `{}`
   */
  type?: string

  /** Описание из JSDoc */
  description?: string
}

/**
 * Итоговый манифест метаданных компонента,
 * который будет прикреплен к `__meta`
 */
export interface PlayComponentMeta {
  /** Название компонента */
  name: string

  /** Описание самого компонента из JSDoc перед `defineComponent` / `<script setup>` */
  description?: string

  /** Список пропсов в виде объекта для O(1) доступа по имени пропса */
  props: Record<string, PlayPropMeta>

  /** Массив событий components */
  events: PlayEventMeta[]

  /** Массив слотов components */
  slots: PlaySlotMeta[]
}
