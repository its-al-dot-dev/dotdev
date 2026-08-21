<script lang="ts" setup>
import { Accordion } from '@dotdev/ui-kit'

const items = [
  { value: 'Use outlined when the accordion sits on a canvas with other boxed content.', label: 'Outlined' },
  { value: 'Use soft to make expanded panels recede gently behind the headers.', label: 'Soft' },
  { value: 'Use plain for dense, text-only settings that should not feel boxed.', label: 'Plain' },
]
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start w-full">
    <Accordion :options="items" label-key="label" value-key="value" variant="outlined" />
    <Accordion :options="items" label-key="label" value-key="value" variant="soft" />
    <Accordion :options="items" label-key="label" value-key="value" variant="underline" />
    <Accordion :options="items" label-key="label" value-key="value" variant="plain" />
  </div>
</template>
