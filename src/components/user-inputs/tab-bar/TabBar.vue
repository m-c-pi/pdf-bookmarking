
<script setup>

</script>

<template>
    <div class="tab-bar-wrapper">
        <div class="active-tab"></div>
        <div class="text-layer">
            <div class="text-item">
                This pdf file
            </div>
            <div class="text-item">
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
    }

    .text-item:hover {
        transition: background-color ease-in 0.1s;
        background-color: var(--color-primary-container);
    }

    .active-tab {
        background-color: var(--color-primary-container);
        border-radius: var(--border-radius);
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(10px, -50%);
        width: calc(
            50% - var(--padding-md) - (var(--padding-md) / 2)
        );
        height: calc(100% - var(--padding-md))
    }
</style>
