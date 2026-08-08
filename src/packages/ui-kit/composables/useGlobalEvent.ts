import { onMounted, onUnmounted, type Ref, watch } from 'vue'

type GlobalEventMap = {
  window: WindowEventMap
  document: DocumentEventMap
}

type GlobalEventOptions<T extends keyof GlobalEventMap> = {
  target?: T
  watch?: Ref<boolean>
  immediate?: boolean
}

export function useGlobalEvent<K extends keyof DocumentEventMap>(
  event: K,
  handler: (event: DocumentEventMap[K]) => void,
  options?: GlobalEventOptions<'document'>
): void

export function useGlobalEvent<K extends keyof WindowEventMap>(
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options: GlobalEventOptions<'window'>
): void

export function useGlobalEvent<T extends keyof GlobalEventMap, K extends keyof GlobalEventMap[T]>(
  event: K,
  handler: (event: GlobalEventMap[T][K]) => void,
  options?: GlobalEventOptions<T>
) {
  const target = options?.target ?? 'document'
  const targetObject = target === 'window' ? window : document

  let cleanup: (() => void) | undefined

  const addListener = () => {
    if (cleanup) return

    targetObject.addEventListener(event as string, handler as EventListener)

    cleanup = () => {
      targetObject.removeEventListener(event as string, handler as EventListener)
      cleanup = undefined
    }
  }

  const removeListener = () => {
    cleanup?.()
  }

  if (options?.watch) {
    /* prettier-ignore */
    watch(options.watch, (enabled, _, onCleanup) => {
      if (enabled) addListener()
      onCleanup(removeListener)
    }, { immediate: options.immediate ?? false })
  } else {
    onMounted(addListener)
    onUnmounted(removeListener)
  }
}
