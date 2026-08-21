<script lang="ts" setup>
import { Progress } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <Progress :value="60" color="primary" />
    <Progress :value="60" color="neutral" />
    <Progress :value="60" color="success" />
    <Progress :value="60" color="warning" />
    <Progress :value="60" color="danger" />
    <Progress :value="60" color="info" />
  </div>
</template>
