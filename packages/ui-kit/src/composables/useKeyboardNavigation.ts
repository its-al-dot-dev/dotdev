import { computed, type ComputedRef, type MaybeRefOrGetter, ref, type Ref, toValue, watch } from 'vue'

export type NavigationDirection = 'up' | 'down' | 'left' | 'right'
export type NavigationEdgeMode = 'auto' | 'manual'
export interface KeyboardNavigationContext<T> {
  currentIndex: number
  currentItem: T | undefined
  items: readonly T[]
  direction: NavigationDirection
  targetIndex: number | null
}

export type NavigationBoundaryResult = number | null | undefined
export type NavigationBoundaryFn<T> = (context: KeyboardNavigationContext<T>) => NavigationBoundaryResult
export interface KeyboardNavigationOptions<T> {
  edgeX?: NavigationEdgeMode
  edgeY?: NavigationEdgeMode
  isEnabled?: MaybeRefOrGetter<boolean>
  initialIndex?: number
  columns?: MaybeRefOrGetter<number>
  isSkipped?: (item: T, index: number) => boolean
  onStartReached?: NavigationBoundaryFn<T>
  onEndReached?: NavigationBoundaryFn<T>
  onLeftEdgeReached?: NavigationBoundaryFn<T>
  onRightEdgeReached?: NavigationBoundaryFn<T>
}

export interface UseKeyboardNavigationReturn<T> {
  currentIndex: Ref<Readonly<number>>
  currentItem: ComputedRef<T | undefined>
  hasCurrentItem: ComputedRef<boolean>
  setCurrentIndex: (index: number) => void
  next: () => boolean
  previous: () => boolean
  onKeydown: (event: KeyboardEvent) => boolean
  findFirstAvailable: () => number
  findLastAvailable: () => number
  isAvailable: (index: number) => boolean
}

const DIRECTION_BY_KEY: Record<string, NavigationDirection | undefined> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

