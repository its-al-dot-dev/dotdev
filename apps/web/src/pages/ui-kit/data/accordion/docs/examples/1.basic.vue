<script lang="ts" setup>
import { ref } from 'vue'
import { Accordion } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `An <code>Accordion</code> lets users expand and collapse sections of content. By default only one item is open at a time, and the header is rendered automatically from the item's <code>label</code>.`,
})

const items = [
  {
    value: 'Accordion is a UI component that lets users expand and collapse sections of content.',
    label: 'What is Accordion?',
  },
  {
    value: 'It helps organize large amounts of information while keeping the interface clean and easy to navigate.',
    label: 'Why use it?',
  },
  {
    value: 'Users click a trigger to toggle the visibility of the associated content panel.',
    label: 'How does it work?',
  },
  {
    value: 'You can learn more by reading the component documentation and exploring the available examples.',
    label: 'Where can I read more?',
  },
  {
    value: 'Disabled sections stay visible but cannot be expanded.',
    label: 'Disabled section',
    disabled: true,
  },
]

const value = ref(items[0])
</script>

<template>
  <Accordion
    v-model="value"
    :option-disabled="(option) => !!option.disabled"
    :options="items"
    label-key="label"
    value-key="value"
  />
</template>
