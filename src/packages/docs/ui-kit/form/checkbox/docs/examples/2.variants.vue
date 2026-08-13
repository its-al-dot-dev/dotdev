<script lang="ts" setup>
import { Checkbox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code> and <code>soft</code>.`,
})

const first = ref<boolean>(true)
const second = ref<boolean>(true)
</script>

<template>
  <label class="flex items-center gap-2">
    <Checkbox v-model="first" variant="outlined" />
    Outlined
  </label>
  <label class="flex items-center gap-2">
    <Checkbox v-model="second" variant="soft" />
    Subtle
  </label>
</template>
