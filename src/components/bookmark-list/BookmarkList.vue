<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Sortable from 'sortablejs'
import PdfTitle from '@/components/PdfTitle.vue'
import BookmarkEntry from '@/components/bookmark-entry/BookmarkEntry.vue'
import NewBookmarkInput from '@/components/NewBookmarkInput.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'
import { useModalStore } from '@/stores/modalStore'

const props = defineProps({
  url: { type: String, required: true },
  showOrderButtons: { type: Boolean, default: false },
  onOrderChange: { type: Function, default: null },
  showEyeButton: { type: Boolean, default: false },
  showFileButton: { type: Boolean, default: false },
})

const pdfDataStore = usePdfDataStore()
const modalStore = useModalStore()

const allBookmarksForUrl = computed(() => {
  return pdfDataStore.getBookmarksByUrl(props.url).value
})

const bookmarks = computed(() => {
  const term = pdfDataStore.searchValue.trim().toLowerCase()
  if (!term) return allBookmarksForUrl.value
  return allBookmarksForUrl.value.filter((b) =>
    b.title.toLowerCase().includes(term),
  )
})
const bookmarksRef = ref(null)
let sortableInstance = null

function initSortable() {
  if (sortableInstance) sortableInstance.destroy()
  if (!bookmarksRef.value) return

  sortableInstance = Sortable.create(bookmarksRef.value, {
    handle: '.order-button-wrapper',
    animation: 500,
    dragClass: 'sortable-drag',
    onStart() {
      pdfDataStore.isReorderingByDnd = true
    },
    onEnd(evt) {
      document.addEventListener('pointermove', () => {
        pdfDataStore.isReorderingByDnd = false
      }, { once: true })
      const ids = bookmarks.value.map((b) => b.id)
      const [moved] = ids.splice(evt.oldIndex, 1)
      ids.splice(evt.newIndex, 0, moved)
      pdfDataStore.reorderBookmarks(props.url, ids)
    },
  })
}

onMounted(() => {
  nextTick(initSortable)
})

watch(bookmarks, () => {
  nextTick(initSortable)
})

onBeforeUnmount(() => {
  if (sortableInstance) sortableInstance.destroy()
})

const displayTitle = computed(() => {
  return pdfDataStore.allBookmarks[props.url]?.pdfTitle || pdfDataStore.pdfTitle
})

const onEditTitle = (newTitle) => {
  pdfDataStore.updatePdfTitle(props.url, newTitle)
}

const onDelete = () => {
  modalStore.show(
    'Delete all bookmarks',
    `Are you sure you want to delete all bookmarks for "${displayTitle.value}"?`,
    () => pdfDataStore.deleteAllByUrl(props.url),
  )
}

const isHidden = computed(() => {
  return !!pdfDataStore.allBookmarks[props.url]?.isHidden
})

const onToggleHidden = () => {
  pdfDataStore.toggleHidden(props.url)
}

const onEditUrl = (newUrl) => {
  pdfDataStore.updatePdfUrl(props.url, newUrl)
}
</script>

<template>
  <PdfTitle :title="displayTitle" :url="props.url" :isEditable="bookmarks.length > 0" :onEdit="onEditTitle" :onEditUrl="onEditUrl" :onDelete="onDelete" :showOrderButtons="props.showOrderButtons" :onOrderChange="props.onOrderChange" :showEyeButton="props.showEyeButton" :showFileButton="props.showFileButton" :isHidden="isHidden" :onToggleHidden="onToggleHidden" />
  <div v-if="!isHidden || !props.showEyeButton" class="bookmarks-list">
    <div ref="bookmarksRef" class="bookmarks">
      <BookmarkEntry v-for="bookmark in bookmarks" :key="bookmark.id" :bookmark="bookmark" />
      <div v-if="bookmarks.length === 0" class="empty">-- No bookmarks saved --</div>
    </div>
    <div class="new-bookmark-wrapper">
      <NewBookmarkInput :url="props.url" />
    </div>
  </div>
</template>

<style scoped>
.new-bookmark-wrapper {
  height: var(--input-height-md);
}

.bookmarks-list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--gap-sm);
  min-height: 0;
}

.bookmarks {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
  /* flex: 1; */
  min-height: 0;
  overflow: auto;
}

.empty {
  font-size: 14px;
}

.bookmarks :deep(.sortable-drag) {
  opacity: 0;
}
</style>
