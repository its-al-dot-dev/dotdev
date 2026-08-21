<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'
</script>

<template>
  <Button href="https://example.com" icon="external-link" icon-pos="suffix" label="Documentation" target="_blank" />
  <Button disabled href="https://example.com" label="Disabled link" />
</template>
