<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'

defineExample({
  title: 'Loading state',
  desc: `Set the <code>loading</code> prop to display a spinner and prevent further interaction. The button is rendered as disabled while loading and any <code>icon</code> is replaced by the inline progress indicator.`,
})
</script>

<template>
  <Button label="Loading" loading />
  <Button label="Continue" icon="arrow-right" icon-pos="suffix" loading />
</template>