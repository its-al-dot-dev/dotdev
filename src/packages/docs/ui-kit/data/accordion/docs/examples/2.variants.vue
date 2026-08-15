<script lang="ts" setup>
import { Accordion } from 'dotdev/ui-kit'

defineExample({
  title: 'Variants',
  desc: `The accordion ships in four variants: <code>outlined</code> boxes, <code>soft</code> tonal panels, <code>underline</code> rows separated by hairlines, and <code>plain</code>, which adds no styling so you can compose it into your own layout.`,
})

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
