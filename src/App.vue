<script setup>
import { ref } from 'vue';
import PdfTitle from './components/PdfTitle.vue';
import TabBar from './components/user-inputs/tab-bar/TabBar.vue';
import TextInput from './components/user-inputs/text-input/TextInput.vue';
import BookmarkEntry from './components/bookmark-entry/BookmarkEntry.vue';
import NewBookmarkInput from './components/NewBookmarkInput.vue';
import PdfFooter from './components/PdfFooter.vue';

const searchValue = ref('');
</script>

<template>
  <div class="wrapper">
    <header>
      <TabBar />
      <div class="search-wrapper">
        <TextInput v-model="searchValue" placeholder="Search" />
      </div>
    </header>
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
  </div>
</template>

<style scoped>
  header {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm)
  }

  header .search-wrapper {
    height: var(--input-height-lg);
  }

  .new-bookmark-wrapper {
    height: var(--input-height-md);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap-lg);
    height: 100%;
    max-height: 100%;
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
