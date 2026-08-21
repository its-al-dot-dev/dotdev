<script lang="ts" setup>
import { Avatar, Tag } from '@dotdev/ui-kit'
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
