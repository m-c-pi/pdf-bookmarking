<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'blur'])
const inputRef = ref(null)

const handleInput = (event) => {
  emit('update:modelValue', event.target.value)
}

onMounted(() => {
  inputRef.value?.focus()
  inputRef.value?.select()
})
</script>

<template>
  <div class="text-input-wrapper">
    <input
      ref="inputRef"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @blur="emit('blur')"
    />
  </div>
</template>

<style scoped>
.text-input-wrapper {
  width: 100%;
  height: 100%;
  max-height: 100%;
  transition: border-color 0.2s ease;
  position: relative;
}

.text-input-wrapper:focus-within {
  border-color: var(--color-primary);
}

.text-input-wrapper input {
  width: 100%;
  min-width: 0;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0;
  font: inherit;
  color: var(--color-on-surface-container);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  padding: 0;
}
</style>
