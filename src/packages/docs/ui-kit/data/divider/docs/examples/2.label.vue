<script lang="ts" setup>
import { Divider, Icon } from 'dotdev/ui-kit'

defineExample({
  title: 'Label',
  desc: `Pass a <code>label</code> (or use the default slot) to center a title on the line. Labels are announced as content, while the lines themselves are hidden from assistive technology.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Divider label="Section title" />
    <Divider label="With icon" />
    <Divider>
      <span class="flex items-center gap-1.5">
        <Icon name="bell" />
        Custom slot content
      </span>
    </Divider>
  </div>
</template>
