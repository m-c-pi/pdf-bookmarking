
<script setup>
import { ref, watch, nextTick } from 'vue';
import gsap from 'gsap';
import IconButton from './user-inputs/IconButton.vue';
import { Edit24Regular, Delete24Regular, Checkmark24Regular, Dismiss24Regular } from '@vicons/fluent';
import EditNameInput from './user-inputs/text-input/EditNameInput.vue';

const PdfTitleState = {
    EDITING: "editing",
    DEFAULT: "default"
}

const pdfTitleState = ref(PdfTitleState.DEFAULT);
const title = ref('The catcher in the rye');
const wrapperRef = ref(null);
const shadowRef = ref(null);
const useFitContent = ref(true);

const handleEdit = () => {
    pdfTitleState.value = PdfTitleState.EDITING;
};

const handleAccept = () => {
    pdfTitleState.value = PdfTitleState.DEFAULT;
};

const handleCancel = () => {
    pdfTitleState.value = PdfTitleState.DEFAULT;
};

watch(pdfTitleState, (newValue) => {
    if (newValue === PdfTitleState.EDITING && wrapperRef.value) {
        const currentWidth = wrapperRef.value.offsetWidth;
        gsap.set(wrapperRef.value, { maxWidth: currentWidth });
        useFitContent.value = false;

        nextTick(() => {
            gsap.to(wrapperRef.value,
                { maxWidth: 300, duration: 1, ease: 'elastic.out(1, 0.5)' }
            );
        });
    } else if (newValue === PdfTitleState.DEFAULT && wrapperRef.value && shadowRef.value) {
        const targetWidth = shadowRef.value.offsetWidth;

        nextTick(() => {
            gsap.fromTo(wrapperRef.value,
                { maxWidth: 300 },
                { maxWidth: targetWidth, duration: 0.3, ease: 'power2.out', onComplete: () => {
                    gsap.set(wrapperRef.value, { clearProps: 'maxWidth' });
                    useFitContent.value = true;
                }}
            );
        });
    }
});
</script>

<template>
    <div class="shadow-wrapper">
        <div ref="wrapperRef" class="pdf-title-wrapper" :class="{ 'fit-content': useFitContent }" @click="pdfTitleState !== PdfTitleState.EDITING && handleEdit()">
            <EditNameInput v-if="pdfTitleState === PdfTitleState.EDITING" v-model="title" @blur="handleCancel" @keydown.enter="handleAccept" />
            <div v-else class="title">{{ title }}</div>
            <div class="action-container" @click.stop>
                <template v-if="pdfTitleState === PdfTitleState.EDITING">
                    <IconButton :icon="Checkmark24Regular" @click="handleAccept" />
                    <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleCancel" />
                </template>
                <template v-else>
                    <IconButton :icon="Edit24Regular" @click="handleEdit" />
                    <IconButton :icon="Delete24Regular" color="var(--color-decline)" />
                </template>
            </div>
        </div>
        <!-- To determine target animation size from edit mode -> non edit mode -->
        <div ref="shadowRef" class="pdf-title-wrapper shadow fit-content">
            <div class="title">{{ title }}</div>
            <div class="action-container">
                <IconButton :icon="Edit24Regular" />
                <IconButton :icon="Delete24Regular" color="var(--color-decline)" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .shadow-wrapper {
        position: relative;    
    }

    .pdf-title-wrapper {
        background-color: var(--color-surface-container);
        border-radius: var(border-radius);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--gap-md);
        height: calc(var(--input-height-sm) + 2 * var(--padding-sm));
        box-sizing: border-box;
        padding-block: var(--padding-sm);
        padding-inline: var(--padding-lg);
        font-size: 14px;
        max-width: calc(300px + 2 * var(--padding-lg));
        border-radius: var(--border-radius);
    }

    .shadow {
        opacity: 0;
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
    }

    .pdf-title-wrapper.fit-content {
        width: fit-content;
    }

    .title {
        color: var(--color-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        min-width: 0;
    }

    .action-container {
        padding: var(--padding-sm);
        display: flex;
        flex-direction: row;
        height: 100%;
    }
</style>

<style>
    :root:not([data-theme="dark"]) .pdf-title-wrapper {
        background-color: var(--color-primary-container);
    }

    @media (prefers-color-scheme: dark) {
        :root:not([data-theme="light"]) .pdf-title-wrapper {
            background-color: var(--color-surface-container);
        }
    }
</style>
