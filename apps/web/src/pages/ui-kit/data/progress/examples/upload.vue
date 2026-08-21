<script lang="ts" setup>
import { ref } from 'vue'
import { Button, Progress } from '@dotdev/ui-kit'

const value = ref(0)

function upload() {
  value.value = 0
  const timer = setInterval(() => {
    value.value += Math.random() * 18
    if (value.value >= 100) {
      value.value = 100
      clearInterval(timer)
    }
  }, 240)
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <div class="flex items-center justify-between text-sm">
      <span>Uploading assets…</span>
      <span class="text-muted">{{ Math.round(value) }}%</span>
    </div>

    <Progress :value="value" />

    <div>
      <Button size="sm" variant="outlined" label="Restart" @click="upload" />
    </div>
  </div>
</template>
