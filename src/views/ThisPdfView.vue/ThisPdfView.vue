
<script setup>
    import PdfTitle from '@/components/PdfTitle.vue';
    import BookmarkEntry from '@/components/bookmark-entry/BookmarkEntry.vue';
    import NewBookmarkInput from '@/components/NewBookmarkInput.vue';
</script>

<template>
    <PdfTitle />
    <div class="bookmarks-list">
      <div class="bookmarks">
        <!-- <BookmarkEntry /> -->
        <div class="empty">-- No bookmarks saved --</div>

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
