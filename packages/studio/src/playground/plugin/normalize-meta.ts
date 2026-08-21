import type { ComponentMeta, PropertyMeta } from 'vue-component-meta'
import type {
  PlayComponentMeta,
  PlayEventMeta,
  PlayPropMeta,
  PlaySlotMeta,
  PropControlType,
  PropOption,
} from './component-meta.types.ts'

/**
 * Определяет подходящий UI-контрол для фронтенд-панели на основе TS-типа и схемы
 */
function determineControlType(prop: PropertyMeta): PropControlType {
  const type = prop.type.toLowerCase()

  if (type === 'boolean' || type === 'boolean | undefined') {
    return 'boolean'
  }
  if (type === 'number' || type === 'number | undefined') {
    return 'number'
  }
  if (type === 'string' || type === 'string | undefined') {
    return 'string'
  }
  if (type.includes('=>') || type.includes('function')) {
    return 'function'
  }

  // Проверяем, является ли тип Union (юнионом литералов), чтобы предложить 'select'
  if (prop.schema && typeof prop.schema === 'object' && prop.schema.kind === 'enum') {
    return 'select'
  }

  // Если тип содержит литералы в строке вида "'sm' | 'md' | 'lg'"
  if (prop.type.includes('|') && !type.includes('object') && !type.includes('record')) {
    return 'select'
  }

  if (type.endsWith('[]') || type.startsWith('array') || type.startsWith('readonly')) {
    return 'array'
  }

  if (type.includes('record') || type.includes('object') || type.includes('{')) {
    return 'object'
  }

  return 'unknown'
}

/**
 * Извлекает варианты (options) для селектов из схемы или строки типа
 */
function extractOptions(prop: PropertyMeta): PropOption[] | undefined {
  // 1. Попытка достать из распарсенной схемы vue-component-meta
  if (
    prop.schema &&
    typeof prop.schema === 'object' &&
    prop.schema.kind === 'enum' &&
    Array.isArray(prop.schema.schema)
  ) {
    return prop.schema.schema
      .map((item) => {
        const val = typeof item === 'object' && item !== null && 'schema' in item ? item.schema : item

        if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
          // Убираем кавычки из строковых литералов '"sm"' -> 'sm'
          const cleanValue = typeof val === 'string' ? val.replace(/^['"]|['"]$/g, '') : val
          if (cleanValue === 'undefined') return null

          return { label: String(cleanValue), value: cleanValue }
        }

        return null
      })
      .filter((opt): opt is PropOption => opt !== null)
  }

  // 2. Фолбэк: парсинг простой строки юниона ('xs' | 'sm' | 'md')
  if (prop.type.includes('|')) {
    const rawOptions = prop.type
      .split('|')
      .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
      .filter((s) => s !== 'undefined' && s !== 'null' && s !== '')

    if (rawOptions.length > 0) {
      return rawOptions.map((opt) => ({ label: opt, value: opt }))
    }
  }

  return undefined
}

/**
 * Нормализует метаданные одного пропса
 */
export function normalizePropMetadata(prop: PropertyMeta): PlayPropMeta {
  const controlType = determineControlType(prop)
  const options = controlType === 'select' ? extractOptions(prop) : undefined

  // Поиск TSDoc-тега @deprecated
  const deprecatedTag = prop.tags?.find((tag) => tag.name === 'deprecated')

  return {
    name: prop.name,
    tags: prop.tags,
    type: prop.type.replace('| undefined', ''),
    required: prop.required,
    default: prop.default !== undefined ? prop.default.replace(/^['"]|['"]$/g, '') : undefined,
    description: prop.description || undefined,
    controlType,
    options,
    isDeprecated: Boolean(deprecatedTag),
    deprecationReason: deprecatedTag?.text || undefined,
  }
}

/**
 * Нормализует метаданные событий (Emits)
 */
function normalizeEventMetadata(events: ComponentMeta['events']): PlayEventMeta[] {
  return events.map((event) => ({
    name: event.name,
    tags: event.tags,
    signature: event.signature,
    description: event.description || undefined,
  }))
}

/**
 * Нормализует метаданные слотов (Slots)
 */
function normalizeSlotMetadata(slots: ComponentMeta['slots']): PlaySlotMeta[] {
  return slots.map((slot) => ({
    name: slot.name,
    tags: slot.tags,
    type: slot.type !== 'v-node' ? slot.type : undefined,
    description: slot.description || undefined,
  }))
}

/**
 * Главный нормализатор метаданных компонента
 */
export function normalizeComponentMeta(meta: ComponentMeta, filePath: string): PlayComponentMeta {
  // Фильтруем глобальные HTML-пропсы (id, class, style и т.д.), оставив только пользовательские
  const userProps = meta.props.filter((prop) => !prop.global)

  const props = userProps.reduce<Record<string, PlayPropMeta>>((acc, propMeta) => {
    acc[propMeta.name] = normalizePropMetadata(propMeta)
    return acc
  }, {})

  // Извлекаем имя файла без расширения (например, Button.vue -> Button)
  const componentName =
    filePath
      .split('/')
      .pop()
      ?.replace(/\.vue$/, '') ?? 'UnknownComponent'

  return {
    name: componentName,
    description: meta.description || undefined,
    props,
    events: normalizeEventMetadata(meta.events),
    slots: normalizeSlotMetadata(meta.slots),
  }
}
