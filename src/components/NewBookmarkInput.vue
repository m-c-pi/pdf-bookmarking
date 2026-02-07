
<script setup>
import { ref } from 'vue';
import PageInput from './user-inputs/PageInput.vue';
import TextInput from './user-inputs/text-input/TextInput.vue';
import { usePdfDataStore } from '@/stores/pdfDataStore';

const pdfDataStore = usePdfDataStore();
const bookmarkTitle = ref('');
const page = ref(1);

const resetPage = () => {
    page.value = 1;
};

const onAccept = async (value) => {
    if (!value.trim()) return;
    await pdfDataStore.addBookmark(value.trim(), page.value);
    bookmarkTitle.value = '';
    resetPage();
};
</script>

<template>
    <div class="new-bookmark-wrapper">
        <TextInput v-model="bookmarkTitle" :onAccept="onAccept" :onCancel="resetPage" fontSize="14" placeholder="New bookmark title" />
        <PageInput v-model="page" :onAccept="() => onAccept(bookmarkTitle)" />
    </div>
</template>

<style scoped>
    .new-bookmark-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--gap-md);
        height: 100%;
    }
</style>
