
<script setup>
    import PdfTitle from '@/components/PdfTitle.vue';
    import BookmarkEntry from '@/components/bookmark-entry/BookmarkEntry.vue';
    import NewBookmarkInput from '@/components/NewBookmarkInput.vue';
    import PdfFooter from '@/components/PdfFooter.vue';
</script>

<template>
    <PdfTitle />
    <div class="bookmarks-list">
      <div class="bookmarks">
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />
        <BookmarkEntry />

      </div>
      <div class="new-bookmark-wrapper">
        <NewBookmarkInput />
      </div>
      <div class="footer">
        <PdfFooter />
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

  .footer {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: var(--gap-lg);
  }
</style>
