<script setup>
const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>

<template>
  <button class="filled-button" @click="handleClick">
    <slot />
  </button>
</template>

<style scoped>
.filled-button {
  height: var(--input-height-sm);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  padding: 0 16px;
  font-size: inherit;
}
</style>
