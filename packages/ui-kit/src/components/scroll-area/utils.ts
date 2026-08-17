export interface ScrollDimensions {
  /** Видимая высота/ширина контейнера (client Size) */
  viewportSize: number
  /** Полная высота/ширина прокручиваемого контента (scroll Size) */
  contentSize: number
  /** Минимальный размер ползунка в пикселях (чтобы не исчезал при длинном контенте) */
  minThumbSize?: number
}

export interface ThumbOffsetOptions extends ScrollDimensions {
  /** Текущее смещение прокрутки (scroll Top / Left) */
  scrollOffset: number
  /** Рассчитанный ранее размер ползунка (в пикселях) */
  thumbSize: number
}

/**
 * Расчет размера thumb (ползунка) в пикселях.
 * Пропорция: (viewportSize / contentSize) * viewportSize
 */
export function calculateThumbSize({ viewportSize, contentSize, minThumbSize = 20 }: ScrollDimensions): number {
  if (contentSize <= 0 || viewportSize <= 0) return 0
  if (contentSize <= viewportSize) return 0 // Контент помещается целиком, скроллбар не нужен

  const rawThumbSize = (viewportSize / contentSize) * viewportSize

  // Ограничиваем минимальным размером, но не больше самого viewport
  return Math.min(viewportSize, Math.max(minThumbSize, rawThumbSize))
}

/**
 * Расчет смещения thumb (позиции в пикселях от начала дорожки/track).
 */
export function calculateThumbOffset({
  viewportSize,
  contentSize,
  scrollOffset,
  thumbSize,
}: ThumbOffsetOptions): number {
  const maxScroll = contentSize - viewportSize
  if (maxScroll <= 0) return 0

  const maxThumbOffset = viewportSize - thumbSize
  // Нормализуем прокрутку от 0 до 1
  const scrollRatio = Math.min(1, Math.max(0, scrollOffset / maxScroll))

  return scrollRatio * maxThumbOffset
}
