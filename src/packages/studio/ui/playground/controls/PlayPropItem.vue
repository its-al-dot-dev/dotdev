<script lang="ts" setup>
import type { PlayPropMeta } from '../../../plugin/component-meta.types.ts'
import { Input, Select, SelectButton, Switch, Tag } from 'dotdev/ui-kit'
import { computed } from 'vue'
import PlayItemLayout from './PlayItemLayout.vue'

interface Props {
  meta: PlayPropMeta
}

const props = defineProps<Props>()
const model = defineModel<Record<string, any>>({ default: () => ({}) })
const options = computed(() => props.meta.options?.map((o) => o.value) ?? [])
</script>

<template>
  <PlayItemLayout :description="meta.description" :name="meta.name" :required="meta.required">
    <Switch v-if="meta.controlType === 'boolean'" v-model="model[meta.name]" />

    <SelectButton
      v-if="meta.controlType === 'select' && options.length < 10"
      v-model="model[meta.name]"
      :deselectable="!meta.required"
      :options="options"
      size="sm"
    />

    <Select
      v-if="meta.controlType === 'select' && options.length >= 10"
      v-model="model[meta.name]"
      :deselectable="!meta.required"
      :options="options"
      :placeholder="`Select ${meta.name}`"
      size="sm"
    />

    <Input
      v-if="meta.controlType === 'string'"
      v-model="model[meta.name]"
      :placeholder="`Enter ${meta.name}`"
      size="sm"
    />

    <Input
      v-if="meta.controlType === 'number'"
      v-model="model[meta.name]"
      :placeholder="`Enter ${meta.name}`"
      size="sm"
    />

    <template #footer>
      <Tag v-if="meta.default" :label="String(meta.default)" class="play-prop-type play-prop-type--default" size="sm" />
      <Tag :class="`play-prop-type play-prop-type--${meta.controlType}`" :label="meta.type" size="sm" />
    </template>
  </PlayItemLayout>
</template>
