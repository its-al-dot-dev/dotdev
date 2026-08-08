<script lang="ts" setup>
import { ListBox } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Checkmark position',
  desc: `The <code>checkmark</code> prop controls the selection indicator. By default, the checkmark is displayed on the <code>right</code> side. Use <code>left</code> to move it or set it to <code>false</code> to hide the indicator.`,
})

const value = ref<string>('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :checkmark="false" :options="options" class="w-3xs" />
  <ListBox v-model="value" :options="options" checkmark="left" checkmark-icon="radiobutton" class="w-3xs" />
</template>
