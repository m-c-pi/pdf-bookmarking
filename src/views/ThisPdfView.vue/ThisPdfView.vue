<script setup>
import BookmarkList from '@/components/bookmark-list/BookmarkList.vue'
import { usePdfDataStore } from '@/stores/pdfDataStore'

const pdfDataStore = usePdfDataStore()
</script>

<template>
  <BookmarkList :url="pdfDataStore.activeTabUrl" />
</template>
