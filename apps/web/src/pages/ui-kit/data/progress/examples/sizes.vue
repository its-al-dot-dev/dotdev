<script lang="ts" setup>
import { Progress } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Progress :value="70" class="h-1" />
    <Progress :value="70" />
    <Progress :value="70" class="h-3" />
    <Progress :value="70" class="h-5 rounded-none" />
  </div>
</template>
