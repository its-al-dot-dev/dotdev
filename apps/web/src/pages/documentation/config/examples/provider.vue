<script lang="ts" setup>
import { Button, UiKitProvider } from '@dotdev/ui-kit'
</script>

<template>
  <div class="flex w-full flex-col items-start gap-5">
    <div class="flex flex-col items-start gap-2">
      <span class="text-xs text-muted">namespace: d</span>
      <div class="flex items-center gap-3">
        <Button label="Get started" />
        <Button label="Docs" variant="outlined" />
      </div>
    </div>

    <UiKitProvider namespace="landing">
      <div class="flex flex-col items-start gap-2">
        <span class="text-xs text-muted">namespace: landing</span>
        <div class="flex items-center gap-3">
          <Button label="Get started" />
          <Button label="Docs" variant="outlined" />
        </div>
      </div>
    </UiKitProvider>
  </div>
</template>
