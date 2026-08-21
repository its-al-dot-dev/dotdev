<script generic="C extends PComponent" lang="ts" setup>
import { IconButton, SelectButton } from '@dotdev/ui-kit'
import { computed, ref } from 'vue'
import type { PlaygroundManifest } from '../builder/builder.types.ts'
import type { PComponent } from '../types'
import { usePlaygroundStore } from '../store/store.ts'
import PlayCanvas from './PlayCanvas.vue'
import PlayProps from './controls/PlayProps.vue'
import PlayEmitsLog from './controls/PlayEmitsLog.vue'
import PlaySlots from './controls/PlaySlots.vue'
import PlayEvents from './controls/PlayEvents.vue'
import DocCard from '../../docs/ui/DocCard.vue'

interface PlaygroundProps {
  manifest: PlaygroundManifest<C>
}

const props = defineProps<PlaygroundProps>()

const store = usePlaygroundStore(props.manifest)
const isOpenMeta = ref(false)
const isFullScreen = ref(false)
const controls = ['Props', 'Slots', 'Emits', 'Emits Log']
const activeControl = ref('Props')

const key = computed(() => store.activeVariant.value)

const iterate = computed(() => {
  const rawIterate = store.currentVariant?.config.iterate
  if (!rawIterate) return {}

  const metaProps = props.manifest.meta?.props ?? {}

  const getMetaOptions = (key: string): unknown[] => {
    return metaProps[key]?.options?.map((o) => o.value) ?? []
  }

  const entries: Array<[string, unknown[]]> =
    typeof rawIterate === 'string'
      ? [[rawIterate, getMetaOptions(rawIterate)]]
      : Object.entries(rawIterate).map(([key, value]) => [key, Array.isArray(value) ? value : getMetaOptions(key)])

  return Object.fromEntries(entries)
})
</script>

<template>
  <DocCard :class="{ 'play--full': isFullScreen }">
    <template #header>
      <SelectButton v-model="store.activeVariant" :options="store.variantOptions" label-key="label" value-key="value" />

      <div class="play__group">
        <IconButton icon="enter-full-screen" @click="isFullScreen = !isFullScreen" />
        <IconButton icon="cursor-arrow" />
        <IconButton icon="gear" @click="isOpenMeta = !isOpenMeta" />
      </div>
    </template>

    <PlayCanvas :bindings="store.computedBindings" :component="manifest.component" :iterate="iterate">
      <slot :key="key" :iterate="iterate" :props="store.stateProps" />
    </PlayCanvas>

    <template v-if="isOpenMeta" #footer>
      <div class="play__controls">
        <div class="play__controls-header">
          <SelectButton v-model="activeControl" :options="controls" size="sm" />
        </div>

        <PlaySlots v-if="activeControl === 'Slots'" :meta="manifest.meta" />
        <PlayEmitsLog v-if="activeControl === 'Emits Log'" :logger="store.logger" />
        <PlayEvents v-if="activeControl === 'Emits'" :meta="manifest.meta" />
        <PlayProps v-if="activeControl === 'Props'" :meta="manifest.meta" :state="store.stateProps" />
      </div>
    </template>
  </DocCard>
</template>
