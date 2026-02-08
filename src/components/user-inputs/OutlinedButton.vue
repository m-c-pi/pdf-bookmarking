<script setup>
const emit = defineEmits(['click'])

const handleClick = (e) => {
  emit('click', e)
}
</script>

<template>
  <button class="outlined-button" @click="handleClick">
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
