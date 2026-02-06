<script setup>
import { ref } from 'vue';
import PdfTitle from './components/PdfTitle.vue';
import TabBar from './components/user-inputs/tab-bar/TabBar.vue';
import TextInput from './components/user-inputs/text-input/TextInput.vue';
import BookmarkEntry from './components/bookmark-entry/BookmarkEntry.vue';
import NewBookmarkInput from './components/NewBookmarkInput.vue';

const searchValue = ref('');
</script>

<template>
  <div class="wrapper">
    <header>
      <TabBar />
      <TextInput v-model="searchValue" placeholder="Search" />
    </header>
    <PdfTitle />
    <div class="bookmarks-list">
      <BookmarkEntry />
      <BookmarkEntry />
      <BookmarkEntry />
      <NewBookmarkInput />
    </div>
  </div>
</template>

<style scoped>
  header {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm)
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap-lg)
  }

  .bookmarks-list {
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm)
  }
</style>
