<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import Sortable from 'sortablejs'
import PdfTitle from '@/components/PdfTitle.vue'
import BookmarkEntry from '@/components/bookmark-entry/BookmarkEntry.vue'
import NewBookmarkInput from '@/components/NewBookmarkInput.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'

const pdfDataStore = usePdfDataStore()
const bookmarksRef = ref(null)
let sortableInstance = null

const currentBookmarks = computed(() => {
  return pdfDataStore.getBookmarksByUrl(pdfDataStore.activeTabUrl).value
})

function initSortable() {
  if (sortableInstance) sortableInstance.destroy()
  if (!bookmarksRef.value) return

  sortableInstance = Sortable.create(bookmarksRef.value, {
    handle: '.order-button-wrapper',
    animation: 150,
    onEnd(evt) {
      const ids = currentBookmarks.value.map((b) => b.id)
      const [moved] = ids.splice(evt.oldIndex, 1)
      ids.splice(evt.newIndex, 0, moved)
      pdfDataStore.reorderBookmarks(pdfDataStore.activeTabUrl, ids)
    },
  })
}

onMounted(() => {
  nextTick(initSortable)
})

watch(currentBookmarks, () => {
  nextTick(initSortable)
})

onBeforeUnmount(() => {
  if (sortableInstance) sortableInstance.destroy()
})

const displayTitle = computed(() => {
  return pdfDataStore.allBookmarks[pdfDataStore.activeTabUrl]?.pdfTitle || pdfDataStore.pdfTitle
})

const onEditTitle = (newTitle) => {
  pdfDataStore.updatePdfTitle(pdfDataStore.activeTabUrl, newTitle)
}

const onDelete = () => {
  pdfDataStore.deleteAllByUrl(pdfDataStore.activeTabUrl)
}
</script>

<template>
  <PdfTitle :title="displayTitle" :onEdit="onEditTitle" :onDelete="onDelete" />
  <div class="bookmarks-list">
    <div ref="bookmarksRef" class="bookmarks">
      <BookmarkEntry v-for="bookmark in currentBookmarks" :key="bookmark.id" :bookmark="bookmark" />
      <div v-if="currentBookmarks.length === 0" class="empty">-- No bookmarks saved --</div>
    </div>
    <div class="new-bookmark-wrapper">
      <NewBookmarkInput />
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
</style>
