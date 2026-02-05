
<script setup>
import { ref, watch, nextTick, onMounted } from 'vue';
import gsap from 'gsap';
import IconButton from './user-inputs/IconButton.vue';
import { Edit24Regular, Delete24Regular, Checkmark24Regular, Dismiss24Regular } from '@vicons/fluent';
import PdfTitleEditInput from './user-inputs/text-input/PdfTitleEditInput.vue';

const isEditing = ref(false);
const title = ref('The catcher in the rye');
const wrapperRef = ref(null);
const shadowRef = ref(null);
const useFitContent = ref(true);

const handleEditClick = () => {
    isEditing.value = true;
};

const handleAccept = () => {
    isEditing.value = false;
};

const handleCancel = () => {
    isEditing.value = false;
};

onMounted(() => {
    console.log('Shadow width:', shadowRef.value?.offsetWidth);
});

watch(isEditing, (newValue) => {
    if (newValue && wrapperRef.value) {
        const currentWidth = wrapperRef.value.offsetWidth;
        gsap.set(wrapperRef.value, { maxWidth: currentWidth });
        useFitContent.value = false;

        nextTick(() => {
            gsap.to(wrapperRef.value,
                { maxWidth: 300, duration: 0.3, ease: 'power2.out' }
            );
        });
    } else if (!newValue && wrapperRef.value && shadowRef.value) {
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
    <div>
        <div ref="wrapperRef" class="pdf-title-wrapper" :class="{ 'fit-content': useFitContent }">
            <PdfTitleEditInput v-if="isEditing" v-model="title" @blur="handleCancel" />
            <div v-else class="title">{{ title }}</div>
            <div class="action-container">
                <template v-if="isEditing">
                    <IconButton :icon="Checkmark24Regular" @click="handleAccept" />
                    <IconButton :icon="Dismiss24Regular" color="var(--color-decline)" @click="handleCancel" />
                </template>
                <template v-else>
                    <IconButton :icon="Edit24Regular" @click="handleEditClick" />
                    <IconButton :icon="Delete24Regular" color="var(--color-decline)" />
                </template>
            </div>
        </div>
        <div ref="shadowRef" class="pdf-title-wrapper shadow fit-content">
            <div class="title">{{ title }}</div>
            <div class="action-container">
                <IconButton :icon="Edit24Regular" />
                <IconButton :icon="Delete24Regular" color="var(--color-decline)" />
            </div>
        </div>
        <div class="test"></div>
    </div>
</template>

<style scoped>
    .test {
        height: 50px;
        width: 262px;
        background-color: aqua;
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
        /* opacity: 0; */
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
        gap: var(--gap-sm);
        height: 100%;
    }
</style>
