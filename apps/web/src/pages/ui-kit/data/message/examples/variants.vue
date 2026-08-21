<script lang="ts" setup>
import { Message } from '@dotdev/ui-kit'
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
