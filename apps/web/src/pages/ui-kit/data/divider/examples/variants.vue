<script lang="ts" setup>
import { Divider } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Divider label="Solid" />
    <Divider label="Dashed" variant="dashed" />
    <Divider label="Dotted" variant="dotted" />
  </div>
</template>
