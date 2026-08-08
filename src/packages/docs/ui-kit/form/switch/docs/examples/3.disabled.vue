<script lang="ts" setup>
import { Switch } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Disabled state',
  desc: `Use the <code>disabled</code> prop to prevent user interaction and display the switch in a disabled state.`,
})

const enabled = ref<boolean>(true)
</script>

<template>
  <Switch v-model="enabled" disabled />
</template>
