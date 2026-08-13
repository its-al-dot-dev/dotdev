<script lang="ts" setup>
import { Avatar, Icon } from 'dotdev/ui-kit'

defineExample({
  title: 'Default slot',
  desc: `Use the default slot to render fully custom content inside the avatar, shown when no <code>src</code>, <code>label</code>, or <code>icon</code> is provided.`,
})

const slotClasses = 'absolute right-0 bottom-0 rounded-full bg-green-500 text-white text-xs'
</script>

<template>
  <Avatar color="neutral" alt="User avatar" class="border-2" src="https://i.pravatar.cc/100?img=8">
    <Icon :class="slotClasses" name="check-circled" />
  </Avatar>
  <Avatar color="primary" border label="AL">
    <Icon :class="slotClasses" name="check-circled" />
  </Avatar>
</template>
