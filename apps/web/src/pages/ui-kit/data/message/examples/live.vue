<script lang="ts" setup>
import { Message } from '@dotdev/ui-kit'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 w-full">
    <Message
      icon="info-circled"
      title="Status"
      message="Announced politely when it appears or changes."
      role="status"
    />
    <Message
      color="danger"
      icon="exclamation-circled"
      title="Alert"
      message="Announced assertively — use it for errors that need immediate attention."
      role="alert"
    />
    <Message
      color="neutral"
      icon="circle"
      title="Static note"
      message="Not announced as a live region; just plain content."
      role="none"
    />
  </div>
</template>
