<script lang="ts" setup>
import type { UiKitIcon } from '@dotdev/ui-kit'
import { Accordion, Icon } from '@dotdev/ui-kit'

const items: { value: string; label: string; icon: UiKitIcon }[] = [
  {
    value: 'Accordion is a UI component that lets users expand and collapse sections of content.',
    label: 'What is Accordion?',
    icon: 'question-mark',
  },
  {
    value: 'It helps organize large amounts of information while keeping the interface clean and easy to navigate.',
    label: 'Why use it?',
    icon: 'gear',
  },
  {
    value: 'Users click a trigger to toggle the visibility of the associated content panel.',
    label: 'How does it work?',
    icon: 'layers',
  },
]
</script>

<template>
  <Accordion :options="items" label-key="label" multiple value-key="value" variant="soft">
    <template #default="{ item }">
      <Icon :name="item.icon" class="text-muted" />
      <span>{{ item.label }}</span>
    </template>

    <template #content="{ item }">
      <div class="px-4 pb-3 text-sm text-muted">{{ item.value }}</div>
    </template>
  </Accordion>
</template>
