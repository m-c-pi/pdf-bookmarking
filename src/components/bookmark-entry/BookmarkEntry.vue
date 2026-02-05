
<script setup>
import { ChevronUp24Regular, ChevronDown24Regular } from '@vicons/fluent';
</script>

<template>
    <div class="bookmark-entry-wrapper">
        <div class="entry">
            <div class="order-button-wrapper">
                <ChevronUp24Regular class="order-icon" />
                <ChevronDown24Regular class="order-icon" />
            </div>
            <div class="title">
                Hier könnte ihr Titel stehen
            </div>
            <div class="action-button-wrapper">

            </div>
        </div>
    </div>
</template>

<style scoped>
    .bookmark-entry-wrapper {
        height: var(--input-height-md);
        width: 100%;
        font-size: 14px;
        display: flex;
        flex-direction: row;
    }

    .entry {
        padding-inline: var(--padding-lg);
        padding-block: var(--padding-md);
        background-color: var(--color-surface-container);
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: row;
        flex: 1;
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

    .title {
        flex: 1;
    }
</style>
