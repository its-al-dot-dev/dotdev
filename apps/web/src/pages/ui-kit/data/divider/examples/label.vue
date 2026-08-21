<script lang="ts" setup>
import { Divider, Icon } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Divider label="Section title" />
    <Divider label="With icon" />
    <Divider>
      <span class="flex items-center gap-1.5">
        <Icon name="bell" />
        Custom slot content
      </span>
    </Divider>
  </div>
</template>
