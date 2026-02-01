
<script setup>
const props = defineProps({
    icon: {
        type: Object,
        required: true
    },
    color: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['click']);

const handleClick = () => {
    emit('click');
};
</script>

<template>
    <button class="icon-button" :style="props.color ? { '--button-color': props.color } : {}" @click="handleClick">
        <component :is="icon" />
    </button>
</template>

<style scoped>
    .icon-button {
        height: 100%;
        aspect-ratio: 1;
        border-radius: var(--border-radius);
        background-color: var(--color-surface-container);
        border: none;
        cursor: pointer;
        color: var(--color-on-surface-container-variant);
        padding: 3px;
    }

    .icon-button:hover {
        border: 1px solid var(--button-color, var(--color-primary));
        color: var(--button-color, var(--color-primary));
    }
</style>
