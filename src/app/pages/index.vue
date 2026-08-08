<script lang="ts" setup>
import { Button } from 'dotdev/ui-kit'
import { definePlay, DocPage, PlayGround, slot } from 'dotdev/studio'

definePage({ name: 'Dashboard' })

const { preset } = definePlay({
  component: Button,
  props: {
    label: 'Call to action',
    icon: 'dashboard',
  },
})

preset({ name: 'Variants', iterate: 'variant' })
preset({ name: 'Colors', iterate: 'color' })
preset({ name: 'Sizes', iterate: 'size' })
preset({
  name: 'Slots',
  component: Button,
  props: { variant: 'outlined' },
  slots: {
    default: slot({ class: 'h-4 w-16' }),
    prefix: slot({ class: 'size-4' }),
    suffix: slot({ class: 'size-4' }),
  },
})
</script>

<template>
  <DocPage>
    <PlayGround />
  </DocPage>
</template>
