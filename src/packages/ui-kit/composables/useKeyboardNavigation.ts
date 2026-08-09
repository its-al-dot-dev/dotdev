import { computed, type ComputedRef, type MaybeRefOrGetter, type Ref, ref, toValue, watch } from 'vue'

export type NavigationMode = 'list' | 'grid'

export type NavigationDirection = 'up' | 'down' | 'left' | 'right'

export type NavigationBoundary = 'start' | 'end' | 'left' | 'right'

export interface KeyboardNavigationContext<T> {
  /**
   * Текущий индекс перед попыткой навигации.
   */
  currentIndex: number

  /**
   * Элемент, на котором сейчас находится навигация.
   */
  currentItem: T | undefined

  /**
   * Все элементы.
   */
  items: readonly T[]

  /**
   * Направление движения.
   */
  direction: NavigationDirection

  /**
   * Индекс, который был бы выбран без учёта skipped элементов.
   */
  targetIndex: number | null
}

/**
 * Возвращаемое значение boundary callback.
 *
 * number -> перейти на конкретный индекс
 * null   -> остаться на текущем элементе
 */
export type NavigationBoundaryResult = number | null | undefined

export interface KeyboardNavigationOptions<T> {
  /**
   * Текущий режим навигации.
   */
  mode?: NavigationMode

  /**
   * Включена ли keyboard navigation.
   *
   * Можно передать boolean, ref или getter.
   */
  isEnabled?: MaybeRefOrGetter<boolean>

  /**
   * Явно задаёт начальный индекс.
   *
   * По умолчанию 0.
   */
  initialIndex?: number

  /**
   * Определяет, нужно ли пропустить элемент.
   *
   * Например:
   * item => item.disabled
   */
  isSkipped?: (item: T, index: number) => boolean

  /**
   * Количество колонок в grid.
   *
   * Может быть как number, так и getter/ref.
   */
  columns?: MaybeRefOrGetter<number>

  /**
   * Вызывается, когда пытаемся уйти выше
   * первого элемента.
   *
   * Вернув индекс — навигация перейдёт на него.
   * Вернув null/undefined — останется на текущем.
   */
  onStartReached?: (context: KeyboardNavigationContext<T>) => NavigationBoundaryResult

  /**
   * Вызывается, когда пытаемся уйти ниже
   * последнего элемента.
   */
  onEndReached?: (context: KeyboardNavigationContext<T>) => NavigationBoundaryResult

  /**
   * Вызывается, когда пытаемся уйти левее
   * первого столбца.
   */
  onLeftEdgeReached?: (context: KeyboardNavigationContext<T>) => NavigationBoundaryResult

  /**
   * Вызывается, когда пытаемся уйти правее
   * последнего столбца.
   */
  onRightEdgeReached?: (context: KeyboardNavigationContext<T>) => NavigationBoundaryResult
}

export interface UseKeyboardNavigationReturn<T> {
  /**
   * Текущий индекс.
   */
  currentIndex: Ref<Readonly<number>>

  /**
   * Текущий элемент.
   */
  currentItem: ComputedRef<T | undefined>

  /**
   * Есть ли доступный элемент.
   */
  hasCurrentItem: ComputedRef<boolean>

  /**
   * Изменить текущий индекс вручную.
   */
  setCurrentIndex: (index: number) => void

  /**
   * Перейти на следующий элемент.
   */
  next: () => boolean

  /**
   * Перейти на предыдущий элемент.
   */
  previous: () => boolean

  /**
   * Обработать KeyboardEvent.
   *
   * Возвращает true, если событие обработано.
   */
  onKeydown: (event: KeyboardEvent) => boolean

  /**
   * Найти первый доступный индекс.
   */
  findFirstAvailable: () => number

  /**
   * Найти последний доступный индекс.
   */
  findLastAvailable: () => number

  /**
   * Проверить, доступен ли индекс.
   */
  isAvailable: (index: number) => boolean
}

