<script lang="ts" setup>
import { Switch } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Basic usage',
  desc: `Use <code>v-model</code> to control the checked state. The switch starts unchecked by default.`,
})

const enabled = ref<boolean>(false)
</script>

<template>
  <Switch v-model="enabled" />
</template>
