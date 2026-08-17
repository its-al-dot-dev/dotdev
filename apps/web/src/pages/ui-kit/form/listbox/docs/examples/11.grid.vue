<script lang="ts" setup>
import { Input, ListBox } from '@dotdev/ui-kit'
import { ref } from 'vue'

defineExample({
  title: 'Grid selection',
  desc: `Use the <code>columns</code> prop to display options in a grid layout. Combine it with <code>multiple</code> to allow selecting multiple values from a compact collection of options.`,
})

const value = ref<string[]>([])

/* prettier-ignore */
const options = [
  '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🙂', '🙃',
  '😉', '🥰', '😍', '🤩', '😘', '🤔', '🤐', '😐', '😑', '😒',
  '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔', '💕',
  '🔥', '✨', '⭐', '🌟', '✅', '⚠️', '❓', '❗', '🎁', '🏆',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
  '🦁', '🐮', '🐷', '🐸', '🐵', '🍎', '🍐', '🍊', '🍋', '🍌',
  '🍉', '🍇', '🍓', '🍕', '🍔', '🍟', '🌭', '🌮', '🍰', '☕',
  '🚗', '🚕', '🚌', '🚆', '✈️', '🚀', '🚢', '🚲', '🏍️', '🏠',
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏅', '🥊', '🛹', '🏄', '🏃',
]

function updateValue(valueString: string) {
  value.value = valueString.split(' ')
}
</script>

<template>
  <div class="space-y-2">
    <Input :value="value.join(' ')" class="w-full" placeholder="Selected emojis" @update:model-value="updateValue" />
    <ListBox
      v-model="value"
      :checkmark="false"
      :columns="6"
      :options="options"
      class="h-53 overflow-y-auto text-2xl!"
      deselectable
      multiple
      square
    />
  </div>
</template>