export function useKeyboardNavigation<T>(
  items: MaybeRefOrGetter<readonly T[]>,
  options: KeyboardNavigationOptions<T> = {},
) {
  const {
    edgeX = 'auto',
    edgeY = 'auto',
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
  const currentItem = computed(() => resolvedItems.value[currentIndex.value])
  const hasCurrentItem = computed(() => currentItem.value !== undefined)
  const resolvedColumns = computed(() => {
    const value = Number(toValue(columns))
    return Number.isFinite(value) ? Math.max(1, Math.floor(value)) : 1
  })

  function getRow(index: number) {
    return Math.floor(index / resolvedColumns.value)
  }

  function getCol(index: number) {
    return index % resolvedColumns.value
  }

  function isAvailable(index: number): boolean {
    const item = resolvedItems.value[index]
    return item !== undefined && !isSkipped(item, index)
  }

  function findAvailableInRange(startIndex: number, endIndex: number, step: 1 | -1): number {
    for (let index = startIndex; step === 1 ? index <= endIndex : index >= endIndex; index += step) {
      if (isAvailable(index)) return index
    }

    return -1
  }

  function findAvailableFrom(startIndex: number, step: 1 | -1): number {
    const length = resolvedItems.value.length
    if (!length) return -1
    const endIndex = step === 1 ? length - 1 : 0
    return findAvailableInRange(startIndex, endIndex, step)
  }

  function findFirstAvailable() {
    return findAvailableFrom(0, 1)
  }
  function findLastAvailable() {
    return findAvailableFrom(resolvedItems.value.length - 1, -1)
  }

  function findAvailableInRow(row: number, step: 1 | -1): number {
    const columnCount = resolvedColumns.value
    const rowStart = row * columnCount
    const rowEnd = Math.min(rowStart + columnCount - 1, resolvedItems.value.length - 1)

    if (rowStart > rowEnd) return -1

    return step === 1 ? findAvailableInRange(rowStart, rowEnd, 1) : findAvailableInRange(rowEnd, rowStart, -1)
  }

  function setCurrentIndex(index: number): void {
    if (!resolvedItems.value.length || index === -1) {
      currentIndex.value = -1
    } else if (isAvailable(index)) {
      currentIndex.value = index
    }
  }

  watch(
    () => resolvedItems.value.length,
    (length) => {
      const index = currentIndex.value
      if (index !== -1 && index < length) return
      currentIndex.value = -1
    },
  )

  function resolveBoundary(direction: NavigationDirection, targetIndex: number): boolean {
    let callback: NavigationBoundaryFn<T> | undefined
    switch (direction) {
      case 'up':
        callback = onStartReached
        break
      case 'down':
        callback = onEndReached
        break
      case 'left':
        callback = onLeftEdgeReached
        break
      case 'right':
        callback = onRightEdgeReached
        break
    }

    if (!callback) return false

    const result = callback({
      currentIndex: currentIndex.value,
      currentItem: currentItem.value,
      items: resolvedItems.value,
      direction,
      targetIndex,
    })

    if (typeof result !== 'number' || !isAvailable(result)) return false

    currentIndex.value = result
    return true
  }

  function moveVertical(direction: 'up' | 'down'): boolean {
    const index = currentIndex.value
    const step = direction === 'up' ? -resolvedColumns.value : resolvedColumns.value
    const targetIndex = index + step

    if (isAvailable(targetIndex)) {
      currentIndex.value = targetIndex
      return true
    }

    let fallbackIndex = targetIndex
    while (fallbackIndex >= 0 && fallbackIndex < resolvedItems.value.length) {
      if (isAvailable(fallbackIndex)) {
        currentIndex.value = fallbackIndex
        return true
      }
      fallbackIndex += step
    }

    return edgeY === 'auto' ? moveVerticalAuto(direction) : resolveBoundary(direction, index)
  }

  function moveVerticalAuto(direction: 'up' | 'down'): boolean {
    const currentColumn = getCol(currentIndex.value)
    const targetIndex =
      direction === 'up'
        ? currentIndex.value - currentColumn - 1
        : currentIndex.value + (resolvedColumns.value - currentColumn)

    const step = direction === 'up' ? -1 : 1
    const index = findAvailableFrom(targetIndex, step)

    if (index !== -1) {
      currentIndex.value = index
      return true
    }

    return false
  }

  function moveHorizontal(direction: 'left' | 'right'): boolean {
    const index = currentIndex.value
    const columnCount = resolvedColumns.value
    const currentRow = getRow(index)
    const currentColumn = getCol(index)
    const step = direction === 'left' ? -1 : 1
    const targetColumn = currentColumn + step

    if (targetColumn < 0 || targetColumn >= columnCount) {
      return edgeX === 'auto' ? moveHorizontalAuto(direction) : resolveBoundary(direction, index)
    }

    let fallbackIndex = index + step
    while (fallbackIndex >= 0 && fallbackIndex < resolvedItems.value.length) {
      if (getRow(fallbackIndex) !== currentRow) break

      if (isAvailable(fallbackIndex)) {
        currentIndex.value = fallbackIndex
        return true
      }

      fallbackIndex += step
    }

    return edgeX === 'auto' ? moveHorizontalAuto(direction) : resolveBoundary(direction, index)
  }

  function moveHorizontalAuto(direction: 'left' | 'right'): boolean {
    const currentRow = getRow(currentIndex.value)
    const rowCount = Math.ceil(resolvedItems.value.length / resolvedColumns.value)
    const nextRow = currentRow + (direction === 'right' ? 1 : -1)
    const step = direction === 'right' ? 1 : -1

    if (nextRow >= 0 && nextRow < rowCount) {
      const index = findAvailableInRow(nextRow, step)
      if (index !== -1) {
        currentIndex.value = index
        return true
      }
    }

    return false
  }

  function move(direction: NavigationDirection): boolean {
    if (!toValue(isEnabled) || !resolvedItems.value.length) return false

    if (currentIndex.value === -1) {
      const index = direction === 'down' || direction === 'right' ? findFirstAvailable() : findLastAvailable()

      if (index === -1) return false
      currentIndex.value = index
      return true
    }

    return direction === 'up' || direction === 'down' ? moveVertical(direction) : moveHorizontal(direction)
  }

  const next = () => move('down')
  const previous = () => move('up')

  function onKeydown(event: KeyboardEvent): boolean {
    if (!toValue(isEnabled)) return false

    if (event.key === 'Home' || event.key === 'End') {
      const index = event.key === 'Home' ? findFirstAvailable() : findLastAvailable()
      if (index === -1) return false

      currentIndex.value = index
      event.preventDefault()
      event.stopPropagation()
      return true
    }

    const direction = DIRECTION_BY_KEY[event.key]
    if (!direction) return false

    if (move(direction)) {
      event.preventDefault()
      event.stopPropagation()
      return true
    }

    return false
  }

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
