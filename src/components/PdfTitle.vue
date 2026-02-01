
<script setup>
import { ref } from 'vue';
import IconButton from './user-inputs/IconButton.vue';
import { Edit24Regular, Delete24Regular, Checkmark24Regular, Dismiss24Regular } from '@vicons/fluent';
import PdfTitleEditInput from './user-inputs/text-input/PdfTitleEditInput.vue';

const isEditing = ref(false);
const title = ref('The catcher in the rye');

const handleEditClick = () => {
    isEditing.value = true;
};

const handleAccept = () => {
    isEditing.value = false;
};

const handleCancel = () => {
    isEditing.value = false;
};
</script>

<template>
    <div class="pdf-title-wrapper">
        <PdfTitleEditInput v-if="isEditing" v-model="title" @blur="handleCancel" />
        <div v-else class="title">{{ title }}</div>
        <div class="action-container">
            <template v-if="isEditing">
                <IconButton :icon="Checkmark24Regular" @click="handleAccept" />
                <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleCancel" />
            </template>
            <template v-else>
                <IconButton :icon="Edit24Regular" @click="handleEditClick" />
                <IconButton :icon="Delete24Regular" color="var(--color-decline)" />
            </template>
        </div>
    </div>
</template>

<style scoped>
    .pdf-title-wrapper {
        background-color: var(--color-surface-container);
        border-radius: var(border-radius);
        display: flex;
        align-items: center;
        gap: var(--gap-md);
        height: var(--input-height-sm);
        box-sizing: content-box;
        padding-block: var(--padding-sm);
        padding-inline: var(--padding-lg);
        font-size: 14px;
        width: fit-content;
        max-width: 300px;
        border-radius: var(--border-radius);
    }

    .title {
        color: var(--color-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
    }

    .action-container {
        padding: var(--padding-sm);
        display: flex;
        flex-direction: row;
        gap: var(--gap-sm);
        height: 100%;
    }
</style>