export function useKeyboardNavigation<T>(
  items: MaybeRefOrGetter<readonly T[]>,
  options: KeyboardNavigationOptions<T> = {},
): UseKeyboardNavigationReturn<T> {
  const {
    mode = 'list',
    isEnabled = true,
    initialIndex = -1,
    isSkipped = () => false,
    columns = 1,
    onStartReached,
    onEndReached,
    onLeftEdgeReached,
    onRightEdgeReached,
  } = options

  const currentIndex = ref(initialIndex)

  const resolvedItems = computed(() => toValue(items))

  const resolvedColumns = computed(() => {
    const value = toValue(columns)

    return Math.max(1, Math.floor(value || 1))
  })

  const currentItem = computed(() => {
    return resolvedItems.value[currentIndex.value]
  })

  const hasCurrentItem = computed(() => {
    return currentItem.value !== undefined
  })

  /**
   * Проверяет, существует ли индекс и не пропущен ли элемент.
   */
  const isAvailable = (index: number): boolean => {
    const item = resolvedItems.value[index]

    if (item === undefined) {
      return false
    }

    return !isSkipped(item, index)
  }

  /**
   * Находит первый доступный элемент.
   */
  const findFirstAvailable = (): number => {
    const itemsValue = resolvedItems.value

    for (let index = 0; index < itemsValue.length; index++) {
      if (isAvailable(index)) {
        return index
      }
    }

    return -1
  }

  /**
   * Находит последний доступный элемент.
   */
  const findLastAvailable = (): number => {
    const itemsValue = resolvedItems.value

    for (let index = itemsValue.length - 1; index >= 0; index--) {
      if (isAvailable(index)) {
        return index
      }
    }

    return -1
  }

  /**
   * Находит следующий доступный элемент
   * в линейном направлении.
   */
  const findNextAvailable = (startIndex: number, direction: 1 | -1): number => {
    let index = startIndex + direction

    while (index >= 0 && index < resolvedItems.value.length) {
      if (isAvailable(index)) {
        return index
      }

      index += direction
    }

    return -1
  }

  /**
   * Безопасно устанавливает текущий индекс.
   */
  const setCurrentIndex = (index: number): void => {
    if (!resolvedItems.value.length) {
      currentIndex.value = -1
      return
    }

    if (index < 0 || index >= resolvedItems.value.length) {
      return
    }

    if (!isAvailable(index)) {
      return
    }

    currentIndex.value = index
  }

  /**
   * Создаёт контекст для boundary callback.
   */
  const createContext = (direction: NavigationDirection, targetIndex: number | null): KeyboardNavigationContext<T> => {
    return {
      currentIndex: currentIndex.value,
      currentItem: currentItem.value,
      items: resolvedItems.value,
      direction,
      targetIndex,
    }
  }

  /**
   * Обработка выхода за вертикальную границу списка/grid.
   */
  const handleVerticalBoundary = (direction: 'up' | 'down', targetIndex: number): boolean => {
    const callback = direction === 'up' ? onStartReached : onEndReached

    if (!callback) {
      return false
    }

    const result = callback(createContext(direction, targetIndex))

    if (typeof result === 'number' && isAvailable(result)) {
      currentIndex.value = result
      return true
    }

    return false
  }

  /**
   * Обработка выхода за горизонтальную границу grid.
   */
  const handleHorizontalBoundary = (direction: 'left' | 'right', targetIndex: number): boolean => {
    const callback = direction === 'left' ? onLeftEdgeReached : onRightEdgeReached

    if (!callback) {
      return false
    }

    const result = callback(createContext(direction, targetIndex))

    if (typeof result === 'number' && isAvailable(result)) {
      currentIndex.value = result
      return true
    }

    return false
  }

  /**
   * Навигация в list mode.
   *
   * ArrowUp   -> предыдущий
   * ArrowDown -> следующий
   */
  const moveList = (direction: 'up' | 'down'): boolean => {
    const delta = direction === 'up' ? -1 : 1

    const nextIndex = findNextAvailable(currentIndex.value, delta)

    if (nextIndex !== -1) {
      currentIndex.value = nextIndex
      return true
    }

    return handleVerticalBoundary(direction, currentIndex.value)
  }

  /**
   * Навигация в grid mode.
   *
   * ArrowLeft  -> column - 1
   * ArrowRight -> column + 1
   * ArrowUp    -> row - 1
   * ArrowDown  -> row + 1
   */
  const moveGrid = (direction: NavigationDirection): boolean => {
    const index = currentIndex.value
    const columnCount = resolvedColumns.value

    const row = Math.floor(index / columnCount)
    const column = index % columnCount

    let targetIndex: number

    switch (direction) {
      case 'left':
        if (column === 0) {
          return handleHorizontalBoundary('left', index)
        }

        targetIndex = index - 1
        break

      case 'right':
        if (column === columnCount - 1) {
          return handleHorizontalBoundary('right', index)
        }

        targetIndex = index + 1
        break

      case 'up':
        if (row === 0) {
          return handleVerticalBoundary('up', index)
        }

        targetIndex = index - columnCount
        break

      case 'down':
        targetIndex = index + columnCount

        if (targetIndex >= resolvedItems.value.length) {
          return handleVerticalBoundary('down', index)
        }

        break
    }

    /**
     * В grid может существовать "дырка":
     *
     * A B C D
     * E F
     *
     * При ArrowDown с C индекс = 6,
     * которого не существует.
     *
     * Поэтому сначала пробуем найти ближайший
     * валидный элемент в том же направлении.
     */
    if (isAvailable(targetIndex)) {
      currentIndex.value = targetIndex
      return true
    }

    if (direction === 'up' || direction === 'down') {
      const step = direction === 'up' ? -columnCount : columnCount

      let fallbackIndex = targetIndex

      while (fallbackIndex >= 0 && fallbackIndex < resolvedItems.value.length) {
        if (isAvailable(fallbackIndex)) {
          currentIndex.value = fallbackIndex
          return true
        }

        fallbackIndex += step
      }

      return handleVerticalBoundary(direction, index)
    }

    /**
     * Для горизонтального движения пропускаем
     * disabled/skipped элементы.
     */
    const step = direction === 'left' ? -1 : 1

    let fallbackIndex = targetIndex

    while (fallbackIndex >= 0 && fallbackIndex < resolvedItems.value.length) {
      /**
       * Не позволяем горизонтальной навигации
       * перескочить на другую строку.
       */
      if (Math.floor(fallbackIndex / columnCount) !== row) {
        break
      }

      if (isAvailable(fallbackIndex)) {
        currentIndex.value = fallbackIndex
        return true
      }

      fallbackIndex += step
    }

    return direction === 'left' ? handleHorizontalBoundary('left', index) : handleHorizontalBoundary('right', index)
  }

  /**
   * Основная функция перемещения.
   */
  const move = (direction: NavigationDirection): boolean => {
    if (!toValue(isEnabled)) {
      return false
    }

    if (!resolvedItems.value.length) {
      return false
    }

    if (currentIndex.value === -1) {
      const first = findFirstAvailable()

      if (first === -1) {
        return false
      }

      currentIndex.value = first
      return true
    }

    return mode === 'list' ? moveList(direction as 'up' | 'down') : moveGrid(direction)
  }

  const next = (): boolean => {
    return mode === 'list' ? move('down') : move('right')
  }

  const previous = (): boolean => {
    return mode === 'list' ? move('up') : move('left')
  }

  /**
   * Keyboard event handler.
   *
   * Composable намеренно не делает preventDefault автоматически
   * для неизвестных клавиш.
   */
  const onKeydown = (event: KeyboardEvent): boolean => {
    if (!toValue(isEnabled)) {
      return false
    }

    let direction: NavigationDirection | null = null

    switch (event.key) {
      case 'ArrowUp':
        direction = 'up'
        break

      case 'ArrowDown':
        direction = 'down'
        break

      case 'ArrowLeft':
        direction = 'left'
        break

      case 'ArrowRight':
        direction = 'right'
        break
    }

    if (!direction) {
      return false
    }

    /**
     * В list mode горизонтальные стрелки
     * не считаются navigation keys.
     */
    if (mode === 'list' && (direction === 'left' || direction === 'right')) {
      return false
    }

    /**
     * В grid mode все четыре стрелки работают.
     */
    const moved = move(direction)

    if (moved) {
      event.preventDefault()
      event.stopPropagation()
    }

    return moved
  }

  /**
   * Если items изменились и текущий индекс
   * больше невалиден — корректируем его.
   */
  watch(
    resolvedItems,
    (itemsValue) => {
      if (!itemsValue.length) {
        currentIndex.value = -1
        return
      }

      if (currentIndex.value < 0 || currentIndex.value >= itemsValue.length || !isAvailable(currentIndex.value)) {
        currentIndex.value = findFirstAvailable()
      }
    },
    {
      immediate: true,
    },
  )

  return {
    currentIndex,
    currentItem,
    hasCurrentItem,
    setCurrentIndex,
    next,
    previous,
    onKeydown,
    findFirstAvailable,
    findLastAvailable,
    isAvailable,
  }
}
