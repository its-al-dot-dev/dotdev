<script lang="ts" setup>
import { Message } from '@dotdev/ui-kit'

defineExample({
  title: 'Live regions',
  desc: `A message is announced to screen readers as a live region. By default it uses <code>role="status"</code> (polite). Pass <code>role="alert"</code> for urgent messages that should interrupt, or <code>role="none"</code> to turn live announcements off for static content. The icon is always hidden from assistive technology since the text already conveys the meaning.`,
})
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
