
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    initialTabIndex: {
        type: Number,
        // 0 = This pdf file
        // 1 = All pdf files
        default: 0
    }
});

const emit = defineEmits(['change']);

const activeTabIndex = ref(props.initialTabIndex);

const activeTabStyle = computed(() => {
    const baseTranslateX = 5; // var(--padding-md) is 10px

    if (activeTabIndex.value === 0) {
        return {
            transform: `translate(${baseTranslateX}px, -50%)`
        };
    } else {
        return {
            transform: 
                `translate(calc(100% + var(--padding-md) - ${baseTranslateX}px), -50%)`
        };
    }
});

const handleTabClick = (index) => {
    activeTabIndex.value = index;
    emit('change', index);
};
</script>

<template>
    <div class="tab-bar-wrapper">
        <div class="active-tab" :style="activeTabStyle"></div>
        <div class="text-layer">
            <div
                class="text-item"
                :class="{ 'active': activeTabIndex === 0 }"
                @click="handleTabClick(0)"
            >
                This pdf file
            </div>
            <div
                class="text-item"
                :class="{ 'active': activeTabIndex === 1 }"
                @click="handleTabClick(1)"
            >
                All pdf files
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tab-bar-wrapper {
        width: 100%;
        height: var(--input-height-lg);
        background-color: var(--color-surface-container);
        border-radius: var(--border-radius);
        padding: var(--padding-md);
        display: flex;
        flex-direction: row;
        position: relative;
        cursor: pointer;
    }

    .text-layer {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: var(--padding-md);
        padding: var(--padding-md);
    }

    .text-item {
        flex: 1;
        display: flex;
        height: 100%;
        border-radius: var(--border-radius);
        justify-content: center;
        align-items: center;
        overflow: hidden;
        flex-wrap: nowrap;
        transition: opacity linear 0.2s;
        cursor: pointer;
        pointer-events: auto;
        user-select: none;
    }

    .text-item:not(.active):hover {
        transition: background-color ease-in 0.1s;
        background-color: #2f2f2f;
    }

    .active-tab {
        background-color: var(--color-primary-container);
        opacity: 0,2;
        border-radius: var(--border-radius);
        position: absolute;
        top: 50%;
        left: 0;
        width: calc(
            50% - var(--padding-md) / 2
        );
        height: calc(100% - var(--padding-md));
        transition: transform 0.3s ease-in-out;
    }
</style>
