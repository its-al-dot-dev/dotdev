<script lang="ts" setup>
import { Button } from '@dotdev/ui-kit'
</script>

<template>
  <!-- 1 — local prop wins over the config default -->
  <Button variant="outlined" label="Outlined" />

  <!-- 2 — no prop: falls back to the config default (soft) -->
  <Button label="Soft" />

  <!-- 3 — no config either: falls back to the component default (solid) -->
  <Button color="neutral" label="Neutral solid" />
</template>
