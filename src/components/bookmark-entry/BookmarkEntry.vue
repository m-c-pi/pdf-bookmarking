<script setup>
/* global chrome */
import { ref, watch } from 'vue'
import {
  ChevronUp24Regular,
  ChevronDown24Regular,
  Edit24Regular,
  Delete24Regular,
  Checkmark24Regular,
  Dismiss24Regular,
} from '@vicons/fluent'
import IconButton from '../user-inputs/IconButton.vue'
import EditNameInput from '../user-inputs/text-input/EditNameInput.vue'
import PageInput from '../user-inputs/PageInput.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'
import { useErrorModalStore } from '@/stores/errorModalStore'

const BookmarkState = {
  EDITING: 'editing',
  DEFAULT: 'default',
}

const props = defineProps({
  bookmark: {
    type: Object,
    required: true,
  },
})

const bookmarkState = ref(BookmarkState.DEFAULT)
const title = ref(props.bookmark.title)
const page = ref(props.bookmark.page)

const errorModalStore = useErrorModalStore()

const handleNavigate = async () => {
  try {
    await chrome.tabs.create({ url: `${props.bookmark.url}#page=${page.value}` })
  } catch {
    errorModalStore.show(
      'Unable to open file',
      'Chrome blocked access to a local file URL. To fix this, open the extension settings and enable "Allow access to file URLs".',
      {
        actionLabel: 'Open Settings',
        onAction: () => chrome.tabs.create({ url: `chrome://extensions/?id=${chrome.runtime.id}` }),
      },
    )
  }
}

const handleEdit = () => {
  bookmarkState.value = BookmarkState.EDITING
}

const handleAccept = () => {
  if (!title.value.trim()) {
    handleCancel()
    return
  }
  pdfDataStore.updateBookmarkTitle(props.bookmark.url, props.bookmark.id, title.value.trim())
  bookmarkState.value = BookmarkState.DEFAULT
}

const handleCancel = () => {
  title.value = props.bookmark.title
  bookmarkState.value = BookmarkState.DEFAULT
}

const pdfDataStore = usePdfDataStore()

const handleDelete = () => {
  pdfDataStore.deleteBookmark(props.bookmark.url, props.bookmark.id)
}

const handleOrderChange = (direction) => {
  pdfDataStore.changeBookmarkOrder(props.bookmark.url, props.bookmark.id, direction)
}

watch(page, (newPage) => {
  pdfDataStore.updateBookmarkPage(props.bookmark.url, props.bookmark.id, newPage)
})
</script>

<template>
  <div class="bookmark-entry-wrapper">
    <div :class="['entry', { 'no-hover': pdfDataStore.isReorderingByDnd }]">
      <div class="order-button-wrapper">
        <ChevronUp24Regular class="order-icon" @click.stop="handleOrderChange('up')" />
        <ChevronDown24Regular class="order-icon" @click.stop="handleOrderChange('down')" />
      </div>
      <div
        class="title-wrapper"
        @click="bookmarkState !== BookmarkState.EDITING && handleNavigate()"
      >
        <EditNameInput
          v-if="bookmarkState === BookmarkState.EDITING"
          v-model="title"
          @blur="handleCancel"
          @keydown.enter="handleAccept"
        />
        <div v-else class="title">{{ title }}</div>
      </div>
      <div class="action-button-wrapper" @click.stop>
        <template v-if="bookmarkState === BookmarkState.EDITING">
          <IconButton :icon="Checkmark24Regular" @mousedown.prevent="handleAccept" />
          <IconButton
            :icon="Dismiss24Regular"
            color="var(--color-decline)"
            @mousedown.prevent="handleCancel"
          />
        </template>
        <template v-else>
          <IconButton :icon="Edit24Regular" @click="handleEdit" />
          <IconButton :icon="Delete24Regular" color="var(--color-decline)" @click="handleDelete" />
        </template>
      </div>
    </div>
    <PageInput v-model="page" />
  </div>
</template>

<style scoped>
.bookmark-entry-wrapper {
  height: var(--input-height-md);
  max-width: 100%;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  gap: var(--gap-md);
}

.entry {
  padding-inline: var(--padding-lg);
  padding-block: var(--padding-md);
  background-color: var(--color-surface-container);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  min-width: 0;
  gap: var(--gap-md);
  border: 1px solid transparent;
}

.entry:not(.no-hover):hover {
  border-color: var(--color-primary);
}

.order-button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.order-button-wrapper:active {
  cursor: grabbing;
}

.order-icon {
  width: 16px;
  height: 16px;
  cursor: grab;
  color: var(--color-on-surface-container-variant);
  border: 1px solid transparent;
  border-radius: var(--border-radius);
}

.entry:not(.no-hover) .order-icon:hover {
  border-color: var(--color-primary);
}

.entry:not(.no-hover) .order-icon:hover {
  color: var(--color-primary);
}

.title-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
  min-width: 0;
}

.title {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-button-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
