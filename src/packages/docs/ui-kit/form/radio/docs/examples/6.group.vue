<script lang="ts" setup>
import { Radio } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Selecting one of several',
  desc: `Radios are meant for mutually exclusive choices. Derive each <code>v-model</code> from a single selected value and use a shared <code>name</code> so only one option can be checked at a time.`,
})

type Plan = 'starter' | 'pro' | 'enterprise'
const selected = ref<Plan>('pro')
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="flex items-center gap-2">
      <Radio :model-value="selected === 'starter'" name="plan" @update:model-value="selected = 'starter'" />
      Starter
    </label>
    <label class="flex items-center gap-2">
      <Radio :model-value="selected === 'pro'" name="plan" @update:model-value="selected = 'pro'" />
      Pro
    </label>
    <label class="flex items-center gap-2">
      <Radio :model-value="selected === 'enterprise'" name="plan" @update:model-value="selected = 'enterprise'" />
      Enterprise
    </label>
    <p class="mt-2 text-sm ui-text-secondary">Selected: {{ selected }}</p>
  </div>
</template>
