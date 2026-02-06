<script setup>
import { ref, watchEffect } from 'vue';
import IconButton from './user-inputs/IconButton.vue';
import { WeatherMoon24Regular, Info24Regular, CloudSync24Regular, Code24Regular } from '@vicons/fluent';

const theme = ref(localStorage.getItem('theme') || 'system');

watchEffect(() => {
    if (theme.value === 'system') {
        document.documentElement.removeAttribute('data-theme');
    } else {
        document.documentElement.setAttribute('data-theme', theme.value);
    }
    localStorage.setItem('theme', theme.value);
});

const toggleTheme = () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentlyDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark);
    theme.value = currentlyDark ? 'light' : 'dark';
};
</script>

<template>
    <div class="footer-wrapper">
        <IconButton :icon="Code24Regular" />
        <IconButton :icon="WeatherMoon24Regular" @click="toggleTheme" />
        <IconButton :icon="Info24Regular" />
        <IconButton :icon="CloudSync24Regular" />
    </div>
</template>

<style scoped>
.footer-wrapper {
    display: flex;
    gap: var(--gap-sm);
    height: var(--input-height-sm);
}
</style>
