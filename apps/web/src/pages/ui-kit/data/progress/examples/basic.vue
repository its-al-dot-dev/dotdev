<script lang="ts" setup>
import { Progress } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Progress :value="25" />
    <Progress :value="60" />
    <Progress :value="90" />
  </div>
</template>
