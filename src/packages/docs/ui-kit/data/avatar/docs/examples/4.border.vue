<script lang="ts" setup>
import { Avatar } from 'dotdev/ui-kit'

defineExpose({
  title: 'Border',
  desc: `Set the <code>border</code> prop to draw a border around the avatar, useful when laid out over a busy background.`,
})
</script>

<template>
  <Avatar src="https://i.pravatar.cc/100?img=12" border alt="User avatar" />
  <Avatar label="AL" border />
  <Avatar icon="person" border />
</template>