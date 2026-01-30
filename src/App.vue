<script setup>
  import PdfTitle from './components/PdfTitle.vue';
import TabBar from './components/user-inputs/tab-bar/TabBar.vue';
import TextInput from './components/user-inputs/text-input/TextInput.vue';

</script>

<template>
  <div class="wrapper">
    <header>
      <TabBar />
      <TextInput placeholder="Search" />
    </header>
    <PdfTitle />
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
</style>
