<script lang="ts" setup>
import { Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Sizes',
  desc: `Use the <code>size</code> prop to adjust the input dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
})

const value = ref<string>('')
</script>

<template>
  <Input v-model="value" placeholder="Enter text..." size="sm" />
  <Input v-model="value" placeholder="Enter text..." size="md" />
  <Input v-model="value" placeholder="Enter text..." size="lg" />
</template>
