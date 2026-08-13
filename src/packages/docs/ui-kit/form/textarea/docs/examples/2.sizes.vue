<script lang="ts" setup>
import { Textarea } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Sizes',
  desc: `Use the <code>size</code> prop to adjust the textarea dimensions. Available sizes are <code>sm</code>, <code>md</code>, and <code>lg</code>.`,
})

const value = ref<string>('')
</script>

<template>
  <Textarea v-model="value" placeholder="Enter text..." size="sm" />
  <Textarea v-model="value" placeholder="Enter text..." size="md" />
  <Textarea v-model="value" placeholder="Enter text..." size="lg" />
</template>
