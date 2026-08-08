<script lang="ts" setup>
import { DocPage } from 'dotdev/studio'
import ConfigPlay from './ConfigPlay.vue'
import { config } from './docs'

definePage({ name: 'Configuration', meta: { icon: 'gear' } })
</script>

<template>
  <DocPage :config="config">
    <ConfigPlay />
  </DocPage>
</template>
