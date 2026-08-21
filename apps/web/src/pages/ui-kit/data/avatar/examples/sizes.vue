<script lang="ts" setup>
import { Avatar } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <Avatar alt="User avatar" class="text-xs" src="https://i.pravatar.cc/40?img=5" />
    <Avatar alt="User avatar" class="text-sm" src="https://i.pravatar.cc/100?img=5" />
    <Avatar alt="User avatar" class="text-base" src="https://i.pravatar.cc/200?img=5" />
    <Avatar alt="User avatar" class="text-lg" src="https://i.pravatar.cc/200?img=5" />
    <Avatar alt="User avatar" class="text-xl" src="https://i.pravatar.cc/200?img=5" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar class="text-xs" label="AL" />
    <Avatar class="text-sm" label="AL" />
    <Avatar class="text-base" label="AL" />
    <Avatar class="text-lg" label="AL" />
    <Avatar class="text-xl" label="AL" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar class="text-xs" icon="person" />
    <Avatar class="text-sm" icon="person" />
    <Avatar class="text-base" icon="person" />
    <Avatar class="text-lg" icon="person" />
    <Avatar class="text-xl" icon="person" />
  </div>
</template>
