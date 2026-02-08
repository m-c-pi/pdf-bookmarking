<script setup>
import BookmarkList from '@/components/bookmark-list/BookmarkList.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'

const pdfDataStore = usePdfDataStore()
</script>

<template>
  <div class="all-pdf-wrapper">
    <div
      v-for="url in Object.keys(pdfDataStore.allBookmarks)"
      :key="url"
      class="bookmark-list-wrapper"
    >
      <BookmarkList :url="url" />
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

.bookmark-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--gap-lg);
}
</style>
