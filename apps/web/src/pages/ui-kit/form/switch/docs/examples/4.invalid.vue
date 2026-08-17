<script lang="ts" setup>
import { Switch } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Invalid state',
  desc: `Use the <code>invalid</code> prop to visually indicate a validation error state. This works with all switch variants.`,
})

const first = ref<boolean>(true)
const second = ref<boolean>(false)
</script>

<template>
  <Switch v-model="first" invalid variant="outlined" />
  <Switch v-model="second" invalid variant="soft" />
</template>
