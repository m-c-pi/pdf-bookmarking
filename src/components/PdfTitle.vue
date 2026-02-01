
<script setup>
import IconButton from './user-inputs/IconButton.vue';
import { Edit24Regular, Delete24Regular } from '@vicons/fluent';

const handleEditClick = () => {
    console.log('Edit button clicked!');
    // Your edit logic here
};
</script>

<template>
    <div class="pdf-title-wrapper">
        <div class="title">The catcher in the rye ...uiawdhg adiuaeg iaue zg fieuefb ieufg ieaufgieuf g</div>
        <div class="action-container">
            <IconButton :icon="Edit24Regular" @click="handleEditClick" />
            <IconButton :icon="Delete24Regular" @click="handleEditClick" />
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
        border-radius: var(--border-radius);
    }

    .title {
        color: var(--color-primary);
    }

    .action-container {
        padding: var(--padding-sm);
        display: flex;
        flex-direction: row;
        gap: var(--gap-sm);
        height: 100%;
    }
</style>
