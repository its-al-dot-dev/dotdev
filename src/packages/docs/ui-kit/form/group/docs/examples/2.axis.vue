<script lang="ts" setup>
import { Group, Input } from 'dotdev/ui-kit'

defineExample({
  title: 'Axis direction',
  desc: 'Use the <code>axis</code> prop to change layout direction. <code>x</code> (default) is horizontal, <code>y</code> is vertical.',
})
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div>
      <p class="text-sm text-muted mb-2">axis="x" (default)</p>
      <Group axis="x" class="-space-x-px">
        <Input placeholder="First" />
        <Input placeholder="Second" />
        <Input placeholder="Third" />
      </Group>
    </div>

    <div>
      <p class="text-sm text-muted mb-2">axis="y"</p>
      <Group axis="y" class="-space-y-px">
        <Input placeholder="First" />
        <Input placeholder="Second" />
        <Input placeholder="Third" />
      </Group>
    </div>
  </div>
</template>
