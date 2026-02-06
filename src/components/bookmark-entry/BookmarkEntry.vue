
<script setup>
import { ref } from 'vue';
import { ChevronUp24Regular, ChevronDown24Regular, Edit24Regular, Delete24Regular, Checkmark24Regular, Dismiss24Regular } from '@vicons/fluent';
import IconButton from '../user-inputs/IconButton.vue';
import EditNameInput from '../user-inputs/text-input/EditNameInput.vue';
import PageInput from '../user-inputs/PageInput.vue';

const BookmarkState = {
    EDITING: "editing",
    DEFAULT: "default"
};

const bookmarkState = ref(BookmarkState.DEFAULT);
const title = ref('Hier könnte ihr Titel stehen');
const page = ref(1);

const handleEdit = () => {
    bookmarkState.value = BookmarkState.EDITING;
};

const handleAccept = () => {
    bookmarkState.value = BookmarkState.DEFAULT;
};

const handleCancel = () => {
    bookmarkState.value = BookmarkState.DEFAULT;
};

const handleDelete = () => {
    // TODO: Implement delete functionality
};
</script>

<template>
    <div class="bookmark-entry-wrapper">
        <div class="entry">
            <div class="order-button-wrapper">
                <ChevronUp24Regular class="order-icon" />
                <ChevronDown24Regular class="order-icon" />
            </div>
            <div class="title-wrapper" @click="bookmarkState !== BookmarkState.EDITING && handleEdit()">
                <EditNameInput
                    v-if="bookmarkState === BookmarkState.EDITING"
                    v-model="title"
                    @blur="handleCancel"
                    @keydown.enter="handleAccept"
                />
                <div v-else class="title">{{ title }}</div>
            </div>
            <div class="action-button-wrapper" @click.stop>
                <template v-if="bookmarkState === BookmarkState.EDITING">
                    <IconButton :icon="Checkmark24Regular" @click="handleAccept" />
                    <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleCancel" />
                </template>
                <template v-else>
                    <IconButton :icon="Edit24Regular" @click="handleEdit" />
                    <IconButton :icon="Delete24Regular" color="var(--color-decline)" @click="handleDelete" />
                </template>
            </div>
        </div>
        <PageInput v-model="page" />
    </div>
</template>

<style scoped>
    .bookmark-entry-wrapper {
        height: var(--input-height-md);
        max-width: 100%;
        font-size: 14px;
        display: flex;
        flex-direction: row;
        gap: var(--gap-md);
    }

    .entry {
        padding-inline: var(--padding-lg);
        padding-block: var(--padding-md);
        background-color: var(--color-surface-container);
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        min-width: 0;
        gap: var(--gap-md);
    }

    .order-button-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .order-icon {
        width: 16px;
        height: 16px;
        cursor: pointer;
        color: var(--color-on-surface-container-variant);
    }

    .order-icon:hover {
        color: var(--color-primary);
    }

    .title-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        cursor: pointer;
        min-width: 0;
    }

    .title {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .action-button-wrapper {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
</style>
