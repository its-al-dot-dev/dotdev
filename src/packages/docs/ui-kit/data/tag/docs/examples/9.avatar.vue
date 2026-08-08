<script lang="ts" setup>
import { Avatar, Tag } from 'dotdev/ui-kit'

defineExpose({
  title: 'Avatar slot',
  desc: `Combine a tag with an avatar for user badges. Render the avatar inside the default slot and use <code>rounded</code> for a pill shape.`,
})
</script>

<template>
  <Tag class="text-blue-700" label="Alex Doe" rounded>
    <Avatar alt="User avatar" border src="https://i.pravatar.cc/100?img=5" />
  </Tag>
  <Tag border class="text-rose-700" label="Alex Doe" rounded>
    <Avatar alt="User avatar" src="https://i.pravatar.cc/100?img=5" />
  </Tag>
  <Tag border class="text-violet-500" label="Alex Doe" rounded>
    <Avatar border label="JD" />
  </Tag>
  <Tag border class="text-cyan-700" label="Alex Doe" rounded>
    <Avatar label="JD" />
  </Tag>
</template>
