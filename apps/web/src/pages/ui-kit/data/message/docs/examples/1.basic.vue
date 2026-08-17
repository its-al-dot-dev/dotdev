<script lang="ts" setup>
import { Message } from '@dotdev/ui-kit'

defineExample({
  title: 'Basic usage',
  desc: `A <code>Message</code> combines an icon, a title, and a body message. By default it renders as a <code>soft</code> block in the <code>primary</code> color.`,
})
</script>

<template>
  <Message
    icon="info-circled"
    title="Heads up"
    message="Use a message to surface a hint, a clarification, or a note that does not block the user."
  />
</template>
