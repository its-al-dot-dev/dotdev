<script lang="ts" setup>
import { Switch } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Variants',
  desc: `Use the <code>variant</code> prop to control the visual style. Available variants are <code>outlined</code> and <code>soft</code>.`,
})

const first = ref<boolean>(true)
const second = ref<boolean>(true)
</script>

<template>
  <Switch v-model="first" variant="outlined" />
  <Switch v-model="second" variant="soft" />
</template>
