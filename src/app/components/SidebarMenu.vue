<script lang="ts" setup>
import type { UIMenuItem } from 'dotdev/ui-kit'
import { Accordion, Icon, Menu } from 'dotdev/ui-kit'
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

type MenuGroup = UIMenuItem & { children: UIMenuItem[] }

const props = defineProps<{ items: MenuGroup[] }>()

const route = useRoute()
const openGroups = shallowRef<MenuGroup[]>([])

watch(
  () => route.path,
  (path) => {
    const group = props.items.find((item) => item.children.some((child) => child.to === path))

    if (group && !openGroups.value.includes(group)) {
      openGroups.value = [...openGroups.value, group]
    }
  },
  { immediate: true },
)
</script>

<template>
  <nav class="app-menu">
    <Accordion v-model="openGroups" :options="items" label-key="label" multiple variant="plain">
      <template #default="{ item }">
        <Icon v-if="item.icon" :name="item.icon" class="app-menu__item-icon" />
        <span class="app-menu__item-label">{{ item.label }}</span>
      </template>

      <template #content="{ item }">
        <Menu :items="item.children" size="sm" />
      </template>
    </Accordion>
  </nav>
</template>
