<script lang="ts" setup>
import { Message } from '@dotdev/ui-kit'

defineExample({
  title: 'Colors',
  desc: `Every semantic color is available. Pick a tone that matches the meaning of the message: <code>primary</code>, <code>neutral</code>, <code>danger</code>, <code>warning</code>, <code>info</code>, or <code>success</code>.`,
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <Message icon="info-circled" title="Primary" message="A general note or announcement." />
    <Message color="neutral" title="Neutral" message="A plain, low-emphasis note." />
    <Message color="danger" icon="exclamation-circled" title="Danger" message="Something went wrong and needs attention." />
    <Message color="warning" icon="exclamation-triangle" title="Warning" message="Proceed carefully, this may have side effects." />
    <Message color="info" icon="info-circled" title="Info" message="Useful context that helps the reader." />
    <Message color="success" icon="check" title="Success" message="The operation completed as expected." />
  </div>
</template>
