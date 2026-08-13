<script lang="ts" setup>
import { Avatar, Tag } from 'dotdev/ui-kit'

defineExample({
  title: 'Avatar slot',
  desc: `Combine a tag with an avatar for user badges. Render the avatar inside the default slot and use <code>rounded</code> for a pill shape.`,
})
</script>

<template>
  <Tag color="primary" label="Alex Doe" rounded>
    <Avatar alt="User avatar" border src="https://i.pravatar.cc/100?img=5" />
  </Tag>
  <Tag color="success" border label="Alex Doe" rounded>
    <Avatar alt="User avatar" src="https://i.pravatar.cc/100?img=5" />
  </Tag>
  <Tag color="warning" border label="Alex Doe" rounded>
    <Avatar color="warning" border label="JD" />
  </Tag>
  <Tag color="danger" border label="Alex Doe" rounded>
    <Avatar color="danger" label="JD" />
  </Tag>
</template>
