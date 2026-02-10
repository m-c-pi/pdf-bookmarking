<script setup>
import { ref, onMounted } from 'vue'
import TabBar from './components/user-inputs/tab-bar/TabBar.vue'
import TextInput from './components/user-inputs/text-input/TextInput.vue'
import ThisPdfView from './views/ThisPdfView.vue/ThisPdfView.vue'
import AllPdfView from './views/AllPdfView/AllPdfView.vue'
import PdfFooter from './components/PdfFooter.vue'
import { usePdfDataStore } from './stores/pdfDataStore'
import ConfirmationModal from './components/modals/ConfirmationModal.vue'

const activeTab = ref(0)
const isReady = ref(false)
const pdfDataStore = usePdfDataStore()

onMounted(async () => {
  await pdfDataStore.init()
  if (!pdfDataStore.isPdf) {
    activeTab.value = 1
  }
  isReady.value = true
})
</script>

<template>
  <div class="wrapper">
    <template v-if="isReady">
      <header>
        <TabBar
          :initial-tab-index="pdfDataStore.isPdf ? 0 : 1"
          :locked="!pdfDataStore.isPdf"
          @change="activeTab = $event"
        />
        <div class="search-wrapper">
          <TextInput v-model="pdfDataStore.searchValue" placeholder="Search" />
        </div>
      </header>
      <ThisPdfView v-if="activeTab === 0" />
      <AllPdfView v-else />
    </template>
    <ConfirmationModal />
    <div class="footer">
      <PdfFooter />
    </div>
  </div>
</template>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  gap: var(--gap-sm);
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
  position: relative;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
