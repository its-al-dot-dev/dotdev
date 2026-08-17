<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'

defineExample({
  title: 'Link button',
  desc: `Pass an <code>href</code> to render the button as an anchor link. Use <code>target</code> to control where the link opens. A disabled link button drops the <code>href</code> and becomes non-interactive.`,
})
</script>

<template>
  <Button label="Documentation" href="https://example.com" target="_blank" icon="external-link" icon-pos="suffix" />
  <Button label="Disabled link" href="https://example.com" disabled />
</template>