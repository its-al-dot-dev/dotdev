<script lang="ts" setup>
import { Icon, IconButton, Input, Tag } from '@dotdev/ui-kit'
import { computed, ref } from 'vue'
import type { ActionLogEntry, ActionLogger } from '../../store/action-logger.ts'
import PlayControlLayout from './PlayControlLayout.vue'

interface Props {
  logger: ActionLogger
}

const props = defineProps<Props>()

const searchQuery = ref('')
const expandedLogIds = ref<Set<string>>(new Set())
const copiedId = ref<string | null>(null)

const filteredLogs = computed(() => {
  if (!searchQuery.value.trim()) return props.logger.logs

  const q = searchQuery.value.toLowerCase()
  return props.logger.logs.filter((log) => {
    const matchName = log.eventName.toLowerCase().includes(q)
    const matchPayload = JSON.stringify(log.payload).toLowerCase().includes(q)
    return matchName || matchPayload
  })
})

const isAllExpanded = computed(() => {
  return filteredLogs.value.length > 0 && expandedLogIds.value.size === filteredLogs.value.length
})

function formatTime(date: Date): string {
  const pad = (n: number, z = 2) => String(n).padStart(z, '0')
  const h = pad(date.getHours())
  const m = pad(date.getMinutes())
  const s = pad(date.getSeconds())
  const ms = pad(date.getMilliseconds(), 3)
  return `${h}:${m}:${s}.${ms}`
}

function toggleExpand(id: string) {
  if (expandedLogIds.value.has(id)) {
    expandedLogIds.value.delete(id)
  } else {
    expandedLogIds.value.add(id)
  }
}

function toggleAll() {
  if (isAllExpanded.value) {
    expandedLogIds.value.clear()
  } else {
    expandedLogIds.value = new Set(filteredLogs.value.map((l) => l.id))
  }
}

async function copyPayload(log: ActionLogEntry, event: Event) {
  event.stopPropagation()
  const content = JSON.stringify(log.payload, null, 2)
  await navigator.clipboard.writeText(content)
  copiedId.value = log.id
  setTimeout(() => {
    copiedId.value = null
  }, 1500)
}
</script>

<template>
  <PlayControlLayout
    :is-empty="!filteredLogs.length"
    class="play-emits-log"
    empty-desc="Interact with the component to capture emitted actions"
    empty-title="No events logged yet"
    icon="terminal"
    title="Emits Log"
  >
    <template #header>
      <Tag class="play-emits-log__count" rounded size="sm">{{ logger.logs.length }}</Tag>
    </template>

    <template #toolbar>
      <IconButton
        v-if="logger.logs.length > 0"
        :icon="isAllExpanded ? 'chevron-up' : 'chevron-down'"
        size="sm"
        title="Toggle Expand All"
        @click="toggleAll"
      />
      <IconButton
        :disabled="logger.logs.length === 0"
        icon="trash"
        size="sm"
        title="Clear logs"
        @click="logger.clearLogs"
      />
      <Input
        v-model="searchQuery"
        class="play-emits-log__search"
        placeholder="Filter events..."
        prefix-icon="magnifying-glass"
        size="sm"
      />
    </template>

    <div
      v-for="log in filteredLogs"
      :key="log.id"
      :class="{ 'play-emits-log__item--expanded': expandedLogIds.has(log.id) }"
      class="play-emits-log__item"
      @click="toggleExpand(log.id)"
    >
      <div class="play-emits-log__item-row">
        <div class="play-emits-log__item-main">
          <Icon :name="expandedLogIds.has(log.id) ? 'caret-down' : 'caret-right'" class="play-emits-log__chevron" />
          <Tag class="play-emits-log__badge" size="sm">@{{ log.eventName }}</Tag>
          <span v-if="!expandedLogIds.has(log.id)" class="play-emits-log__summary">
            {{ JSON.stringify(log.payload) }}
          </span>
        </div>

        <div class="play-emits-log__item-actions">
          <IconButton
            :icon="copiedId === log.id ? 'check' : 'copy'"
            size="xs"
            title="Copy JSON Payload"
            @click="copyPayload(log, $event)"
          />
          <span class="play-emits-log__time">{{ formatTime(log.timestamp) }}</span>
        </div>
      </div>

      <pre v-if="expandedLogIds.has(log.id)" class="play-emits-log__payload">
        {{ JSON.stringify(log.payload, null, 2) }}
      </pre>
    </div>
  </PlayControlLayout>
</template>
