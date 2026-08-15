<script lang="ts" setup>
import { Message } from 'dotdev/ui-kit'

defineExample({
  title: 'Border',
  desc: `Pass <code>border</code> to frame the message with a thin outline in the message color. The border stays subtle on the <code>soft</code> variant.`,
})
</script>

<template>
  <div class="grid grid-cols-1 gap-4 w-full">
    <Message
      color="primary"
      icon="info-circled"
      title="Without border"
      message="A soft block with no outline."
      variant="soft"
    />
    <Message
      border
      color="primary"
      icon="info-circled"
      title="With border"
      message="The same message framed by a subtle border."
      variant="soft"
    />
    <Message
      border
      color="danger"
      icon="exclamation-circled"
      title="Plain with border"
      message="A bordered outline works especially well on the plain variant."
      variant="plain"
    />
  </div>
</template>
