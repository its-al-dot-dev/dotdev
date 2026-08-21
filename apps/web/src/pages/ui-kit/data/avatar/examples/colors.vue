<script lang="ts" setup>
import { Avatar } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <Avatar color="primary" icon="person" />
    <Avatar color="neutral" icon="person" />
    <Avatar color="success" icon="person" />
    <Avatar color="warning" icon="person" />
    <Avatar color="danger" icon="person" />
    <Avatar color="info" icon="person" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar color="primary" label="AL" />
    <Avatar color="neutral" label="AL" />
    <Avatar color="success" label="AL" />
    <Avatar color="warning" label="AL" />
    <Avatar color="danger" label="AL" />
    <Avatar color="info" label="AL" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar color="primary" alt="User avatar" border src="https://i.pravatar.cc/100?img=9" />
    <Avatar color="success" alt="User avatar" border src="https://i.pravatar.cc/100?img=9" />
    <Avatar color="warning" alt="User avatar" border src="https://i.pravatar.cc/100?img=9" />
    <Avatar color="danger" alt="User avatar" border src="https://i.pravatar.cc/100?img=9" />
    <Avatar color="info" alt="User avatar" border src="https://i.pravatar.cc/100?img=9" />
  </div>
</template>
