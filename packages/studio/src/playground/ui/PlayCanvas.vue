<script lang="ts" setup>
import type { PComponent } from '../types'

interface CanvasProps {
  component: PComponent
  bindings: Record<string, any>
  iterate?: Record<string, any[]>
  children?: Record<string, any>
}

defineProps<CanvasProps>()
</script>

<template>
  <div class="play-canvas">
    <slot>
      <template v-if="iterate && Object.keys(iterate).length">
        <template v-for="(values, key) in iterate" :key="key">
          <template v-for="(value, _idx) in values" :key="`${key}:${_idx}`">
            <component v-bind="key ? { ...bindings, [key]: value } : bindings">
              <template v-for="(slot, name) in children" :key="name" #[name]="args">
                <component :is="slot" v-bind="args" />
              </template>
            </component>
          </template>
        </template>
      </template>

      <component :is="component" v-else v-bind="bindings" />
    </slot>
  </div>
</template>
