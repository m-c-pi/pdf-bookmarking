
<script setup>
    import { computed } from 'vue';
    import PdfTitle from '@/components/PdfTitle.vue';
    import BookmarkEntry from '@/components/bookmark-entry/BookmarkEntry.vue';
    import NewBookmarkInput from '@/components/NewBookmarkInput.vue';
    import { usePdfDataStore } from '@/stores/pdfDataStore';

    const pdfDataStore = usePdfDataStore();

    const currentBookmarks = computed(() => {
        return pdfDataStore.getBookmarksByUrl(pdfDataStore.activeTabUrl).value;
    });

    const displayTitle = computed(() => {
        return pdfDataStore.allBookmarks[pdfDataStore.activeTabUrl]?.pdfTitle || pdfDataStore.pdfTitle;
    });

    const onEditTitle = (newTitle) => {
        pdfDataStore.updatePdfTitle(pdfDataStore.activeTabUrl, newTitle);
    };

    const onDelete = () => {
        pdfDataStore.deleteAllByUrl(pdfDataStore.activeTabUrl);
    };
</script>

<template>
    <PdfTitle :title="displayTitle" :onEdit="onEditTitle" :onDelete="onDelete" />
    <div class="bookmarks-list">
      <div class="bookmarks">
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
