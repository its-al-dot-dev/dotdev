<script lang="ts" setup>
import { Message } from 'dotdev/ui-kit'

defineExample({
  title: 'Variants',
  desc: `Two variants are available. <code>soft</code> fills the block with a tonal background, while <code>plain</code> keeps a transparent background so the message sits flat on the canvas.`,
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <Message
      color="success"
      icon="check"
      title="Soft"
      message="A tonal background recedes gently behind the content."
      variant="soft"
    />
    <Message
      color="success"
      icon="check"
      title="Plain"
      message="No background — the message sits directly on the canvas."
      variant="plain"
    />
  </div>
</template>
