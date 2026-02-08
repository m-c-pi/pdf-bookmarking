<script setup>
import { ref } from 'vue'
import gsap from 'gsap'

const emit = defineEmits(['click'])
const buttonRef = ref(null)

const handleClick = (e) => {
  emit('click', e)
}

const onMouseEnter = () => {
  gsap.to(buttonRef.value, { y: -2, duration: 0.2, ease: 'power2.out' })
}

const onMouseLeave = () => {
  gsap.to(buttonRef.value, { y: 0, duration: 0.2, ease: 'power2.out' })
}
</script>

<template>
  <button ref="buttonRef" class="outlined-button" @click="handleClick" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot />
  </button>
</template>

<style scoped>
.outlined-button {
  height: var(--input-height-sm);
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius);
  cursor: pointer;
  padding: 0 16px;
  font-size: inherit;
}
</style>
