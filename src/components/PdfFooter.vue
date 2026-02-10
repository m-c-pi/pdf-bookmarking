<script setup>
import { ref, watchEffect } from 'vue'
import IconButton from './user-inputs/IconButton.vue'
import { WeatherMoon24Regular, ShareAndroid24Regular, Code24Regular } from '@vicons/fluent'

const openGithub = () => window.open('https://github.com/pascal-iding/pdf-bookmarking', '_blank')
const share = () =>
  window.open(
    'https://chromewebstore.google.com/detail/superior-pdf-bookmarks/cmbcjkejdebbengdbindhfofkkendcon?hl=de',
    '_blank',
  )

const theme = ref(localStorage.getItem('theme') || 'system')

watchEffect(() => {
  if (theme.value === 'system') {
    document.documentElement.removeAttribute('data-theme')
  } else {
    document.documentElement.setAttribute('data-theme', theme.value)
  }
  localStorage.setItem('theme', theme.value)
})

const toggleTheme = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const currentlyDark = theme.value === 'dark' || (theme.value === 'system' && prefersDark)
  theme.value = currentlyDark ? 'light' : 'dark'
}
</script>

<template>
  <div class="footer-wrapper">
    <IconButton :icon="Code24Regular" @click="openGithub" />
    <IconButton :icon="WeatherMoon24Regular" @click="toggleTheme" />
    <IconButton :icon="ShareAndroid24Regular" @click="share" />
  </div>
</template>

<style scoped>
.footer-wrapper {
  display: flex;
  gap: var(--gap-sm);
  height: var(--input-height-sm);
}
</style>
