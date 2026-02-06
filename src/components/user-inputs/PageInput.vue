
<script setup>
import { ref } from 'vue';
import { Add24Regular, Subtract24Regular } from '@vicons/fluent';
import IconButton from './IconButton.vue';

const model = defineModel({ type: Number, default: 1 });

const pageInputRef = ref(null);

const focusPageInput = () => {
    pageInputRef.value?.focus();
};

const handlePageKeydown = (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
        e.preventDefault();
    }
};

const handlePageBlur = () => {
    if (!pageInputRef.value?.value) {
        model.value = 1;
    } else {
        model.value = Number(pageInputRef.value.value);
    }
};

const incrementPage = () => {
    model.value = model.value + 1;
    pageInputRef.value.value = model.value;
};

const decrementPage = () => {
    if (model.value > 1) {
        model.value = model.value - 1;
        pageInputRef.value.value = model.value;
    }
};
</script>

<template>
    <div class="page-input-wrapper" @click="focusPageInput">
        <input
            ref="pageInputRef"
            type="number"
            min="1"
            :value="model"
            @keydown="handlePageKeydown"
            @keydown.enter="pageInputRef?.blur()"
            @blur="handlePageBlur"
        >
        <div class="page-action-wrapper">
            <IconButton :icon="Add24Regular" @click.stop="incrementPage" />
            <IconButton :icon="Subtract24Regular" @click.stop="decrementPage" />
        </div>
    </div>
</template>

<style scoped>
    .page-input-wrapper {
        padding-inline: var(--padding-sm);
        padding-block: var(--padding-md);
        background-color: var(--color-surface-container-low);
        border: 1px solid var(--color-outline);
        display: flex;
        flex-direction: row;
        gap: var(--gap-lg);
        border-radius: var(--border-radius);
        transition: border-color 0.2s ease;
        flex-shrink: 0;
    }

    .page-input-wrapper:has(input:focus) {
        border-color: var(--color-primary);
    }

    .page-action-wrapper {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
    }

    .page-input-wrapper input {
        background-color: var(--color-surface-container-low);
        field-sizing: content;
        min-width: 10px;
        max-width: 50px;
        height: 100%;
        border: none;
        outline: none;
        margin: 0;
        font: inherit;
        font-size: 14;
        color: var(--color-on-surface-container);
        box-sizing: border-box;
        border-radius: var(--border-radius);
        padding: 0;
        appearance: textfield;
    }

    .page-input-wrapper input::-webkit-outer-spin-button,
    .page-input-wrapper input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
