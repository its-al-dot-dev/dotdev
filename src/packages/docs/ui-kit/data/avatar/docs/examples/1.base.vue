<script lang="ts" setup>
import { Avatar } from 'dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `Pass an <code>src</code> to render an image, a <code>label</code> to show initials or text, or an <code>icon</code> to show a glyph. The first matching source wins.`,
})
</script>

<template>
  <Avatar src="https://i.pravatar.cc/100?img=5" alt="User avatar" />
  <Avatar label="AL" />
  <Avatar icon="person" />
</template>