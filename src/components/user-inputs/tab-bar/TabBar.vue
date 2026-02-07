
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
                <span class="tab-label">This pdf file</span>
            </div>
            <div
                class="text-item"
                :class="{ 'active': activeTabIndex === 1 }"
                @click="handleTabClick(1)"
            >
                <span class="tab-label">All pdf files</span>
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
        border: 1px solid transparent;
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

    .text-item:not(.active) .tab-label {
        position: relative;
    }

    .text-item:not(.active) .tab-label::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0.1em;
        background-color: var(--color-primary);
        opacity: 0;
        transition: opacity 300ms, transform 300ms;
    }

    .text-item:not(.active):hover .tab-label::after {
        opacity: 1;
        transform: translate3d(0, 0.2em, 0);
    }

    .active-tab {
        background-color: var(--color-primary-container);
        border: 1px solid var(--color-primary);
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

<style>
    :root[data-theme="dark"] .active-tab {
        border-color: transparent;
    }

    :root[data-theme="dark"] .tab-bar-wrapper {
        border-color: var(--color-outline);
    }

    @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) .active-tab {
            border-color: transparent;
        }

        :root:not([data-theme="light"]) .tab-bar-wrapper {
            border-color: var(--color-outline);
        }
    }
</style>
