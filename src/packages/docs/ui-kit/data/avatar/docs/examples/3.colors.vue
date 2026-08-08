<script lang="ts" setup>
import { Avatar } from 'dotdev/ui-kit'

defineExpose({
  title: 'Colors',
  desc: `The avatar uses the current text color, so set it with text color utilities such as <code>text-blue-500</code> or <code>text-red-500</code>.`,
})
</script>

<template>
  <div class="flex gap-4 w-full justify-center">
    <Avatar class="text-blue-500" icon="person" />
    <Avatar class="text-red-500" icon="person" />
    <Avatar class="text-green-500" icon="person" />
    <Avatar class="text-yellow-500" icon="person" />
    <Avatar class="text-purple-500" icon="person" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar border class="text-blue-500" label="AL" />
    <Avatar border class="text-red-500" label="AL" />
    <Avatar border class="text-green-500" label="AL" />
    <Avatar border class="text-yellow-500" label="AL" />
    <Avatar border class="text-purple-500" label="AL" />
  </div>

  <div class="flex gap-4 w-full justify-center">
    <Avatar alt="User avatar" class="border-2 text-blue-500" src="https://i.pravatar.cc/100?img=9" />
    <Avatar alt="User avatar" class="border-2 text-red-500" src="https://i.pravatar.cc/100?img=9" />
    <Avatar alt="User avatar" class="border-2 text-green-500" src="https://i.pravatar.cc/100?img=9" />
    <Avatar alt="User avatar" class="border-2 text-yellow-500" src="https://i.pravatar.cc/100?img=9" />
    <Avatar alt="User avatar" class="border-2 text-purple-500" src="https://i.pravatar.cc/100?img=9" />
  </div>
</template>
