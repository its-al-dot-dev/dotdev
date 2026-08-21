<script lang="ts" setup>
import { Avatar } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <Avatar square src="https://i.pravatar.cc/100?img=5" alt="User avatar" />
    <Avatar square label="AL" />
    <Avatar square icon="person" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar square color="primary" label="AL" />
    <Avatar square color="success" variant="solid" label="AL" />
    <Avatar square color="warning" border label="AL" />
  </div>
</template>
