<script lang="ts" setup>
import { Group, Icon, Input, SelectButton, type UiKitIcon } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Scoped slots',
  desc: `Customize each option via the default slot, which exposes <code>label</code>, <code>selected</code>, and <code>index</code>. Here a text-editing toolbar is built with icon-only options: alignment (single, always selected) and style modifiers (multiple and deselectable).`,
})

const alignment = ref<UiKitIcon>('text-align-center')
const alignOptions: UiKitIcon[] = ['text-align-left', 'text-align-center', 'text-align-right', 'text-align-justify']

const modifiers = ref<UiKitIcon[]>([])
const modifierOptions: UiKitIcon[] = ['font-bold', 'font-italic', 'underline', 'strikethrough']
</script>

<template>
  <Group>
    <Input class="w-30 z-1" placeholder="Font size" />
    <SelectButton
      v-model="alignment"
      #default="{ option }"
      :options="alignOptions"
      class="-mx-px"
      square
      variant="outlined"
    >
      <Icon :name="option" />
    </SelectButton>
    <SelectButton
      v-model="modifiers"
      #default="{ option }"
      :options="modifierOptions"
      deselectable
      multiple
      square
      variant="outlined"
    >
      <Icon :name="option" />
    </SelectButton>
  </Group>

  <Group>
    <Input class="w-30" placeholder="Font size" variant="soft" />
    <SelectButton v-model="alignment" #default="{ option }" :options="alignOptions" square variant="soft">
      <Icon :name="option" />
    </SelectButton>
    <SelectButton
      v-model="modifiers"
      #default="{ option }"
      :options="modifierOptions"
      deselectable
      multiple
      square
      variant="soft"
    >
      <Icon :name="option" />
    </SelectButton>
  </Group>
</template>
