<script setup>
import { ref } from 'vue';
import TabBar from './components/user-inputs/tab-bar/TabBar.vue';
import TextInput from './components/user-inputs/text-input/TextInput.vue';
import ThisPdfView from './views/ThisPdfView.vue/ThisPdfView.vue';

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
    <ThisPdfView />
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

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap-lg);
    height: 100%;
    max-height: 100%;
  }
</style>
