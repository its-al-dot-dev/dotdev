import type { Component } from 'vue'
import { computed, ref, shallowRef, watch } from 'vue'
import { defineStore } from 'pinia'
import type { PlaygroundManifest } from '../builder/builder.types.ts'
import { createActionLogger } from './action-logger'
import { createBindings } from './bindings'

export function usePlaygroundStore<C extends Component>(manifest: PlaygroundManifest<C>) {
  const storeId = `playground:${manifest.base.name || manifest.component.name || 'default'}`

  return defineStore(storeId, () => {
    const currentManifest = shallowRef(manifest)
    const meta = computed(() => currentManifest.value.meta)
    const logger = createActionLogger()

    const variantOptions = computed(() =>
      currentManifest.value.variants.map((v) => ({
        label: v.name,
        value: v.config.key || v.name.toLowerCase(),
      }))
    )

    const activeVariant = ref(variantOptions.value[0])

    const stateProps = ref<Record<string, unknown>>({})

    const currentVariant = computed(() => {
      return currentManifest.value.variants.find((v) => v.config.key === activeVariant.value.value)
    })

    const computedBindings = computed(() => {
      return createBindings({
        stateProps: stateProps.value,
        meta: meta.value,
        onEmit: (event, ...args) => logger.logAction(event, ...args),
      })
    })

    function resetProps() {
      const entry = currentVariant.value?.config || {}
      const baseProps = currentManifest.value.base.props || {}
      const variantProps = entry.props || {}

      const mergedProps = entry.component ? { ...variantProps } : { ...baseProps, ...variantProps }

      stateProps.value = { ...mergedProps }
    }

    function updateProp(key: string, value: unknown) {
      stateProps.value[key] = value
    }

    watch(activeVariant, () => resetProps(), { immediate: true })

    return {
      manifest: currentManifest,
      meta,
      logger,
      activeVariant,
      variantOptions,
      stateProps,

      currentVariant,
      computedBindings,

      updateProp,
      resetProps,
    }
  })()
}
