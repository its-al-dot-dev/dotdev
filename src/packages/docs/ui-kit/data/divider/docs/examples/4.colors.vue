<script lang="ts" setup>
import { Divider } from 'dotdev/ui-kit'

defineExample({
  title: 'Colors',
  desc: `The divider and its label share the same accent. <code>neutral</code> keeps the line subtle and the label muted; the other colors draw the eye to the section title.`,
})
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <Divider label="Primary" color="primary" />
    <Divider label="Neutral" color="neutral" />
    <Divider label="Danger" color="danger" />
    <Divider label="Warning" color="warning" />
    <Divider label="Info" color="info" />
    <Divider label="Success" color="success" />
  </div>
</template>
