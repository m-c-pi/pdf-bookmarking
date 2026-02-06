
<script setup>
import PageInput from './user-inputs/PageInput.vue';
import TextInput from './user-inputs/text-input/TextInput.vue';


</script>

<template>
    <div class="new-bookmark-wrapper">
        <TextInput fontSize="14" placeholder="New bookmark title" />
        <PageInput />
    </div>
</template>

<style scoped>
    .new-bookmark-wrapper {
        display: flex;
        flex-direction: row;
        gap: var(--gap-md);
        height: 100%;
    }
</style>
