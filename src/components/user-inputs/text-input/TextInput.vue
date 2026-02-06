
<script setup>
import { ref, computed } from 'vue';
import IconButton from '../IconButton.vue';
import { Dismiss24Regular } from '@vicons/fluent';

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
    size: {
        type: String,
        default: 'lg',
        validator: (value) => ['lg', 'md', 'sm'].includes(value)
    },
});

const inputHeight = computed(() => `var(--input-height-${props.size})`);

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};

const handleClear = () => {
    emit('update:modelValue', '');
    inputRef.value?.focus();
};
</script>

<template>
    <div class="text-input-wrapper" :style="{ height: inputHeight }">
        <input
            ref="inputRef"
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="handleInput"
        >
        <div v-if="modelValue" class="clear-container">
            <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleClear" />
        </div>
    </div>
</template>

<style scoped>
    .text-input-wrapper {
        width: 100%;
        min-width: 0;
        max-height: 100%;
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
        box-sizing: border-box;
        padding: var(--padding-lg);
        border-radius: var(--border-radius);
    }

    .clear-container {
        padding: var(--padding-sm);
        height: var(--input-height-sm);
        aspect-ratio: 1;
        margin-right: var(--padding-lg);
    }

</style>
