import { onBeforeUnmount, onMounted, type Ref, unref } from 'vue'

type TargetElement = HTMLElement | Ref<HTMLElement | null> | (HTMLElement | Ref<HTMLElement | null>)[]

export function useClickOutside(target: TargetElement, callback: (event: MouseEvent) => void) {
  const listener = (event: MouseEvent) => {
    const targets = Array.isArray(target) ? target : [target]

    const isInside = targets.some((targetRef) => {
      const el = unref(targetRef)

      return el && (el === event.target || el.contains(event.target as Node))
    })

    if (!isInside) {
      callback(event)
    }
  }

  onMounted(() => {
    document.addEventListener('pointerdown', listener, true)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('pointerdown', listener, true)
  })
}
