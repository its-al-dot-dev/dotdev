export type RafThrottledFn<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void
  cancel: () => void
}

export function throttleByRaf<T extends (...args: any[]) => void>(fn: T): RafThrottledFn<T> {
  let rafId: number | null = null
  let lastArgs: Parameters<T> | null = null

  const throttled = (...args: Parameters<T>) => {
    lastArgs = args

    if (rafId !== null) return

    rafId = requestAnimationFrame(() => {
      rafId = null

      if (lastArgs) {
        fn(...lastArgs)
        lastArgs = null
      }
    })
  }

  throttled.cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId = null
      lastArgs = null
    }
  }

  return throttled
}
