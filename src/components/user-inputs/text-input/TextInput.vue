
<script setup>
import { ref } from 'vue';
import IconButton from '../IconButton.vue';
import { Dismiss24Regular, Checkmark24Regular } from '@vicons/fluent';

const inputRef = ref(null);

const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    fontSize: {
        type: Number,
        default: 16
    },
    onAccept: {
        type: Function,
        default: null
    },
    onCancel: {
        type: Function,
        default: null
    },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};

const handleClear = () => {
    emit('update:modelValue', '');
    if (props.onCancel) {
        props.onCancel();
    }
    inputRef.value?.focus();
};

const handleEnter = () => {
    if (props.onAccept) {
        props.onAccept(props.modelValue);
    }
    inputRef.value?.blur();
};
</script>

<template>
    <div class="text-input-wrapper">
        <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            :style="{ fontSize: fontSize + 'px' }"
            @input="handleInput"
            @keydown.enter="handleEnter"
            @keydown.esc="handleClear"
        >
        <div v-if="modelValue" class="button-container">
            <IconButton v-if="props.onAccept" :icon="Checkmark24Regular" color="var(--color-accept)" @click="handleEnter" />
            <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleClear" />
        </div>
    </div>
</template>

<style scoped>
    .text-input-wrapper {
        width: 100%;
        height: 100%;
        min-width: 0;
        border: 1px solid var(--color-outline);
        border-radius: var(--border-radius);
        transition: border-color 0.2s ease;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;
        background-color: var(--color-surface-container-low);
    }

    .text-input-wrapper:focus-within {
        border-color: var(--color-primary);
    }
    
    .text-input-wrapper input {
        flex: 1;
        height: 100%;
        background-color: var(--color-surface-container-low);
        border: none;
        outline: none;
        margin: 0;
        font: inherit;
        color: var(--color-on-surface-container);
        padding-inline: var(--padding-lg);
        padding-block: var(--padding-md);
        border-radius: var(--border-radius);
    }

    .button-container {
        display: flex;
        gap: var(--padding-sm);
        padding: var(--padding-sm);
        height: var(--input-height-sm);
        margin-right: var(--padding-lg);
    }

</style>
