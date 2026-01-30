
<script setup>
defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    emit('update:modelValue', event.target.value);
};
</script>

<template>
    <div class="text-input-wrapper">
        <input
            type="text"
            :placeholder="placeholder"
            :value="modelValue"
            @input="handleInput"
        >
    </div>
</template>

<style scoped>
    .text-input-wrapper {
        width: 100%;
        height: var(--input-height-lg);
        border: 1px solid var(--color-outline);
        border-radius: var(--border-radius);
        transition: border-color 0.2s ease;
        position: relative;
    }

    .text-input-wrapper:focus-within {
        border-color: var(--color-primary);
    }
    
    .text-input-wrapper input {
        width: 100%;
        height: 100%;
        background-color: var(--color-surface-container-low);
        border: none;
        outline: none;
        padding: 0;
        margin: 0;
        font: inherit;
        color: var(--color-on-surface-container);
        box-sizing: border-box;
        padding: var(--padding-lg);
        border-radius: var(--border-radius);
    }

</style>
