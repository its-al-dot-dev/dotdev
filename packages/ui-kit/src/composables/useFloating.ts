import { computed, type CSSProperties, type MaybeRefOrGetter, onScopeDispose, ref, toValue, watch } from 'vue'
import { autoUpdate, computePosition, flip, offset, type Placement, shift, type Strategy } from '@floating-ui/dom'

export interface UIFloatingConfig {
  placement?: Placement
  strategy?: Strategy
  offset?: number
  autoUpdate?: boolean
}

type ElementRef = MaybeRefOrGetter<HTMLElement | null>

const DEFAULT_CONFIG = {
  placement: 'bottom' as Placement,
  strategy: 'absolute' as Strategy,
  offset: 0,
  autoUpdate: false,
}

export function useFloating(
  anchor: ElementRef,
  floating: ElementRef,
  config: MaybeRefOrGetter<UIFloatingConfig & { handleScroll?: () => void }> = {}
) {
  const options = computed(() => ({
    ...DEFAULT_CONFIG,
    ...toValue(config),
  }))

  const placement = ref<Placement>(options.value.placement)

  const styles = ref<CSSProperties>({
    position: options.value.strategy,
    left: '0px',
    top: '0px',
  })

  let cleanupAutoUpdate: (() => void) | null = null
  let updateId = 0

  async function update(event?: Event) {
    if (event?.type === 'scroll' && event.target !== document) {
      options.value.handleScroll?.()
    }

    const elAnchor = toValue(anchor)
    const elFloating = toValue(floating)

    if (!elAnchor || !elFloating) return

    const id = ++updateId
    const { offset: offsetValue } = options.value

    const data = await computePosition(elAnchor, elFloating, {
      placement: options.value.placement,
      strategy: options.value.strategy,
      middleware: [offset(offsetValue), flip(), shift({ padding: offsetValue })],
    })

    if (id !== updateId) return

    placement.value = data.placement
    styles.value = {
      position: data.strategy,
      left: `${data.x}px`,
      top: `${data.y}px`,
    }
  }

  function cleanup() {
    cleanupAutoUpdate?.()
    cleanupAutoUpdate = null
  }

  watch(
    [() => toValue(anchor), () => toValue(floating), options],
    ([elAnchor, elFloating, options]) => {
      cleanup()

      if (!elAnchor || !elFloating) return

      update()

      if (options.autoUpdate) {
        cleanupAutoUpdate = autoUpdate(elAnchor, elFloating, update)
      }
    },
    {
      immediate: true,
      flush: 'post',
    }
  )

  onScopeDispose(cleanup)

  return {
    placement,
    styles,
    update,
    cleanup,
  }
}
