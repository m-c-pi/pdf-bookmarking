<script setup>
import { computed } from 'vue'
import BookmarkList from '@/components/bookmark-list/BookmarkList.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'

const pdfDataStore = usePdfDataStore()

const filteredUrls = computed(() => {
  const term = pdfDataStore.searchValue.trim().toLowerCase()
  if (!term) return pdfDataStore.orderedUrls

  return pdfDataStore.orderedUrls.filter((url) => {
    const bookmarks = pdfDataStore.allBookmarks[url]?.bookmarks || {}
    return Object.values(bookmarks).some((b) =>
      b.title.toLowerCase().includes(term),
    )
  })
})
</script>

<template>
  <div class="all-pdf-wrapper">
    <div v-if="filteredUrls.length === 0" class="no-bookmarks">No bookmarks found</div>
    <div v-for="url in filteredUrls" :key="url" class="bookmark-list-wrapper">
      <BookmarkList
        :url="url"
        showOrderButtons
        showEyeButton
        showFileButton
        :onOrderChange="(dir) => pdfDataStore.changeUrlOrder(url, dir)"
      />
    </div>
  </div>
</template>

<style scoped>
.all-pdf-wrapper {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow: auto;
  gap: var(--gap-lg);
}

.no-bookmarks {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 14px;
}

.bookmark-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}
</style>
