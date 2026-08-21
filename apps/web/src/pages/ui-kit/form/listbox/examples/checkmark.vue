<script lang="ts" setup>
import { ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

const value = ref<string>('Berlin')
const options = ['Berlin', 'London', 'Paris', 'Tokyo', 'New York']
</script>

<template>
  <ListBox v-model="value" :checkmark="false" :options="options" class="w-3xs" />
  <ListBox v-model="value" :options="options" checkmark="left" checkmark-icon="radiobutton" class="w-3xs" />
</template>
