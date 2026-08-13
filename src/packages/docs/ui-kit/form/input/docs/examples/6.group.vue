<script lang="ts" setup>
import { Button, Group, GroupAddon, Icon, IconButton, Input } from 'dotdev/ui-kit'
import { ref } from 'vue'

defineExpose({
  title: 'Input group',
  desc: `Use <code>Group</code> to combine <code>Input</code> with related controls such as addons, buttons, and icon actions. Use <code>GroupAddon</code> for additional content inside the field or attach it to the input using the <code>attach</code> prop.`,
})

const value = ref<string>('')
</script>

<template>
  <Group>
    <GroupAddon class="-mr-px" label="https://" variant="outlined" />
    <Input v-model="value" placeholder="Enter domain..." />
    <Button label="Submit" />
  </Group>

  <Group>
    <GroupAddon attach>
      <Icon name="lock-closed" />
    </GroupAddon>

    <Input v-model="value" class="px-9!" placeholder="Enter email..." />

    <GroupAddon attach size="none">
      <IconButton icon="eye-closed" variant="text" />
    </GroupAddon>
  </Group>

  <Group axis="y" class="w-10">
    <IconButton icon="minus" variant="outlined" />
    <Input class="text-center -my-px z-1 px-0!" model-value="10" readonly />
    <IconButton icon="plus" variant="outlined" />
  </Group>
</template>
